import React, { useState, useEffect } from 'react';
import UserService from '../services/users';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import NavBar from './Navbar';
import { connect } from "react-redux";
import * as Types from '../store/types';
import { Typography } from '@material-ui/core';
import SideBar from './SideBar';
import { makeStyles } from '@material-ui/core/styles';

ChartJS.register(ArcElement, Tooltip, Legend);
const useStyles = makeStyles((theme) => ({
  allContent: {
    height: '100%'
  },
  allChartContent: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  charts: {
    height: '40vh',
    marginTop: theme.spacing(2)
  },
  weeklyChart: {
    height: '100%',
    borderRadius: 10,
    color: '#e91e63',
    width: 'fit-content',
    backgroundColor: '#e91e6340',
  },
  monthlyChart: {
    height: '100%',
    borderRadius: 10,
    color: '#e91e63',
    width: 'fit-content',
    backgroundColor: '#e91e6340',
  },
  month: {
    marginTop: theme.spacing(8),
    height: '30vh',
  },
  week: {
    height: '30vh'
  }
}));
const Tracker = (props) => {
  const classes = useStyles();
  const [emotions, setEmotions] = useState({});
  const [sessionToken, setSessionToken] = useState(localStorage.getItem('userToken'));

  const [monthlyEmotions, setMonthlyEmotions] = useState({});
  const [monthlyChartData, setMonthlyChartData] = useState([]);
  const [weeklyChartData, setWeeklyChartData] = useState([]);

  useEffect(() => {
    UserService.getUsersPastWeekEmotions(sessionToken)
      .then((res) => {
        setEmotions(res.data.data);
        setWeeklyChartData(getChartDataFormatter(res.data.data.emotionsInPastWeek));
      })
      .catch((err) => {
        console.log(err, 'err');
      });
    UserService.getUsersPastMonthEmotions(sessionToken)
      .then((res) => {
        setMonthlyEmotions(res.data.data);
        setMonthlyChartData(getChartDataFormatter(res.data.data.emotionsInPastMonth));
      })
      .catch((err) => {
        console.log(err, 'err in monthly');
      });
  }, []);

  const emotionColour = {
    Happy: "#FF0000",
    Excited: "#FF00FF",
    Sad: "#00FF00",
    Interested: "#FFFF00",
    Angry: "#000080"
  };

  const weeklyData = {
    labels: Object.keys(weeklyChartData),
    datasets: [
      {
        label: 'Emotion',
        data: Object.values(weeklyChartData),
        backgroundColor: Object.keys(weeklyChartData).map((el) => emotionColour[el]),
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        // ],
        borderWidth: 1,
      }
    ]
  };

  const monthlyData = {

    labels: Object.keys(monthlyChartData),
    datasets: [
      {
        label: 'Emotion',
        data: Object.values(monthlyChartData),
        backgroundColor: Object.keys(monthlyChartData).map((el) => emotionColour[el]),
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        // ],
        borderWidth: 1,
      }
    ]
  };


  const getChartDataFormatter = arr => {
    const removedLowerCaseArr = arr.map((el) => {
      return el.charAt(0).toUpperCase() + el.slice(1);
    });

    const counts = {};
    removedLowerCaseArr.toString().split(",").forEach(e => {
      counts[e] = (counts[e] || 0) + 1;
    });
    return counts;
  };

  return (
    <div className={classes.allContent}>
      <NavBar />
      <SideBar />
      <div className={classes.allChartContent}>
        <Typography variant='h4' style={{ marginTop: 6 }}>Your emotion tracker</Typography>
        {weeklyChartData ? (
          <div className={classes.charts}>
            <div className={classes.week}>
              <Typography variant='h6'>Your weekly emotion</Typography>
              <div className={classes.weeklyChart}>
                <Pie
                  data={weeklyData}
                  width={400}
                  height={400}
                  options={{ maintainAspectRatio: false, color: 'black' }}
                />
              </div>
            </div>
            <div className={classes.month}>
              <Typography variant='h6'>Your monthly emotion</Typography>
              <div className={classes.monthlyChart}>
                <Pie
                  data={monthlyData}
                  width={400}
                  height={400}
                  options={{ maintainAspectRatio: false, color: 'black' }}
                />
              </div>
            </div>
          </div>
        ) : <Typography>Nothing</Typography>}
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
export default connectComponent(Tracker);