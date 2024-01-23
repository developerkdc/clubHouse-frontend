import Page from "@jumbo/shared/Page";
import AddUser from "app/pages/UserManagement/AddUser";
import ListUser from "app/pages/UserManagement/ListUser";
import EditUser from "app/pages/UserManagement/EditUser";
import PermissionMiddleware from "../Middleware/permission";
import Dashboard from "app/pages/Dashboard";
import ListMember from "app/pages/Member/ListMember";
import AddMember from "app/pages/Member/AddMember";
import EditMember from "app/pages/Member/EditMember";

const routesName = "/member";
const modules = "member";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListMember} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddMember} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditMember} layout={"vertical-default"} />,
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

export const memberRoute = [...createRoutes()];

