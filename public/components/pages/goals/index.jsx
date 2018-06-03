import React from 'react';
import request from '../../../lib/request';
import TableHeaders from '../../table-headers';
import CreateGoal from './create-goal';
import CreateCategory from './create-category';

class Goals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
      headers: ['Priority', 'Category', 'Name', 'Current Amount', 'Target Amount', 'Max Per Paycheck'],
    };
  }

  async componentDidMount() {
    const { data } = await request.getGoals();

    this.setState({ goals: data.getGoals });
  }

  getTableRows(goals) {
    return goals.map(g => {
      // const complete = g.completed;
      // const completeClass = complete ? 'completed-goal' : '';
      return (
        <tr key={g.id}>
          <th scope="row">{g.priority}</th>
          <td>{g.category}</td>
          <td>{g.name}</td>
          <td>${g.amount}</td>
          <td>${g.objective.amount}</td>
          <td>${g.objective.maxPerPaycheck}</td>
        </tr>
      );
    });
  }

  render() {
    // TODO: How can I get TableBody to update when data comes in?
    const { goals, headers } = this.state;
    return (
      <div className="row">
        <div className="row">
          <div className="col">
            <p>
              <a className="btn btn-outline-primary" data-toggle="collapse" href="#create-goal" role="button">
                Create Goal
              </a>
            </p>
          </div>
          <div className="col">
            <p>
              <a className="btn btn-outline-primary" data-toggle="collapse" href="#create-category" role="button">
                Create Category
              </a>
            </p>
          </div>
        </div>
        <div className="row w-100">
          <div className="collapse multi-collapse container w-100" id="create-goal">
            <CreateGoal goals={this.state.goals} />
          </div>
          <div className="collapse multi-collapse container" id="create-category">
            <CreateCategory />
          </div>
        </div>

        <table className="table table-striped border">
          <TableHeaders headers={headers} />
          <tbody>{this.getTableRows(goals)}</tbody>
        </table>
      </div>
    );
  }
}

export default Goals;
