import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import AddSport from "app/pages/SportsFacility/AddSportsFacility";
import ListSport from "app/pages/SportsFacility/ListSportsFacility";
import EditSport from "app/pages/SportsFacility/EditSportsFacility";

const routesName = "/sport";
const modules = "sport";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListSport} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddSport} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditSport} layout={"vertical-default"} />,
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

export const sportRoute = [...createRoutes()];
