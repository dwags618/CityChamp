import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppFrame from './AppFrame';
import HomePage from '../../../scenes/Home';
import ProfilePage from '../../../scenes/Profile';
import FindMatchPage from '../../../scenes/FindMatch';
import MyMatchesPage from '../../../scenes/MyMatches';
import HistoryPage from '../../../scenes/History';
import MessagesPage from '../../../scenes/Messages';
import CashierPage from '../../../scenes/Cashier';
import LoginPage from '../../../scenes/Login'
import SignupPage from '../../../scenes/Signup';
import ResetPage from '../../../scenes/Reset';
import Auth from '../../../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <AppFrame>
        <Component {...props}/>
      </AppFrame>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class MainLayout extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path='/' component={HomePage} />
        <PrivateRoute path='/profile' component={ProfilePage} />
        <PrivateRoute path='/findmatch' component={FindMatchPage} />
        <PrivateRoute path='/mymatches' component={MyMatchesPage} />
        <PrivateRoute path='/messages' component={MessagesPage} />
        <PrivateRoute path='/history' component={HistoryPage} />
        <PrivateRoute path='/cashier' component={CashierPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/reset' component={ResetPage} />
        <Redirect from='*' to='/' />
      </Switch>
    );
  }
}

export default MainLayout;
