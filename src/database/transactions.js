const { onCollection } = require('./mongo');

const collection = 'transactions';

const transactions = onCollection(collection);

module.exports = {
  create(doc) {
    return transactions.create(doc);
  },
  update(query, doc) {
    return transactions.update(query, doc);
  },
  delete() {
    throw new Error('Not implemented');
  },
  get(query) {
    return transactions.get(query);
  },
  find(query) {
    return transactions.search(query);
  },
};
