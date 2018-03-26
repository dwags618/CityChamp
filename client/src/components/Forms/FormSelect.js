import React from 'react';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';

const styles = (theme) => ({
  input: {
    padding:0,
    width:'100%'
  },
  selectRoot: {
    background:'#194F90',
    color:'#fff', 
    padding:'0px 12px'
  },
  selectIcon: {
    color:'#ffffff',
    height:36,
    top:2,
    right:8,
    width:36
  },
  selectMenu: {
    lineHeight:'calc(1em + 16px)'
  },
  selectSelect: {
    padding:'6px 0 4px 0'
  }
});

const FormSelect = (props) => {
  const { classes, name, input, label, meta: { touched, error }, children, ...custom } = props;
  return (
    <FormControl 
      {...custom}
      error={error !== undefined && touched && error.length > 0}
    >
      <Paper elevation={4}>
        <Select
          input={<Input {...input} className={classes.input} disableUnderline/>}
          value={input.value}
          children={children}
          onChange={(event) => input.onChange(event.target.value)}
          onBlur={(event) => event.preventDefault()}
          classes={{
            root: classes.selectRoot,
            icon: classes.selectIcon,
            select: classes.selectSelect,
            selectMenu: classes.selectMenu
          }}
          displayEmpty
        />
      </Paper>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default withStyles(styles)(FormSelect);
