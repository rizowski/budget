import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Page from '../page';
import Table from '../../table';
import request from '../../../lib/request';
import CreateCategory from './create';

const styles = {};

class GoalCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      tableConfig: [{ path: 'name', header: 'Name' }, { path: 'priorityList', header: 'Priorities' }],
    };

    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
  }

  async handleCreateSubmit(payload) {
    console.log(payload);
    await request.createCategory(payload);
    const { data } = await request.getCategories();

    this.setState({ categories: data.getCategories });
  }

  getTableData(categories) {
    return categories.map(c => {
      return { ...c, priorityList: c.priorities.join(', ') };
    });
  }

  async componentDidMount() {
    const { data } = await request.getCategories();

    this.setState({ categories: data.getCategories });
  }

  render() {
    const { categories, tableConfig } = this.state;
    return (
      <Page create={CreateCategory} onCreateSubmit={this.handleCreateSubmit}>
        <Table config={tableConfig} objects={this.getTableData(categories)} />
      </Page>
    );
  }
}

export default withStyles(styles)(GoalCategories);
