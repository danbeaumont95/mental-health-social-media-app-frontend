import React, { useState } from 'react';
import { connect } from "react-redux";
import UserService from '../services/users.js';
import Swal from 'sweetalert2';
import { TextField, Button, Typography, CssBaseline, Box, Avatar } from '@material-ui/core';
import * as Types from '../store/types';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  allContent: {
    height: '100vh',
    width: '120vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: "#e91e63",
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
    backgroundColor: '#38B1F5',
    borderRadius: '20px',
    maxWidth: '200px',

  },
  signIn: {
    fontSize: '2rem',
    marginBottom: theme.spacing(3),
    color: 'black'
  },
  color: {
  },
  multilineColor: {
    color: 'black'
  }
}));

const theme = createTheme();

const Login = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState({ email: '', password: '' });
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [successful, setSuccessful] = useState(false);
  const {
    register, formState: { errors },
  } = useForm();

  const handleChangeUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    UserService.login(user)
      .then(async (res) => {
        if (res.data.success === false && typeof res.data.message === 'string') {
          return Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
        if (res.data.success === false && typeof res.data.message === 'object') {
          return Swal.fire({
            title: 'Error!',
            text: res.data.message[0],
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
        const {
          data: {
            data: {
              accessToken,
              refreshToken,
              _id
            },
          },
        } = res;

        setSuccessful(true);
        localStorage.setItem('userToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', _id);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        props.updateAccessToken(accessToken);
        return Swal.fire({
          title: 'Logged in!',
          text: 'You will now be redirected to the homepage',
        }).then(() => {
          navigate('./home', { replace: true });
        });
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className={classes.allContent}>
      <Typography className={classes.signIn}>Sign in to Dans app!</Typography>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register('email')}
              onChange={handleChangeUser}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                className: classes.multilineColor
              }}
            />
            <TextField
              {...register('password')}
              onChange={handleChangeUser}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
export default connectComponent(Login);