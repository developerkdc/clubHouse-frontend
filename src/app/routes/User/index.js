import Page from "@jumbo/shared/Page";
// import AuthenticateAndRolesMiddleware from "../Middleware";
// import ListUser from "app/pages/UserManagement/ListUser";


const routesName = "/dashboard/user";
// const modules = "user";

export const usersRoute = [
  {
    // middleware: [
    //   {
    //     element: AuthenticateAndRolesMiddleware,
    //     fallbackPath: "/admin/dashboard",
    //     module: modules
    //   },
    // ],
    routes: [
      {
        path: `${routesName}`,
        // element: <Page component={ListUser} />
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
