const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {
  Bill: {
    due(source) {
      const date = new Date(source.startDate);

      return {
        month: months[date.getUTCMonth()],
        date: date.getUTCDate(),
      };
    },
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
