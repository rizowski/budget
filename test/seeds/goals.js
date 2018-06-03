const casual = require('casual');
const shortId = require('shortid');
const categories = require('./categories');

const categoryIds = Object.entries(categories.categoryMap).map(([, config]) => {
  return config.id;
});
console.log('CategoryIds', categoryIds);

function goal() {
  return {
    id: shortId.generate(),
    categoryId: casual.random_element(categoryIds),
    name: casual.random_element([
      'Date Fund',
      'Emergency Fund',
      'Groceries',
      'Gas',
      'Electric',
      'Rent',
      'Car Repair',
      'Car Tires',
      'Dog',
      'Student Loans',
      'Phone Bill',
      'Vacation',
      'Storage Unit',
      'Costco',
      'Clothes',
      'Credit Card',
      'Audible',
      'Amazon Prime',
      'Discord',
      'Savings',
      'Dollar Shave Club',
    ]),
    amount: casual.integer(0, 2600),
    objectives: [
      {
        amount: casual.integer(0, 1000),
        maxPerPaycheck: casual.integer(0, 500),
      },
      {
        amount: casual.integer(1000, 4000),
        maxPerPaycheck: casual.integer(0, 250),
      },
    ],
  };
}

module.exports = {
  generateData(num = 15) {
    return [...'x'.repeat(num)].map(goal);
  },
};
