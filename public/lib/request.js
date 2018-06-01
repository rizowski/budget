import axios from 'axios';

const baseUrl = 'http://localhost:3000/graphql';

const request = {
  async request(method, url, body) {
    const { data } = await axios[method](url, body);
    console.log(method, url, data);

    return data;
  },
  graph(url, query, variables) {
    return request.request('post', url, { query, variables });
  },
  getIncome() {
    request.graph(
      baseUrl,
      `
          {
            getIncome {
              id
              payee
              date
              amount
            }
          }
        `
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

  createGoal(variables) {
    return request.graph(
      baseUrl,
      `
      mutation createGoal($name: String! $amount: Int! $categoryId: ID!){
        createGoal(input: { name: $name, amount: $amount, categoryId: $categoryId }){
          id
        }
      }
    `,
      variables
    );
  },
};

export default request;
