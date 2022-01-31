import axios from 'axios';
import { url } from './url';
import TokenService from './token';

const getFriendsMostRecentPosts = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/api/post/user/recent`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};


const addLikeToPost = async (token, postId) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.patch(`${url}/api/user/addLike/${postId}`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  return res;
};

const deleteLikeFromPost = async (token, postId) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.delete(`${url}/api/user/deleteLike/${postId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  return res;
};

const getPostById = async (postId) => {
  const res = await axios.get(`${url}/api/post/${postId}`);
  return res;
};

const getAllPostsByMe = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/api/post/me/posts`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const deletePostById = async (token, postId) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.delete(`${url}/api/post/${postId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const createPost = async (token, body) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.post(`${url}/api/post`, body, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const getAllPostsByUser = async (userId) => {
  const res = await axios.get(`${url}/api.post/user/${userId}`);
  return res;
};

const addCommentByUser = async (token, comment, postId) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.post(`${url}/api/post/addComment/${postId}`, comment, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const deleteCommentByUser = async (token, postId) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.delete(`${url}/api/post/deleteComment/${postId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const exportObject = {
  getFriendsMostRecentPosts,
  addLikeToPost,
  deleteLikeFromPost,
  getPostById,
  getAllPostsByMe,
  deletePostById,
  createPost,
  getAllPostsByUser,
  addCommentByUser,
  deleteCommentByUser
};

export default exportObject;
