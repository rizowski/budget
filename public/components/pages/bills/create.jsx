import React from 'react';
import get from 'lodash.get';
import SelectInput from '../../inputs/select';
import DatePicker from '../../inputs/datepicker';
import Input from '../../inputs/input';

class CreateBill extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(thing) {
    return event => {
      this.props.handleChange({ key: thing, value: get(event, 'target.value', event) });
    };
  }

  get options() {
    return [
      {
        id: 'MONTHLY',
        value: 'Monthly',
      },
      {
        id: 'YEARLY',
        value: 'Yearly',
      },
    ];
  }

  render() {
    return (
      <div>
        <Input id="billName" label="Bill Name" handleChange={this.handleChange('name')} placeholder="Chase Credit Card" />
        <br />
        <Input id="paymentAmount" label="Payment Amount" handleChange={this.handleChange('amount')} placeholder="55.00" />
        <br />
        <SelectInput id="frequency" label="Frequency" options={this.options} handleChange={this.handleChange('repeats')} />
        <br />
        <DatePicker label="Start Date" id="startDate" handleChange={this.handleChange('startDate')} />
      </div>
    );
  }
}

export default CreateBill;
