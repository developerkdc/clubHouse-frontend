//midleware
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticateAndRolesMiddleware = ({ fallbackPath,module }) => {
//   const isAuthenticated = sessionStorage.getItem("isAuthenticated");
//   const Permission = useSelector(
//     (state) => state?.cloudstratCustomer?.loginUserDetails?.role?.permissions
//   );
//   if (Permission) {
//     if (isAuthenticated === "true" && Permission?.view_roles) {
      return <Outlet />;
//     } else {
//       return <Navigate to={fallbackPath} />;
//     }
//   } else {
//     if (isAuthenticated === "true") {
//       return <Outlet />;
//     } else {
//       return <Navigate to={fallbackPath} />;
//     }
//   }
};

export default AuthenticateAndRolesMiddleware;