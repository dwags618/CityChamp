import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
  },
  formContainerLeft: {
    height: 600,
    width: 350
  },
  formContainerRightTop: {
    height: 275,
    width: 450
  },
  formContainerRightBottom: {
    paddingTop:50
  },
  fileInput: {
    
  },
  footerContainer: {
    paddingBottom: 20
  },
  contentContainer: {
    flex: '1 0 auto',
  },
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

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="imagePreviewUrl" />);
    } 

    console.log(this.state.pictures)
    const { translate, classes } = this.props;

    return (
      <div className={classes.pageContainer}>
        <div className={classes.contentContainer}>
          <Grid container justify="center">
            <Grid item>
              <center>
                <Paper elevation={4}>
                  <div className={classes.formContainerLeft}>
                    <div className="imgPreview">
                      {$imagePreview}
                    </div>
                    <form onSubmit={(e)=>this._handleSubmit(e)} >

                      <input className={classes.fileInput} type="file" onChange={(e)=>this._handleImageChange(e)} />
                        <div>
                          <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                        </div>
                    </form>
                  </div>
                </Paper>
              </center>
            </Grid>
            <div style={{marginLeft: 50, marginTop:10}}>
            <Grid item>
              <center>
                <Paper elevation={4}>
                  <form onSubmit={this.handleSubmit} className={classes.formContainerRightTop}>
                    <label>
                      Name:
                      <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <div className={classes.footerContainer}>
                    <input type="submit" value="Submit"  />
                    </div>
                  </form>
                </Paper>
                </center>
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
