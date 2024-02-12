import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { alpha } from "@mui/material/styles";
import Div from "@jumbo/shared/Div";
import { useNavigate } from "react-router-dom";
import ToastAlerts from "app/components/Toast";
import { Axios } from "app/services/config";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { ASSET_IMAGES } from "app/utils/constants/paths";

const EmailVerify = () => {
  const showAlert = ToastAlerts();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email_id: yup
      .string("Enter your Registered Email ID")
      .email("Enter a valid Email ID")
      .required("Registered Email is required"),
  });

  const handleSendOtp = async (data, setSubmitting) => {
    try {
      await Axios.post(`/auth/forgot-password`, data);
      setSubmitting(false);
      showAlert("success", "OTP sent successfully.");
      navigate("/reset-password", { state: { data } });
    } catch (error) {
      setSubmitting(false);
      showAlert("error", error.response.data.message);
    }
  };

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
            image={`${ASSET_IMAGES}/clubLogo2.png`}
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
          <Formik
            validateOnChange={true}
            initialValues={{ email_id: "" }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleSendOtp(data, setSubmitting);
                })
                .catch((validationErrors) => {
                  console.error("Validation Errors:", validationErrors);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form noValidate autoComplete="off">
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <JumboTextField
                      fullWidth
                      id="email_id"
                      name="email_id"
                      label="Registered Email ID"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      fullWidth
                      variant="contained"
                      size="medium"
                      type="submit"
                      loading={isSubmitting}
                    >
                      Send OTP
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default EmailVerify;
