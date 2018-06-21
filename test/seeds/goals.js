const casual = require('casual');
const shortId = require('shortid');
const categories = require('./categories');
const bills = require('./bills');

const categoryIds = Object.entries(categories.categoryMap).map(([, config]) => {
  return config.id;
});
const billIds = Object.entries(bills.billMap).map(([, id]) => {
  return id;
});

function goal() {
  const goal = {
    id: shortId.generate(),
    type: casual.random_element(['BILL', 'LOAN', 'SAVINGS']),
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

  if (goal.type === 'BILL') {
    goal.billId = casual.random_element(billIds);
  } else if (goal.type === 'LOAN') {
    goal.loanId = null; //TODO
  }

  return goal;
}

module.exports = {
  generateData(num = 15) {
    return [...'x'.repeat(num)].map(goal);
  },
};
