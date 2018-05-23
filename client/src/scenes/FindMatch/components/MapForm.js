import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { saveCoordinates } from '../../../services/api/matchdetails';

const styles = theme => ({
  map: {
    position:'relative', 
    marginTop: 20, 
    marginLeft: 75, 
    width: 750, 
    height: 500
  }
});

class MapForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      showingInfoWindow1: false,
      showingInfoWindow2: false,
      showingInfoWindow3: false,
      activeMarker: {},
      activeMarker1: {},
      activeMarker2: {},
      activeMarker3: {},
      selectedPlace: {},
      user: {
        username: localStorage.getItem("username"),
        latitude: this.props.latitude,
        longitude: this.props.longitude
      }
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.save = this.save.bind(this);
    console.log(this.props.latitude)
  }

  componentDidMount() {
    this.save();
  }

  save() {
  
    saveCoordinates(this.state.user)
      .then(result => result.json())
      .then(data => {
      console.log(data)
      });
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMarkerClick1 = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker1: marker,
      showingInfoWindow1: true
    });
  }
  onMarkerClick2 = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker2: marker,
      showingInfoWindow2: true
    });
  }
  onMarkerClick3 = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker3: marker,
      showingInfoWindow3: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

render() {
    const { google, latitude, longitude, zoom, name } = this.props;

  return(

    
     <Map google={google}  
          initialCenter={{
            lat: latitude, 
            lng: longitude
          }} 
          zoom={zoom}>
 
      <Marker onClick={this.onMarkerClick3}
              name={name} />
              <InfoWindow
          marker = { this.state.activeMarker3 }
          visible = { this.state.showingInfoWindow3 }
        >
          <Paper>
            <Typography
              variant = 'body2'
              component = 'h1'
            >
              My Location
            </Typography>
            
          </Paper>
        </InfoWindow>

       <Marker
          onClick = { this.onMarkerClick }
          title = { 'Seward Park' }
          position = {{ lat: 41.902807, lng: -87.637611 }}
          name = { 'Seward Park' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'body2'
              component = 'h1'
            >
              Seward Park
            </Typography>
            
          </Paper>
        </InfoWindow>
        <Marker
          onClick = { this.onMarkerClick1 }
          title = { 'North Avenue' }
          position = {{ lat: 41.917315, lng: -87.629979 }}
          name = { 'North Avenue' }
        />
        <InfoWindow
          marker = { this.state.activeMarker1 }
          visible = { this.state.showingInfoWindow1 }
        >
          <Paper>
            <Typography
              variant = 'body2'
              component = 'h1'
            >
              North Avenue
            </Typography>
            
          </Paper>
        </InfoWindow>
        <Marker
          onClick = { this.onMarkerClick2 }
          title = { 'Oz Park' }
          position = {{ lat: 41.922641, lng: -87.647536 }}
          name = { 'Oz Park' }
        />
        <InfoWindow
          marker = { this.state.activeMarker2 }
          visible = { this.state.showingInfoWindow2 }
        >
          <Paper>
            <Typography
              variant = 'body2'
              component = 'h1'
            >
              Oz Park
            </Typography>
            
          </Paper>
        </InfoWindow>
      </Map>


    );
  

}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD9cAvlDLIsGj1EEmifL_NEiOS98IFs_Ak',
})(withStyles(styles)(MapForm))

