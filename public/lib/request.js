import axios from 'axios';

const baseUrl = 'http://localhost:3000/graphql';

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
  graph(url, query, variables) {
    return request.request('post', url, { query, variables });
  },
  getIncome() {
    return request.graph(
      baseUrl,
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
      baseUrl,
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
      baseUrl,
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
      baseUrl,
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
      baseUrl,
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
      baseUrl,
      `mutation createGoal($name: String! $amount: Int! $categoryId: ID! $objectives: [CreateObjectiveInput!]!) {
        createGoal(input: { name: $name, amount: $amount, categoryId: $categoryId objectives: $objectives }) {
          id
        }
      }`,
      variables
    );
  },

  createBill(variables) {
    return request.graph(
      baseUrl,
      `mutation createBill($name: String! $payment: Int! $frequency: Frequency! $startDate: Date! $endDate: Date) {
        createBill(input: { name: $name, payment: $payment, frequency: $frequency, startDate: $startDate, endDate: $endDate }) {
          id
        }
      }`,
      variables
    );
  },

  createCategory(variables) {
    return request.graph(
      baseUrl,
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
      baseUrl,
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
      baseUrl,
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
