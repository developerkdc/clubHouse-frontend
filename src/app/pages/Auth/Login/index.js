import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const validationSchema = yup.object({
  email_id: yup
    .string("Enter your Email ID")
    .email("Enter Valid Email ID")
    .required("Email ID is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = ({ disableSmLogin }) => {
  // const { error, loading, isAuthenticated, user } = useSelector(
  //   (state) => state.userReducer
  // );
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Invalid Credentials",
  //       text: error,
  //     });
  //     dispatch(clearErrors());
  //   }
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  //   } else if (isAuthenticated && user.role != "admin") {
  //     navigate("/mycontent");
  //   }
  // }, []);

  const onSignIn = (values) => {
    if (values) {
      navigate("/");
    }
    // dispatch(login(values?.email_id, values?.password, setSubmitting));
  };

  // const handleForgotPassword = () => {
  //   showDialog({
  //     title: "Enter Email For Recovery",
  //     content: <ForgotPasswordForm hideDialogue={hideDialog} />,
  //   });
  // };

  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        // marginRight: 80,
        // p: 4,
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
                Sign In
              </Typography>
              <Typography variant={"body1"} mb={2}>
                By signing in, you can access the dashboard of Club House.
              </Typography>
            </Div>

            <Div sx={{ mt: "auto" }}></Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email_id: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSignIn}
          >
            {({ values }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth name="email_id" label="Email ID" />
                </Div>
                <Div sx={{ mt: 1, mb: 2 }}>
                  <JumboTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"} // Step 4
                  />
                </Div>
                <Div sx={{ mb: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                    }
                    label="Show Password"
                  />
                </Div>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ mb: 3 }}
                  loading={isSubmitting}
                >
                  Sign In
                </LoadingButton>

                {!disableSmLogin && (
                  <React.Fragment>
                    <Link to="/email-verify">
                      <Typography
                        variant={"body1"}
                        mb={2}
                        sx={{
                          "&:hover": { cursor: "pointer", color: "blue" },
                          width: "40%",
                        }}
                      >
                        Forgot Password?
                      </Typography>
                    </Link>
                  </React.Fragment>
                )}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login;
