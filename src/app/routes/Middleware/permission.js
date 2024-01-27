//midleware
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

const PermissionMiddleware = ({ fallbackPath }) => {
  const [fallbackPathRoute, module, permission] = fallbackPath;
  const isToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("authUser"));

  const Swal = useSwalWrapper();
  const theme = useTheme();
  const { setAuthToken, authUser } = useJumboAuth();

  // console.log(authUser?.role_id?.permissions,"inside permission");
  const sweetAlerts = (variant, msg) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: variant,
      title: msg,
      background: theme.palette.background.paper,
    });
  };

  const Permission = user?.role_id?.permissions;
  if (Permission && isToken) {
    if (Permission[module] && Permission[module][permission]) {
      return <Outlet />;
    } else {
      sweetAlerts("warning", "Access denied!");
      return <Navigate to={fallbackPathRoute} />;
    }
  } else {
    sweetAlerts("warning", "Access token or user permissions not found!");
    setAuthToken(null);
    return <Navigate to={"/login"} />;
  }
};
export default PermissionMiddleware;
