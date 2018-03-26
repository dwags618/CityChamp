import React from 'react';
import classnames from 'classnames';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  buttonContainer : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto',
  },
  backButton : {
    color: '#ffffff',
    display: 'block',
    position: 'relative',
    width: 90,
    height: 46,
    border: 0,
    margin: '0 6px',
    background: theme.palette.primary.main,
    paddingRight: 16,
    fontFamily: theme.typography.button.fontFamily,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    textTransform: 'uppercase',
    '&:after': {
      content: '\' \'',
      display: 'block',
      position: 'absolute',
      height: 32,
      width: 32,
      top: 7,
      left: '-16px',
      transform: 'rotate(45deg)',
      background: 'inherit',
      zIndex: -1
    },
    '&:focus': {
      outline: 0
    }
  },
  nextButton : {
    color: '#ffffff',
    display: 'block',
    position: 'relative',
    width: 90,
    height: 46,
    border: 0,
    margin: '0 6px',
    background: '#b53f95',
    paddingLeft: 16,
    fontFamily: theme.typography.button.fontFamily,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    textTransform: 'uppercase',
    '&:before': {
      content: '\' \'',
      display: 'block',
      position: 'absolute',
      height: 32,
      width: 32,
      top: 7,
      right: '-16px',
      transform: 'rotate(45deg)',
      background: 'inherit',
      zIndex: -1
    },
    '&:focus': {
      outline: 0
    }
  },
  disabled: {
    background: '#d7d7d7',
    color: '#a7a7a7'
  }
});

class BackNextButtons extends React.Component {
  render() {
    const {classes, backOnClick, nextOnClick, backDisabled, nextDisabled, backButtonText, nextButtonText} = this.props;

    return (
      <div className={classes.buttonContainer}>
        <button
          type="button"
          onClick={backDisabled ? null : backOnClick}
          disabled={backDisabled}
          className={
            classnames(
              classes.backButton,
              {
                [classes.disabled]: backDisabled
              }
            )
          }>{backButtonText}</button>
        <button
          type="button"
          onClick={nextDisabled ? null : nextOnClick}
          disabled={nextDisabled}
          className={
            classnames(
              classes.nextButton,
              {
                [classes.disabled]: nextDisabled
              }
            )
          }>{nextButtonText}</button>
      </div>
    );
  }
}

export default withStyles(styles)(BackNextButtons);
