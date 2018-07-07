import React from 'react';
import { Route } from 'react-router-dom';
import '../styles/main.css';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/paper';

import Home from './pages/home';
import Navigation from './navigation';
import PageErrors from './pages/page-errors';
import Goals from './pages/goals';
import Income from './pages/income';
import BillsPage from './pages/bills';
import LoansPage from './pages/loans';
import GoalCategories from './pages/categories';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 10,
    overflowX: 'auto',
  },
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={0}>
        <Navigation />
        <Paper elevation={1} classes={classes}>
          <PageErrors>
            <Route exact path="/" component={Home} />
            <Route path="/goals" component={Goals} />
            <Route path="/goal-categories" component={GoalCategories} />
            <Route path="/income" component={Income} />
            <Route path="/bills" component={BillsPage} />
            <Route path="/loans" component={LoansPage} />
          </PageErrors>
        </Paper>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
