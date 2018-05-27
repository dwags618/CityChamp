import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Auth from '../../services/auth';
import LoginForm from './components/LoginForm';
import MyCityChampLogo from '../../images/cc_homepage_header.jpg';
import { loginUser } from '../../services/api/auth';

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%'

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
  centered: {
    position: 'absolute',
   padding: 100,
   width: '100%',
   textAlign: 'center',
   top: 100,
   color: 'white',
   fontSize: '150px'

},
centered1: {
    position: 'absolute',
   padding: 100,
   width: '100%',
   textAlign: 'center',
   top: 320,
   color: 'white'
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
          <h1 className={classes.centered}>City Champ</h1>
          <div/>
          <h1 className={classes.centered1}>Find Matches. Take it to the net.</h1>
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
