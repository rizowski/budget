import React from 'react';
import Paper from '@material-ui/core/paper';
import Button from '@material-ui/core/button';
import Modal from '../modal';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createShown: false,
    };
    this.showCreate = this.showCreate.bind(this);
    this.createSubmit = this.createSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  createSubmit() {
    console.log('CreateSubmitted', this.state.create);
    this.setState({ createShown: false });
    this.props.onCreateSubmit(this.state.create);
  }

  handleCancel() {
    this.setState({ createShown: false });
  }

  handleChange(thing) {
    return ({ key, value }) => {
      console.log(thing, key, value);
      this.setState(old => {
        const oldThing = old[thing];

        return { [thing]: { ...oldThing, [key]: value } };
      });
    };
  }

  get create() {
    if (!this.props.create) {
      return null;
    }

    const childProps = { handleChange: this.handleChange('create') };

    return (
      <div style={{ padding: '10px' }}>
        <Button variant="outlined" color="primary" onClick={this.showCreate}>
          Create
        </Button>
        <Modal open={this.state.createShown} title="Create" onSubmit={this.createSubmit} onClose={this.handleCancel}>
          {React.createElement(this.props.create, childProps)}
        </Modal>
      </div>
    );
  }

  showCreate() {
    this.setState({ createShown: true });
  }

  render() {
    return (
      <Paper>
        {this.create}
        {this.props.children}
      </Paper>
    );
  }
}

export default Page;
