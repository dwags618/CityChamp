import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ResetInput from './ResetInput';
import ResetButton from './ResetButton';
import { Link } from 'react-router-dom';

const styles = theme => ({
  buttonLink: {
    textDecoration: 'none',
  },
  centeredColumnDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: 450,
    margin: '0 auto',
  }
});

let ResetForm = (props) => {
  const { classes, translate, onChange, onSubmit, user, errors, message } = props;

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={classes.form}
        autoComplete="off"
      >
      <div style={{paddingTop:40}}>
      <Typography variant="body2" style={{color:'white'}}>
            {message}
          </Typography>
      <ResetInput
          name="name"
          type="text"
          placeholder={translate('login-page.name-text')}
          onChange={onChange}
          value={user.name}
          error={errors && errors.name}
          autoFocus/>
      
        <ResetInput
          name="username"
          type="text"
          placeholder={translate('login-page.username-text')}
          onChange={onChange}
          value={user.username}
          error={errors && errors.username}
        />
        <ResetInput
          name="password"
          type="password"
          placeholder={"New Password (Min. 8 characters)"}
          onChange={onChange}
          value={user.password}
          error={errors && errors.password}
        />
        <ResetInput
          name="confirmpassword"
          type="password"
          placeholder={"Confirm Password (Min. 8 characters)"}
          onChange={onChange}
          value={user.confirmpassword}
          error={errors && errors.confirmpassword}
        />
        <ResetButton
          onClick={onSubmit}
          buttonText="RESET"
        />
        </div>
      </form>
      <div className={classes.centeredColumnDiv}>
        <Typography align="center" variant="body1" style={{color: "white"}}>
          Ready to login?
        </Typography>
        <Link className={classes.buttonLink} to={'/login'}>
          <Button style={{color: "white"}}>Login</Button>
        </Link>
      </div>
    </div>

  );
};

export default withStyles(styles)(ResetForm);
