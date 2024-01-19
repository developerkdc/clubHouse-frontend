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
import { useNavigate } from "react-router-dom";


const validationSchema = yup.object({
  new_password: yup
  .string()
  .required("New Password is required"),
confirm_password: yup
  .string()
  .oneOf([yup.ref('new_password'), null], 'Passwords must match')
  .required('Confirm Password is required'),
  otp: yup
    .number("Enter your OTP")
    .required("OTP is required")
    .test("is-six-digits", "OTP must be 6 digits", (value) => {
      return /^[0-9]{6}$/.test(value);
    }),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const onSignIn = (values) => {
    if (values) {
      navigate("/login");
    }
    // dispatch(login(values?.email_id, values?.password, setSubmitting));
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
            background: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/widgets/keith-luke.jpg`,
              "640x428"
            )}) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: alpha("#0267a0", 0.65),
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
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={3}
              >
                OTP Verification
              </Typography>
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              new_password: "",
              confirm_password: "",
              otp: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={onSignIn}
          >
            {({ isSubmitting, values }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
           
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth name="otp" label="OTP" />
                </Div>
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth name="new_password" label="New Password" />
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
                  Verify OTP
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

export default ForgotPassword;
