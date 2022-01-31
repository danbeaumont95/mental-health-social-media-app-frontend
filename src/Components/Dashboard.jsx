import React from 'react';
import { connect } from "react-redux";
import * as Types from '../store/types';
import FriendsPosts from './FriendsPosts';
import NavBar from './Navbar';
import SideBar from './SideBar';

const Dashboard = (props) => {
  return (
    <div>
      <NavBar />
      <SideBar />
      <FriendsPosts />

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
export default connectComponent(Dashboard);

