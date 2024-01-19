import Page from "@jumbo/shared/Page";
import AuthenticateAndRolesMiddleware from "../Middleware";


const routesName = "/dashboards/roles";
const modules = "roles";

export const rolesRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/admin/dashboard",
        module: modules
      },
    ],
    routes: [
      {
        path: `${routesName}`,
        // element: <Page component={Home} />
      },
      {
        path: `${routesName}/add`,
        // element: <Page component={AdminCustomers} />,
      },
      {
        path: `${routesName}/edit`,
        // element: <Page component={EditCloudstratClient} />,
      },
    ],
  },]
