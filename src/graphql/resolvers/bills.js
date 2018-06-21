module.exports = {
  Bill: {
    // amount(source) {
    //   // TODO: Change to string
    //   return source.amount;
    // },
  },
  Query: {
    getBills(source, args, context) {
      return context.db.bills.find();
    },
  },
  Mutation: {
    createBill(source, args, context) {
      return context.db.bills.create(args.input);
    },
  },
};
