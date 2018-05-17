const { onCollection } = require('./mongo');

const collection = 'income';

const income = onCollection(collection);

module.exports = {
  create(doc) {
    return income.create(doc);
  },
  update(query, doc) {
    return income.update(query, doc);
  },
  delete() {
    throw new Error('Not implemented');
  },
  get(query) {
    return income.get(query);
  },
  find(query) {
    return income.search(query);
  },
};
