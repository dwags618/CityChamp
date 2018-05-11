import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import MapForm from './MapForm';

class Geolocated extends Component {
  
  render() {
    return (
     !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <MapForm
              google={this.props.google}
              latitude={this.props.coords.latitude}
              longitude={this.props.coords.longitude}
              />
          : <div>Getting the location data&hellip; </div> 
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Geolocated);


