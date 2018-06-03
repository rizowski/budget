import React from 'react';
import orderBy from 'lodash.orderby';
import TableHeaders from '../../table-headers';
import request from '../../../lib/request';
import DatePicker from '../../datepicker';

class BillsPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      headers: ['Name', 'Payment Amount', 'Frequency', 'Month Due', 'Date Due', 'Start Date'],
      bills: [],
    };
  }

  async componentDidMount() {
    try {
      const { data } = await request.getBills();

      const sorted = orderBy(data.getBills, 'due.date', 'name');

      this.setState({ bills: sorted });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  renderError() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          <strong>Error:</strong> {this.state.error.message}
        </div>
      );
    }
  }

  getTableRows(bills) {
    return bills.map(b => {
      return (
        <tr key={b.id}>
          <th scope="row">{b.name}</th>
          <td>${b.payment}</td>
          <td>{b.frequency}</td>
          <td>{b.due.month}</td>
          <td>{b.due.date}</td>
          <td>{b.startDate}</td>
        </tr>
      );
    });
  }

  handleChange(key) {
    return event => {
      const { value } = event.target;

      this.setState({ [key]: value });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, payment, frequency, startDate, endDate } = this.state;
    const payload = {
      name,
      payment,
      frequency,
      startDate,
      endDate,
    };

    return request.createBill(payload);
  }

  /* Coming up list and calendar */
  render() {
    return (
      <div className="row">
        <p>
          <a className="btn btn-outline-primary" data-toggle="collapse" href="#create-bill" role="button">
            Create
          </a>
        </p>
        <div className="collapse multi-collapse container" id="create-bill">
          <form className="shadow-sm p-3 mb-5 bg-grey rounded create-bill" onSubmit={this.handleSubmit}>
            <h3>Create Bill</h3>
            <div className="form-group">
              <label htmlFor="bill-name">Bill Name</label>
              <input id="bill-name" onChange={this.handleChange('name')} type="text" className="form-control" placeholder="Chase Credit Card" />
            </div>
            <div className="form-group">
              <label htmlFor="paymentAmount">Payment Amount</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" onChange={this.handleChange('payment')} className="form-control" placeholder="55.00" />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="frequency">
                    Frequency
                  </label>
                </div>
                <select className="custom-select" id="frequency" onChange={this.handleChange('frequency')}>
                  <option disabled selected>
                    Select One
                  </option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <DatePicker id="startDate" handleChange={this.handleChange('startDate')} />
            </div>
            <button type="submit" className="btn btn-success">
              Create Bill
            </button>
          </form>
        </div>
        <table className="table table-striped border">
          <TableHeaders headers={this.state.headers} />
          <tbody>{this.getTableRows(this.state.bills)}</tbody>
        </table>
      </div>
    );
  }
}

export default BillsPage;
