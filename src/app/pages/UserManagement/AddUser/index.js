import React from "react";
import {
  Autocomplete,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
const AddUser = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const rolesList = useSelector((state) => state.roleReducer.globalRoleList);

  var initialValues = {
    user_id: "",
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    role_id: "",
    mobile_no: "",
    status: true,
  };
  const validationSchema = yup.object({
    user_id: yup.string("Enter User ID").required("User ID is required"),
    // .matches(/^[0-9]+$/, "User ID must be a number"),
    first_name: yup
      .string("Enter First Name")
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must contain only alphabetic characters"),
    last_name: yup
      .string("Enter Last Name")
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only alphabetic characters"),
    email_id: yup.string("Enter your Email ID").email("Enter a valid Email ID").required("Email is required"),
    mobile_no: yup
      .string()
      .typeError("Phone number must be a number")
      .required("Phone Number is Required")
      .matches(/^\d{10}$/, "Number should be 10 digits."),
    password: yup.string().required("Password is Required"),
    role_id: yup.string().required("Please select role.")
  });

  const handleUserAdd = async (data) => {
    try {
      await Axios.post("/user/add", data);
      showAlert("success", "User added successfully.");
      navigate("/user");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD USER
      </Typography>
      <Card>
        <CardContent>
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              validationSchema
              .validate(data, { abortEarly: false })
              .then(() => {
                  handleUserAdd(data);
                  setSubmitting(false);
                })
                .catch((validationErrors) => {
                  console.error("Validation Errors:", validationErrors);
                  setSubmitting(false);
                });
            }}
          >
            {({ setFieldValue, isSubmitting, values, errors, touched }) => (
              <Form noValidate autoComplete="off">
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="user_id" name="user_id" label="User ID" />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="first_name" name="first_name" label="First name" />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="last_name" name="last_name" label="Last name" />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="email_id" name="email_id" label="Email" />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="password" name="password" label="Password" />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth type="number" id="mobile_no" name="mobile_no" label="Phone No." />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={errors.role_id && touched.role_id}>
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option.role_name}
                        options={rolesList}
                        name="role_id"
                        onChange={(event,val) => {
                          setFieldValue("role_id", val._id);
                        }}
                        renderInput={(params) => <TextField error={errors.role_id && touched.role_id} {...params} label="Roles" />}
                      />
                      {errors && errors.role_id && touched.role_id && <FormHelperText>{errors.role_id}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} alignContent="center">
                    <FormControlLabel
                      style={{ padding: "0px", margin: "0px", height: "100%" }}
                      control={
                        <Switch
                          onChange={(e) => {
                            setFieldValue("status", values.status ? false : true);
                          }}
                          defaultChecked={values.status ? true : false}
                          color="primary"
                        />
                      }
                      label="Status"
                      name="status"
                      labelPlacement="start"
                    />
                  </Grid>
                </Grid>

                <Grid container columnSpacing={3} mt={5}>
                  <Grid item xs={6} textAlign="right">
                    <LoadingButton variant="contained" size="medium" type="submit" loading={isSubmitting}>
                      Save
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure you want to cancel?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes",
                          cancelButtonText: "No",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/user");
                          }
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
