import React, { createElement } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem } from 'material-ui/List';
import AppDrawerItem from './AppDrawerItem';
import Logo from '../../../images/MCC_logo.png';
import AppPages from './AppPages';

const styles = theme => ({
  paper: {
    background: theme.palette.primary.main,
    width: 400
  },
  listItem: {
    '&:hover': {
      background: '#001952',
    },
  },
  logoListItem: {
    height: 80,
    paddingLeft: 36
  },
  icon: {
    height:'36px',
    width:'36px'
  }
});

const renderNavItems = (props, pages, depthLevel = 0) => {
  let navItems = null;

  if (pages && pages.length) {
    navItems = pages.reduce(reduceChildRoutes.bind(null, props, depthLevel), []);
  }

  return navItems;
}

const reduceChildRoutes = (props, depthLevel, pages, childPage, index) => {
  if (childPage.children && childPage.children.length > 1) {
    const openImmediately = props.location.pathname.indexOf(childPage.pathname) !== -1 || false;

    pages.push(
      <AppDrawerItem
        key={index}
        openImmediately={openImmediately}
        title={props.translate(childPage.title)}
        icon={childPage.icon !== undefined && createElement(childPage.icon, {className:props.classes.icon})}
        depthLevel={depthLevel}
      >
        {renderNavItems(props, childPage.children, depthLevel + 1)}
      </AppDrawerItem>
    );
  } else if (childPage.title !== false) {
    childPage =
      childPage.children && childPage.children.length === 1 ? childPage.children[0] : childPage;

    pages.push(
      <AppDrawerItem
        key={index}
        title={props.translate(childPage.title)}
        icon={childPage.icon !== undefined && createElement(childPage.icon, {className:props.classes.icon})}
        onClick={props.handleDrawerClose}
        href={childPage.pathname}
        depthLevel={depthLevel}
      />
    );
  }

  return pages;
}

const AppDrawer = (props) => {
  const { classes, drawerIsOpen, handleDrawerClose } = props;

  return (
    <Drawer
      open={drawerIsOpen}
      onClose={handleDrawerClose}
      classes={{
        paper: classes.paper,
      }}>
      <div>
        <List>
          <Link to="/">
            <ListItem className={classes.logoListItem}>
              <img width="200" src={Logo} alt="MyCityChamp Logo" />
            </ListItem>
          </Link>
          {renderNavItems(props, AppPages)}
        </List>
      </div>
    </Drawer>
  );
};

export default withRouter(withStyles(styles)(AppDrawer));
