import React from 'react';
import classnames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { FormHelperText } from 'material-ui/Form';
import Input from 'material-ui/Input';
import BarcodeIconLightBlue from 'components/Icons/BarcodeIconLightBlue';
import BarcodeIconMedBlue from 'components/Icons/BarcodeIconMedBlue';
import BarcodeIconDarkBlue from 'components/Icons/BarcodeIconDarkBlue';

const styles = (theme) => ({
  container: {
    padding:'20px 10px',
    width:'100%'
  },
  title: {
    color:'#ffffff',
    marginBottom:10,
    textAlign:'center',
    width:'100%'
  },
  input: {
    background:'#ffffff',
    display:'flex',
    margin:' 0 10px',
    paddingLeft:2
  },
  textFieldInput: {
    background: theme.palette.common.white,
    boxSizing:'border-box',
    color:theme.typography.title.color,
    height:'100%',
    padding: '0 10px'
  },
  helperText: {
    color: theme.palette.common.white,
    marginLeft:10
  },
  error: {
    borderWidth:2,
    borderStyle:'solid',
    borderColor: theme.palette.error.main,
  },
  errorText: {
    color: theme.palette.error.main
  },
  lightBg: {
    background:'linear-gradient(0deg, #3b9ab4, #4ac1e1 40%)',
  },
  medBg: {
    background:'linear-gradient(0deg, #2d678c, #3881ae 40%)',
    borderTop:'1px solid #337199'
  },
  darkBg: {
    background:'linear-gradient(0deg, #0f3f70, #134d8b 40%)',
    borderTop:'1px solid #0e4477'
  }
});

const FormBarcodeInput = (props) => {
  const { classes, lightBg, medBg, darkBg, name, input, label, meta: { touched, error }, ...custom } = props;
  return (
    <div className={classnames(classes.container, {
      [classes.lightBg]: lightBg,
      [classes.medBg]: medBg,
      [classes.darkBg]: darkBg,
    })}>
      <div className={classes.title}>
        <Typography variant="button" align="center" color="inherit">
          {label}
        </Typography>
      </div>
      <div className={classnames(classes.input, {[classes.error]: touched && error})}>
        {lightBg &&
          <BarcodeIconLightBlue/>
        }
        {medBg &&
          <BarcodeIconMedBlue/>
        }
        {darkBg &&
          <BarcodeIconDarkBlue/>
        }
        <Input
          id={name}
          value={input.value}
          error={error !== undefined && touched && error.length > 0}
          onChange={input.onChange}
          onBlur={input.onBlur}
          disableUnderline
          fullWidth
          classes={{
            root: classes.textFieldRoot,
            input: classnames(classes.textFieldInput, {
              [classes.errorText]: touched && error
            })
          }}
          {...custom}
        />
      </div>
      {touched && error && <FormHelperText className={classes.helperText}>{error}</FormHelperText>}
    </div>
  );
};

export default withStyles(styles)(FormBarcodeInput);
