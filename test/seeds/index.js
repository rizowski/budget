const db = require('../../src/database');

const bills = require('./bills');
const goals = require('./goals');
const income = require('./income');
const transactions = require('./transactions');
const categories = require('./categories');
const loans = require('./loans');

const types = [
  {
    name: 'goals',
    driver: db.goals,
    seed: goals,
  },
  {
    name: 'categories',
    driver: db.categories,
    seed: categories,
  },
  {
    name: 'income',
    driver: db.income,
    seed: income,
  },
  {
    name: 'transactions',
    driver: db.transactions,
    seed: transactions,
  },
  {
    name: 'bill',
    driver: db.bills,
    seed: bills,
  },
  {
    name: 'Loan',
    driver: db.loans,
    seed: loans,
  },
];

module.exports = {
  async seed() {
    const promises = types.map(t => {
      const data = t.seed.generateData();
      console.log('working on', t.name);

      return Promise.all(
        data.map(async d => {
          await t.driver.create(d);
          console.log(t.name, ' done');
        })
      );
    });

    await Promise.all(promises);

    console.log('done');
  },
};
