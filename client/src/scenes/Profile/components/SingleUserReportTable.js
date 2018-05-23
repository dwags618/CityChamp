import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, {TableBody, TableRow} from 'material-ui/Table';

const styles = theme => ({
  messageText: {
    padding: 30
  },
  noWrap: {
    whiteSpace: 'nowrap'
  },
  paper: {
    overflow: 'auto'
  }
});

const TableItems = (classes, props, users, username) => {
  var output = [];
  for (var user in users) {
    var n = users[user];

    if(n.username===username)
    output.push(
      <TableRow key={user}>
        <TableRow>{n.name}</TableRow>
        <TableRow>{n.username}</TableRow>
      </TableRow>
    );
  }
  return output;
};

const SingleUserReportTable = props => {
  const {classes, users, username } = props;

  const message = (messageText) => (
    <Typography variant="display1" align="center" className={classes.messageText}>
      {messageText}
    </Typography>
  );

  if (users === null) {
    return message('Loading...');
  } else if (users.length === 0) {
    return message('No results to display');
  } else {
    return (
      <div style={{paddingTop:20}}>
      <Paper elevation={4} className={classes.paper}>
        <Table>
          <TableBody>
            {TableItems(classes, props, users, username)}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(SingleUserReportTable);
