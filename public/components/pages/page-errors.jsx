import React from 'react';
import PropTypes from 'prop-types';

class PageErrors extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    // Display fallback UI
    this.setState({
      hasError: true,
      stack: error.stack,
    });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger">
          <strong>Render Error:</strong>
          {this.state.stack}
        </div>
      );
    }

    return this.props.children;
  }
}

PageErrors.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default PageErrors;
