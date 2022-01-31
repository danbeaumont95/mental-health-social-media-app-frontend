import React, { useState, useEffect } from 'react';
import PostService from '../services/posts';
import { TextField, ThemeProvider, Avatar, Menu, MenuItem, Button, Typography, Box, CssBaseline } from '@material-ui/core';
import { createStyles, makeStyles, createTheme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import * as Types from '../store/types';
import Swal from 'sweetalert2';




const useStyles = makeStyles((theme) => ({
  allContent: {
    height: '100vh',
    width: '120vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '200px',
    marginBottom: theme.spacing(3),
    width: 300,
    height: 50,
  },
  loginButton: {
    display: 'flex',
    backgroundColor: ' #38B1F5',
    borderRadius: '20px',
    maxWidth: '200px',

  },
  signIn: {
    fontSize: '2rem',
    marginBottom: theme.spacing(3),
    color: 'white'
  },
  color: {
  },
  multilineColor: {
    color: 'white'
  }
}));
const theme = createTheme();

const CreateNewPost = (props) => {
  const classes = useStyles();
  const { accessToken } = props;
  const [newPost, setNewPost] = useState({});
  const [successful, setSuccessful] = useState(false);

  const {
    register, formState: { errors },
  } = useForm();

  const handleChangePost = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    PostService.createPost(accessToken, newPost)
      .then((res) => {
        if (res.data.success === false) {
          return Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
        const {
          data: {
            data
          }
        } = res;
        setSuccessful(true);
        return Swal.fire({
          title: 'New post created!'
        });
      });
  };

  return (
    <div className={classes.allContent}>
      <Typography>Create a new post</Typography>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register('body')}
              onChange={handleChangePost}
              margin="normal"
              required
              fullWidth
              id="body"
              label="Body"
              name="body"
              autoComplete="body"
              autoFocus
              InputProps={{
                className: classes.multilineColor
              }}
            />
            <TextField
              {...register('emotion')}
              onChange={handleChangePost}
              margin="normal"
              required
              fullWidth
              name="emotion"
              label="Emotion"
              type="emotion"
              id="emotion"
              autoComplete="emotion"
              InputProps={{
                className: classes.multilineColor
              }}
            />
            <TextField
              {...register('private')}
              onChange={handleChangePost}
              margin="normal"
              required
              fullWidth
              name="private"
              label="Private?"
              type="private"
              id="private"
              autoComplete="private"
              InputProps={{
                className: classes.multilineColor
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
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
export default connectComponent(CreateNewPost);