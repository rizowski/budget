const { onCollection } = require('./mongo');

const collection = 'categories';

const categories = onCollection(collection);

module.exports = {
  create(doc) {
    return categories.create(doc);
  },
  update(query, doc) {
    return categories.update(query, doc);
  },
  delete() {
    throw new Error('Not implemented');
  },
  get(id) {
    return categories.get({ _id: id });
  },
  find(query) {
    return categories.search(query);
  },
};
