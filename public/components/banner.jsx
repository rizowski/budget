import React from 'react';
import PropTypes from 'prop-types';

/*

<div class="alert alert-success">
  <strong>Success!</strong> Indicates a successful or positive action.
</div>

<div class="alert alert-info">
  <strong>Info!</strong> Indicates a neutral informative change or action.
</div>

<div class="alert alert-warning">
  <strong>Warning!</strong> Indicates a warning that might need attention.
</div>

<div class="alert alert-danger">
  <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
</div>

*/

class Banner extends React.Component {
  getClasses() {
    return `alert alert-${this.props.level}`;
  }

  render() {
    if (!this.props.level) {
      return null;
    }

    return (
      <div className={this.getClasses()} role="alert">
        <h1>{this.props.title}</h1>
        {this.props.message}
      </div>
    );
  }
}

Banner.defaultProps = {
  level: null,
};

Banner.propTypes = {
  level: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Banner;
