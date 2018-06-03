const casual = require('casual');
const short = require('shortid');

const categoryMap = {
  Emergency: { priority: 1, id: short.generate() },
  Need: { priority: 2, id: short.generate() },
  Loan: { priority: 3, id: short.generate() },
  Bill: { priority: 4, id: short.generate() },
  Savings: { priority: 5, id: short.generate() },
  'Yearly Bill': { priority: 6, id: short.generate() },
  School: { priority: 7, id: short.generate() },
  Fun: { priority: 8, id: short.generate() },
  Comfort: { priority: 9, id: short.generate() },
  'Nice to Have': { priority: 10, id: short.generate() },
};

function category(name, config) {
  return {
    id: config.id,
    name,
    priorities: [config.priority, casual.random_element([14, 15, 16])],
  };
}

module.exports = {
  categoryMap,
  category,
  generateData() {
    return Object.entries(categoryMap).map(([name, config]) => category(name, config));
  },
};
