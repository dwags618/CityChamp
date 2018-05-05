import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import addimage from './blank-profile-picture.png';
import $ from 'jquery';

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
          <Typography variant="title">
            {translate('profile-page.title')}
          </Typography>
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
