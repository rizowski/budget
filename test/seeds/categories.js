const casual = require('casual');

const nameMap = {
  Emergency: 1,
  Need: 2,
  Loan: 3,
  Bill: 4,
  Savings: 5,
  'Yearly Bill': 6,
  School: 7,
  Fun: 8,
  Comfort: 9,
  'Nice to Have': 10,
};

function category() {
  const name = casual.random_element(Object.keys(nameMap));

  return {
    name,
    priorities: [nameMap[name], casual.random_element([4, 5, 6])],
  };
}

module.exports = {
  category,
  generateData() {
    const cat1 = category();
    cat1.id = 'id-1234';
    const cat2 = category();
    cat2.id = 'id-4325';
    const cat3 = category();
    cat3.id = 'id-0234';

    return [cat1, cat2, cat3];
  },
};
