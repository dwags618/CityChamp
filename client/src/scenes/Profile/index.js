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
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment)

const styles = theme => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
  },
  formContainerRightBottom: {
    paddingTop:25
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
                      <Paper elevation={4} style={{width:575, height: 375}}>
                        <div style={{paddingTop: 15, paddingLeft:30}}>
                          <Typography variant="title">
                            {translate('profile-page.schedule')}
                          </Typography>
                          </div>
                          <BigCalendar
                            selectable
                            views={['week']}
                            style={{height: '330px', width: 550, paddingTop:15, paddingLeft:30}}
                            events={[]}
                            defaultView="week"
                            onSelectEvent={event => alert(event.title)}
                            onSelectSlot={slotInfo =>
                              alert(
                                `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                  `\nend: ${slotInfo.end.toLocaleString()}` +
                                  `\naction: ${slotInfo.action}`
                              )
                            }
                          />
                      </Paper>
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
