import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth).isLogged;

  return auth ? children : <Navigate to="/login" />;
};

export default AdminRoute;
