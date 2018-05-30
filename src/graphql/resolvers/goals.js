const orderBy = require('lodash.orderby');

function getCurrentObjective(goal) {
  const [primary] = goal.objectives.filter(o => {
    return o.amount >= goal.currentAmount;
  });

  return (
    primary || {
      amount: 0,
      maxPerPaycheck: 0,
    }
  );
}

async function getPriority(goal, context) {
  const category = await context.db.categories.get(goal.categoryId);
  const { name, priorities } = category || { priorities: [] };
  const { amount } = getCurrentObjective(goal);

  if (name === 'Emergency' || name === 'Need' || name === 'Bill') {
    if (goal.currentAmount < amount * 2) {
      return priorities[0];
    }
  }

  if (goal.currentAmount < amount) {
    return priorities[0];
  }

  return priorities[1];
}

module.exports = {
  Goal: {
    async category(source, args, context) {
      const category = await context.db.categories.get(source.categoryId);

      return category.name;
    },
    currentObjective(source) {
      return getCurrentObjective(source);
    },
    async priority(source, viewer, context) {
      return getPriority(source, context);
    },
  },
  Query: {
    getCategories(source, args, context) {
      const query = {};

      return context.db.categories.find(query);
    },
    async getGoals(source, args, context) {
      const query = {};

      const results = await context.db.goals.find(query);

      const priorities = await Promise.all(
        results.map(async goal => {
          const priority = await getPriority(goal, context);

          return {
            priority,
            goal,
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
