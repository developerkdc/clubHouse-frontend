import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
const ChangePassword = () => {
    return (
      <React.Fragment>
        <Typography variant="h1" mb={3}>
          Change Password
        </Typography>
        <Card sx={{ display: "flex", mb: 3.5 }}>
          <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent>
              <Box
                component="form"
                sx={{
                  mx: 1,
  
                  "& .MuiFormControl-root:not(.MuiTextField-root)": {
                    p: 1,
                    mb: 2,
                    width: { xs: "100%", sm: "33%" },
                  },
  
                  "& .MuiFormControl-root.MuiFormControl-fluid": {
                    width: "100%",
                  },
  
                  // Add custom styling for TextField height
                  "& .MuiTextField-root": {
                    height: "50px", // Adjust the height as needed
                  },
                }}
                autoComplete="off"
              >
                <FormControl>
                  <TextField
                    fullWidth
                    id="cur"
                    name="user_id"
                    label="Current Password"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { lineHeight: "12px" } }}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    fullWidth
                    id="first_name"
                    name="first_name"
                    label="New Password"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { lineHeight: "12px" } }}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    fullWidth
                    id="last_name"
                    name="last_name"
                    label="Confirm Password"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { lineHeight: "12px" } }}
                  />
                </FormControl>
  
                <Div
                  sx={{
                    width: "93.5%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    mt: 3,
                  }}
                >
                  <Button variant="outlined">
                    Cancel
                  </Button>
  
                  <LoadingButton
                    type="submit"
                    variant="outlined"
                    sx={{ width: "100px" }}
                  >
                    Save
                  </LoadingButton>
                </Div>
              </Box>
            </CardContent>
          </Div>
        </Card>
      </React.Fragment>
    );
  };
  
  export default ChangePassword;