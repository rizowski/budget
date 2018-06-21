const { expect } = require('chai');
const { start } = require('../../src/graphql/server');

describe.only('integration: bills', () => {
  let server;
  let exec;

  before(async () => {
    server = await start();
    exec = async query => {
      const { result } = await server.inject({
        method: 'POST',
        url: '/graphql',
        payload: {
          query,
        },
      });

      return JSON.parse(result);
    };
  });

  it('returns bills', async () => {
    const {
      data: { getBills: results },
    } = await exec(`{
      getBills {
        id
        name
        amount
        startDate
        repeats
      }
    }`);
    results.forEach(bill => {
      expect(bill).to.have.property('id');
      expect(bill).to.have.property('name');
      expect(bill).to.have.property('amount');
      expect(bill).to.have.property('repeats');
      expect(bill).to.have.property('startDate');
    });
  });
});
