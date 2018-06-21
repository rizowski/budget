import React from 'react';

import Table from '../../table';
import request from '../../../lib/request';
import CreateCategory from './create';

class GoalCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      headers: ['Name', 'Priorities'],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(payload) {
    await request.createCategory(payload);
    const { data } = await request.getCategories();

    this.setState({ categories: data.getCategories });
  }

  getTableRows(categories) {
    return categories.map(c => {
      return (
        <tr key={c.id}>
          <td>{c.name}</td>
          <td>{c.priorities.join(', ')}</td>
        </tr>
      );
    });
  }

  async componentDidMount() {
    const { data } = await request.getCategories();

    this.setState({ categories: data.getCategories });
  }

  render() {
    const { categories, headers } = this.state;
    return (
      <div className="row">
        <div className="row">
          {/* <Button label="Create Category" color="blueOutline" handleClick={}/> */}
          <div className="col">
            <p>
              <a className="btn btn-outline-primary" data-toggle="collapse" href="#create-category" role="button">
                Create
              </a>
            </p>
          </div>
        </div>
        <div className="collapse multi-collapse container" id="create-category">
          <CreateCategory handleSubmit={this.handleSubmit} categories={this.state.categories} />
        </div>

        <Table headers={headers}>{this.getTableRows(categories)}</Table>
      </div>
    );
  }
}

export default GoalCategories;
