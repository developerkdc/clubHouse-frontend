import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import ListSpa from "app/pages/Spa/ListSpa";
import AddSpa from "app/pages/Spa/AddSpa";
import EditSpa from "app/pages/Spa/EditSpa";

const routesName = "/spa";
const modules = "spa";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListSpa} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddSpa} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditSpa} layout={"vertical-default"} />,
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

export const spaRoute = [...createRoutes()];
