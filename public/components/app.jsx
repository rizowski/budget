import React from 'react';
import { Route } from 'react-router-dom';
import '../styles/main.css';

import Home from './pages/home';
import Navigation from './navigation';
import Goals from './pages/goals';
import Income from './pages/income';
import Banner from './banner';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Navigation />
        </div>
        <Banner title="Welcome" message="To I'm Broke" />
        <div className="row">
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/goals" component={Goals} />
            <Route path="/income" component={Income} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
