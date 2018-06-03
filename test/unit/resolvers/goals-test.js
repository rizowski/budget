const { expect } = require('chai');
const resolvers = require('../../../src/graphql/resolvers/goals');

describe('goals resolver', () => {
  describe('Goal', () => {
    describe('.category', () => {
      let goal;
      let context;
      let category;
      let resolver;

      beforeEach(() => {
        resolver = resolvers.Goal.category;
        goal = {
          categoryId: '12345',
        };
        category = {
          name: 'my category',
          priorities: [1],
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

      describe('given a category id', () => {
        it('returns the category name', async () => {
          const result = await resolver(goal, null, context);

          expect(result).to.equal(category.name);
        });
      });
    });

    describe('.completed', () => {
      let goal;
      let objective;
      let resolver;

      beforeEach(() => {
        resolver = resolvers.Goal.completed;
        objective = {
          amount: 100,
          maxPerPaycheck: 10,
        };
        goal = {
          amount: 100,
          objectives: [objective],
        };
      });

      describe('given the goal has met the first objective', () => {
        it('returns true', () => {
          const result = resolver(goal);

          expect(result).to.equal(true);
        });
      });

      describe('given the goal has exceeded the first objective', () => {
        it('returns true', () => {
          goal.amount = 500;
          const result = resolver(goal);

          expect(result).to.equal(true);
        });
      });

      describe('given the goal has not met the first objective', () => {
        it('returns false', () => {
          goal.amount = 50;
          const result = resolver(goal);

          expect(result).to.equal(false);
        });
      });
    });

    describe('.priority', () => {
      let goal;
      let objective;
      let category;
      let resolver;
      let context;

      beforeEach(() => {
        resolver = resolvers.Goal;
        objective = {
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
          amount: 100,
          objective,
          categoryId: '1234',
          objectives: [objective],
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
          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(1);
        });

        it('returns priority 1 for Need', async () => {
          category.name = 'Need';
          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(1);
        });

        it('returns priority 1 for Bill', async () => {
          category.name = 'Bill';
          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(1);
        });
      });

      describe('given goal amount is greater than 2x current objective', () => {
        beforeEach(() => {
          goal.amount = 450;
        });

        it('returns priority 2 for Emergency', async () => {
          category.name = 'Emergency';
          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(2);
        });

        it('returns priority 2 for Need', async () => {
          category.name = 'Need';
          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(2);
        });

        it('returns priority 2 for Bill', async () => {
          category.name = 'Bill';
          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(2);
        });
      });

      describe('given goals are not primary needs', () => {
        beforeEach(() => {
          category.name = 'Fun';
        });

        it('returns priority 1 if goal amount is less than current objective amount', async () => {
          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(1);
        });

        it('returns priority 2 if goal amount is amove current objective amount', async () => {
          goal.amount = 500;

          const result = await resolver.priority(goal, null, context);

          expect(result).to.equal(2);
        });
      });
    });

    describe('.objective', () => {
      let source;
      let resolver;

      beforeEach(() => {
        resolver = resolvers.Goal.objective;
        source = {
          amount: 0,
          objectives: [
            {
              amount: 10,
              maxPerPaycheck: 5,
            },
            {
              amount: 20,
              maxPerPaycheck: 3,
            },
          ],
        };
      });

      describe('given the current amount is below the first objective', () => {
        it('returns the first objective', () => {
          const result = resolver(source);

          expect(result).to.eql({
            amount: 10,
            maxPerPaycheck: 5,
          });
        });
      });

      describe('given the current amount is above the first objective', () => {
        it('returns the second objective', () => {
          source.amount = 15;

          const result = resolver(source);

          expect(result).to.eql({
            amount: 20,
            maxPerPaycheck: 3,
          });
        });
      });

      describe('given the current amount is above all objectives', () => {
        it('returns a non priority objective', () => {
          source.amount = 30;
          const result = resolver(source);

          expect(result).to.eql({
            amount: 0,
            maxPerPaycheck: 0,
          });
        });
      });
    });
  });

  describe('Query', () => {
    describe('.getCategories', () => {
      let resolver;
      let context;
      let categories;

      beforeEach(() => {
        resolver = resolvers.Query.getCategories;
        categories = [
          {
            name: 'some goal',
            priorities: [1, 2],
          },
        ];
        context = {
          db: {
            categories: {
              find() {
                return Promise.resolve(categories);
              },
            },
          },
        };
      });

      describe('given a blank query', () => {
        it('gets all categories', async () => {
          const result = await resolver(null, null, context);

          expect(result).to.eql(categories);
        });
      });
    });

    describe('.getGoals', () => {
      let resolver;
      let context;
      let goals;
      let categories;

      beforeEach(() => {
        resolver = resolvers.Query.getGoals;
        categories = [
          {
            id: '2',
            name: 'cat 1',
            priorities: [2, 3],
          },
          {
            id: '1',
            name: 'cat 2',
            priorities: [1, 2],
          },
        ];
        goals = [
          {
            categoryId: '2',
            name: 'goal 2',
            amount: 30,
            objectives: [
              {
                amount: 100,
                maxPerPaycheck: 5,
              },
            ],
          },
          {
            categoryId: '1',
            name: 'goal 1',
            amount: 20,
            objectives: [
              {
                amount: 50,
                maxPerPaycheck: 10,
              },
            ],
          },
        ];
        context = {
          db: {
            categories: {
              get(id) {
                return Promise.resolve(categories.find(g => g.id === id));
              },
            },
            goals: {
              find() {
                return Promise.resolve(goals);
              },
            },
          },
        };
      });

      describe('given no found goals', () => {
        it('returns an empty array', async () => {
          goals = [];
          const result = await resolver(null, null, context);

          expect(result).to.eql([]);
        });
      });

      describe('given no categories', () => {
        it('returns them in default order', async () => {
          categories = [];
          const result = await resolver(null, null, context);

          expect(result).to.eql(goals);
        });
      });

      describe('given x length goals', () => {
        it('returns them in order based on priorities', async () => {
          const result = await resolver(null, null, context);

          expect(result).to.eql([goals[1], goals[0]]);
        });
      });
    });
  });
});
