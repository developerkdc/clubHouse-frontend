import { LAYOUT_CONTAINER_STYLES } from "@jumbo/utils/constants/layout";
import { mainTheme } from "../themes/main/default";
import { headerTheme } from "../themes/header/default";
import { sidebarTheme } from "../themes/sidebar/default";
import { footerTheme } from "../themes/footer/default";
import LAYOUT_NAMES from "../layouts/layouts";
import { createJumboTheme } from "@jumbo/utils";
import jwtAuthAxios from "app/services/config";
import getCurrentUser from "app/services/config";

const config = {
  authSetting: {
    axiosObject: jwtAuthAxios,
    fallbackPath: "/login",
    getAuthUserService: getCurrentUser,
    redirectNotAuthenticatedPath: "/login",
  },

  defaultLayout: LAYOUT_NAMES.VERTICAL_DEFAULT,
  containerStyle: LAYOUT_CONTAINER_STYLES.FLUID,

  theme: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),
};

export { config };
