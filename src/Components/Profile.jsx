import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PostService from '../services/posts';
import { Card, Typography, CardContent, CardHeader, Avatar, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as Types from '../store/types';
import LikeComment from './LikeComment';
import PostUserProfilePhoto from './PostUserProfilePhoto';
import PostUserName from './PostUserName';
import NavBar from './Navbar';
import SideBar from './SideBar';
import UserService from '../services/users';
import jwt_decode from "jwt-decode";
import EditProfileSwal from './EditProfileSwal';
import Footer from './Footer';



const useStyles = makeStyles((theme) => ({
  allContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '33%',
    marginTop: theme.spacing(3),
    marginBottom: 0,
    paddingBottom: 0,
    background: "#000",
    color: '#fff'
  },
  header: {
    marginLeft: 'auto',
    marginBottom: 0,
    paddingBottom: 6
  },
  date: {
    width: 'fit-content'
  },
  content: {
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  body: {
    textAlign: 'left',
    marginBottom: '1px',
  },
  emotion: {
    textAlign: 'left'
  },
  profileHeader: {
    backgroundColor: "#e91e6380",
    borderRadius: 10,
    height: 100,
    width: '40%',

  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
  },
  profileCard: {
    width: '40%',
    backgroundColor: 'black',
  },
  profileName: {
    color: 'white',
    marginTop: theme.spacing(9)
  },
  button: {
    width: '32%',
    height: '10px',
    backgroundColor: '#e91e63',
    borderRadius: '.5rem',
    color: '#111827',
    border: '1px solid #414141',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const Profile = (props) => {
  const { userDetails } = props;
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [sessionToken, setSessionToken] = useState(localStorage.getItem('userToken'));
  const [me, setMe] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    PostService.getAllPostsByMe(sessionToken)
      .then((res) => {
        if (res.data.success === false) {
          return Swal.fire({
            title: 'Error!',
            text: 'Unable to load posts, please try again later!',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
        setPosts(res.data.data);
      });
    UserService.getUser(userId)
      .then((res) => {
        setMe(res.data.data);
      });
  }, [userDetails]);

  const decodeJwt = (token) => {
    const decoded = jwt_decode(token);
    return decoded;
  };

  const formatDate = (time) => {
    const hourMinute = time.substring(time.indexOf('T') + 1).substring(0, 5);
    const newDate = time
      .split('-')
      .reverse()
      .map((el) => (el.length > 2 ? el.substr(0, 2) : el))
      .join()
      .replaceAll(',', '/');
    return `${newDate}  ${hourMinute}`;
  };

  return (
    <div>
      <NavBar />
      <SideBar />
      <div className={classes.allContent}>
        <Container className={classes.profileHeader}></Container>
        {me.hasOwnProperty('_id') ? (
          <>
            <Avatar className={classes.avatar} alt="Remy Sharp" src={me.profilePhoto} />
            <Card style={{}} className={classes.profileCard}>
              <Typography className={classes.profileName}>{me.firstName} {me.lastName}</Typography>
              <Typography style={{ color: 'white' }}>{me.bio}</Typography>
              <Typography style={{ color: 'white' }}>{me.jobTitle}</Typography>
              <EditProfileSwal originalProfile={me} />

            </Card>
          </>
        ) : <Typography>Unable to load profile </Typography>}

        {posts.map((el) => (
          <Card sx={{ maxWidth: 345 }} className={classes.card}>
            <CardHeader
              className={classes.header}
              avatar={
                <PostUserProfilePhoto user={el.user} />
              }
              title={<PostUserName user={el.user} />}
              subheader={<Typography variant="body2" className={classes.date}>{formatDate(el.createdAt)}</Typography>}
            />
            <CardContent className={classes.content}
              style={{ paddingBottom: 0 }}
            >
              <Typography variant="body2" color="text.secondary" className={classes.body}>
                {el.body}
              </Typography>
              <Typography variant="body2" color="text.secondary" className={classes.emotion}>
                <strong>Emotion: </strong>{el.emotion}
              </Typography>
              <LikeComment post={el} />
            </CardContent>
          </Card>
        ))}
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
  }),
  updateUserDetails: userDetails => dispatch({
    type: Types.UPDATE_USER_DETAILS, payload: {
      userDetails
    }
  })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Profile);