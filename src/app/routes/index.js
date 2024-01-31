import React from "react";
import Page from "@jumbo/shared/Page";
import { usersRoute } from "./User";
import { rolesRoute } from "./Roles";
import NotFound from "app/pages/NotFound";
import Login from "app/pages/Auth/Login";
import Dashboard from "app/pages/Dashboard";
import EmailVerify from "app/pages/Auth/EmailVerify";
import ForgotPassword from "app/pages/Auth/OtpVerify";
import UserProfile from "app/pages/Auth/Profile";
import EditProfile from "app/pages/Auth/EditProfile";
import ChangePassword from "app/pages/Auth/ChangePassword";
import AuthMiddleware from "./Middleware/auth";
import { memberRoute } from "./Member";
import { newsRoute } from "./News";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
  {
    path: "*",
    element: <Page component={NotFound} layout="solo-page" />,
  },
];

const routesForAuthenticatedOnly = [
  {
    middleware: [
      {
        element: AuthMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/",
        element: <Page component={Dashboard} layout={"vertical-default"} />,
      },
      {
        path: "/profile",
        element: <Page component={UserProfile} layout={"vertical-default"} />,
      },
      {
        path: "/profile/edit",
        element: <Page component={EditProfile} layout={"vertical-default"} />,
      },
      {
        path: "/profile/changePassword",
        element: <Page component={ChangePassword} layout={"vertical-default"} />,
      },
    ],
  },
  ...usersRoute,
  ...rolesRoute,
  ...memberRoute,
  ...newsRoute,
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <Page component={Login} layout="solo-page" />,
  },
  {
    path: "/email-verify",
    element: <Page component={EmailVerify} layout="solo-page" />,
  },
  {
    path: "/forgot-password",
    element: <Page component={ForgotPassword} layout="solo-page" />,
  },
];

const routes = [...routesForPublic, ...routesForAuthenticatedOnly, ...routesForNotAuthenticatedOnly];

export { routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly };
