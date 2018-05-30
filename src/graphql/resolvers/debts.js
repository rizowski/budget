module.exports = {
  Debt: {},
  Query: {
    getDebts(source, args, context) {
      const query = {
        priority: args.priority,
      };

      return context.db.debts.find(query);
    },
  },
};
