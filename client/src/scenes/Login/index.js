import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Auth from '../../services/auth';
import LoginForm from './components/LoginForm';
import MyCityChampLogo from '../../images/cc_homepage_header.jpg';
import { loginUser } from '../../services/api/auth';
import SignUpButton from './components/SignUpButton';
import ChampIcon from '../../images/cc_homepage_icon_champ.jpg';
import GameIcon from '../../images/cc_homepage_icon_game.jpg'
import SearchIcon from '../../images/cc_homepage_icon_search.jpg'

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
    height: 2000,
    background: '#ffffff'
  },
  logo: {
    width: '100%'
  },
  gifcontainer: {
    display: 'flex',
    visibility: 'visible'
  },
  splash: {
    margin: '0 auto'
  },
  firstheader: {
    position: 'absolute',
    padding: 100,
    width: '100%',
    textAlign: 'center',
    top: 100,
    color: 'white',
    fontSize: '150px'
  },
  secondheader: {
    position: 'absolute',
    padding: 100,
    width: '100%',
    textAlign: 'center',
    top: 320,
    color: 'white'
  },
  button: {
    position: 'absolute',
    padding: 100,
    width: '100%',
    textAlign: 'center',
    top: 350,
    color: 'white'
  },
  firstlink: {
    position: 'absolute',
    padding: 0,
    width: '100%',
    textAlign: 'right',
    top: 30,
    right: 30,
    color: 'white'
  },
  secondlink: {
    position: 'absolute',
    padding: 0,
    width: '100%',
    textAlign: 'right',
    top: 30,
    right: 150,
    color: 'white'
  },
  searchicon: {
    position: 'relative'
  }  
})

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      showSplashscreen: true,
      user: {
        username: '',
        password: ''
      },
      message: '',
      errors: {
        username: '',
        password: ''
      },
    }
  }

  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  }

  toggle = () => {
    this.setState({ showSplashscreen: false })
  }


  login = () => {
    this.setState({
      errors: {
        name: '',
        username: '',
        password: ''
      }
    });

    loginUser(this.state.user)
      .then(result => result.json())
      .then(data => {
        if(data.success){
          Auth.authenticateUser(data.token);
          this.setState({redirectToReferrer: true});
          localStorage.setItem('username', this.state.user.username);
        } else {
          this.setState({
            errors: data.errors,
            message: data.message
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    const { translate, classes } = this.props;

      if (redirectToReferrer) {
        return (
          <Redirect to={from}/>
        );
      }

      return (
        <div className={classes.container}>
          <img className={classes.logo} src={MyCityChampLogo} alt="MyCityChamp Logo" />
          <h4 className={classes.firstlink}>Sign Up</h4>
          <h4 className={classes.secondlink}>Login</h4>
          <h1 className={classes.firstheader}>City Champ</h1>
          <div/>
          <h1 className={classes.secondheader}>Find Matches. Take it to the net.</h1>
          <div className={classes.button}><SignUpButton/></div>
          <img className={classes.searchicon} src={SearchIcon} alt="Search Icon"/>
      </div>
      );
    }
  }


const mapStateToProps = state => {
  return {
    translate: getTranslate(state.get('locale')),
    currentLangugage: getActiveLanguage(state.get('locale')).code
  };
};

export default withRouter(connect(
  mapStateToProps
)(withStyles(styles)(LoginPage)));
