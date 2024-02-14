import React from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  FormControl,
  FormHelperText,
  Switch,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"; // Import Material-UI icons
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik, FieldArray, Field } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import Div from "@jumbo/shared/Div";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { formatDate } from "../AddMember/date";
const EditMember = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state, "state");
  console.log(formatDate(state?.dob), "date");
  var initialValues = {
    member_id: state.member_id,
    first_name: state.first_name,
    last_name: state.last_name,
    email_id: state.email_id,
    mobile_no: state.mobile_no,
    dob: state?.dob,
    member_type: state.member_type,
    status: state.status,
    family_member: state.family_member,
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
      .email("Enter a valid Email ID")
      .required("Email is required"),
    mobile_no: yup
      .string()
      .typeError("Phone number must be a number")
      .required("Phone Number is Required")
      .matches(/^\d{10}$/, "Number should be 10 digits."),
    family_member: yup.array(
      yup.object({
        first_name: yup.string().required("First Name is required"),
        last_name: yup.string().required("Last Name is required"),
        relation: yup.string().required("Relation is required"),
      })
    ),
  });

  const handleMemberEdit = async (data) => {
    try {
      await Axios.patch(`/member/edit/${id}`, data);
      showAlert("success", "Member added successfully.");
      navigate("/member");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT MEMBER
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
                  handleMemberEdit(data);
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
                      type="number"
                      id="mobile_no"
                      name="mobile_no"
                      label="Phone No."
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="member_type"
                      name="member_type"
                      label="Member Type."
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth error={errors.dob && touched.dob}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          defaultValue={dayjs(formatDate(values?.dob))}
                          label="Date of Birth"
                          id="dob"
                          format="DD-MM-YYYY"
                          name="dob"
                          onChange={(newValue) => {
                            setFieldValue("dob", newValue);
                          }}
                          slotProps={{ textField: { size: "small" } }}
                          renderInput={(params) => <input {...params} />}
                        />
                      </LocalizationProvider>

                      {errors && errors.dob && touched.dob && (
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
                <Grid item xs={2} mt={2} alignContent="center">
                  <FieldArray
                    name="family_member"
                    render={(arrayHelpers) => (
                      <Div>
                        {values?.family_member?.map((subItem, index) => (
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
                              <Grid
                                container
                                rowSpacing={3}
                                mt={-2}
                                columnSpacing={3}
                              >
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
                                <Grid item xs={2}>
                                  <JumboTextField
                                    fullWidth
                                    id="mobile_no"
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
                                <Grid item xs={2}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      defaultValue={dayjs(
                                        formatDate(
                                          values.family_member[index]?.dob
                                        )
                                      )}
                                      label="Date of Birth"
                                      id="dob"
                                      format="DD-MM-YYYY"
                                      name={`family_member.${index}.dob`}
                                      onChange={(newValue) => {
                                        setFieldValue(
                                          `family_member.${index}.dob`,
                                          newValue
                                        );
                                      }}
                                      slotProps={{
                                        textField: { size: "small" },
                                      }}
                                      renderInput={(params) => (
                                        <input {...params} />
                                      )}
                                    />
                                  </LocalizationProvider>

                        
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
                            alignItems: "center",
                            width: "200px",
                            mt: 2,
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

export default EditMember;
