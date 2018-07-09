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

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  get headers() {
    const { config, handleDelete } = this.props;
    const headers = config.map(({ header }) => {
      return <TableCell key={header}>{header}</TableCell>;
    });

    if (handleDelete) {
      headers.push(<TableCell key="delete">Remove</TableCell>);
    }

    return headers;
  }

  get rows() {
    const { objects, handleDelete } = this.props;

    return objects.map((o, index) => {
      const tableCells = this.paths.map(p => {
        return <TableCell key={p}>{get(o, p)}</TableCell>;
      });

      if (handleDelete) {
        tableCells.push(
          <TableCell key={`${o.id}-delete`} onClick={this.handleDeleteClick(o.id)}>
            <i className="far fa-minus-square fa-2x" />
          </TableCell>
        );
      }

      return <TableRow key={o.id || index}>{tableCells}</TableRow>;
    });
  }

  handleDeleteClick(id) {
    return () => {
      this.props.handleDelete(id);
    };
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

MyTable.defaultProps = {
  data: [],
  headers: [],
  handleDelete: null,
};

MyTable.propTypes = {
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.array,
  data: PropTypes.array,
  children: PropTypes.arrayOf(PropTypes.element),
  classes: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
};

export default withStyles(styles)(MyTable);
