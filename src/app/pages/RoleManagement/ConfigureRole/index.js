import Div from "@jumbo/shared/Div/Div";
import {Typography } from "@mui/material";
import React from "react";
import PermissionList from "./roleList";
import { useLocation } from "react-router-dom";

export default function ConfigureRole() {
  const { pathname } = useLocation();

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname == "/addrole" ? "New Role" : "Configure Role"}
      </Typography>
      <Div sx={{ mt: 2 }}>
        <Div sx={{ display: "flex", mt: 4 }}>
          <PermissionList />
        </Div>
      </Div>
    </Div>
  );
}
