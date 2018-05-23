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

const TableItems = (classes, props, users, minimumBet, maximumBet) => {
  var output = [];
  for (var user in users) {
    var n = users[user];

    console.log(minimumBet)
    console.log(maximumBet)

    if((n.minimumBet >= minimumBet && n.minimumBet <=maximumBet) || (n.maximumBet >=minimumBet && n.maximumBet <=maximumBet) || (minimumBet >= n.minimumBet && minimumBet <=n.maximumBet) || (maximumBet >=n.minimumBet && maximumBet <=n.maximumBet))
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
  const {classes, users, minimumBet, maximumBet} = props;

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
          <TableHead>
            <TableRow>
              <TableCell>{props['findmatch-page.name']}</TableCell>
              <TableCell>{props['findmatch-page.username']}</TableCell>
              <TableCell>{props['findmatch-page.minimum-bet']}</TableCell>
              <TableCell>{props['findmatch-page.maximum-bet']}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TableItems(classes, props, users, minimumBet, maximumBet)}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(SimpleUserReportTable);
