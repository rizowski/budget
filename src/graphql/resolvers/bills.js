module.exports = {
  Bill: {},
  Query: {
    getBills(source, args, context) {
      return context.db.bills.find();
    },
  },
};
