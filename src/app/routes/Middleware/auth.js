//midleware
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = ({ fallbackPath, module }) => {
  const { setAuthToken,authUser } = useJumboAuth();
  
  const isToken = localStorage.getItem("token");

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

  if (isToken) {
    return <Outlet />;
  } else {
    sweetAlerts("warning", "Token not found. Please login to continue.");
    setAuthToken(null);
    return <Navigate to={fallbackPath} />;
  }
  //   }
};

export default AuthMiddleware;
