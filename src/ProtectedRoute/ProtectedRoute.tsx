import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/loginSlice';

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const isAuthentificated = useSelector(authSelector);

  if (!isAuthentificated) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;