import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ProfilePicture from './components/ProfilePicture';
import MatchDetails from './components/MatchDetails';

const styles = theme => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
  },
  formContainerRightBottom: {
    paddingTop:50
  },
  footerContainer: {
    paddingBottom: 20
  },
  contentContainer: {
    flex: '1 0 auto',
  }
})

class MapsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      value: ''
    };
  }

  componentDidMount() {
    this.props.setTitle(this.props.translate('profile-page.title'));
  }

  render() {
  const { translate, classes } = this.props;

    return (
      <div className={classes.pageContainer}>
        <div className={classes.contentContainer}>
          <Grid container justify="center">
            <Grid item>
              <ProfilePicture/>
            </Grid>
            <div style={{marginLeft: 50, marginTop:10}}>
              <Grid item>
                <MatchDetails/>
                <div className={classes.formContainerRightBottom}>
                  <Grid item>
                    <center>
                      <Paper elevation={4}>
                        <div style={{height: 275}}/>
                      </Paper>
                    </center>
                  </Grid>
                </div>
              </Grid>
            </div>
          </Grid>
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
)(withStyles(styles)(MapsPage)));
