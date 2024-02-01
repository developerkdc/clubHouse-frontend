import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import AddEvent from "app/pages/Events/AddEvents";
import ListEvent from "app/pages/Events/ListEvents";
import EditEvent from "app/pages/Events/EditEvents";



const routesName = "/event";
const modules = "event";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListEvent} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddEvent} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditEvent} layout={"vertical-default"} />,
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

export const eventRoute = [...createRoutes()];

