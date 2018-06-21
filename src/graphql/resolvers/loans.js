module.exports = {
  Loan: {},
  Query: {
    getLoans(source, args, context) {
      return context.db.loans.find();
    },
  },
  Mutation: {
    createLoan(source, args, context) {
      return context.db.loans.create(args.input);
    },
  },
};
