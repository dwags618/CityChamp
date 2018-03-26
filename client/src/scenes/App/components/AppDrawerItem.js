import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

const styles = {
  level0: {
    color:'#ffffff',
    fontSize:'22px',
    lineHeight:'36px',
    paddingLeft:36,
    '&:hover': {
      background: '#001952',
    },
  },
  level1: {
    background: '#8591BB',
    color:'#ffffff',
    fontSize:'20px',
    lineHeight:'28px',
    paddingLeft:71,
    '&:hover': {
      background: '#556DA3',
    },
  },
  level2: {
    background: '#EDF0F9',
    color: '#135091',
    fontSize:'18px',
    lineHeight:'22px',
    paddingLeft:96,
    '&:hover': {
      background: '#CCD1E4',
    },
  },
  listItemText: {
    color:'inherit',
    fontSize:'inherit',
    lineHeight:'inherit',
    textTransform:'uppercase'
  }
};

class AppDrawerItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    if (this.props.openImmediately) {
      this.setState({ open: true });
    }
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { children, classes, href, icon, title, depthLevel } = this.props;

    /* Items with a href should not have children */
    if (href) {
      return (
        <Link to={href} style={{textDecoration: 'none'}}>
          <ListItem 
            className={
                classnames(
                  {
                    [classes.level0]: depthLevel === 0,
                    [classes.level1]: depthLevel === 1,
                    [classes.level2]: depthLevel === 2,
                  }
                )
            }
            onClick={this.props.onClick}
            disableRipple
            button
          >
            <Icon>
              {icon}
            </Icon>
            <ListItemText
              disableTypography
              primary={<Typography variant="subheading" className={classes.listItemText}>{title}</Typography>}
            />
          </ListItem>
        </Link>
      );
    }

    return (
      <div>
        <ListItem 
          className={
              classnames(
                {
                  [classes.level0]: depthLevel === 0,
                  [classes.level1]: depthLevel === 1,
                  [classes.level2]: depthLevel === 2,
                }
              )
          }
          onClick={this.handleClick}
          disableRipple
          button
        >
          <Icon>
            {icon}
          </Icon>
          <ListItemText
            disableTypography
            primary={<Typography variant="subheading" className={classes.listItemText}>{title}</Typography>}
          />
        </ListItem>
        <div className={classes.subNav}>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(AppDrawerItem);
