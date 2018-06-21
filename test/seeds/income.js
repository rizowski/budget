const casual = require('casual');
const shortId = require('shortid');
const { dateFormat } = require('./common');

function income() {
  return {
    id: shortId.generate(),
    date: casual.date(dateFormat),
    payee: casual.random_element(['Tashani', 'Colten']),
    amount: casual.integer(500, 3500),
  };
}

module.exports = {
  generateData(num = 20) {
    return Array.from({ length: num }, income);
  },
};
