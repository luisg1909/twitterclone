import React from 'react';
import { Navigate } from 'react-router-dom';
import { getFromSession } from '../utils/SessionStorage';

const ProtectedRoute = ({ element }) => {
  const currentUser = getFromSession('currentUsert');
  return currentUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
