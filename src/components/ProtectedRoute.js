import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
  return (
    <>
      {!isAuthenticated && <Navigate to={"/login"} replace />}
      {isAuthenticated && <Outlet />}
    </>
  );
}

export default ProtectedRoute;
