import React from 'react';
import { CssBaseline, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Link } from '@material-ui/core';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import DescriptionIcon from "@material-ui/icons/Description";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PeopleIcon from "@material-ui/icons/People";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = '15%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: -1
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'fit-content',
    backgroundColor: '#121212',
    color: "#a1a1a1",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  item: {
    marginBottom: 10,
    '&:hover': {
      background: "#dcdcdc",
    },
  }
}));

const SideBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>

          <Link href="/home" style={{ color: "#a1a1a1" }}>
            <ListItem button className={classes.item}>
              <ListItemIcon>
                <DashboardIcon style={{ fill: "#e91e63" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          <Link href="/profile" style={{ color: "#a1a1a1" }}>
            <ListItem button className={classes.item}>
              <ListItemIcon>
                <PersonIcon style={{ fill: "#e91e63" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>

          <Link href="/tracker" style={{ color: "#a1a1a1" }}>

            <ListItem button className={classes.item} >
              <ListItemIcon>
                <PeopleIcon style={{ fill: "#e91e63" }} />
              </ListItemIcon>
              <ListItemText primary="Tracker" />
            </ListItem>
          </Link>

          <ListItem button className={classes.item}>
            <ListItemIcon>
              <DescriptionIcon style={{ fill: "#e91e63" }} />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>

          <Link href="/friends" style={{ color: "#a1a1a1" }}>
            <ListItem button className={classes.item}>
              <ListItemIcon>
                <EventAvailableIcon style={{ fill: "#e91e63" }} />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItem>
          </Link>

        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default SideBar;