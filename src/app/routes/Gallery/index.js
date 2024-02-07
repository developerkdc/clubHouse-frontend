import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import AddGallery from "app/pages/Gallery/AddGallery";
import ListGallery from "app/pages/Gallery/ListGallery";
import EditGallery from "app/pages/Gallery/EditGallery";

const routesName = "/gallery";
const modules = "gallery";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListGallery} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddGallery} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditGallery} layout={"vertical-default"} />,
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

export const galleryRoute = [...createRoutes()];

