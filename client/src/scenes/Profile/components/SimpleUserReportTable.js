import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, {TableBody, TableCell, TableRow} from 'material-ui/Table';

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

console.log(users)
console.log(username)
  for (var user in users) {
    var n = users[user];

    
    if(n.username === username)
    output.push(
      <TableRow key={username}>
        <TableCell>{n.name}</TableCell>
        <TableCell>{n.username}</TableCell>
        <TableCell>{n.maximumDistance}</TableCell>
      </TableRow>
    );
  }


  return output;
};

const SimpleUserReportTable = props => {
  const {classes, users, username} = props;

  const message = (messageText) => (
    <Typography variant="display1" align="center" className={classes.messageText}>
      {messageText}
    </Typography>
  );

  if (users === null) {
    return message('Loading...');
  } else if (users.length === 0) {
    return message('No test results to display');
  } else {
    return (
      <div style={{paddingTop:30}}>
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

export default withStyles(styles)(SimpleUserReportTable);
