import React from 'react';
import PropTypes from 'prop-types';

class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'Select One',
    };
  }

  get options() {
    const options = this.props.options.map(o => {
      return <option key={o.key}>{o.displayValue}</option>;
    });

    return [
      <option key="1" disabled>
        Select One
      </option>,
      ...options,
    ];
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.handleChange(event.target.value);
  }

  render() {
    return (
      <div className="form-group">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              {this.props.label}
            </label>
          </div>
          <select value={this.state.value} className="custom-select" disabled={this.props.disabled} onChange={this.handleChange}>
            {this.options}
          </select>
        </div>
      </div>
    );
  }
}

SelectInput.defaultProps = {
  options: [],
  disabled: false,
};

SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default SelectInput;
