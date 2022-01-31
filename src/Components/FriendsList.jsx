import React, { useState, useEffect } from 'react';
import UserService from '../services/users';
import { makeStyles, Typography, Card, CardMedia, CardContent, CardActionArea, GridList } from '@material-ui/core';
import { connect } from "react-redux";
import * as Types from '../store/types';
import NavBar from './Navbar';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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

const FriendsList = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [friends, setFriends] = useState([]);
  const [sessionToken, setSessionToken] = useState(localStorage.getItem('userToken'));

  useEffect(() => {
    UserService.getMyFriends(sessionToken)
      .then((res) => {
        if (res.data.success === false) {
          console.log(res.data.message, 'err');
        }
        setFriends(res.data.data.friends);
      });
  }, []);

  const getImage = (id) => {

    UserService.getUser(id)
      .then((res) => {
        const {
          data: {
            data: {
              profilePhoto
            }
          }
        } = res;
        return profilePhoto;
      });
  };

  const routeChange = (id) => {
    navigate(id);
  };

  return (
    <div>
      <NavBar />
      <SideBar />

      <div className={classes.grids}>
        <GridList cellHeight={"auto"} className={classes.gridList} spacing={0}>
          {friends.map((el) => (
            <>
              <Card className={classes.card} onClick={() => routeChange(el._id)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="160"
                    image={el.friendPhoto}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="h2" noWrap>
                      {el.firstName} {el.lastName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          ))}
        </GridList>
      </div>
    </div>
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
  })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(FriendsList);