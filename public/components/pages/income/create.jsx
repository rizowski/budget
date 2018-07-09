import React from 'react';
import get from 'lodash.get';
import SelectInput from '../../inputs/select';
import DatePicker from '../../inputs/datepicker';
import Input from '../../inputs/input';

class CreateIncome extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  get options() {
    return [{ id: 'COLTEN', value: 'Colten' }, { id: 'TASHANI', value: 'Tashani' }];
  }

  handleChange(thing) {
    return event => {
      const val = get(event, 'target.value', event);
      this.props.handleChange({ key: thing, value: val });
    };
  }

  render() {
    return (
      <div>
        <Input id="amount" label="Amount" type="money" handleChange={this.handleChange('amount')} placeholder="100.00" />
        <br />
        <SelectInput id="payee" label="Payee" options={this.options} handleChange={this.handleChange('payee')} />
        <br />
        <DatePicker label="Date" handleChange={this.handleChange('date')} />
      </div>
    );
  }
}

export default CreateIncome;
