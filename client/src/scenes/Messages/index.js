import React, { Component } from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import Typography from 'material-ui/Typography';

class MessagesPage extends Component {
  componentDidMount() {
    this.props.setTitle(this.props.translate('messages-page.title'));
  }

  render() {
    const { translate } = this.props;

    return (
      <Typography variant="title">
        {translate('messages-page.title')}
      </Typography>
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
)(MessagesPage));
