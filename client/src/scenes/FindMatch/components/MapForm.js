import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  map: {
    position:'relative', 
    marginTop: 20, 
    marginLeft: 75, 
    width: 750, 
    height: 500
  }
})

class MapForm extends Component {

 static defaultProps = {
    center: {
      lat: 41.906,
      lng: -87.63
    },
    zoom: 11
  };
  
  render() {

    return (

     <Map google={this.props.google}  initialCenter={{
            lat: 41.906,
            lng: -87.63
          }} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD9cAvlDLIsGj1EEmifL_NEiOS98IFs_Ak',
})(withStyles(styles)(MapForm))


