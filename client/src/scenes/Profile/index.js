import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import ImageUploader from 'react-images-upload';

class MapsPage extends Component {

  constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    this.props.setTitle(this.props.translate('profile-page.title'));
  }

  onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

  render() {
    const { translate } = this.props;

    return (
      <ImageUploader
        withIcon={true}
        buttonText='Choose images'
        onChange={this.onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
      />
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
)(MapsPage));
