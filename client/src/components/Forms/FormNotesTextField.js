import React from 'react';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';

const styles = (theme) => ({
  error: {
    borderWidth:2,
    borderStyle:'solid',
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main + ' !important'
  },
  helperText: {
    marginTop:8
  },
  input: {
    padding:4
  },
  root: {
    boxSizing:'border-box',
    color:theme.typography.title.color,
    padding:8,
    width:'100%'
  }
});

const FormNotesTextField = (props) => {
  const { classes, name, input, label, meta: { touched, error }, ...custom } = props;

  let hasError = error !== undefined && touched && error.length > 0;
  return (
    <FormControl 
      {...custom}
      error={hasError}
    >
      <Paper elevation={4}>
        <Input
          id={name}
          value={input.value}
          onChange={input.onChange}
          onBlur={input.onBlur}
          classes={{
            root: classnames(classes.root, {[classes.error]: touched && hasError}),
            input: classes.input
          }}
          disableUnderline
          {...custom}
        />
      </Paper>
      {touched && error &&
        <FormHelperText className={classes.helperText}>
          {error}
        </FormHelperText>
      }
    </FormControl>
  );
};

export default withStyles(styles)(FormNotesTextField);
