import React from 'react';
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
});

let MapForm = (props) => {
  const { google, latitude, longitude, zoom, onMarkerClick, name, onClose } = props;
    return (
     <Map google={google}  
          initialCenter={{
            lat: latitude, 
            lng: longitude
          }} 
          zoom={zoom}>
 
      <Marker onClick={onMarkerClick}
              name={name} />

      <InfoWindow onClose={onClose}>
          <div>
          </div>
      </InfoWindow>
      </Map>
    );
  
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD9cAvlDLIsGj1EEmifL_NEiOS98IFs_Ak',
})(withStyles(styles)(MapForm))
