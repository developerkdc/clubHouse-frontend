import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import ListNews from "app/pages/NewsAndCircular/ListNewsAndCircular";
import AddNews from "app/pages/NewsAndCircular/AddNewsAndCircular";
import EditNews from "app/pages/NewsAndCircular/EditNewsAndCircular";

const routesName = "/news";
const modules = "news";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListNews} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddNews} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditNews} layout={"vertical-default"} />,
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

export const newsRoute = [...createRoutes()];

