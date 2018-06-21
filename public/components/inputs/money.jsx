import React from 'react';
import PropTypes from 'prop-types';

class MoneyInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  get appendDecimal() {
    if (!this.props.appendDecimal) {
      return null;
    }

    return (
      <div className="input-group-append">
        <span className="input-group-text">.{this.props.decimalAmount}</span>
      </div>
    );
  }

  handleChange(event) {
    const { value } = event.target;
    this.props.handleChange(value);
  }

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">$</span>
        </div>
        <input type="text" onChange={this.handleChange} className="form-control" placeholder={this.props.placeholder} />
        {this.appendDecimal}
      </div>
    );
  }
}

MoneyInput.defaultProps = {
  decimalAmount: '00',
  appendDecimal: false,
  placeholder: '10',
};

MoneyInput.propTypes = {
  decimalAmount: PropTypes.string,
  appendDecimal: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default MoneyInput;
