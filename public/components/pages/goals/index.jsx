import React from 'react';
import request from '../../../lib/request';
import Table from '../../table';
import CreateGoal from './create';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoalSubmit = this.handleGoalSubmit.bind(this);

    this.state = {
      goals: [],
      headers: ['Priority', 'Category', 'Name', 'Type', 'Current Amount', 'Target Amount', 'Max Per Paycheck'],
    };
  }

  async componentDidMount() {
    const { data } = await request.getGoals();

    this.setState({ goals: data.getGoals });
  }

  async handleGoalSubmit(payload) {
    await request.createGoal(payload);
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
          <td>{g.type}</td>
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
            {/* <Button label="Create Goal" color="blueOutline" handleClick={}/> */}
            {/* <Button label="Create Category" color="blueOutline" handleClick={}/> */}
            <p>
              <a className="btn btn-outline-primary" data-toggle="collapse" href="#create-goal" role="button">
                Create
              </a>
            </p>
          </div>
        </div>
        <div className="row w-100">
          <div className="collapse multi-collapse container w-100" id="create-goal">
            <CreateGoal goals={this.state.goals} categories={this.state.categories} handleSubmit={this.handleGoalSubmit} />
          </div>
        </div>

        <Table headers={headers}>{this.getTableRows(goals)}</Table>
      </div>
    );
  }
}

export default Goals;
