import React from 'react';
import orderBy from 'lodash.orderby';
import get from 'lodash.get';
import moment from 'moment';

import Table from '../../table';
import request from '../../../lib/request';
import DatePicker from '../../inputs/datepicker';
import SelectInput from '../../inputs/select';

class BillsPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      headers: ['Name', 'Payment Amount', 'Frequency', 'Month Due', 'Date Due', 'Start Date'],
      bills: [],
    };
  }

  get options() {
    return [
      {
        key: 'MONTHLY',
        displayValue: 'Monthly',
      },
      {
        key: 'YEARLY',
        displayValue: 'Yearly',
      },
    ];
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
      const momentDate = moment(b.startDate);
      const monthDue = momentDate.format('MMMM');
      const dateDue = momentDate.format('DD');
      return (
        <tr key={b.id}>
          <th scope="row">{b.name}</th>
          <td>${b.amount}</td>
          <td>{b.repeats}</td>
          <td>{monthDue}</td>
          <td>{dateDue}</td>
          <td>{b.startDate}</td>
        </tr>
      );
    });
  }

  handleChange(key) {
    return event => {
      this.setState({ [key]: get(event, 'target.value', event) });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, payment, repeats, startDate } = this.state;
    const payload = {
      name,
      payment,
      repeats,
      startDate,
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
            <SelectInput label="Frequency" options={this.options} handleChange={this.handleChange('repeat')} />
            <DatePicker label="Start Date" id="startDate" handleChange={this.handleChange('startDate')} />
            <button type="submit" className="btn btn-success">
              Create Bill
            </button>
          </form>
        </div>
        <Table headers={this.state.headers}>{this.getTableRows(this.state.bills)}</Table>
      </div>
    );
  }
}

export default BillsPage;
