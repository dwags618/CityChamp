import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import { withStyles } from 'material-ui/styles';
import MapForm from './components/Geolocated';
import DatePicker from 'react-datepicker';
import 'react-week-calendar/dist/style.less';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getPlayers } from '../../services/api/matchdetails';
import Geocoder from 'react-native-geocoding';
import SimpleUserReportTable from './components/SimpleUserReportTable';

Geocoder.init('AIzaSyD9cAvlDLIsGj1EEmifL_NEiOS98IFs_Ak'); // use a valid API key

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
    height:45,
    marginRight: 20
  },
  search: {
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: '#1f5592',
    width: 200,
    height: 45,
    color: 'white'
  },
  map: {
    position:'relative', 
    marginTop: 20, 
    width: 600, 
    height: 400,
    paddingRight: 50
  },
  table: {
    width: 600, 
    height: 350,
    paddingLeft: 50
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
    position: 'relative'
  },
  range: {
    position: 'relative',
    width: 200, 
  }
})

Geocoder.from("1355 N. Sandburg Terrace Chicago, IL")
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
        })
        .catch(error => console.warn(error));


class FindMatchPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      reviews: '',
      value: '',
      startDate: moment(),
      x: 10,
      y: 10,
      rangeValue: [20, 40],
      users: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  getAllUsers(key) {
    getPlayers()
      .then(result => result.json())
      .then(data => {
        this.setState({users: data.users});

      })
      .catch(err => {

      });
  }

  componentDidMount() {
    this.props.setTitle(this.props.translate('findmatch-page.title'));
    this.getAllUsers();
  }

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onSliderChange = (rangeValue) => {
    this.setState({
      rangeValue,
    });
  }

  render() {
    console.log(this.state.users)
    const { translate, classes } = this.props;
    return (
      <div className={classes.pageContainer}>
        <div className={classes.contentContainer}>
          <center>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <form onSubmit={this.handleSubmit}>
                  <td>
                    <input type="text" className={classes.input} placeholder={"Address"}></input>
                  </td>
                  <td>
                    <select value={this.state.value} onChange={this.handleChange} className={classes.dropdown}>
                      <option value="driving">{translate('findmatch-page.driving')}</option>
                      <option value="biking">{translate('findmatch-page.biking')}</option>
                      <option value="walking">{translate('findmatch-page.walking')}</option>
                      <option value="close">{translate('findmatch-page.close')}</option>
                    </select>
                  </td>
                  <td>
                    <DatePicker
                    className={classes.datePicker}
                    selected={this.state.startDate}
                    onChange={this.handleChangeStartDate}
                    />
                  </td>
                  <td>
                    <Range step={5} allowCross={false} value={this.state.rangeValue} onChange={this.onSliderChange} className={classes.range}/>
                    ${this.state.rangeValue[0]}-${this.state.rangeValue[1]}  
                  </td>
                  <td>
                  <input type="submit" value="Submit" className={classes.search}/>
                  </td>
                </form> 
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.map}>
                  <MapForm/>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.table}>
                 <SimpleUserReportTable
                  users={this.state.users}
                  {...translate([
                    'findmatch-page.name',
                    'findmatch-page.username',
                    'findmatch-page.minimum-bet',
                    'findmatch-page.maximum-bet'
                  ])}
                  />
                </div>
              </Grid>
            </Grid>
          </center>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FindMatchPage)));




