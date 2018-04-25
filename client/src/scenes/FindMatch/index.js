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
  }
})

class FindMatchPage extends Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
        reviews: '',
      value: ''
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
    <div style={{position: 'absolute', height: '100%', width: '100%'}}>
    <div className={classes.filter}>
    <form onSubmit={this.handleSubmit} >
    <input type="text" className={classes.input} placeholder={"Zip Code"}>
    </input>
    
      <select value={this.state.value} onChange={this.handleChange} className={classes.dropdown}>
        <option value="driving">Driving (5 mi.)</option>
        <option value="biking">Biking (2 mi.)</option>
        <option value="walking">Walking (1 mi.)</option>
        <option value="close">Within 4 blocks</option>
      </select>
      <select value={this.state.value} onChange={this.handleChange} className={classes.dropdown}>
        <option value="driving">Driving (5 mi.)</option>
        <option value="biking">Biking (2 mi.)</option>
        <option value="walking">Walking (1 mi.)</option>
        <option value="close">Within 4 blocks</option>
      </select>
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
            <TableCell>{'Cody'}</TableCell>
              <TableCell>{'Never'}</TableCell>
              <TableCell>{'4AM'}</TableCell>
              <TableCell>{'Beginner'}</TableCell>
              <TableCell>{'Signed Arsenal Jersey'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{'Ben'}</TableCell>
              <TableCell>{'Monday'}</TableCell>
              <TableCell>{'Morning'}</TableCell>
              <TableCell>{'Intermedia'}</TableCell>
              <TableCell>{'$5'}</TableCell>
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


