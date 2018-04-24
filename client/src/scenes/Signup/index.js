import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import SignupForm from './components/SignupForm';
import {signupUser} from '../../services/api/auth';
import MyCityChampLogo from '../../images/MCC_logo.png';
import { withStyles } from 'material-ui/styles';

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
  }
})

class SignupPage extends Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {
        name: '',
        username: '',
        password: '',
        confirmpassword: ''
      },
      user: {
        username: '',
        name: '',
        password: '',
        confirmpassword: ''
      },
      redirectToLogin: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    this.setState({
      errors: {
        name: '',
        username: '',
        password: '',
        confirmpassword:''
      }
    })

    event.preventDefault();

    var errors = {};

    signupUser(this.state.user)
      .then(result => result.json())
      .then(data => {
        if(data.success){
          this.setState({redirectToLogin: true});
        } else if((!(this.state.user.password.trim().length < 8) && !(this.state.user.password !== this.state.user.confirmpassword) && !(this.state.user.name.trim().length === 0) && !(this.state.user.username.trim().length === 0)))

        {
          errors.username = 'This username is already taken.';
          this.setState({errors});
        }

          else{
          if(this.state.user.password !== this.state.user.confirmpassword)
          {
            errors.confirmpassword='Passwords do not match.';
          }  
          if (this.state.user.name.trim().length === 0) {
            errors.name = 'Please provide your name.';
          }
          if(this.state.user.username.trim().length === 0)
          {
            errors.username = 'Please provide a Username.';
          }
          if(this.state.user.password.trim().length < 8)
          {
            errors.password = 'Password must have at least 8 characters.';
          }
          this.setState({errors});
        }
      });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    const { translate, classes } = this.props;

    if (this.state.redirectToLogin) {
      return (
        <Redirect to={'/login'}/>
      );
    }

    return (
      <div className={classes.container}>
        <img className={classes.logo} width="450" src={MyCityChampLogo} alt="MyCityChamp Logo" />
        <SignupForm
          translate={translate}
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
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
)(withStyles(styles)(SignupPage)));
