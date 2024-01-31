import Page from "@jumbo/shared/Page";
import AddUser from "app/pages/UserManagement/AddUser";
import ListUser from "app/pages/UserManagement/ListUser";
import EditUser from "app/pages/UserManagement/EditUser";
import PermissionMiddleware from "../Middleware/permission";
import Dashboard from "app/pages/Dashboard";
import ListRole from "app/pages/RoleManagement/ListRole";
import AddRole from "app/pages/RoleManagement/AddRole/index";
import EditRole from "app/pages/RoleManagement/EditRole";

const routesName = "/roles";
const modules = "roles";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListRole} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddRole} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditRole} layout={"vertical-default"} />,
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

export const rolesRoute = [...createRoutes()];

