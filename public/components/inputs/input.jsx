import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const styles = {
  formControl: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};

class InputBase extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  get helpText() {
    const { helpText } = this.props;

    if (!helpText) {
      return null;
    }

    return <FormHelperText>{helpText}</FormHelperText>;
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
        <Input id={this.props.id} placeholder={this.props.placeholder} type={this.props.type || 'text'} onChange={this.handleChange} fullWidth />
        {this.helpText}
      </FormControl>
    );
  }
}

InputBase.defaultProps = {
  type: 'text',
  placeholder: null,
  label: null,
  helpText: null,
};

InputBase.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  helpText: PropTypes.string,
};

export default withStyles(styles)(InputBase);
