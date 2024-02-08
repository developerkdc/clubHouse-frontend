import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import AddTrainer from "app/pages/HealthAndFitness/Trainer/AddTrainer";
import ListTrainer from "app/pages/HealthAndFitness/Trainer/ListTrainer";
import TrainerChangePassword from "app/pages/HealthAndFitness/Trainer/TrainerChangePassword";
import EditTrainer from "app/pages/HealthAndFitness/Trainer/EditTrainer";


const routesName = "/health/trainer";
const modules = "trainer";

var routes = [
  {
    path: `${routesName}`,
    element: <Page component={ListTrainer} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddTrainer} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditTrainer} layout={"vertical-default"} />,
    permission: "edit",
  },
{
    path: `${routesName}/change-password/:id`,
    element: <Page component={TrainerChangePassword} layout={"vertical-default"} />,
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

export const TrainerRoute = [...createRoutes()];
