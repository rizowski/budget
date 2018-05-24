const { expect } = require('chai');
const resolvers = require('../../../src/graphql/resolvers/goals');

describe('goals resolver', () => {
  describe('Goal', () => {
    describe('.currentPriority', () => {
      let goal;
      let currentObjective;
      let category;
      let resolver;
      let context;

      beforeEach(() => {
        resolver = resolvers.Goal;
        currentObjective = {
          amount: 200,
          maxPerPaycheck: 50,
        };
        category = {
          name: '',
          priorities: [1, 2],
        };
        goal = {
          id: 'goal-id',
          name: 'my Goal',
          currentAmount: 100,
          currentObjective,
          categoryId: '1234',
          objectives: [currentObjective],
        };
        context = {
          db: {
            categories: {
              get() {
                return Promise.resolve(category);
              },
            },
          },
        };
      });

      describe('given goal amount is less than 2x current objective', () => {
        it('returns priority 1 for Emergency', async () => {
          category.name = 'Emergency';
          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(1);
        });

        it('returns priority 1 for Need', async () => {
          category.name = 'Need';
          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(1);
        });

        it('returns priority 1 for Bill', async () => {
          category.name = 'Bill';
          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(1);
        });
      });

      describe('given goal amount is greater than 2x current objective', () => {
        beforeEach(() => {
          goal.currentAmount = 450;
        });

        it('returns priority 2 for Emergency', async () => {
          category.name = 'Emergency';
          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(2);
        });

        it('returns priority 2 for Need', async () => {
          category.name = 'Need';
          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(2);
        });

        it('returns priority 2 for Bill', async () => {
          category.name = 'Bill';
          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(2);
        });
      });

      describe('given goals are not primary needs', () => {
        beforeEach(() => {
          category.name = 'Fun';
        });

        it('returns priority 1 if goal amount is less than current objective amount', async () => {
          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(1);
        });

        it('returns priority 2 if goal amount is amove current objective amount', async () => {
          goal.currentAmount = 500;

          const result = await resolver.currentPriority(goal, null, context);

          expect(result).to.equal(2);
        });
      });
    });
  });

  describe('Query', () => {
    describe('.getGoals', () => {});
  });
});
