import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import addimage from './blank-profile-picture.png';
import $ from 'jquery';

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
  hideButton: {
        display: 'none',
  },
  customfileupload: {
        color: '#ffffff',
        display: 'block',
        position: 'relative',
        width: 200,
        height: 46,
        border: 0,
        margin: 6,
        background: 'linear-gradient(90deg, #3394c1, #4ac3e2 20%)',
        paddingTop: 15,
        '&:before': {
            content: '\' \'',
            display: 'block',
            position: 'absolute',
            top: 7,
            right: '-16px',
            background: 'inherit',
            zIndex: -1
        },
        '&:focus': {
            outline: 0
        }
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
        $('#imgPreview').show();
        $('#addimage').hide();
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
      $imagePreview = (<div><img src={imagePreviewUrl} alt={imagePreviewUrl} width={200} height={200} style={{paddingTop:20}} /></div>);
    } 

    console.log(this.state.pictures)
    const { translate, classes } = this.props;

    return (
      <div className={classes.pageContainer}>
        <div className={classes.contentContainer}>
          <Grid container justify="center">
            <Grid item>
              <center>
                <Paper elevation={4} className={classes.formContainerLeft}>
                  <div >
                    <div className="imgPreview" id="imgPreview">
              {$imagePreview}
              </div>
        
            <img width="200" height="200"  style={{paddingTop:20}} alt={addimage} src={addimage} id="addimage" class="addimage"    />
            <div >
              <label  for="file-upload" className={classes.customfileupload}>
              Upload Image
          </label>
<input id="file-upload" type="file" className={classes.hideButton}  onChange={(e)=>this._handleImageChange(e)} />
      </div>
                   
                  </div>
                </Paper>
              </center>
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
