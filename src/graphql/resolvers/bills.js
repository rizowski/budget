const moment = require('moment');

module.exports = {
  Bill: {
    // amount(source) {
    //   // TODO: Change to string
    //   return source.amount;
    // },
    startDate(source) {
      return moment(source.startDate).format('MM/DD/YYYY');
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
