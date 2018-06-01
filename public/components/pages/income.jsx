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
    const { data } = await request.getIncome();

    this.setState({ income: data.getIncome });
  }

  render() {
    const createRows = income => {
      return income.map(i => {
        return (
          <tr key={i.id}>
            <th scope="row">{i.payee}</th>
            <td>{i.amount}</td>
            <td>{i.date}</td>
          </tr>
        );
      });
    };

    return (
      <table className="table table-striped">
        <TableHeaders headers={this.state.headers} />
        <tbody>{createRows(this.state.income)}</tbody>
      </table>
    );
  }
}

export default Income;
