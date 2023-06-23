// authHOC.js
import React from 'react';
// import { Redirect } from 'react-router-dom';

const authHOC = (WrappedComponent) => {
  const isAuthenticated = () => {
    // Implement your logic to check if the token is present and valid
    const token = localStorage.getItem('token'); // Retrieve token from storage

    // Return true or false based on your authentication logic
    return !!token; // For example, check if the token exists
  };

  return (props) => {
    if (isAuthenticated()) {
      return <WrappedComponent {...props} />;
    } else {
      // return <Redirect to="/login" />; // Redirect to login page if not authenticated
    }
  };
};

export default authHOC;