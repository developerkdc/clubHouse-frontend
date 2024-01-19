import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Div from "@jumbo/shared/Div";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const navigate = useNavigate();
  const handleResetPassword = () => {
    navigate("/forgot-password");
  }

  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: (theme) => theme.spacing(4),
      }}
    >
      <Card sx={{ maxWidth: "100%", width: 360, mb: 4 }}>
        <Div sx={{ position: "relative", height: "200px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="data:image/png;base64,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"
          />
          <Div
            sx={{
              flex: 1,
              inset: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              backgroundColor: (theme) =>
                alpha(theme.palette.common.black, 0.5),
              p: (theme) => theme.spacing(3),
            }}
          >
            <Typography
              variant={"h2"}
              sx={{
                color: "common.white",
                fontSize: "1.5rem",
                mb: 0,
              }}
            >
              Forgot password
            </Typography>
          </Div>
        </Div>
        <CardContent>
          <Div sx={{ mb: 3, mt: 1 }}>
            <TextField fullWidth id="email" label="Email" />
          </Div>
         
            <Button onClick={handleResetPassword} fullWidth variant="contained" size="large" sx={{ mb: 3 }}>
              Reset Password
            </Button>
         
        </CardContent>
      </Card>
    </Div>
  );
};

export default EmailVerify;
