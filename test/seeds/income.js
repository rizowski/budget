const casual = require('casual');
const shortId = require('shortid');

function income() {
  return {
    id: shortId.generate(),
    date: casual.date('MM/DD/YYYY'),
    payee: casual.full_name,
    amount: casual.integer(500, 3500),
  };
}

module.exports = {
  generateData(num = 20) {
    return [...'x'.repeat(num)].map(income);
  },
};
