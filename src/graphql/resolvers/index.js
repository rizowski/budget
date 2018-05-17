const omit = require('lodash.omit');
const debts = require('./debts');
const goals = require('./goals');

const keys = ['Query', 'Mutation'];

function get(key) {
  return Object.assign({}, debts[key], goals[key]);
}

const queries = get('Query');
const mutations = get('Mutations');
const rest = Object.assign({}, omit(debts, keys), omit(goals, keys));

module.exports = Object.assign(
  {
    Query: queries,
    Mutations: mutations,
  },
  rest
);
