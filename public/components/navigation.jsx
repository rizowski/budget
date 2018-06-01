import React from 'react';
import { Link } from 'react-router-dom';

class MyNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  active(route) {
    return window.location.pathname === route;
  }

  classNames(route) {
    return `nav-link ${this.active(route) && 'active'}`;
  }

  render() {
    return (
      <div className="navigation shadow">
        <nav className="nav nav-tabs">
          <Link className={this.classNames('/')} to="/">
            Home
          </Link>
          <Link className={this.classNames('/goals')} to="/goals">
            Goals
          </Link>
          <Link className={this.classNames('/income')} to="/income">
            Income
          </Link>
          <Link className={this.classNames('/debt')} to="/debt">
            Debts
          </Link>
          <Link className={this.classNames('/transactions')} to="/transactions">
            Transactions
          </Link>
        </nav>
      </div>
    );
  }
}

export default MyNav;