import React from 'react';

import Table from '../../table';
import request from '../../../lib/request';
import CreateGoal from './create';
import Page from '../page';

class Goals extends React.Component {
  constructor(props) {
    super(props);

    this.handleGoalSubmit = this.handleGoalSubmit.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);

    this.state = {
      goals: [],
      tableConfig: [
        { path: 'priority', header: 'Priority' },
        { path: 'category', header: 'Category' },
        { path: 'name', header: 'Name' },
        { path: 'type', header: 'Type' },
        { path: 'amount', header: 'Current Amount' },
        { path: 'objective.amount', header: 'Target Amount' },
        { path: 'objective.maxPerPaycheck', header: 'Max Per Paycheck' },
      ],
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

  deleteGoal(id) {
    this.setState(old => {
      return {
        goals: old.goals.filter(b => {
          return b.id !== id;
        }),
      };
    });
  }

  getTableData(goals) {
    return goals;
  }

  render() {
    const { goals } = this.state;

    return (
      <Page thing="Goal" create={CreateGoal} onCreateSubmit={this.handleGoalSubmit}>
        <Table config={this.state.tableConfig} objects={this.getTableData(goals)} handleDelete={this.deleteGoal} />
      </Page>
    );
  }
}

export default Goals;
