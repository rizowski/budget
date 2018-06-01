const { onCollection } = require('./mongo');

const collection = 'bills';

const goals = onCollection(collection);

module.exports = {
  create(doc) {
    return goals.create(doc);
  },
  update(query, doc) {
    return goals.update(query, doc);
  },
  delete() {
    throw new Error('Not implemented');
  },
  find(query) {
    return goals.search(query);
  },
  get(query) {
    return goals.get(query);
  },
};
