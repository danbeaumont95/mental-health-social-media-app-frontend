import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as Types from '../store/types';
import {
  Typography, Avatar, TextField, Button,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UserService from '../services/users';

const useStyles = makeStyles((theme) => ({
  bothComponents: {
    display: 'flex',
    flexDirection: 'row',
  },
  allRegisterContent: {
    height: '100vh',
    width: '120vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  register: {
    fontSize: '2rem',
    marginBottom: theme.spacing(3),
    color: "#D0D0D0"
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    backgroundColor: "#D0D0D0",
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '200px',
    marginBottom: theme.spacing(3),
    width: 300,
    height: 50,
  },
  registerButton: {
    display: 'flex',
    backgroundColor: "#e91e63",
    borderRadius: '20px',
    maxWidth: '200px',
  },
}));

const Register = () => {
  const [user, setUser] = useState({
    firstName: '', lastName: '', email: '', password: '', dateOfBirth: '', mailingList: false
  });
  const [successful, setSuccessful] = useState(false);
  const {
    register, setValue, handleSubmit, formState: { errors },
  } = useForm();
  const classes = useStyles();

  const handleChangeUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    UserService.register(user)
      .then(async (res) => {
        if (res.data.success === false) {
          return Swal.fire({
            title: 'Error!',
            text: 'Missing input',
          });
        }
        if (res.data.data.errors) {
          return Swal.fire({
            title: 'Error!',
            text: 'Missing or incorrect input',
          });
        }
        setSuccessful(true);
        return Swal.fire({
          title: 'Registered!',
          text: 'You may now log in!',
        });
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  return (
    <div className={classes.bothComponents}>
      <div className={classes.allRegisterContent}>
        <Typography className={classes.register}>Register</Typography>
        <Avatar style={{ marginBottom: '2rem' }}>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
            {...register('email')}
            onChange={handleChangeUser}
            placeholder="Email"
            className={classes.inputField}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            variant="outlined"
          />
          <TextField
            {...register('password')}
            onChange={handleChangeUser}
            placeholder="Password"
            className={classes.inputField}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            type="password"
            variant="outlined"
          />
          <TextField
            {...register('firstName')}
            onChange={handleChangeUser}
            placeholder="First Name"
            className={classes.inputField}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            variant="outlined"
          />
          <TextField
            {...register('lastName')}
            onChange={handleChangeUser}
            placeholder="Last Name"
            className={classes.inputField}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            variant="outlined"
          />
          <TextField
            {...register('dateOfBirth')}
            onChange={handleChangeUser}
            placeholder="Date of Birth"
            className={classes.inputField}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            variant="outlined"
          />
          <TextField
            {...register('mailingList')}
            onChange={handleChangeUser}
            placeholder="Added to mailing list?"
            className={classes.inputField}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            variant="outlined"
          />
          <Button
            type="submit"
            onClick={() => {
              setUser(user);
            }}
            className={classes.registerButton}
          >
            Register
          </Button>
        </form>
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
export default connectComponent(Register);
