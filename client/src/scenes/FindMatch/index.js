import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import { withStyles } from 'material-ui/styles';
import {geolocated} from 'react-geolocated';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import MapForm from './components/MapForm';
import Paper from 'material-ui/Paper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import TimePicker from 'react-dropdown-timepicker';

const styles = theme => ({
  input: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51c4e1',
    padding: 20, 
    width: 200,
    height: 15,
    marginRight: 20,
  },
  dropdown: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51c4e1',
    width: 200,
    height:45
  },
  search: {
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: '#1f5592',
    width: 200,
    height: 45,
    color: 'white'
  },
  filter: {
    position:'relative', 
    marginTop: 20, 
    marginLeft: -100, 
  },
  map: {
    position:'relative', 
    marginTop: 20, 
    marginLeft: 75, 
    width: 750, 
    height: 500
  },
  table: {
    position:'relative', 
    marginTop: 20, 
    width: 900, 
    height: 350
  },
  contentContainer: {
    flex: '1 0 auto',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
  },
  datePicker: {
    border: 0,
    padding: 8,
    borderRadius: 25,
    borderWidth: 20, 
    border: '#51c4e1',
    padding: 20, 
    width: 200,
    height: 15,
    marginRight: 20,
  },
})

class FindMatchPage extends Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
        reviews: '',
      value: '',
      startDate: moment(),
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

      event.preventDefault();

      
    }

    handleChange(event) {

      this.setState({value: event.target.value});

    }

 static defaultProps = {
    center: {
      lat: 41.906,
      lng: -87.63
    },
    zoom: 11
  };

  render() {
    const { translate, classes } = this.props;

    return (
    <div className={classes.pageContainer}>
        <div className={classes.contentContainer}>
    <form onSubmit={this.handleSubmit} >

      <Grid container justify="center">
        <Grid item>
          <center>
            <input type="text" className={classes.input} placeholder={"Zip Code"}>
            </input>
          </center>
        </Grid>
        <Grid item>
          <center>
            <select value={this.state.value} onChange={this.handleChange} className={classes.dropdown}>
              <option value="driving">Driving (5 mi.)</option>
              <option value="biking">Biking (2 mi.)</option>
              <option value="walking">Walking (1 mi.)</option>
              <option value="close">Within 4 blocks</option>
            </select>
          </center>
        </Grid>
        <Grid item>
          <center>
            <Paper elevation={4}>
                <DatePicker
                  className={classes.datePicker}
                  selected={moment(this.state.startDate)}
                  onChange={this.handleChangeStartDate}
                />
              </Paper>
          </center>
        </Grid>
        
      </Grid>
    </form>
   
    </div>
    <div className={classes.map}>

     <MapForm/>

      
      </div>
      <div className={classes.table}>
      <Table >
          <TableHead>
            <TableRow>
              <TableCell>{'Player'}</TableCell>
              <TableCell>{'Date'}</TableCell>
              <TableCell>{'Time'}</TableCell>
              <TableCell>{'Skill Level'}</TableCell>
              <TableCell>{'Betting'}</TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell>{'Dylan'}</TableCell>
              <TableCell>{'Sunday'}</TableCell>
              <TableCell>{'Afternoon'}</TableCell>
              <TableCell>{'Professional'}</TableCell>
              <TableCell>{'$100'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{'Tyler McWilliam'}</TableCell>
              <TableCell>{'Never'}</TableCell>
              <TableCell>{'4AM'}</TableCell>
              <TableCell>{'Beginner'}</TableCell>
              <TableCell>{'Performance Improvement Plan'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{'Shelby Powers'}</TableCell>
              <TableCell>{'Monday'}</TableCell>
              <TableCell>{'Morning'}</TableCell>
              <TableCell>{'Amateur'}</TableCell>
              <TableCell>{'Moroccan Shoes'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{'Taka'}</TableCell>
              <TableCell>{'Tuesday'}</TableCell>
              <TableCell>{'Morning'}</TableCell>
              <TableCell>{'Amateur'}</TableCell>
              <TableCell>{'Weed'}</TableCell>
          </TableRow>
        </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.get('locale')),
    currentLangugage: getActiveLanguage(state.get('locale')).code
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTitle: (title) => {
      dispatch(setTitle(title));
    }
  };
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withStyles(styles)(FindMatchPage))


