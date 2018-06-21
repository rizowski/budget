import React from 'react';
import Picker from 'react-datepicker';
import moment from 'moment';

import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

// http://jquense.github.io/react-widgets/api/DateTimePicker/
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const modifiedDate = moment(date).format('YYYY/MM/DD');
    this.props.handleChange({ target: { value: modifiedDate } });
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{this.props.label}</span>
          </div>
          <Picker className="form-control w-100" selected={this.state.startDate} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

DatePicker.defaultProps = {
  label: 'Date',
};

DatePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default DatePicker;
