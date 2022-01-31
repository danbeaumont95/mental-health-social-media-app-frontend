import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Avatar, Menu, MenuItem, Button, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import BeaumontLogo from '../Images/BeaumontLogo.jpeg';
const useStyles = makeStyles((theme) => ({
  row: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 0,
    paddingLeft: 0,
    flexDirection: 'row'
  },
  container: {
    width: 1170,
    margin: "auto"
  },
  buttonFontSize: {
    fontSize: "11px",
    color: "#a1a1a1"
  },
  AppBar: {
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
    backgroundSize: "cover",
    flexDirection: 'row',
    backgroundColor: '#121212',
  },
  mainLogo: {
    color: "#a1a1a1",
    justifyContent: "left",
    '&:hover': {
      background: "transparent"
    }
  },
  avatar: {
    height: "100%",
    borderRadius: 0,
  },
  logoutButton: {
    background: "#e91e63",
    color: "#fff",
    borderRadius: "25px",
    padding: "0px 25px",
    '&:hover': {
      background: 'blue',
      boxShadow: "0px 2px 10px #888888"
    }
  }
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('updatedProfile');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.AppBar}>
        <Grid item sm={12} xs={12} className={classes.container}>
          <Toolbar>
            <Grid className={classes.grow}>
              <Button className={[classes.mainLogo]}>
                <Avatar src={BeaumontLogo} className={classes.avatar} />
              </Button>
            </Grid>
            <Button color="inherit" className={[classes.buttonFontSize, classes.logoutButton]} onClick={handleLogoutClick}>Logout</Button>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
};

export default NavBar;