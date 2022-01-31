import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import UserService from '../services/users';
import PostService from '../services/posts';
import { Card, Typography, CardContent, CardHeader, Avatar, CardMedia, Container, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as Types from '../store/types';
import { useParams } from 'react-router-dom';
import NavBar from './Navbar';
import SideBar from './SideBar';
import PostUserProfilePhoto from './PostUserProfilePhoto';
import PostUserName from './PostUserName';
import LikeComment from './LikeComment';
import FriendAppBar from './FriendAppBar';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  superAlContent: {
    height: '100%',
  },
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
    borderColor: "purple",
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
  friendsCard: {
    border: '4px solid black',
    maxWidth: 160,
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4),
    backgroundColor: '#121212',
    color: '#e91e63',
  },
  grids: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: '15%'
  },
  allFriendsCards: {
    width: '30%',
    display: 'grid',
    gridTemplateColumns: '33% 33% 33%',
  }
}));

const Friend = (props) => {
  const { friendButtonClicked } = props;
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUser(id)
      .then((res) => {
        const {
          data: {
            data
          }
        } = res;
        setUser(data);
      })
      .catch((err) => {
        return Swal.fire({
          title: 'Error',
          text: err
        });
      });

    PostService.getAllPostsByUser(id)
      .then((res) => {
        const {
          data: {
            data
          }
        } = res;
        setPosts(data);
      })
      .catch((err) => {
        return Swal.fire({
          title: 'Error',
          text: err
        });
      });

  }, []);

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

  const routeChange = (id) => {
    navigate(id);
  };

  return (
    <div className={classes.superAlContent}>
      <NavBar />
      <SideBar />
      <div className={classes.allContent}>
        <Container className={classes.profileHeader}></Container>
        {user.hasOwnProperty('_id') ? (
          <>
            <Avatar className={classes.avatar} alt="Remy Sharp" src={user.profilePhoto} />
            <Card style={{}} className={classes.profileCard}>
              <Typography className={classes.profileName}>{user.firstName} {user.lastName}</Typography>
              <Typography style={{ color: 'white' }}>{user.bio}</Typography>
              <Typography style={{ color: 'white' }}>{user.jobTitle}</Typography>
              <FriendAppBar user={user} />

            </Card>
          </>
        ) : <Typography>Unable to load profile </Typography>}

        {friendButtonClicked === 'posts' ? (
          <>
            {posts.length ? posts.map((el) => (

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
            )) : null}
          </>
        ) :
          friendButtonClicked === 'about' ? (
            <Typography>
              About
            </Typography>
          ) :
            friendButtonClicked === 'friends' ? (
              user.friends.map((el) => (
                <div className={classes.allFriendsCards}>
                  <Card className={classes.friendsCard} onClick={() => routeChange(el._id)} >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="160"
                        image={el.profilePhoto}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="body2" component="h2" noWrap>
                          {el.firstName} {el.lastName}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))
            ) :
              <>
                {posts.length ? posts.map((el) => (
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
                )) : <Typography>No posts</Typography>}
              </>
        }
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
export default connectComponent(Friend);