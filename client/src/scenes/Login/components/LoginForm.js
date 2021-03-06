import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import LoginInput from './LoginInput';
import SignInButton from './SignInButton';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

const styles = theme => ({
  buttonLink: {
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Arial'
  },
  centeredColumnDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  centeredColumnDiv2: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 20
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: 450,
    margin: '0 auto',
    height: 900
  }
});

let LoginForm = (props) => {
  const { classes, translate, onChange, onSubmit, user, errors, message } = props;
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={classes.form}
        autoComplete="off"
      >
        <div style={{paddingTop:60}}>
          <Typography variant="body2" style={{color:'white'}}>
            {message}
          </Typography>
          <LoginInput
            name="username"
            type="text"
            placeholder={translate('login-page.username-text')}
            onChange={onChange}
            value={user.username}
            error={errors && errors.username}
            autoFocus/>
          <LoginInput
            name="password"
            type="password"
            placeholder={"Password"}
            onChange={onChange}
            value={user.password}
            error={errors && errors.password}
            />
            <div style={{paddingLeft:10}}>
            <Link className={classes.buttonLink} to={'/reset'}>
          Forgot Password
        </Link>
        <a style={{color: "white"}}>/</a>
        
        <Link className={classes.buttonLink} to={'/signup'}>
          New User
        </Link>
        </div>
        <div>
          <SignInButton
            onClick={onSubmit}
            buttonText={translate('buttons.signin')}
          />
          <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook} />
    </div>
      </div>
      </form>
    </div>
  );
};

export default withStyles(styles)(LoginForm);
