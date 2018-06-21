const orderBy = require('lodash.orderby');

function getobjective(goal) {
  const [primary] = goal.objectives.filter(o => {
    return o.amount >= goal.amount;
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
  const { amount } = getobjective(goal);

  if (name === 'Emergency' || name === 'Need' || name === 'Bill') {
    if (goal.amount < amount * 2) {
      return priorities[0];
    }
  }

  if (goal.amount < amount) {
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
    objective(source) {
      return getobjective(source);
    },
    priority(source, viewer, context) {
      return getPriority(source, context);
    },
    completed(source) {
      const [firstObjective] = source.objectives;
      return source.amount >= firstObjective.amount;
    },
    billDetails(source, args, context) {
      return context.db.bills.get(source.billId);
    },
    loanDetails(source, args, context) {
      return context.db.loans.get(source.loanId);
    },
  },
  Query: {
    async getCategories(source, args, context) {
      const query = {};

      const categories = await context.db.categories.find(query);

      return orderBy(categories, 'priorities[0]');
    },
    async getGoals(source, args, context) {
      const query = {};

      const goals = await context.db.goals.find(query);

      const goalsWithDetails = await Promise.all(
        goals.map(async goal => {
          const bill = await context.db.bills.get(goal.billId);
          const priority = await getPriority(goal, context);

          goal.billDetails = bill;

          return { priority, goal };
        })
      );

      return orderBy(goalsWithDetails, 'priority').map(r => r.goal);
    },
  },
  Mutation: {
    createGoal(goal, args, context) {
      return context.db.goals.create(args.input);
    },
    createCategory(category, args, context) {
      return context.db.categories.create(args.input);
    },
    updateGoal(_, args, context) {
      return context.db.goals.update(
        {
          _id: args.id,
        },
        args.input
      );
    },
    async updateCategory(_, args, context) {
      return context.db.categories.update(
        {
          _id: args.id,
        },
        args.input
      );
    },
  },
};
