const casual = require('casual');
const shortId = require('shortid');

function goal() {
  return {
    id: shortId.generate(),
    categoryId: casual.random_element(['id-1234', 'id-4325', 'id-0234']),
    name: casual.name,
    objectives: [
      {
        amount: casual.integer(0, 1000),
        maxPerPaycheck: casual.integer(0, 500),
      },
      {
        amount: casual.integer(1500, 2000),
        maxPerPaycheck: casual.integer(0, 250),
      },
    ],
  };
}

module.exports = {
  generateData(num = 20) {
    return [...'x'.repeat(num)].map(goal);
  },
};
