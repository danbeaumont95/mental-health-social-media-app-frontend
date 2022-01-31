import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as Types from '../store/types';
import UserService from '../services/users';
import { Card, CardActions, Typography, Box, CardContent, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  name: {
    width: 'fit-content'
  }
}));

const PostUserName = (props) => {
  const classes = useStyles();
  const { user } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    UserService.getUser(user)
      .then((res) => {
        const {
          data: {
            data: {
              firstName,
              lastName
            }
          }
        } = res;
        setFirstName(firstName);
        setLastName(lastName);
      });
  }, []);
  return (
    <Typography className={classes.name}>{firstName} {lastName}</Typography>
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
export default connectComponent(PostUserName);