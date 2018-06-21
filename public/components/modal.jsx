import React from 'react';
import ReactModal from 'react-modal';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  get styles() {
    return {
      content: {
        margin: 'auto',
        width: '50%',
        bottom: null,
        padding: null,
        boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
      },
    };
  }

  closeModal() {
    this.setState({ open: false });
    this.props.onClose();
  }

  render() {
    return (
      <ReactModal role="dialog" isOpen={this.props.isOpen} style={this.styles} onRequestClose={this.closeModal} ariaHideApp={false}>
        {/* <div className="modal-dialog" role="document">
          <div className="" style={{ display: undefined }}> */}
        {this.props.children}
        {/* </div>
        </div> */}
      </ReactModal>
    );
  }
}

export default Modal;
