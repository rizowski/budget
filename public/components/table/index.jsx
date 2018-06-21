import React from 'react';
import PropTypes from 'prop-types';

import Headers from './table-headers';

class Table extends React.Component {
  render() {
    return (
      <table className="table table-striped border">
        <Headers headers={this.props.headers} />
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  children: [],
};

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Table;
