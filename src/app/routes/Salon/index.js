import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import ListSalon from "app/pages/Salon/ListSalon";
import EditSalon from "app/pages/Salon/EditSalon";
import AddSalon from "app/pages/Salon/AddSalon";

const routesName = "/salon";
const modules = "salon";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListSalon} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddSalon} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditSalon} layout={"vertical-default"} />,
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

export const salonRoute = [...createRoutes()];
