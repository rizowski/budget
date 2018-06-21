import React from 'react';
import propTypes from 'prop-types';

class TableHeaders extends React.Component {
  createHeaders(headers) {
    return headers.map(header => {
      return (
        <th key={header} scope="col">
          {header}
        </th>
      );
    });
  }

  render() {
    return (
      <thead>
        <tr>{this.createHeaders(this.props.headers)}</tr>
      </thead>
    );
  }
}

TableHeaders.defaultProps = {
  headers: [],
};

TableHeaders.propTypes = {
  headers: propTypes.array,
};

export default TableHeaders;
