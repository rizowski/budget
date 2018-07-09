import React from 'react';
import request from '../../../lib/request';
import Page from '../page';
import Table from '../../table';
import CreateLoan from './create';

class LoansPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loans: [],
      tableConfig: [
        { path: 'name', header: 'Name' },
        { path: 'currentAmount', header: 'Current Amount' },
        { path: 'originalAmount', header: 'Original Amount' },
        { path: 'startDate', header: 'Start Date' },
        { path: 'interestRate', header: 'Interest Rate' },
      ],
    };
    this.createLoan = this.createLoan.bind(this);
    this.deleteLoan = this.deleteLoan.bind(this);
  }

  async componentDidMount() {
    const { data } = await request.getLoans();

    this.setState({ loans: data.getLoans });
  }

  getTableData(loans) {
    return loans.map(l => {
      const [interestRate] = (l.interestRate * 100).toString().split('.');
      return { ...l, interestRate };
    });
  }

  async createLoan(data) {
    await request.createLoan(data);
  }

  deleteLoan(id) {
    this.setState(old => {
      return {
        income: old.income.filter(b => {
          return b.id !== id;
        }),
      };
    });
  }

  render() {
    return (
      <Page thing="Loan" create={CreateLoan} onCreateSubmit={this.createLoan}>
        <Table config={this.state.tableConfig} objects={this.getTableData(this.state.loans)} handleDelete={this.deleteLoan} />
      </Page>
    );
  }
}

export default LoansPage;
