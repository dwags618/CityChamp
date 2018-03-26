import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import SigninInput from './SigninInput';
import RegisterButton from './RegisterButton';
import { Link } from 'react-router-dom';

const styles = theme => ({
  buttonLink: {
    textDecoration: 'none'
  },
  centeredColumnDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: 450,
    margin: '0 auto',
  }
});

let SignupForm = (props) => {
  const { classes, translate, onChange, onSubmit, user, errors } = props;

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={classes.form}
        autoComplete="off"
      >
      <div style={{paddingTop:40}}>
        <SigninInput
          name="name"
          type="text"
          placeholder={translate('login-page.name-text')}
          onChange={onChange}
          value={user.name}
          error={errors && errors.name}
          autoFocus/>
        <SigninInput
          name="username"
          type="text"
          placeholder={translate('login-page.username-text')}
          onChange={onChange}
          value={user.username}
          error={errors && errors.username}
        />
        <SigninInput
          name="password"
          type="password"
          placeholder={translate('signup-page.password-text')}
          onChange={onChange}
          value={user.password}
          error={errors && errors.password}
        />
        <SigninInput
          name="confirmpassword"
          type="password"
          placeholder={translate('signup-page.confirm-password-text')}
          onChange={onChange}
          value={user.confirmpassword}
          error={errors && errors.confirmpassword}
        />
        <RegisterButton
          onClick={onSubmit}
          buttonText="REGISTER"
        />
        </div>
      </form>
      <div className={classes.centeredColumnDiv}>
        <Typography align="center" variant="body1" style={{color: "white"}}>
          Already have an account?
        </Typography>
        <Link className={classes.buttonLink} to={'/login'}>
          <Button style={{color: "white"}}>Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignupForm);
