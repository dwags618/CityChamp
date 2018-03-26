import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import ActionIcon from 'material-ui-icons/HighlightOff';

const styles = (theme) => ({
  dialog: {
    alignItems:'stretch',
    display:'flex',
    minWidth:400
  },
  centerScreen: {
    left:'50%',
    position:'absolute',
    top:'50%',
    transform:'translate(-50%, -50%)',
  },
  overlay: {
    background:'rgba(255,255,255,0.8)',
    height:'100%',
    left:0,
    position:'fixed',
    top:0,
    width:'100%',
    zIndex:1000,
  },
  container: {
    background:'#135091',
    padding:'10px 20px',
    width:'100%'
  },
  icon: {
    height:48,
    width:48
  },
  iconContainer: {
    alignItems:'center',
    background:'#ab3c8b',
    color: '#ffffff',
    display:'flex',
    padding:10
  },
  message: {
    color:'#ffffff'
  },
  title: {
    color:'#ffffff',
    fontSize:'1em',
    fontWeight:500,
    marginBottom:4,
    textTransform:'uppercase'
  }
});

const ActionAlert = (props) => {
  const { classes, title, message, list, centerScreen, overlay } = props;

  return (
    <div className={classnames({[classes.overlay]: overlay})}>
      <Paper elevation={8} className={
        classnames(
          classes.dialog,
          {
            [classes.centerScreen]: centerScreen
          }
        )}>
        <div className={classes.iconContainer}>
          <Icon color="inherit">
            <ActionIcon className={classes.icon}/>
          </Icon>
        </div>
        <div className={classes.container}>
          <Typography className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.message}>
            {message}
          </Typography>
          {list !== undefined && list.count() > 0 &&
              <ul>
                {list.map((item, index) => (
                  <Typography key={index} className={classes.message}>
                    <li>{item}</li>
                  </Typography>
                ))}
              </ul>
          }
        </div>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(ActionAlert);
