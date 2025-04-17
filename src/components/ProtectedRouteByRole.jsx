import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export function ProtectedRouteByRole({ children, allowedRoles }) {
  const token = Cookies.get("token");
  const userData = Cookies.get("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
