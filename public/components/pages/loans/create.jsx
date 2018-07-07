import React from 'react';
import get from 'lodash.get';
import MoneyInput from '../../inputs/money';
import DatePicker from '../../inputs/datepicker';

class CreateLoan extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(thing) {
    return event => {
      this.props.handleChange({ key: thing, value: get(event, 'target.value', event) });
    };
  }

  render() {
    return (
      <form>
        <input id="name" onChange={this.handleChange('name')} type="text" placeholder="Chase Credit Card" />
        <MoneyInput label="Original Amount" handleChange={this.handleChange('originalAmount')} />
        <MoneyInput label="Current Amount" handleChange={this.handleChange('currentAmount')} />
        <input className="form-control" type="text" placeholder="interest" onChange={this.handleChange('interestRate')} />
        <DatePicker label="Start Date" id="startDate" handleChange={this.handleChange('startDate')} />
      </form>
    );
  }
}

export default CreateLoan;
