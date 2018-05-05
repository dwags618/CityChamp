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

const styles = theme => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
  },
  formContainerRightTop: {
    height: 275,
    width: 450
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setTitle(this.props.translate('profile-page.title'));
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
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
