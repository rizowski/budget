module.exports = {
  Income: {},
  Query: {
    getIncome(source, args, context) {
      return context.db.income.find();
    },
  },
  Mutation: {
    createIncome(source, args, context) {
      return context.db.income.create(args.input);
    },
  },
};
