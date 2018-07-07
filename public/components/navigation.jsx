import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/paper';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

import MoneyIcon from '@material-ui/icons/AttachMoney';
import NotMoneyIcon from '@material-ui/icons/MoneyOff';

import GoalIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  greenAvatar: {
    color: '#fff',
    backgroundColor: green[500],
  },
  redAvatar: {
    color: '#fff',
    backgroundColor: red[500],
  },
  blueAvatar: {
    color: '#fff',
    backgroundColor: blue[500],
  },
};

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(open) {
    return () => {
      this.setState({ menuOpen: open });
    };
  }

  render() {
    const { classes } = this.props;
    const HomeLink = props => <Link to="/" {...props} />;
    const GoalsLink = props => <Link to="/goals" {...props} />;
    const CategoryLink = props => <Link to="/goal-categories" {...props} />;
    const IncomeLink = props => <Link to="/income" {...props} />;
    const BillsLink = props => <Link to="/bills" {...props} />;
    const LoansLink = props => <Link to="/loans" {...props} />;

    const sideList = (
      <div className={classes.list}>
        <List component="nav">
          <ListItem button component={HomeLink}>
            <Avatar>
              <HomeIcon />
            </Avatar>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          <ListItem button component={GoalsLink}>
            <Avatar className={classes.blueAvatar}>
              <GoalIcon />
            </Avatar>
            <ListItemText primary="Goals" />
          </ListItem>
          <Divider />
          <ListItem button component={CategoryLink}>
            <Avatar className={classes.blueAvatar}>
              <GoalIcon />
            </Avatar>
            <ListItemText primary="Goal Categories" />
          </ListItem>
          <Divider />
          <ListItem button component={IncomeLink}>
            <Avatar className={classes.greenAvatar}>
              <MoneyIcon />
            </Avatar>
            <ListItemText primary="Income" />
          </ListItem>
          <Divider />
          <ListItem button component={BillsLink}>
            <Avatar className={classes.redAvatar}>
              <NotMoneyIcon />
            </Avatar>
            <ListItemText primary="Bills" />
          </ListItem>
          <Divider />
          <ListItem button component={LoansLink}>
            <Avatar className={classes.redAvatar}>
              <NotMoneyIcon />
            </Avatar>
            <ListItemText primary="Loans" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <Paper elevation={1}>
        <AppBar>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon onClick={this.toggleMenu(true)} />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Budget
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
        <SwipeableDrawer open={this.state.menuOpen} onClose={this.toggleMenu(false)} onOpen={this.toggleMenu(true)}>
          <div tabIndex={0} role="button" onClick={this.toggleMenu(false)} onKeyDown={this.toggleMenu(false)}>
            {sideList}
          </div>
        </SwipeableDrawer>
      </Paper>
    );
  }
}

export default withStyles(styles)(Nav);
