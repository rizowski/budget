import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const styles = {
  formControl: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  get defaultValue() {
    return moment().format('YYYY-MM-DD');
  }

  handleChange(event) {
    const modifiedDate = moment(event.target.value).format('YYYY-MM-DD');
    this.props.handleChange(modifiedDate);
    this.setState({
      date: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl} fullWidth>
        <TextField
          id={this.props.id}
          label={this.props.label}
          type="date"
          onChange={this.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </FormControl>
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

export default withStyles(styles)(DatePicker);
