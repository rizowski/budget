const { server: Server } = require('hapi');
const { graphqlHapi } = require('apollo-server-hapi');
const graphqlPlayground = require('graphql-playground-middleware-hapi').default;
const { makeExecutableSchema } = require('graphql-tools');

const db = require('../database');
const { schemas } = require('./schemas');
const resolvers = require('./resolvers');

const HOST = 'localhost';
const PORT = 3000;

const api = {
  plugin: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: {
      schema: makeExecutableSchema({
        typeDefs: schemas,
        resolvers,
      }),
      formatError(error) {
        const { message, stack, locations, path } = error;

        return {
          message,
          locations,
          path,
          stack,
        };
      },
      tracing: true,
      context: {
        statics: {},
        db,
      },
    },
    route: {
      cors: true,
    },
  },
};

const playground = {
  plugin: {
    name: 'graphql-playground',
    register(server, options) {
      graphqlPlayground.register(server, options);
    },
  },
  options: {
    path: '/playground',
    endpoint: '/graphql',
  },
};

async function start() {
  const server = new Server({
    host: HOST,
    port: PORT,
    debug: { request: '*' },
  });
  try {
    await server.register([api, playground]);
  } catch (e) {
    console.error(e);
    throw e;
  }

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server:\n${err.message}`);
    stop();
  }

  console.log(`Server running at: ${server.info.uri}/playground`);
}

function stop() {
  process.exit();
}

module.exports = {
  start,
  stop,
};
