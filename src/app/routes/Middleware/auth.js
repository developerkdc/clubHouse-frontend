//midleware
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = ({ fallbackPath, module }) => {
  const { setAuthToken } = useJumboAuth();
  const isAuthenticated = localStorage.getItem("token");

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const sweetAlerts = (variant, msg) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
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

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    sweetAlerts("warning", "Token not found!");
    setAuthToken(null);
    return <Navigate to={fallbackPath} />;
  }
  //   }
};

export default AuthMiddleware;
