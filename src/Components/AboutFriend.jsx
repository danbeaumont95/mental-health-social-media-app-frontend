import React, { useState, useEffect } from 'react';
import { Typography } from "@material-ui/core";
import UserService from '../services/users';


const AboutFriend = (props) => {
  const {
    user: {
      _id
    }
  } = props;
  const [about, setAbout] = useState({});

  useEffect(() => {
    UserService.getUser(_id)
      .then((res) => {
        console.log(res.data.data, 'resingwa');
      });
  }, []);

  return (
    <Typography>About</Typography>
  );
};

export default AboutFriend;