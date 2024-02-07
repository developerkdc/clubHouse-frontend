import Page from "@jumbo/shared/Page";
import AddUser from "app/pages/UserManagement/AddUser";
import ListUser from "app/pages/UserManagement/ListUser";
import EditUser from "app/pages/UserManagement/EditUser";
import PermissionMiddleware from "../Middleware/permission";
import UserChangePassword from "app/pages/UserManagement/UserChangePassword";

const routesName = "/user";
const modules = "user";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListUser} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddUser} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditUser} layout={"vertical-default"} />,
    permission: "edit",
  },
  {
    path: `${routesName}/change-password/:id`,
    element: <Page component={UserChangePassword} layout={"vertical-default"} />,
    permission: "edit",
  },
];

const createRoutes = () => {
  let allRoutes = routes?.map((route) => {
    let obj = {};
    obj["middleware"] = [
      {
        element: PermissionMiddleware,
        fallbackPath: ["/", modules, route.permission],
      },
    ];
    obj["routes"] = [
      {
        path: route.path,
        element: route.element,
      },
    ];
    return obj;
  });
  return allRoutes;
};

export const usersRoute = [...createRoutes()];
