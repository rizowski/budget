const casual = require('casual');
const shortId = require('shortid');
const { dateFormat } = require('./common');

const loanMap = {
  'Sally May': shortId.generate(),
  Sofi: shortId.generate(),
  'Chase Credit Card': shortId.generate(),
  'Generic Car Loan': shortId.generate(),
  'Capital One Credit Card': shortId.generate(),
  'Discover Credit Card': shortId.generate(),
};

function loan(name, id) {
  return {
    id,
    name,
    interestRate: casual.double(0.01, 0.5),
    originalAmount: casual.integer(25, 100000),
    currentAmount: casual.integer(20, 90000),
    startDate: casual.date(dateFormat),
  };
}

module.exports = {
  loanMap,
  loan,
  generateData() {
    return Object.entries(loanMap).map(([name, id]) => loan(name, id));
  },
};
