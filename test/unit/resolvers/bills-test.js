const { expect } = require('chai');
const resolvers = require('../../../src/graphql/resolvers/bills');

describe('bills resolver', () => {
  let bill;
  let context;
  let bills;
  beforeEach(() => {
    bill = {
      id: 'bill-id',
      name: 'Chase CC',
      payment: 5000,
      freqency: 'MONTHLY',
      startDate: '2018-03-25',
      endDate: undefined,
    };
    bills = [bill];
    context = {
      db: {
        bills: {
          find() {
            return Promise.resolve(bills);
          },
        },
      },
    };
  });

  describe('Bill', () => {
    describe('due', () => {
      let resolver;

      before(() => {
        resolver = resolvers.Bill.due;
      });

      describe('given a date string in YYYY/MM/DD format', () => {
        it('returns the correct day of the month', () => {
          bill.startDate = '2018/03/25';
          const result = resolver(bill);

          expect(result.date).to.equal(25);
        });

        it('returns the correct month', () => {
          bill.startDate = '2018/03/25';
          const result = resolver(bill);

          expect(result.month).to.equal('March');
        });
      });
    });
  });

  describe('Query', () => {
    describe('getBills', () => {
      let resolver;

      before(() => {
        resolver = resolvers.Query.getBills;
      });

      describe('given a query object', () => {
        it('returns a list of bills', async () => {
          const result = await resolver(null, null, context);

          expect(result).to.eql(bills);
        });
      });
    });
  });

  describe('Mutation', () => {});
});
