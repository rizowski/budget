import React from 'react';
import request from '../../../lib/request';
import Table from '../../table';
import CreateIncome from './create';
import Modal from '../../modal';
import ButtonLink from '../../inputs/button-link';

class Income extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      income: [],
      headers: ['Date', 'Payee', 'Amount'],
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  createRows(income) {
    return income.map(i => {
      return (
        <tr key={i.id}>
          <td>{i.date}</td>
          <th scope="row">{i.payee}</th>
          <td>${i.amount}</td>
        </tr>
      );
    });
  }

  async createIncome(data) {
    console.log('received');
    await request.createIncome(data);
    this.setState({ modalOpen: false });
    console.log('Model should close');
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    if (this.state.error) {
      return this.renderError(this.state.error);
    }

    return (
      <div className="row">
        <div className="row">
          <div className="col">
            <ButtonLink label="Create" color="blueOutline" handleClick={this.openModal} />
          </div>
        </div>

        <Modal isOpen={this.state.modalOpen} onClose={this.closeModal}>
          <CreateIncome handleSubmit={this.createIncome} />
        </Modal>

        <Table headers={this.state.headers}>{this.createRows(this.state.income)}</Table>
      </div>
    );
  }
}

export default Income;
