import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import Auth from '../../services/auth';
import LoginForm from './components/LoginForm';
import MyCityChampLogo from '../../images/MCC_logo.png';
import { loginUser } from '../../services/api/auth';

const styles = theme => ({
  container: {
    background:'linear-gradient(0deg, #1f5592 0%,#286ba1 37%,#3a94c0 68%,#51c4e1 100%)',
    width: '100%',
    height:1300

  },
  logo: {
    display: 'block',
    margin: '0 auto',
    paddingTop: 150
  },
  gifcontainer: {
    display: 'flex',
    visibility: 'visible'
  },
  splash: {
    margin: '0 auto'
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

  componentDidMount() {
    this.props.setTitle(this.props.translate('login-page.title'));
    window.setTimeout(this.toggle, 3200) 
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
          <img className={classes.logo} width="450" src={MyCityChampLogo} alt="MyCityChamp Logo" />
          <LoginForm
            onSubmit={this.login}
            onChange={this.changeUser}
            user={this.state.user}
            translate={translate}
            errors={this.state.errors}
            message={this.state.message}
          />
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

const mapDispatchToProps = dispatch => {
  return {
    setTitle: (title) => {
      dispatch(setTitle(title));
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginPage)));
