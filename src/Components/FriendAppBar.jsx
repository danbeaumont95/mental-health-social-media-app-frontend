import React, { useState } from 'react';
import { AppBar, Container, Toolbar, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import * as Types from '../store/types';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: 0,
    backgroundColor: 'black'
  },
  box: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 'fit-content%',
    height: 'fit-content',
    backgroundColor: '#e91e63',
    borderRadius: '.5rem',
    color: '#111827',
    border: '1px solid #414141',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  },
  listRoot: {
    height: '100vh'
  },
  profileHeader: {
    marginTop: theme.spacing(2),
    backgroundColor: "#e91e6380",
    borderRadius: 10,
    width: '40%',
  },
  noFriends: {
    color: '#a3b3a3',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  gridList: {
    width: "100%",
    height: "auto",
    margin: '0 auto',
    maxWidth: '1040px'
  },
  card: {
    maxWidth: 160,
    height: "100%",
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4),
    backgroundColor: '#121212',
    color: '#e91e63'
  },
  grids: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: '15%'
  }
}));

const FriendAppBar = (props) => {
  console.log(props, 'props in FriendAppBar');
  const navigate = useNavigate();
  const {
    user: {
      friends
    }
  } = props;
  const classes = useStyles();

  const [showPosts, setShowPosts] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const handlePostsClicked = () => {
    props.updateFriendButtonClicked('posts');
  };

  const handleAboutClicked = () => {
    props.updateFriendButtonClicked('about');
  };

  const handleFriendsClicked = () => {
    props.updateFriendButtonClicked('friends');
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className={classes.box}>
              <Button
                className={classes.button}
                onClick={handlePostsClicked}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Posts
              </Button>
              <Button
                className={classes.button}
                onClick={handleFriendsClicked}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Friends
              </Button>
            </Box>

          </Toolbar>
        </Container>
      </AppBar >

    </>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateAccessToken: accessToken => dispatch({
    type: Types.UPDATE_ACCESSTOKEN, payload: {
      accessToken
    }
  }),
  updateLoggedInUser: loggedInUser => dispatch({
    type: Types.UPDATE_LOGGED_IN_USER, payload: {
      loggedInUser
    }
  }),
  updateFriendButtonClicked: friendButtonClicked => dispatch({
    type: Types.UPDATE_FRIEND_BUTTON_CLICKED, payload: {
      friendButtonClicked
    }
  })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(FriendAppBar);