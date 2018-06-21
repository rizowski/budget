import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick();
  }

  get color() {
    const colors = {
      green: 'btn-success',
      blue: 'btn-primary',
      blueOutline: 'btn-outline-primary',
      yellow: 'btn-warning',
      red: 'btn-error',
    };

    const { color } = this.props;

    return colors[color] || colors.blue;
  }

  get classes() {
    return ['btn', this.color].join(' ');
  }

  render() {
    return (
      <p>
        <a className={this.classes} onClick={this.handleClick}>
          {this.props.label}
        </a>
      </p>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Button;
