import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import EditMember from "app/pages/Member/EditMember";
import ListNews from "app/pages/NewsAndCircular/ListNewsAndCircular";
import AddNews from "app/pages/NewsAndCircular/AddNewsAndCircular";

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

export const newsRoute = [...createRoutes()];

