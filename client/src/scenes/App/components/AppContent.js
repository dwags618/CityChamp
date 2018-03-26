import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  content: {
    height: '100%',
    margin: '0 auto',
    maxWidth: 900,
    minWidth: 750,
    paddingTop: 94,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

const AppContent = (props) => {
  const { classes, children } = props;

  return (
    <div className={classes.content}>
      {children}
    </div>
  );
};

export default withStyles(styles)(AppContent);
