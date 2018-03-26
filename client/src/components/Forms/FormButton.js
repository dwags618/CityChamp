import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
  button: {
    color: '#ffffff',
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
});

const FormButton = (props) => {
  const { classes, children, ...custom } = props;

  return (
    <Button
      variant="raised"
      color="primary"
      className={classes.button}
      {...custom}
    >
      {children}
    </Button>
  );
};

export default withStyles(style)(FormButton);
