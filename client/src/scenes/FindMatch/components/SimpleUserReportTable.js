import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

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

const TableItems = (classes, props, users) => {
  var output = [];
  for (var user in users) {
    var n = users[user];

    output.push(
      <TableRow key={user}>
        <TableCell>{n.name}</TableCell>
        <TableCell>{n.username}</TableCell>
        <TableCell>{n.minimumBet}</TableCell>
        <TableCell>{n.maximumBet}</TableCell>  
      </TableRow>
    );
  }

  return output;
};

const SimpleUserReportTable = props => {
  const {classes, users} = props;

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
          <TableHead>
            <TableRow>
              <TableCell>{props['findmatch-page.name']}</TableCell>
              <TableCell>{props['findmatch-page.username']}</TableCell>
              <TableCell>{props['findmatch-page.minimum-bet']}</TableCell>
              <TableCell>{props['findmatch-page.maximum-bet']}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TableItems(classes, props, users)}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(SimpleUserReportTable);
