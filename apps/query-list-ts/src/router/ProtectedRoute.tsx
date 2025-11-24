import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PATHNAME } from ".";

import { getToken } from "../utils/user-token";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to={LOGIN_PATHNAME} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
