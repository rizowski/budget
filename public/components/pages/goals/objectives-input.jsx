import React from 'react';

class ObjectivesInput extends React.Component {
  handleChange() {}

  render() {
    return (
      <div className="container">
        <div className="form-group">
          <div className="col">
            <label htmlFor="objective-amount-#">Amount</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" onChange={this.handleChange('objective-amount-#')} className="form-control" placeholder="10" />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
          <div className="col">
            <label htmlFor="objective-amount-#">Max Per Paycheck</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" onChange={this.handleChange('objective-amount-#')} className="form-control" placeholder="10" />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ObjectivesInput;
