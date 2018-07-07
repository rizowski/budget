import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import get from 'lodash.get';

const styles = {
  table: {
    minWidth: 700,
  },
};

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.paths = props.config.map(({ path }) => {
      return path;
    });
  }

  get headers() {
    const { config } = this.props;

    return config.map(({ header }) => {
      return <TableCell key={header}>{header}</TableCell>;
    });
  }

  get rows() {
    const { objects } = this.props;

    return objects.map((o, index) => {
      const tableCells = this.paths.map(p => {
        return <TableCell key={p}>{get(o, p)}</TableCell>;
      });
      return <TableRow key={o.id || index}>{tableCells}</TableRow>;
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{this.headers}</TableRow>
        </TableHead>
        <TableBody>{this.rows}</TableBody>
      </Table>
    );
  }
}

Table.defaultProps = {
  data: [],
  headers: [],
};

Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default withStyles(styles)(MyTable);
