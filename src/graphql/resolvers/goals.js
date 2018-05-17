const { goals, categories } = require('../../database');

module.exports = {
  Goal: {
    category(source) {
      return categories.get(source.categoryId);
    },
  },
  Query: {
    getCategories() {
      const query = {};

      return goals.find(query);
    },
    getGoals() {
      const query = {};

      return goals.find(query);
    },
  },
  Mutation: {
    createGoal() {},
  },
};
