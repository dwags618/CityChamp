import React, { Component } from 'react';
import Table, {TableCell, TableHead, TableRow} from 'material-ui/Table';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UserTable extends Component {

render() {

  return(
     <Table>
      <TableHead>
      <TableRow>
        <TableCell>{'Player'}</TableCell>
        <TableCell>{'Time'}</TableCell>
        <TableCell>{'Skill Level'}</TableCell>
        <TableCell>{'Betting'}</TableCell>
      </TableRow>
      </TableHead>
      <TableRow>
        <TableCell>{'Dylan'}</TableCell>
          <TableCell>{'Afternoon'}</TableCell>
          <TableCell>{'Professional'}</TableCell>
          <TableCell>{'$100'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{'Tyler McWilliam'}</TableCell>
          <TableCell>{'4AM'}</TableCell>
          <TableCell>{'Beginner'}</TableCell>
          <TableCell>{'$100'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{'Shelby Powers'}</TableCell>
          <TableCell>{'Morning'}</TableCell>
          <TableCell>{'Amateur'}</TableCell>
          <TableCell>{'$100'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{'Taka'}</TableCell>
          <TableCell>{'Morning'}</TableCell>
          <TableCell>{'Amateur'}</TableCell>
          <TableCell>{'$100'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{'John Coomes'}</TableCell>
          <TableCell>{'On Time'}</TableCell>
          <TableCell>{'Amateur'}</TableCell>
          <TableCell>{'Guitar'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{'Senor Varkyrie'}</TableCell>
          <TableCell>{'Plus or minus 2 min.'}</TableCell>
          <TableCell>{'Pro'}</TableCell>
          <TableCell>{'His Desk'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{'Pepe'}</TableCell>
          <TableCell>{'When I shave'}</TableCell>
          <TableCell>{'Pro'}</TableCell>
          <TableCell>{'Varkeys Desk'}</TableCell>
      </TableRow>
    </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.get('locale')),
    currentLangugage: getActiveLanguage(state.get('locale')).code
  };
};

export default withRouter(connect(
  mapStateToProps
)(UserTable));

