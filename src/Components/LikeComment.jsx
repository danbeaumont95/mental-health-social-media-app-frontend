import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, CardActions, Typography, Box, Avatar, TextField } from '@material-ui/core';
import { ThumbUpAlt, ChatBubbleOutline } from '@material-ui/icons';
import PostService from '../services/posts';
import UserService from '../services/users';
import Swal from 'sweetalert2';
import DefaultPhoto from '../Images/defaultPhoto.png';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  actions: {
    bottom: 0,
    padding: '0, 0, 0, 0',
    marginTop: theme.spacing(1),
    height: '10%',
    paddingBottom: 0,
    marginBottom: 0,
    width: '100%',
    paddingLeft: 0,
    marginLeft: 0,
    outline: 'solid transparent 2px',
  },
  likeUserNotLiked: {
    width: '32%',
    height: '10px',
    backgroundColor: '#e91e63',
    borderRadius: '.5rem',
    color: '#111827',
    border: '1px solid #414141',
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  },
  likeUserHasLiked: {
    width: '32%',
    height: '10px',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '.5rem',
    border: '1px solid #414141',
    '&:hover': {
      background: '#e91e63',
      color: 'black'
    }
  },
  userHasNotCommented: {
    width: '32%',
    height: '10px',
    borderRadius: '.5rem',
    border: '1px solid #414141',
    backgroundColor: '#e91e63',
    color: '#111827',
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  },
  userHasCommented: {
    width: '32%',
    height: '10px',
    borderRadius: '.5rem',
    border: '1px solid #414141',
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
      background: '#e91e63',
      color: 'black'
    }
  },
  share: {
    width: '32%',
    height: '10px',
    borderRadius: '.5rem',
    border: '1px solid #414141',
    backgroundColor: '#e91e63',
    color: '#111827',
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  },
  commentColor: {
    color: 'white',
    height: '100%'
  },
  commentBox: {
    marginTop: theme.spacing(1),
    color: 'white',
    display: 'flex',
  },
  commentTextField: {
    width: '80%',
    marginLeft: theme.spacing(1),
  },
  postCommentButton: {
    color: 'white',
    backgroundColor: 'blue'
  }
}));
const LikeComment = (props) => {
  const { post } = props;
  const { _id } = post;
  const [postLiked, setPostLiked] = useState(false);
  const [postCommented, setPostCommented] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loggedInUserPhoto, setLoggedInUserPhoto] = useState('');
  const {
    register, formState: { errors }, resetField
  } = useForm();
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('userToken');
  const classes = useStyles();
  const loggedInUser = localStorage.getItem('userId');

  useEffect(() => {
    UserService.getUser(loggedInUser)
      .then((res) => {
        if (res.data.success === true) {
          const {
            data: {
              data: {
                profilePhoto
              }
            }
          } = res;
          if (profilePhoto.length) {
            setLoggedInUserPhoto(profilePhoto);
          }
          else {
            setLoggedInUserPhoto(DefaultPhoto);
          }
        }
      });

    const checkIfLiked = post.likes.find((el) => el.userId === loggedInUser);
    if (checkIfLiked) {
      setPostLiked(true);
    }

    const checkIfCommented = post.comments.find((el) => el.userId === loggedInUser);
    if (checkIfCommented) {
      setPostCommented(true);
    }

  }, [newComment]);

  const onLikeClick = () => {
    if (!postLiked) {
      PostService.addLikeToPost(token, _id)
        .then((res) => {
          if (res.data.success === true) {
            setPostLiked(true);
          }
          else {
            return Swal.fire({
              title: 'Error',
              text: 'Error liking post, please try again later!'
            });
          }
        });
    }
    else {
      PostService.deleteLikeFromPost(token, _id)
        .then((res) => {
          if (res.data.success === true) {
            setPostLiked(false);
          }
          else {
            return Swal.fire({
              title: 'Error',
              text: 'Error removing like from post, please try again later!'
            });
          }
        });
    }
  };

  const handleCommentChange = (event) => {
    setNewComment({ comment: event.target.value });
  };

  const onCommentClick = (e) => {
    e.preventDefault();
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    PostService.addCommentByUser(token, newComment, _id)
      .then((res) => {
        if (res.data.success === true) {
          return Swal.fire({
            title: 'Success',
            text: 'Comment posted!'
          })
            .then(() => {
              resetField('comment');
            });
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Error commenting on post!'
          });
        }
      });
  };
  return (
    <>
      <CardActions className={classes.actions} style={{ width: '100%', marginleft: 0, padding: 0 }}>
        <IconButton aria-label="settings" className={
          postLiked ? classes.likeUserHasLiked :
            classes.likeUserNotLiked
        } onClick={onLikeClick}>
          <Typography>Like: </Typography><ThumbUpAlt />
        </IconButton>
        <IconButton aria-label="settings" className={
          postCommented ?
            classes.userHasCommented :
            classes.userHasNotCommented
        }
          onClick={onCommentClick}>
          <Typography>Comment: </Typography><ChatBubbleOutline />
        </IconButton>
        <IconButton aria-label="settings" className={classes.share}>
          <Typography>Share: </Typography><ChatBubbleOutline />
        </IconButton>
      </CardActions>
      {showCommentBox ? <Box component="form" className={classes.commentBox} onSubmit={handleCommentSubmit}>
        <Avatar alt="Remy Sharp" src={loggedInUserPhoto} />
        <TextField className={classes.commentTextField}
          InputProps={{
            className: classes.commentColor
          }}
          label="comment"
          InputLabelProps={{
            shrink: true,
            style: {
              color: 'white',
            }
          }}
          {...register('comment')}
          onChange={handleCommentChange}
        />
        <Button type='submit' className={classes.postCommentButton}>Post</Button>
      </Box> : null}

    </>
  );
};

export default LikeComment;