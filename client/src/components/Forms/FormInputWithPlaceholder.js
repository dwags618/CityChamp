import React from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

const styles = (theme) => ({
  container: {
    padding:'8px 0',
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
  },
  textFieldInput: {
    background: theme.palette.common.white,
    boxSizing:'border-box',
    color:theme.typography.title.color,
    height:'100%',
    padding: 0
  },
  textFieldRoot: {
    boxSizing:'border-box',
    color:theme.typography.title.color,
    padding:8,
    width:'100%'
  }
});

const FormInputWithPlaceholder = (props) => {
  const { classes, name, input, label, ...custom } = props;
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography type="button" align="center" color="inherit">
          {label}
        </Typography>
      </div>
      <div className={classes.input}>
        <Input
          id={name}
          disableUnderline
          fullWidth
          classes={{
            root: classes.textFieldRoot,
            input: classes.textFieldInput
          }}
          {...custom}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(FormInputWithPlaceholder);
