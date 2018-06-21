import React from 'react';
import { Route } from 'react-router-dom';
import '../styles/main.css';

import Home from './pages/home';
import Navigation from './navigation';
import PageErrors from './pages/page-errors';
import Goals from './pages/goals';
import Income from './pages/income';
import BillsPage from './pages/bills';
import GoalCategories from './pages/categories';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Navigation />
        </div>
        <div className="row">
          <div className="container">
            <PageErrors>
              <Route exact path="/" component={Home} />
              <Route path="/goals" component={Goals} />
              <Route path="/goal-categories" component={GoalCategories} />
              <Route path="/income" component={Income} />
              <Route path="/bills" component={BillsPage} />
            </PageErrors>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
