import React from 'react';
import {withStyles} from 'material-ui/styles';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const styles = theme => ({
  noWrap: {
    whiteSpace: 'nowrap'
  },
  
});

const TableItems = (classes, props, users, username, onSliderChange, sliderValue) => {
  var output = [];
  for (var user in users) {
    var n = users[user];

    if(n.username===username)
    output.push(
      
      <div>
        <div>Name: {n.name}</div>
        <div>Username: {n.username}</div>
         <center>
        <div style={{paddingTop:50}}>
        Maximum Distance
        </div>
          <Slider step={1} value={sliderValue} defaultValue={n.maximumDistance} onChange={onSliderChange} max={20} className={classes.slider}/>
          {sliderValue} mi.
          </center>
     </div>
    );
  }
  return output;
};

const SingleUserReportTable = props => {
  const {classes, users, username, onSliderChange, sliderValue } = props;

    return (
      <div style={{paddingTop:20}}>
        
            {TableItems(classes, props, users, username, onSliderChange, sliderValue)}
          
      </div>
    );
  
};

export default withStyles(styles)(SingleUserReportTable);
