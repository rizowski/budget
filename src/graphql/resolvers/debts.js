const { debts } = require('../../database');

module.exports = {
  Query: {
    getDebts(source, args) {
      const query = {
        priority: args.priority,
      };

      return debts.find(query);
    },
  },
};
