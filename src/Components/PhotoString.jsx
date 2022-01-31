import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as Types from '../store/types';
import UserService from '../services/users';

const PhotoString = (props) => {
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
    <h1>{photo}</h1>
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
export default connectComponent(PhotoString);