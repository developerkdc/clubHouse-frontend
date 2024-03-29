import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"; // Import Material-UI icons
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik, FieldArray } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import Div from "@jumbo/shared/Div";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isValidEmail } from "@jumbo/utils";
import dayjs from "dayjs";
const AddMember = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  var initialValues = {
    member_id: "",
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    mobile_no: "",
    dob: "",
    member_type: "",
    status: true,
    family_member: [],
  };
  const validationSchema = yup.object({
    member_id: yup.string("Enter Member ID").required("Member ID is required"),
    member_type: yup
      .string("Enter Member Type")
      .required("Member Type is required"),
    dob: yup
      .date()
      .test("not-current-date", "Enter Valid Date of Birth", function (value) {
        if (!value) {
          // Handle case where value is not provided
          return false;
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to midnight

        return value < currentDate; // Change this to <= to allow the current date
      })
      .required("Date Of Birth is required"),
    // .matches(/^[0-9]+$/, "User ID must be a number"),
    first_name: yup
      .string("Enter First Name")
      .required("First Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "First Name must contain only alphabetic characters"
      ),
    last_name: yup
      .string("Enter Last Name")
      .required("Last Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "Last Name must contain only alphabetic characters"
      ),
    email_id: yup
      .string("Enter your Email ID")
      .required("Email is required")
      .test(
        "isValidEmail",
        "Email should contain lover case characters, '@' and '.' symbols",
        (value) => isValidEmail(value) // Check if the email is valid
      ),
    mobile_no: yup
      .string()
      .typeError("Phone number must be a number")
      .required("Phone Number is Required")
      .matches(/^\d{10}$/, "Number should be 10 digits."),
    password: yup.string().required("Password is Required"),
    family_member: yup.array(
      yup.object({
        first_name: yup
          .string("Enter First Name")
          .required("First Name is required")
          .matches(
            /^[A-Za-z]+$/,
            "First Name must contain only alphabetic characters"
          ),
        last_name: yup
          .string("Enter Last Name")
          .required("Last Name is required")
          .matches(
            /^[A-Za-z]+$/,
            "Last Name must contain only alphabetic characters"
          ),
        relation: yup.string().required("Relation is required"),
      })
    ),
  });

  const handleMemberAdd = async (data) => {
    try {
      await Axios.post("/member/add", data);
      showAlert("success", "Member added successfully.");
      navigate("/member");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD MEMBER
      </Typography>
      <Card>
        <CardContent>
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              console.log(data, "data");
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleMemberAdd(data);
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
                {console.log(errors, "ewrrrrrr")}
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="member_id"
                      name="member_id"
                      label="Member ID"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="first_name"
                      name="first_name"
                      label="First name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="last_name"
                      name="last_name"
                      label="Last name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="email_id"
                      name="email_id"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      type="number"
                      id="mobile_no"
                      name="mobile_no"
                      label="Phone No"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="member_type"
                      name="member_type"
                      label="Member Type"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl
                      key={values.dob}
                      fullWidth
                      error={errors.dob && touched.dob}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date of Birth"
                          id="from"
                          format="DD-MM-YYYY"
                          name="from"
                          sx={{
                            width: "100%",
                          }}
                          value={
                            values.dob
                              ? dayjs(values.dob)
                              : errors.dob
                              ? ""
                              : null
                          }
                          onChange={(newValue) => {
                            setFieldValue("dob", newValue);
                          }}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </LocalizationProvider>
                      {errors.dob && touched.dob && (
                        <FormHelperText>{errors.dob}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6} alignContent="center">
                    <FormControlLabel
                      style={{ padding: "0px", margin: "0px", height: "100%" }}
                      control={
                        <Switch
                          onChange={(e) => {
                            setFieldValue(
                              "status",
                              values.status ? false : true
                            );
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
                <Grid item xs={2} alignContent="center">
                  <FieldArray
                    name="family_member"
                    render={(arrayHelpers) => (
                      <Div>
                        {values?.family_member?.map((member, index) => (
                          <Div
                            key={index}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Div
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography variant="h5">{`Member ${
                                index + 1
                              }`}</Typography>
                              <Grid container rowSpacing={3} columnSpacing={3}>
                                <Grid item xs={2}>
                                  <JumboTextField
                                    fullWidth
                                    id="first_name"
                                    name={`family_member.${index}.first_name`}
                                    label="First Name"
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <JumboTextField
                                    fullWidth
                                    id="last_name"
                                    name={`family_member.${index}.last_name`}
                                    label="Last Name"
                                  />
                                </Grid>
                                {console.log(errors, "fff")}
                                <Grid item xs={2}>
                                  <JumboTextField
                                    fullWidth
                                    id="mobile_no"
                                    type="number"
                                    name={`family_member.${index}.mobile_no`}
                                    label="Phone NO"
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <JumboTextField
                                    fullWidth
                                    id="email_id"
                                    name={`family_member.${index}.email_id`}
                                    label="Email ID"
                                  />
                                </Grid>
                                {console.log(errors, "errors")}
                                <Grid item xs={2}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Date of Birth"
                                      id="dob"
                                      format="DD-MM-YYYY"
                                      name={`family_member.${index}.dob`}
                                      sx={{
                                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                          {
                                            borderColor: "red !important", // Border color when error is present
                                          },
                                      }}
                                      value={
                                        values?.family_member?.[index]?.dob
                                          ? dayjs(
                                              values?.family_member?.[index]
                                                ?.dob
                                            )
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        setFieldValue(
                                          `family_member.${index}.dob`,
                                          newValue
                                        );
                                      }}
                                      slotProps={{
                                        textField: {
                                          size: "small",
                                          error: Boolean(
                                            errors?.family_member?.[index]?.dob
                                          ),
                                        }, // Set error prop based on validation
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          name={`family_member.${index}.dob`}
                                          error={Boolean(
                                            errors?.family_member?.[index]?.dob
                                          )} // Set error prop based on validation
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>

                                  {errors?.family_member?.[index]?.dob &&
                                    touched?.family_member?.[index]?.dob && (
                                      <FormHelperText
                                        sx={{
                                          color: "#E73145",
                                          fontSize: "11px",
                                          mt: 0.7,
                                          ml: 1.5,
                                        }}
                                      >
                                        {errors?.family_member?.[index]?.dob}
                                      </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={2}>
                                  <JumboTextField
                                    fullWidth
                                    id="relation"
                                    name={`family_member.${index}.relation`}
                                    label="Relation"
                                  />
                                </Grid>
                              </Grid>
                            </Div>

                            <RemoveCircleOutline
                              onClick={() => arrayHelpers.remove(index)}
                              sx={{
                                ml: 2,
                                mt:
                                  errors?.family_member &&
                                  touched?.family_member
                                    ? 0.5
                                    : 3.5,
                                color: "red",
                                ":hover": { cursor: "pointer" },
                              }}
                            />
                          </Div>
                        ))}
                        <Div
                          sx={{
                            display: "flex",
                            mt: 2,
                            alignItems: "center",
                            width: "200px",
                            ":hover": {
                              cursor: "pointer",
                              color: "black",
                              fontWeight: "600",
                            },
                          }}
                          onClick={() =>
                            arrayHelpers.push({
                              first_name: "",
                              last_name: "",
                              email_id: "",
                              mobile_no: "",
                              dob: "",
                              relation: "",
                            })
                          }
                        >
                          <AddCircleOutline />
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                              ml: 1.5,

                              ":hover": { cursor: "pointer", color: "black" },
                            }}
                          >
                            Add Family Member
                          </Typography>
                        </Div>
                      </Div>
                    )}
                  />
                </Grid>

                <Grid container columnSpacing={3} mt={5}>
                  <Grid item xs={6} textAlign="right">
                    <LoadingButton
                      variant="contained"
                      size="medium"
                      type="submit"
                      loading={isSubmitting}
                    >
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

export default AddMember;
