import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import NutritionistChangePassword from "app/pages/HealthAndFitness/Nutritionist/NutritionistChangePassword";
import AddNutritionist from "app/pages/HealthAndFitness/Nutritionist/AddNutritionist";
import ListNutritionist from "app/pages/HealthAndFitness/Nutritionist/ListNutritionist";
import EditNutritionist from "app/pages/HealthAndFitness/Nutritionist/EditNutritionist";

// import EditNutritionist from "app/pages/Nutritionist/EditNutritionist";

const routesName = "/health/nutritionist";
const modules = "nutritionist";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListNutritionist} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddNutritionist} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditNutritionist} layout={"vertical-default"} />,
    permission: "edit",
  },
{
    path: `${routesName}/change-password/:id`,
    element: <Page component={NutritionistChangePassword} layout={"vertical-default"} />,
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

export const NutritionistRoute = [...createRoutes()];
