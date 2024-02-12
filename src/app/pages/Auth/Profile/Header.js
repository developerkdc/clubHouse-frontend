import React from "react";
import Avatar from "@mui/material/Avatar";
import ContentHeader from "../../../layouts/shared/headers/ContentHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ASSET_AVATARS, ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";

const Header = () => {
  const AuthUser = JSON.parse(localStorage.getItem("authUser")) || {};
  return (
    <ContentHeader
      avatar={<Avatar sx={{ width: 72, height: 72 }} alt={"Remy Sharp"} src={getAssetPath(`${ASSET_IMAGES}/clubLogo.png`, "72x72")} />}
      title={`${AuthUser?.first_name} ${AuthUser?.last_name}`}
      subheader={
        <Typography fontSize={12} variant={"body1"} color={"inherit"} mt={0.5}>
          Mumbai, India
        </Typography>
      }
      children={
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            mx: 1,
          }}
        ></Stack>
      }
      sx={{
        position: "relative",
        zIndex: 1,

        "& .MuiCardHeader-action": {
          alignSelf: "center",
        },
      }}
    />
  );
};

export default Header;
