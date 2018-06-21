const casual = require('casual');
const shortId = require('shortid');

const dateFormat = 'YYYY/MM/DD';

const billMap = {
  'Rocky Mountain Power': shortId.generate(),
  'Dominion Energy': shortId.generate(),
  'Comcast Internet': shortId.generate(),
  'Water Company': shortId.generate(),
  'Sofi Student Loans': shortId.generate(),
  'Personal Loan': shortId.generate(),
  'Chase Credit Card': shortId.generate(),
};

function bill(name, id) {
  return {
    id,
    name,
    amount: casual.integer(25, 500),
    repeats: casual.random_element(['MONTHLY', 'YEARLY']),
    startDate: casual.date(dateFormat),
  };
}

module.exports = {
  billMap,
  bill,
  generateData() {
    return Object.entries(billMap).map(([name, id]) => bill(name, id));
  },
};
