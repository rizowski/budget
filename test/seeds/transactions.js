const casual = require('casual');
const shortId = require('shortid');

function transaction() {
  return {
    id: shortId.generate(),
    type: casual.name,
    amount: casual.integer(1, 50),
    occurredOn: casual.date('MM/DD/YYYY'),
  };
}

module.exports = {
  generateData(num = 50) {
    return [...'x'.repeat(num)].map(transaction);
  },
};
