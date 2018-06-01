const casual = require('casual');
const shortId = require('shortid');

function bill() {
  return {
    id: shortId.generate(),
    name: casual.random_element([
      'Rocky Mountain Power',
      'Dominion Energy',
      'Comcast Internet',
      'Water Company',
      'Sofi Student Loans',
      'Personal Loan',
      'Chase Credit Card',
    ]),
    payment: casual.integer(25, 500),
    frequency: casual.random_element(['MONTHLY', 'YEARLY']),
    startDate: casual.date('YYYY-MM-DD'),
    endDate: casual.random_element([casual.date('YYYY-MM-DD'), undefined, undefined, undefined, casual.date('YYYY-MM-DD')]),
  };
}

module.exports = {
  generateData(num = 10) {
    return Array.from({ length: num }, bill);
  },
};
