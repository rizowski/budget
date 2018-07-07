const { expect } = require('chai');
const finance = require('../../../public/lib/finance');

describe.only('finance', () => {
  let goal;
  let income;

  beforeEach(() => {
    goal = {
      name: 'something',
      objective: {
        amount: 400,
        maxPerPaycheck: 10,
      },
    };
    income = 100;
  });

  describe('given a good goal', () => {
    it('returns 90', () => {
      const result = finance.budget(goal, income);

      expect(result).to.equal(90);
    });
  });

  describe('given the goal is complete', () => {
    beforeEach(() => {
      goal.objective = {
        amount: 0,
        maxPerPaycheck: 0,
      };
    });
    it('returns 0', () => {
      const result = finance.budget(goal, income);

      expect(result).to.equal(0);
    });
  });

  describe('given the income is budgeted to 0', () => {
    beforeEach(() => {
      income = 0;
    });

    it('returns 0', () => {
      const result = finance.budget(goal, income);

      expect(result).to.equal(0);
    });
  });

  // describe('given')
});
