module.exports = {
  Income: {},
  Query: {
    getIncome(source, args, context) {
      return context.db.income.find();
    },
  },
};
