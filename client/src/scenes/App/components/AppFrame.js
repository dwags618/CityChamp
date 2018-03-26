import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AppDrawer from './AppDrawer';
import AppContent from './AppContent';
import { title } from 'config/appSettings.json';
import Auth from 'services/auth';

const styles = theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
      height: '100%',
      margin: 0
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      height: '100%',
      margin: 0,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    }
  },
  appbar: {
    background: 'linear-gradient(90deg, #3394c1, #4ac3e2 20%)',
  },
  logoutButton: {
    textAlign: 'right',
    width: 200
  },
  title: {
    flex: '1 1 0',
    left: 76,
    position: 'relative',
    textAlign: 'center'
  }
});

class AppFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false,
    };
  }

  handleMenuButtonClick = () => {
    this.setState({
      drawerIsOpen: true,
    });
  }

  handleDrawerClose = () => {
    this.setState({
      drawerIsOpen: false,
    });
  }

  logout = () => {
    Auth.deauthenticateUser();
    this.props.history.push('/');
  }

  componentDidMount() {
    document.title = title;
  }

  render() {
    const {
      children,
      classes,
      translate
    } = this.props;

    return (
      <React.Fragment>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleMenuButtonClick.bind(this)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit">
              {this.props.navigation.get('title')}
            </Typography>
            <div className={classes.logoutButton}>
              {(
                <Button color="inherit" onClick={this.logout}>
                  {translate('buttons.logout')}
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <AppDrawer
          drawerIsOpen={this.state.drawerIsOpen}
          handleDrawerClose={this.handleDrawerClose.bind(this)}
          translate={translate}
        />
        <AppContent>
          {children}
        </AppContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    trays: state.get('trays'),
    navigation: state.get('navigation'),
    serverIsConnected: state.getIn(['connection', 'server_socket', 'isConnected']),
    translate: getTranslate(state.get('locale')),
    currentLangugage: getActiveLanguage(state.get('locale')).code
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(withRouter(AppFrame)));
