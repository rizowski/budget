const moment = require('moment');
const orderBy = require('lodash.orderby');

module.exports = {
  Income: {
    date(source) {
      return moment(source.date, 'MM/DD/YYYY').format('MM/DD/YYYY');
    },
  },
  Query: {
    async getIncome(source, args, context) {
      const results = await context.db.income.find();
      return orderBy(
        results,
        a => {
          return moment(a.date, 'MM/DD/YYYY').valueOf();
        },
        ['desc']
      );
    },
  },
  Mutation: {
    createIncome(source, args, context) {
      return context.db.income.create(args.input);
    },
  },
};
