import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from 'redux/navigation';
import GoogleMapReact from 'google-map-react'
const AnyReactComponent = ({ text }) => <div>{ text }</div>;


class FindMatchPage extends Component {
  componentDidMount() {
    this.props.setTitle(this.props.translate('findmatch-page.title'));
  }

 static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    const { translate } = this.props;

    return (
     // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9cAvlDLIsGj1EEmifL_NEiOS98IFs_Ak' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
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
)(FindMatchPage));
