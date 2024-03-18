// AuthenticatedRoutes.tsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthenticatedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthenticatedRoutes;
