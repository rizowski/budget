import React from 'react';
import get from 'lodash.get';
import MoneyInput from '../../inputs/money';
import DatePicker from '../../inputs/datepicker';

class CreateLoan extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(thing) {
    return event => {
      this.setState({
        [thing]: get(event, 'target.value', event),
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, currentAmount, originalAmount, startDate, interestRate } = this.state;
    this.props.handleSubmit({
      name,
      currentAmount,
      originalAmount,
      startDate,
      interestRate,
    });
  }

  render() {
    return (
      <form className="shadow-sm p-3 mb-5 bg-grey rounded create-loan" onSubmit={this.handleSubmit}>
        <h3>Create</h3>
        <div className="form-group">
          <label htmlFor="name">Bill Name</label>
          <input id="name" onChange={this.handleChange('name')} type="text" className="form-control" placeholder="Chase Credit Card" />
        </div>
        <MoneyInput label="Original Amount" handleChange={this.handleChange('originalAmount')} />
        <MoneyInput label="Current Amount" handleChange={this.handleChange('currentAmount')} />
        <input type="text" placeholder="interest" onChange={this.handleChange('interestRate')} />
        <DatePicker label="Start Date" id="startDate" handleChange={this.handleChange('startDate')} />
        <button type="submit" className="btn btn-success">
          Create Bill
        </button>
      </form>
    );
  }
}

export default CreateLoan;
