import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLocation, useNavigate } from "react-router-dom";
import ToastAlerts from "app/components/Toast";
import { Axios } from "app/services/config";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const showAlert = ToastAlerts();

  const validationSchema = yup.object({
    password: yup.string().required("New Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    otp: yup
      .number("Enter your OTP")
      .required("OTP is required")
      .test("is-six-digits", "OTP must be 6 digits", (value) => {
        return /^[0-9]{6}$/.test(value);
      }),
  });

  const handleResetPassword = async (data, setSubmitting) => {
    
    try {
      await Axios.post(`/auth/verify-otp`, {...data,email_id:state?.data?.email_id});
      setSubmitting(false);
      showAlert("success", "Password updated successfully.");
      navigate("/login");
    } catch (error) {
      setSubmitting(false);
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <Div
      sx={{
        width: 800,
        maxWidth: "100%",
        margin: "auto",
        p: 4,
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            flex: "0 1 300px",
            position: "relative",
            background: `#0267a0 url(${getAssetPath(`${ASSET_IMAGES}/clubLogo.png`, "640x428")}) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: (theme) => alpha(theme.palette.common.black, 0.5),
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={3}>
                Set New Password
              </Typography>
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              password: "",
              confirm_password: "",
              otp: "",
            }}
            validationSchema={validationSchema}
            // onSubmit={onSignIn}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleResetPassword(data, setSubmitting);
                  // setSubmitting(false);
                })
                .catch((validationErrors) => {
                  console.error("Validation Errors:", validationErrors);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting, values }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth type="number" name="otp" label="OTP" />
                </Div>
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth name="password" label="New Password" />
                </Div>
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth name="confirm_password" label="Confirm Password" />
                </Div>

                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ mb: 3, width: "auto" }}
                  loading={isSubmitting}
                  // onClick={() => onVerify(values)}
                >
                  Update
                </LoadingButton>
                {/* {!disableSmLogin && <React.Fragment></React.Fragment>} */}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default ResetPassword;
