import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from 'redux/navigation';
import GoogleMapReact from 'google-map-react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const AnyReactComponent = ({ text }) => <div>{ text }</div>;


class FindMatchPage extends Component {
  

 static defaultProps = {
    center: {
      lat: 41.906,
      lng: -87.63
    },
    zoom: 11
  };

login = () => {
    
  }


  render() {
    const { translate } = this.props;

    return (
    <div>
    <input type="text" id="inputTextAddress" style={{width:'200px'}} title="Address to Geocode">
    </input>
    <input type="button" onclick="this.codeAddress" id="inputButtonGeocode" style={{width:'150px'}} title="Search" value="Search">
    </input>
    <div style={{paddingLeft: '150px'}}>

     <Map google={this.props.google}  initialCenter={{
            lat: 41.906,
            lng: -87.63
          }} style={{ width: '500px', height: '500px'}} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
            </div>
        </InfoWindow>
      </Map>
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD9cAvlDLIsGj1EEmifL_NEiOS98IFs_Ak'
})(FindMatchPage)

