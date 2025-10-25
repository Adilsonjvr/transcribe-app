import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Redireciona para landing page se não estiver autenticado
    return <Navigate to="/" replace />;
  }

  return children;
};
