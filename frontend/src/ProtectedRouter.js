import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// public protection
const ProtectedRouter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
};

// adminh router protection
function AdminProtectedRouter() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? (
    userInfo?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/*404" />
    )
  ) : (
    <Navigate to="/login" />
  );
}

export { ProtectedRouter, AdminProtectedRouter };
