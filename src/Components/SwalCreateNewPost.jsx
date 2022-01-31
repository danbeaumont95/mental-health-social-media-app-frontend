import React, { useState } from 'react';
import PostService from '../services/posts';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import * as Types from '../store/types';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#e91e63",
    marginTop: theme.spacing(2),
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  }
}));

const SwalCreateNewPost = (props) => {
  const classes = useStyles();
  const { accessToken, posts } = props;
  const [newPost, setNewPost] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [allPosts, setAllPosts] = useState(posts);

  const handleClick = () => {
    return Swal.fire({
      title: 'New Post',
      html: `<input type="text" id="body" class="swal2-input" placeholder="Body">
      <input type="text" id="emotion" class="swal2-input" placeholder="Emotion">
      <input type="text" id="private" class="swal2-input" placeholder="Private? (True or false)">
      `,
      showCloseButton: true,
      confirmButtonText: 'Create Post',
      focusConfirm: false,
      preConfirm: () => {
        const body = Swal.getPopup().querySelector('#body').value;
        const emotion = Swal.getPopup().querySelector('#emotion').value;
        const privateInput = Swal.getPopup().querySelector('#private').value;
        return { body, emotion, privateInput };
      }
    }).then((result) => {
      const { value, isDismissed } = result;
      if (isDismissed) {
        return;
      }
      PostService.createPost(accessToken, value)
        .then((res) => {
          if (res.data.success === false) {
            return Swal.fire({
              title: 'Error!',
              text: res.data.message,
              icon: 'error'
            });
          }
          const {
            data: {
              data
            }
          } = res;
          setNewPost(data);
          setSuccessful(true);
          setAllPosts(posts);
          props.updatePosts(allPosts);
          return Swal.fire({
            title: 'New post created!'
          });
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    });
  };

  return (
    <Button onClick={handleClick} className={classes.button}>Add new post!</Button>
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
  updatePosts: updatePosts => dispatch({
    type: Types.UPDATE_POSTS, payload: {
      updatePosts
    }
  })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(SwalCreateNewPost);

