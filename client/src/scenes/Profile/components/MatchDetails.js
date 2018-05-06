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
      value: ''
    };
  }

  render() {

    const { translate, classes } = this.props;

    return (
       <Paper elevation={4} className={classes.formContainerRightTop}>
       <div style={{paddingTop: 20, paddingLeft:20}}>
          <Typography variant="title">
            {translate('profile-page.match-details')}
          </Typography>
        </div>
          
          <div>
          <Casino class="material-icons"/>
           <Straighten class="material-icons"/>
           <FitnessCenter class="material-icons"/>
          </div>
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
