/* eslint-disable react/prop-types */

import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const auth = localStorage.getItem('userToken') ? true : null;
  return auth ? children : <Navigate to="/" />;
}
export default PrivateRoute;
