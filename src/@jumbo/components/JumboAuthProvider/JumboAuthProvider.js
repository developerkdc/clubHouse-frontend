import React from "react";
import { useNavigate } from "react-router-dom";
import { routesForAuthenticatedOnly, routesForNotAuthenticatedOnly } from "../../../app/routes";
import useRoutePathMatch from "@jumbo/hooks/useRoutePathMatch";
import { removeToken, storeToken } from "./authHelpers";
import { config } from "../../../app/config/main";
import { AuthContext } from "@jumbo/components/JumboAuthProvider/JumboAuthContext";
import { onUserList } from "app/redux/actions/User";
import { useDispatch } from "react-redux";

const storedToken = localStorage.getItem("token");
let firstTimePageLoad = true;

const init = () => {
  let authUser = null;

  if (!config?.authSetting) {
    throw Error(`You are using JumboAuthProvider but you haven't setup authSetting inside /src/app/config/main.js's config object`);
  }

  if (storedToken) {
    storeToken(storedToken); // also sets axios header
  }

  return {
    authToken: storedToken ?? null,
    authUser: authUser,
    isLoading: false,
    fallbackPath: config.authSetting.fallbackPath,
  };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "set-auth-data":
      return {
        ...state,
        ...action.payload,
      };

    case "start-loading":
      return {
        ...state,
        isLoading: true,
      };

    case "stop-loading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return {
        authToken: null,
        authUser: null,
        isLoading: false,
      };
  }
};

const JumboAuthProvider = ({ children, ...restProps }) => {
  const [authOptions, setAuthOptions] = React.useReducer(authReducer, restProps, init);
  const [logout, setLogout] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticatedRouteOnly = useRoutePathMatch(routesForAuthenticatedOnly);
  const isNotAuthenticatedRouteOnly = useRoutePathMatch(routesForNotAuthenticatedOnly);

  React.useEffect(() => {
    if (logout) {
      removeToken();
      localStorage.removeItem("authUser");
      setAuthOptions({
        type: "set-auth-data",
        payload: { authToken: null, authUser: null, isLoading: false },
      });
      setLogout(false);
    }
  }, [logout]);

  const setAuthToken = React.useCallback(async (token) => {
    // console.log(token);
    setAuthOptions({ type: "start-loading" });
    if (!token) {
      setLogout(true);
      return;
    }

    storeToken(token);
    try {
      const authUser = await config?.authSetting?.getAuthUserService();
      //   const authUser = {
      //     "otp": null,
      //     "_id": "6597fc800bf48e7b03caad0a",
      //     "user_id": 1,
      //     "first_name": "Shyam",
      //     "last_name": "Kumar",
      //     "email_id": "akshay.ingle@kdigitalcurry.com",
      //     "password": "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
      //     "mobile_no": "1230456789",
      //     "status": true,
      //     "role_id": {
      //         "permissions": {
      //             "user": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "roles": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "member": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "news": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "event": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "gallery": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "banquet": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "sport": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "salon": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "spa": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "library": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "nutritionist": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "trainer": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "payment": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "invoice": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "support": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             },
      //             "feedback": {
      //                 "add": true,
      //                 "edit": true,
      //                 "view": true
      //             }
      //         },
      //         "_id": "6599448e70b02b40e5fe7c69",
      //         "role_name": "Super Admin",
      //         "status": true,
      //         "deleted_at": null,
      //         "created_at": "2024-01-06T12:16:14.019Z",
      //         "updated_at": "2024-01-06T12:16:14.020Z",
      //         "__v": 0
      //     },
      //     "deleted_at": null,
      //     "created_at": "2024-01-05T12:56:32.089Z",
      //     "updated_at": "2024-01-06T07:20:19.000Z",
      //     "__v": 0
      // };

      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setAuthOptions({
          type: "set-auth-data",
          payload: { authToken: token, authUser: authUser, isLoading: false },
        });
        return;
      }
      setLogout(true);
    } catch (error) {
      setLogout(true);
      console.error(error);
    }
  }, []);

  //todo: maybe in next version
  //   const setRedirectPath = React.useCallback((redirectPath) => {
  //     setAuthOptions({ type: "set-redirect-path", payload: { redirectPath } });
  //   }, []);

  const setAuthData = React.useCallback((data) => {
    setAuthOptions({ type: "set-auth-data", payload: data });
  }, []);

  const contextValue = React.useMemo(() => {
    return {
      ...authOptions,
      setAuthData,
      //   setRedirectPath,
      setAuthToken,
      setAuthOptions,
    };
  }, [authOptions]);

  React.useEffect(() => {
    if (!authOptions.authToken) {
      if (isAuthenticatedRouteOnly) {
        navigate(authOptions?.fallbackPath);
      }
    } else if (!authOptions.authUser) {
      setAuthToken(authOptions.authToken);
    } else if (isNotAuthenticatedRouteOnly) {
      if (!firstTimePageLoad) navigate(config.authSetting.redirectNotAuthenticatedPath ?? "/");
      else firstTimePageLoad = false;
    }
  }, [authOptions.authUser]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default JumboAuthProvider;
