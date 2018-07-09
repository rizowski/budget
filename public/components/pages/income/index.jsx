import React from 'react';
import request from '../../../lib/request';
import Table from '../../table';
import Page from '../page';
import CreateIncome from './create';

// TODO: https://github.com/clauderic/react-sortable-hoc
class Income extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      income: [],
      tableConfig: [{ path: 'date', header: 'Date' }, { path: 'payee', header: 'Payee' }, { path: 'amount', header: 'Amount' }],
    };
    this.createIncome = this.createIncome.bind(this);
    this.deleteIncome = this.deleteIncome.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await request.getIncome();
      console.log(data);

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

  deleteIncome(id) {
    this.setState(old => {
      return {
        income: old.income.filter(b => {
          return b.id !== id;
        }),
      };
    });
  }

  async createIncome(payload) {
    await request.createIncome(payload);
    const { data } = await request.getIncome();

    this.setState({ income: data.getIncome });
  }

  render() {
    if (this.state.error) {
      return this.renderError(this.state.error);
    }

    return (
      <Page thing="Income" create={CreateIncome} onCreateSubmit={this.createIncome}>
        <Table config={this.state.tableConfig} objects={this.getTableData(this.state.income)} handleDelete={this.deleteIncome} />
      </Page>
    );
  }
}

export default Income;
