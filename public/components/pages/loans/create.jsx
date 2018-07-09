import React from 'react';
import get from 'lodash.get';
import Input from '../../inputs/input';
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
      <div>
        <Input id="name" label="Loan" onChange={this.handleChange('name')} placeholder="Chase Credit Card" />
        <Input id="originalAmount" type="number" label="Original Amount" placeholder="300" handleChange={this.handleChange('originalAmount')} />
        <Input id="currentAmount" type="number" label="Current Amount" placeholder="200" handleChange={this.handleChange('currentAmount')} />
        <Input id="interestRate" label="Interest" type="number" placeholder="8.5" onChange={this.handleChange('interestRate')} />
        <DatePicker label="Start Date" id="startDate" handleChange={this.handleChange('startDate')} />
      </div>
    );
  }
}

export default CreateLoan;
