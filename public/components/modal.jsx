import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = {
  paper: {
    minWidth: '300px',
  },
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  closeModal() {
    this.setState({ open: false });

    this.props.onClose();
  }

  onSubmit() {
    this.setState({ open: false });
    this.props.onSubmit();
  }

  render() {
    return (
      <Dialog open={this.props.open || this.state.open} onClose={this.closeModal} fullWidth>
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Modal);
