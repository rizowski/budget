const orderBy = require('lodash.orderby');

function getCurrentObjective(source) {
  const [primary] = source.objectives.filter(o => {
    return o.amount >= source.currentAmount;
  });

  return (
    primary || {
      amount: 0,
      maxPerPaycheck: 0,
    }
  );
}

async function getPriority(source, context) {
  const { name, priorities } = await context.db.categories.get(
    source.categoryId
  );
  const { amount } = getCurrentObjective(source);

  if (name === 'Emergency' || name === 'Need' || name === 'Bill') {
    if (source.currentAmount < amount * 2) {
      return priorities[0];
    }
  }

  if (source.currentAmount < amount) {
    return priorities[0];
  }

  return priorities[1];
}

module.exports = {
  Goal: {
    category(source, args, context) {
      return context.db.categories.get(source.categoryId);
    },
    currentObjective(source) {
      return getCurrentObjective(source);
    },
    async currentPriority(source, viewer, context) {
      return getPriority(source, context);
    },
  },
  Query: {
    getCategories(source, args, context) {
      const query = {};

      return context.db.goals.find(query);
    },
    async getGoals(source, args, context) {
      const query = {};

      const results = await context.db.goals.find(query);

      const priorities = await Promise.all(
        results.map(async g => {
          const priority = await getPriority(g, context);

          return {
            priority,
            goal: g,
          };
        })
      );

      return orderBy(priorities, 'priority').map(r => r.goal);
    },
  },
  Mutation: {
    createGoal() {},
  },
};
