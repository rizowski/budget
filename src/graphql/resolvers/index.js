const omit = require('lodash.omit');
const goals = require('./goals');
const bills = require('./bills');
const income = require('./income');
const transactions = require('./transactions');
const loans = require('./loans');

const keys = ['Query', 'Mutation'];

function get(key) {
  return {
    ...goals[key],
    ...bills[key],
    ...income[key],
    ...transactions[key],
    ...loans[key],
  };
}

const queries = get('Query');
const mutations = get('Mutation');
const rest = {
  ...omit(goals, keys),
  ...omit(bills, keys),
  ...omit(income, keys),
  ...omit(transactions, keys),
  ...omit(loans, keys),
};

module.exports = {
  Query: queries,
  Mutation: mutations,
  ...rest,
};
