import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import addimage from './blank-profile-picture.png';
import $ from 'jquery';
import { getPlayers } from '../../../services/api/matchdetails';
import SingleUserReportTable from './SingleUserReportTable';
import { saveImage } from '../../../services/api/matchdetails';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { saveSliderValue } from '../../../services/api/matchdetails';

const styles = theme => ({
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
  formContainerLeft: {
    height: 600,
    width: 350
  },
  slider: {
    position: 'relative',
    width: 200, 
    paddingTop: 10
  }
})

class ProfilePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      value: '',
      users: [],
      user: {
        username: '',
        file:'',
        sliderValue: 1,
      }
    };
    
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
    this.getAllUsers();
  }

  componentDidUpdate() {
    saveSliderValue(this.state.user)
      .then(result => result.json())
      .then(data => {
      console.log(data)
      });
  }

  onSliderChange = (sliderValue) => {
    console.log(sliderValue);
    this.setState({
      user:{
          sliderValue: sliderValue,
          username: localStorage.getItem('username')
        }
    });
  }

  _handleImageChange(e) {
    $('#imgPreview').show();
    $('#addimage').hide();
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
        this.setState({
            imagePreviewUrl: reader.result,
            user: {
            file: file.name,
            username: localStorage.getItem('username'),
          }
        });
    }
    reader.readAsDataURL(file)

    saveImage(this.state.user)
      .then(result => result.json())
      .then(data => {
      console.log(data)
      });
  }

  render() {
    console.log(this.state.user.username)
    console.log(this.state.user.file)
    console.log(this.state.imagePreviewUrl)
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<div><img src={imagePreviewUrl} alt={imagePreviewUrl} width={200} height={200} style={{paddingTop:20}} /></div>);
    } 

    const { classes } = this.props;

    return (
     <Paper elevation={4} className={classes.formContainerLeft}>
        <center>
          <div>
            <div className="imgPreview" id="imgPreview">
              {$imagePreview}
            </div>
            <img width="200" height="200"  style={{paddingTop:20}} alt={addimage} src={addimage} id="addimage" class="addimage"    />
              <div>
                <label for="file-upload" className={classes.customfileupload}>
                  Upload Image
                </label>
                <input id="file-upload" type="file" className={classes.hideButton}  onChange={(e)=>this._handleImageChange(e)} />
              </div>
            </div>
        </center>
        <div style={{paddingLeft:70, paddingTop:20}}>
          <SingleUserReportTable
            users={this.state.users}
            username={this.state.user.username}
          />
        </div>
        <div>
        <center>
        <div style={{paddingTop:50}}>
        Maximum Distance
        </div>
          <Slider step={1} value={this.state.user.sliderValue} defaultValue={5} onChange={this.onSliderChange} max={20} className={classes.slider}/>
          {this.state.user.sliderValue} mi.
          </center>
        </div>
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
