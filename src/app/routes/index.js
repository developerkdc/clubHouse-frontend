import React from "react";
import Page from "@jumbo/shared/Page";
import { usersRoute } from "./User";
import { rolesRoute } from "./Roles";
import NotFound from "app/pages/NotFound";
import Login from "app/pages/Auth/Login";
import Dashboard from "app/pages/Dashboard";
import EmailVerify from "app/pages/Auth/EmailVerify";
import ForgotPassword from "app/pages/Auth/OtpVerify";
import ListUser from "app/pages/UserManagement/ListUser/DragAndDrop";
import AddUser from "app/pages/UserManagement/AddUser";
import EditUser from "app/pages/UserManagement/EditUser";
import PermissionList from "app/pages/RoleManagement/ConfigureRole/roleList";
import UserProfile from "app/pages/UserManagement/Profile/UserProfile";
import EditProfile from "app/pages/UserManagement/EditProfile";
import ChangePassword from "app/pages/UserManagement/ChangePassword";




/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
    {
        path: "/",
        element: <Page component={Dashboard} />
    },
    {
        path: "/login",
        element: <Page component={Login} layout="solo-page" />
    },
    {
        path: "/email-verify",
        element: <Page component={EmailVerify} layout="solo-page" />
    },
    {
        path: "/forgot-password",
        element: <Page component={ForgotPassword} layout="solo-page" />
    },
    {
        path: "*",
        element: <Page component={NotFound} layout="solo-page" />
    },
    {
        path: "/user",
        element: <Page component={ListUser} layout={"vertical-default"} />,
      },

    {
        path: "/user/add",
        element: <Page component={AddUser} layout={"vertical-default"} />,
      },
    {
        path: "/user/edit",
        element: <Page component={EditUser} layout={"vertical-default"} />,
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
];


const routesForAuthenticatedOnly = [
    ...usersRoute,
    ...rolesRoute,
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [];


const routes = [
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
];

export { routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly };