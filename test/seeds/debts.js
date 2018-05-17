const casual = require('casual');
const shortId = require('shortid');

function debt() {
  return {
    id: shortId.generate(),
    priority: casual.random_element([1, 2, 3, 4, 5]),
    interest: casual.random,
    lender: casual.company_name,
    dateLoaned: casual.date('MM-DD-YYYY'),
    amount: {
      current: casual.integer(0, 5000),
      original: casual.integer(5000, 10000),
    },
    payment: {
      original: casual.integer(10, 250),
      current: casual.integer(3, 300),
    },
    history: [
      {
        date: casual.date('MM-DD-YYYY'),
        amount: casual.integer(0, 300),
      },
      {
        date: casual.date('MM-DD-YYYY'),
        amount: casual.integer(0, 300),
      },
    ],
  };
}

module.exports = {
  generateData(num = 10) {
    return [...'x'.repeat(num)].map(debt);
  },
};
