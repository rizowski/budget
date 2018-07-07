import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
  formControl: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};

class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '1',
    };
  }

  get helpText() {
    const { helpText } = this.props;

    if (!helpText) {
      return null;
    }
    return <FormHelperText>{helpText}</FormHelperText>;
  }

  get options() {
    const options = this.props.options.map(o => {
      return (
        <MenuItem key={o.id} value={o.id}>
          {o.value}
        </MenuItem>
      );
    });

    return [
      <MenuItem key="1" disabled value="">
        <em>Select One</em>
      </MenuItem>,
      ...options,
    ];
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.handleChange(event.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <FormControl disabled={this.props.disabled} className={classes.formControl} fullWidth>
        <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
        <Select value={this.state.value} onChange={this.handleChange} fullWidth>
          {this.options}
        </Select>
        {this.helpText}
      </FormControl>
    );
  }
}

SelectInput.defaultProps = {
  options: [],
  disabled: false,
  helpText: null,
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  helpText: PropTypes.string,
};

export default withStyles(styles)(SelectInput);
