import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Avatar } from '@material-ui/core';
import FacebookLogo from '../Images/facebook.png';
import GithubLogo from '../Images/github.jpg';
import InstagramLogo from '../Images/instagram.jpeg';
import LinkedInLogo from '../Images/linkedin.svg.png';
import TwitterLogo from '../Images/twitter.png';


const useStyles = makeStyles((theme) => ({
  allContent: {
    marginTop: theme.spacing(4),
    maxWidth: '100%',
    widoth: '100%',
    backgroundColor: '#121212',
    bottom: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  box: {
    width: '90%',
    border: '2px solid #e91e63',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icons: {

    marginTop: theme.spacing(2),
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));
const Footer = () => {
  const classes = useStyles();

  return (
    <Container className={classes.allContent}>
      <Box className={classes.box}>

        <Typography variant='h5' className={classes.title}>Dans app</Typography>

        <Typography>
          Hi there! Thanks for checking out my app!
          <br></br>
          My name is Dan Beaumont, and I am a full stack software engineer from West Yorkshire, England.
          <br></br>
          Please check out my socials below and connect with me!
        </Typography>
        <div className={classes.icons}>
          <a href="https://www.linkedin.com/in/daniel-beaumont/" target="_blank" rel="noopener noreferrer">

            <Avatar alt="Remy Sharp" src={LinkedInLogo} className={classes.avatar} />

          </a>
          <a href="https://github.com/danbeaumont95" target="_blank" rel="noopener noreferrer">

            <Avatar alt="Travis Howard" src={GithubLogo} className={classes.avatar} />
          </a>
          <a href="https://twitter.com/danthedev123" target="_blank" rel="noopener noreferrer">

            <Avatar alt="Cindy Baker" src={TwitterLogo} className={classes.avatar} />
          </a>
          <a href="https://www.instagram.com/danscodingjourney/" target="_blank" rel="noopener noreferrer">

            <Avatar alt="Cindy Baker" src={InstagramLogo} className={classes.avatar} />
          </a>

          <a href="https://www.facebook.com/daniel.beaumont.31/" target="_blank" rel="noopener noreferrer">

            <Avatar alt="Travis Howard" src={FacebookLogo} className={classes.avatar} />
          </a>

        </div>
      </Box>
    </Container >
  );
};

export default Footer;