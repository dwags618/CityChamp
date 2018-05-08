import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import { withStyles } from 'material-ui/styles';
import Table, {TableCell, TableHead, TableRow} from 'material-ui/Table';
import MapForm from './components/MapForm';
import Paper from 'material-ui/Paper';
import DatePicker from 'react-datepicker';
import 'react-week-calendar/dist/style.less';
import Grid from 'material-ui/Grid';
import moment from 'moment';

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
    width: 600, 
    height: 400
  },
  table: {
    marginTop: 20, 
    width: 600, 
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
      x: 10,
    y: 10
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setTitle(this.props.translate('findmatch-page.title'));
  }

  handleSubmit(event) {

      event.preventDefault();

      
    }

    handleChange(event) {

      this.setState({value: event.target.value});

    }

    handleChange = pos => {
    this.setState({
      x: pos.x,
      y: pos.y
    });
  };

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
              <option value="driving">{translate('findmatch-page.driving')}</option>
              <option value="biking">{translate('findmatch-page.biking')}</option>
              <option value="walking">{translate('findmatch-page.walking')}</option>
              <option value="close">{translate('findmatch-page.close')}</option>
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
        <Grid item>
          <center>
            <Paper elevation={4}>
                <reactSlider defaultValue={[0, 100]} withBars />
              </Paper>
          </center>
        </Grid>
      </Grid>
    </form>
   
    </div>
    <Grid item>
    <center>
    <div className={classes.map}>

     <MapForm/>

      
      </div>
      </center>
      </Grid>
      <Grid>
      <center>
      <div className={classes.table}>
      <Table >
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
        </Table>
        </div>
        </center>
        </Grid>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FindMatchPage)));




