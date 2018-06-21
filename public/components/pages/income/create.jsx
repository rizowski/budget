import React from 'react';
import get from 'lodash.get';
import moment from 'moment';
import SelectInput from '../../inputs/select';
import DatePicker from '../../inputs/datepicker';
import MoneyInput from '../../inputs/money';

class CreateIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('MM/DD/YYYY'),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get options() {
    return [{ key: 'COLTEN', displayValue: 'Colten' }, { key: 'TASHANI', displayValue: 'Tashani' }];
  }

  handleChange(thing) {
    return event => {
      const val = get(event, 'target.value', event);
      this.setState({
        [thing]: val,
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Called');
    this.props.handleSubmit({
      payee: this.state.payee,
      amount: Number(this.state.amount),
      date: this.state.date,
    });
  }

  render() {
    return (
      <form className="p-3 bg-grey rounded create-income" onSubmit={this.handleSubmit}>
        <h3>Create Income</h3>
        <MoneyInput handleChange={this.handleChange('amount')} placeholder="100.00" />
        <div className="row">
          <div className="col">
            <SelectInput label="Payee" options={this.options} handleChange={this.handleChange('payee')} />
          </div>
          <div className="col">
            <DatePicker label="Date" handleChange={this.handleChange('date')} />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  }
}

export default CreateIncome;
