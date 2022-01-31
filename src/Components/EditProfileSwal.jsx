import React, { useState } from 'react';
import UserService from '../services/users';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as Types from '../store/types';
import { Button, IconButton } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 'fit-content%',
    height: 'fit-content',
    backgroundColor: '#e91e63',
    borderRadius: '.5rem',
    color: '#111827',
    border: '1px solid #414141',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  }
}));

const EditProfileSwal = (props) => {
  const { originalProfile } = props;
  const {
    bio,
    jobTitle,
    education
  } = originalProfile;

  const classes = useStyles();
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [sessionToken, setSessionToken] = useState(localStorage.getItem('userToken'));

  const {
    register, formState: { errors },
  } = useForm();

  const handleClick = () => {
    return Swal.fire({
      title: 'Login Form',
      html: `
      <div style="">
      <div style="flex-direction: row">
      <label for="jobTitle" style="">Job title</label>
      <input type="text" id="jobTitle" class="swal2-input" placeholder="Job Title" value="${jobTitle}">
      </div>
      
      <div style="flex-direction: row">
     <label for="bio" style="">Bio</label>
    <input type="text" id="bio" class="swal2-input" placeholder="bio" value="${bio}">
      </div>
      <div style="flex-direction: row">
    <label for="education" style="">Education</label>
    <input type="text" id="education" class="swal2-input" placeholder="education" value="${education}" >
    </div>
    </div>
    `,
      confirmButtonText: 'Update Details',
      focusConfirm: false,
      preConfirm: () => {
        const jobTitle = Swal.getPopup().querySelector('#jobTitle').value;
        const bio = Swal.getPopup().querySelector('#bio').value;
        const education = Swal.getPopup().querySelector('#education').value;

        if (!jobTitle || !bio || !education) {
          Swal.showValidationMessage(`Please enter login and password`);
        }
        return { jobTitle, bio, education };
      }
    }).then((result) => {
      const { value, isDismissed } = result;
      if (isDismissed) {
        return;
      }
      UserService.updateProfile(sessionToken, value)
        .then((res) => {
          if (res.data.success !== true) {
            return Swal.fire({
              title: 'Error',
              text: `Couldn't update profile, please try again`
            });

          }
          setUpdatedProfile(res.data.data);
          localStorage.setItem('updatedProfile', updatedProfile);
          props.updateUserDetails(res.data.data);
          return Swal.fire({
            title: 'Success',
            text: 'Profile updated'
          })
            .then(originalProfile);
        });
    });
  };
  return (
    <IconButton aria-label="settings" >
      <Button onClick={handleClick} className={classes.button}>Edit profile</Button>
    </IconButton >
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
export default connectComponent(EditProfileSwal);