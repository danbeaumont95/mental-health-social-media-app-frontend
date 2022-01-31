import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Register from './Register';
import Login from './Login';
import { connect } from "react-redux";
import * as Types from '../store/types';

const useStyles = makeStyles(() => ({
  allContent: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.allContent}>
      <Login />
      <Register />
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
export default connectComponent(Home);
