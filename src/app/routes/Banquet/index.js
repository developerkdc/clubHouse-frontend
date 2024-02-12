import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import AddBanquet from "app/pages/Banquet/AddBanquet";
import ListBanquet from "app/pages/Banquet/ListBanquet";
import EditBanquet from "app/pages/Banquet/EditBanquet";
import ViewBanquetBoking from "app/pages/Banquet/ViewBanquetBoking";




const routesName = "/banquet";
const modules = "banquet";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListBanquet} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/viewBoking`,
    element: <Page component={ViewBanquetBoking} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddBanquet} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditBanquet} layout={"vertical-default"} />,
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

export const banquetRoute = [...createRoutes()];

