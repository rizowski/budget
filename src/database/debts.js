const { onCollection } = require('./mongo');

const collection = 'debts';

const debts = onCollection(collection);

module.exports = {
  create(doc) {
    return debts.create(doc);
  },
  update(query, doc) {
    return debts.update(query, doc);
  },
  delete() {
    throw new Error('Not implemented');
  },
  find(query) {
    return debts.search(query);
  },
  get(query) {
    return debts.get(query);
  },
};
