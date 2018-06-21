const { expect } = require('chai');
const { start } = require('../../src/graphql/server');

describe.only('integration: goals', () => {
  let server;
  let exec;

  before(async () => {
    server = await start();
    exec = async query => {
      const { payload } = await server.inject({
        method: 'POST',
        url: '/graphql',
        payload: {
          query,
        },
      });

      console.log(payload);
      const result = JSON.parse(payload);

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result;
    };
  });

  it('returns goals', async () => {
    const {
      data: { getGoals: results },
    } = await exec(`{
      getGoals {
        id
        name
        amount
        priority
        type
        completed
        objective {
          amount
          maxPerPaycheck
        }
        category
        billDetails {
          name
        }
        loanDetails {
          name
        }
      }
    }`);

    results.forEach(goal => {
      expect(goal).to.have.keys(['id', 'name', 'amount', 'priority', 'type', 'completed', 'objective', 'category', 'billDetails']);
    });
  });
});
