import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as Types from '../store/types';
import PostService from '../services/posts';
import { Card, Typography, CardContent, CardHeader } from '@material-ui/core';
import SwalCreateNewPost from './SwalCreateNewPost';
import PostUserProfilePhoto from './PostUserProfilePhoto';
import PostUserName from './PostUserName';
import LikeComment from './LikeComment';

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
}));

const FriendsPosts = (props) => {
  const [sessionToken, setSessionToken] = useState(localStorage.getItem('userToken'));
  const userId = localStorage.getItem('userId');
  const classes = useStyles();
  const { accessToken, updatePosts } = props;
  const [posts, setPosts] = useState([]);
  const [postsLength, setPostsLength] = useState(0);

  useEffect(() => {
    PostService.getFriendsMostRecentPosts(sessionToken)
      .then((res) => {
        const {
          data: {
            data
          }
        } = res;
        if (res.data.success === true && data.length) {
          setPosts(data);
          setPostsLength(data.length);
        }
      });
  }, [updatePosts]);

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
    <div className={classes.allContent}>
      <SwalCreateNewPost posts={posts} />

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
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(FriendsPosts);