import React from 'react';
import orderBy from 'lodash.orderby';
import get from 'lodash.get';
import moment from 'moment';

import Page from '../page';
import Table from '../../table';
import request from '../../../lib/request';
import Modal from '../../modal';
import ButtonLink from '../../inputs/button-link';
import CreateBill from './create';

class BillsPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      tableConfig: [
        { path: 'name', header: 'Name' },
        { path: 'amount', header: 'Payment Amount' },
        { path: 'repeats', header: 'Frequency' },
        { path: 'monthDue', header: 'Month Due' },
        { path: 'dateDue', header: 'Date Due' },
        { path: 'startDate', header: 'Start Date' },
      ],
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

  getTableData(bills) {
    return bills.map(b => {
      const momentDate = moment(b.startDate, 'YYYY-MM-DD');
      const monthDue = momentDate.format('MMMM');
      const dateDue = momentDate.format('DD');

      return { ...b, monthDue, dateDue };
    });
  }

  handleChange(key) {
    return event => {
      this.setState({ [key]: get(event, 'target.value', event) });
    };
  }

  async handleSubmit(event) {
    const { data } = await request.createBill(event);
    const { startDate, ...rest } = event;
    this.setState(old => {
      return {
        bills: old.bills.concat({ id: data.createBill.id, startDate: moment(startDate, 'YYYY-MM-DD').format('MM/DD/YYYY'), ...rest }),
      };
    });
  }

  /* Coming up list and calendar */
  render() {
    return (
      <Page create={CreateBill} onCreateSubmit={this.handleSubmit}>
        <Table config={this.state.tableConfig} objects={this.getTableData(this.state.bills)} />
      </Page>
    );
  }
}

export default BillsPage;
