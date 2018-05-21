import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Casino from 'material-ui-icons/Casino';
import FitnessCenter from 'material-ui-icons/FitnessCenter';
import Straighten from 'material-ui-icons/Straighten';
import "./style.css";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {saveBetAmount} from '../../../services/api/matchdetails';
import { Button } from 'reactstrap';

const styles = theme => ({
  formContainerRightTop: {
    height: 200,
    width: 575,
    padding: 15
  },
  save: {
    marginLeft: 250,
    position: 'absolute'
  }
})

class ProfilePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      user: {
        rangeValue: [20, 40],
        username: localStorage.getItem('username')
      }
    };

    this.save = this.save.bind(this);
  }

  onSliderChange = (rangeValue) => {
    console.log(rangeValue);
    this.setState({
      user:{
      rangeValue,
      username: localStorage.getItem('username')}
    });
  };

  save() {
  
    saveBetAmount(this.state.user)
      .then(result => result.json())
      .then(data => {
      console.log(data)
      });
  }

  render() {

    const { translate, classes } = this.props;

    return (

     <Paper elevation={4} className={classes.formContainerRightTop}>     
      <table style={{width:350, height: 150}}>
        <tr>
          <Typography variant="title" style={{paddingBottom:10}}>
            {translate('profile-page.match-details')}
          </Typography>
        </tr>
        <tr>
          <td><Straighten class="material-icons-straighten"/></td>
          <td><a>5'10"</a>
          <div/>
          Height
          <div/>
          </td>
          <td><FitnessCenter class="material-icons-straighten"/></td>
          <td>150 lbs.
          <div/>
          Weight
          <div/>
          </td>

        </tr>
        <tr>
          <td><Casino class="material-icons-straighten" style={{marginTop:30}}/></td>
          <td>Betting Amount
          <div/>
          <Range step={5} allowCross={false} value={this.state.user.rangeValue} onChange={this.onSliderChange} />
          <div/>
          ${this.state.user.rangeValue[0]}-${this.state.user.rangeValue[1]}
          </td>
          <td>
          <Button onClick={this.save} className={classes.save}>Save</Button>
          </td>
        </tr>
      </table>
      
    </Paper>
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
)(withStyles(styles)(ProfilePicture)));
