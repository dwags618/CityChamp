import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  noWrap: {
    whiteSpace: 'nowrap'
  },
  
});

const TableItems = (classes, props, users, username) => {
  var output = [];
  for (var user in users) {
    var n = users[user];

    if(n.username===username)
    output.push(
      <div>
        <div>Name: {n.name}</div>
        <div>Username: {n.username}</div>
     </div>
    );
  }
  return output;
};

const SingleUserReportTable = props => {
  const {classes, users, username } = props;

    return (
      <div style={{paddingTop:20}}>
        
            {TableItems(classes, props, users, username)}
          
      </div>
    );
  
};

export default withStyles(styles)(SingleUserReportTable);
