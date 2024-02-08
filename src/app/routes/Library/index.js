import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import AddLibrary from "app/pages/Library/AddLibrary";
import ListLibrary from "app/pages/Library/ListLibrary";
import EditLibrary from "app/pages/Library/EditLibrary";




const routesName = "/library";
const modules = "library";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListLibrary} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddLibrary} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditLibrary} layout={"vertical-default"} />,
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

export const libraryRoute = [...createRoutes()];

