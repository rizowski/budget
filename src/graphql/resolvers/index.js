const omit = require('lodash.omit');
const debts = require('./debts');
const goals = require('./goals');

const keys = ['Query', 'Mutation'];

function get(key) {
  return { ...debts[key], ...goals[key] };
}

const queries = get('Query');
const mutations = get('Mutation');
const rest = { ...omit(debts, keys), ...omit(goals, keys) };

module.exports = {
  Query: queries,
  Mutation: mutations,
  ...rest,
};
