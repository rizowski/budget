import React from 'react';
import request from '../../lib/request';
import TableHeaders from '../table-headers';

class Income extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      income: [],
      headers: ['Payee', 'Amount', 'Date'],
    };
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

  createRows(income) {
    return income.map(i => {
      return (
        <tr key={i.id}>
          <th scope="row">{i.payee}</th>
          <td>${i.amount}</td>
          <td>{i.date}</td>
        </tr>
      );
    });
  }

  render() {
    if (this.state.error) {
      return this.renderError(this.state.error);
    }

    return (
      <table className="table table-striped">
        <TableHeaders headers={this.state.headers} />
        <tbody>{this.createRows(this.state.income)}</tbody>
      </table>
    );
  }
}

export default Income;
