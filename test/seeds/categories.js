const casual = require('casual');

function category() {
  return {
    name: casual.random_element(['Emergency', 'Need', 'Nice To Have']),
    priorities: [
      casual.random_element([1, 2, 3]),
      casual.random_element([1, 2, 3]),
    ],
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
