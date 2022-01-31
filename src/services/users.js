import axios from 'axios';
import { url } from './url';
import TokenService from './token';

const getAllUsers = async () => {
  const res = await axios.get(`${url}/api/users`);
  return res;
};

const login = async (user) => {
  const { email, password } = user;
  const res = await axios.post(`${url}/api/session`, {
    email,
    password,
  });
  return res;
};

const register = async (user) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    mailingList
  } = user;
  const res = await axios.post(`${url}/api/users`, {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    mailingList
  });
  return res;
};

const getUser = async (id) => {
  const res = await axios.get(`${url}/api/users/${id}`);
  return res;
};

const getUserByEmail = async (email) => {
  const res = await axios.get(`${url}/api/users/user/${email}`);
  return res;
};

const getUsersPastWeekEmotions = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/api/user/myWeeklyEmotions`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const getUsersPastMonthEmotions = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/api/user/myMonthlyEmotions`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const getMyFriends = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/api/user/myFriends`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const updateProfile = async (token, body) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.post(`${url}/api/user/updateUser`, body, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const exportObject = {
  getAllUsers,
  login,
  register,
  getUser,
  getUserByEmail,
  getUsersPastWeekEmotions,
  getUsersPastMonthEmotions,
  getMyFriends,
  updateProfile
};

export default exportObject;
