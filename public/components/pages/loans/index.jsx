import React from 'react';
import request from '../../../lib/request';
import Table from '../../table';
import Modal from '../../modal';
import CreateLoan from './create';
import ButtonLink from '../../inputs/button-link';

class LoansPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loans: [],
      headers: ['name', 'currentAmount', 'originalAmount', 'startDate', 'interestRate'],
      modalOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createLoan = this.createLoan.bind(this);
  }

  async componentDidMount() {
    const { data } = await request.getLoans();

    this.setState({ loans: data.getLoans });
  }

  getTableRows(loans) {
    return loans.map(l => {
      const [rate] = (l.interestRate * 100).toString().split('.');
      return (
        <tr key={l.id}>
          <td>{l.name}</td>
          <td>${l.currentAmount}</td>
          <td>${l.originalAmount}</td>
          <td>{l.startDate}</td>
          <td>{rate}%</td>
        </tr>
      );
    });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  async createLoan(data) {
    await request.createLoan(data);
    this.closeModal();
  }

  render() {
    return (
      <div className="row">
        <ButtonLink label="Create" color="blueOutline" handleClick={this.openModal} />
        <Modal isOpen={this.state.modalOpen} onClose={this.closeModal}>
          <CreateLoan handleSubmit={this.createLoan} />
        </Modal>
        <Table headers={this.state.headers}>{this.getTableRows(this.state.loans)}</Table>
      </div>
    );
  }
}

export default LoansPage;
