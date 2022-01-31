import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as Types from '../store/types';
import UserService from '../services/users';
import { Avatar } from '@material-ui/core';

const PostUserProfilePhoto = (props) => {
  const { user } = props;
  const [photo, setPhoto] = useState('');
  useEffect(() => {
    UserService.getUser(user)
      .then((res) => {
        const {
          data: {
            data: {
              profilePhoto
            }
          }
        } = res;
        setPhoto(profilePhoto);
      });
  }, []);
  return (
    <Avatar alt="Remy Sharp" src={photo} />
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
export default connectComponent(PostUserProfilePhoto);