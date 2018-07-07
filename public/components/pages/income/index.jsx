import React from 'react';
import request from '../../../lib/request';
import Table from '../../table';
import Page from '../page';
import CreateIncome from './create';

class Income extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      income: [],
      tableConfig: [{ path: 'date', header: 'Date' }, { path: 'payee', header: 'Payee' }, { path: 'amount', header: 'Amount' }],
    };
    this.createIncome = this.createIncome.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await request.getIncome();

      this.setState({ income: data.getIncome });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  renderError(error) {
    return (
      <div className="alert alert-danger">
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  getTableData(income) {
    return income;
  }

  async createIncome(data) {
    await request.createIncome(data);
  }

  render() {
    if (this.state.error) {
      return this.renderError(this.state.error);
    }

    return (
      <Page create={CreateIncome} onCreateSubmit={this.createIncome}>
        <Table config={this.state.tableConfig} objects={this.getTableData(this.state.income)} />
      </Page>
    );
  }
}

export default Income;
