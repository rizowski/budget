const { onCollection } = require('./mongo');

const collection = 'loans';

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
  get(id) {
    return income.get({ _id: id });
  },
  find(query) {
    return income.search(query);
  },
};
