import React from "react";
import { Card, CardContent, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
const role = ["admin", "user"];

const AddMember = () => {
  const user_status = 1;
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD USER
      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Box
              component="form"
              sx={{
                mx: -1,

                "& .MuiFormControl-root:not(.MuiTextField-root)": {
                  p: 1,
                  mb: 2,
                  width: { xs: "100%", sm: "50%" },
                },

                "& .MuiFormControl-root.MuiFormControl-fluid": {
                  width: "100%",
                },
              }}
              autoComplete="off"
            >
              <FormControl>
                <TextField
                  fullWidth
                  id="user_id"
                  name="user_id"
                  label="User ID"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { lineHeight: "12px" } }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First name"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { lineHeight: "12px" } }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  id="last_name"
                  name="last_name"
                  label="Last name"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { lineHeight: "12px" } }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { lineHeight: "12px" } }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  id="phone_no"
                  name="phone_no"
                  label="Phone No."
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { lineHeight: "12px" } }}
                />
              </FormControl>
              <FormControl sx={{ minWidth: 120, height: 10, marginBottom: 0 }}>
                <InputLabel sx={{ padding: 1.1, top: -3 }}>Role</InputLabel>
                <Select
                  labelId="role_name"
                  id="role_name"
                  label="Role"
                  inputProps={{
                    "aria-label": "Role",
                    style: { height: "12px" },
                  }}
                  InputLabelProps={{ style: { lineHeight: "12px" } }}
                  style={{ height: "45px" }}
                >
                  <MenuItem value="Select">Select</MenuItem>
                  {role?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                label={<Typography variant="h5">Status</Typography>}
                control={<Switch defaultChecked={user_status === 1} color={user_status === 1 ? "success" : "error"} />}
                labelPlacement="start"
              />
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
                <Button
                  variant="outlined"
                  // onClick={() => {
                  //   Swal.fire({
                  //     title: "Are you sure you want to cancel?",
                  //     icon: "warning",
                  //     showCancelButton: true,
                  //     confirmButtonText: "Yes",
                  //     cancelButtonText: "No",
                  //   }).then((result) => {
                  //     if (result.isConfirmed) {
                  //       navigate("/dashboard/user");
                  //     }
                  //   });
                  // }}
                >
                  Cancel
                </Button>

                <LoadingButton type="submit" variant="outlined" sx={{ width: "100px" }}>
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

export default AddMember;
