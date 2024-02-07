import React from "react";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import ToastAlerts from "app/components/Toast";
import { Axios } from "app/services/config";

const MemberChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const showAlert = ToastAlerts();

  const validationSchema = yup.object({
    new_password: yup.string("Enter New Password").required("New Password is required"),
    confirm_password: yup
      .string("Enter Confirm Password")
      .oneOf([yup.ref("new_password"), null], "Confirm Passwords must match.")
      .required("Confirm Password is required"),
  });

  const handleUpdatePassword = async (data) => {
    try {
      await Axios.patch(`/member/change-password/${id}`, data);
      showAlert("success", "Password updated successfully.");
      navigate("/member");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        Member Change Password
      </Typography>
      <Card>
        <CardContent>
          <Formik
            validateOnChange={true}
            initialValues={{ new_password: "", confirm_password: "" }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleUpdatePassword(data);
                  setSubmitting(false);
                })
                .catch((validationErrors) => {
                  console.error("Validation Errors:", validationErrors);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form noValidate autoComplete="off">
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="new_password" name="new_password" label="New Password" />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="confirm_password" name="confirm_password" label="Confirm Password" />
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
                            navigate("/member");
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

export default MemberChangePassword;
