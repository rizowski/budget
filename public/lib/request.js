import axios from 'axios';

const request = {
  async request(method, url, body) {
    const { data } = await axios[method](url, body);
    console.log(method, url, data);
    if (data.errors && Array.isArray(data.errors)) {
      data.errors.map(e => {
        throw new Error(e.message);
      });
    }

    return data;
  },
  graph(query, variables) {
    return request.request('post', '/graphql', { query, variables });
  },
  getIncome() {
    return request.graph(
      `{
        getIncome {
          id
          payee
          date
          amount
        }
      }`
    );
  },
  getGoals() {
    return request.graph(
      `{
        getGoals {
          id
          name
          priority
          amount
          type
          completed
          category
          objective {
            amount
            maxPerPaycheck
          }
        }
      }`
    );
  },
  getCategories() {
    return request.graph(
      `{
        getCategories{
          id
          name
          priorities
        }
      }`
    );
  },

  getLoans() {
    return request.graph(
      `{
        getLoans {
          id
          name
          currentAmount
          originalAmount
          interestRate
          startDate
        }
      }`
    );
  },

  getBills() {
    return request.graph(
      `{
        getBills {
          id
          name
          amount
          repeats
          startDate
        }
      }`
    );
  },

  createGoal(variables) {
    return request.graph(
      `mutation createGoal($name: String! $amount: Int! $categoryId: ID! $type: GoalType! $objectives: [CreateObjectiveInput!]!) {
        createGoal(input: { name: $name, amount: $amount, categoryId: $categoryId type: $type, objectives: $objectives }) {
          id
        }
      }`,
      variables
    );
  },

  createBill(variables) {
    return request.graph(
      `mutation createBill($name: String! $amount: Int! $repeats: Frequency! $startDate: Date!) {
        createBill(input: { name: $name, amount: $amount, repeats: $repeats, startDate: $startDate }) {
          id
        }
      }`,
      variables
    );
  },

  createCategory(variables) {
    return request.graph(
      `mutation createCategory($name: String! $priorities: [Int!]!){
        createCategory(input: { name: $name, priorities: $priorities }) {
          id
        }
      }`,
      variables
    );
  },

  createIncome(variables) {
    return request.graph(
      `mutation createIncome($amount: Int! $payee: String! $date: Date!) {
        createIncome(input: { amount: $amount, payee: $payee, date: $date }) {
          id
        }
      }`,
      variables
    );
  },

  createLoan(variables) {
    return request.graph(
      `mutation createLoan($name: String! $currentAmount: Int! $originalAmount: Int! $startDate: Date! $interestRate: Float!) {
        createLoan(input: { name: $name, originalAmount: $originalAmount, currentAmount: $currentAmount, startDate: $startDate, interestRate: $interestRate }) {
          id
        }
      }`,
      variables
    );
  },
};

export default request;
