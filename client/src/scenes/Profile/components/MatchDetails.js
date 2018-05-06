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
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const styles = theme => ({
  formContainerRightTop: {
    height: 275,
    width: 450
  }
})

class ProfilePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      rangeValue: [20, 40]
    };
  }

  onSliderChange = (rangeValue) => {
    console.log(rangeValue);
    this.setState({
      rangeValue,
    });
  }

  render() {

    const { translate, classes } = this.props;

    return (
     <Paper elevation={4} className={classes.formContainerRightTop}>
       <div style={{paddingTop: 30, paddingLeft:30}}>
          <Typography variant="title">
            {translate('profile-page.match-details')}
          </Typography>
        </div>
        <div style={{paddingTop: 20, paddingLeft:30}}>
         <Straighten class="material-icons"/>
         <a style={{marginLeft: 30}}>Height</a>

         <FitnessCenter class="material-icons-straighten"/>
         <a style={{marginLeft: 30}}>Weight</a>
         <div/>
         <Casino class="material-icons-casino"/>
         <Range step={5} allowCross={false} value={this.state.rangeValue} onChange={this.onSliderChange} style={{width:150, display: 'inline-block', paddingBottom:25, marginLeft: 30}}/>
          
        </div>
        <a style={{marginLeft:150}}>${this.state.rangeValue[0]}</a>
        <a> - ${this.state.rangeValue[1]}</a>
        <center>
          <form onSubmit={this.handleSubmit} >
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <div className={classes.footerContainer}>
            <input type="submit" value="Submit"  />
            </div>
          </form>
        </center>
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
