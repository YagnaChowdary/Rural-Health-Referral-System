import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = getUserRole();
  if (!token) {
    // If no token exists, redirect the user to the /login page
    return <Navigate to="/login" />;
  }
  if(!roles.includes(userRole)){
    return <Navigate to ="/"/>;
  }
  

  // If a token exists, render the component that was passed in as a child
  return children;
};

export default ProtectedRoute;