import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <Div
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        Welcome To Club House
      </Typography>
    </Div>
  );
};

export default Dashboard;
