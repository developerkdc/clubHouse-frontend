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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { isValidEmail } from "@jumbo/utils";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const EditNutritionist = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state, "state");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  const [gender, SetGender] = useState(["Male", "Female"]);
  const [profile_image, setProfile_image] = useState([]);
  console.log(profile_image, "profile_image");

  const {
    getRootProps: getRootProfile_imageProps,
    getInputProps: getInputProfile_imageProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setProfile_image([
          Object.assign(selectedFile, {
            preview: URL.createObjectURL(selectedFile),
          }),
        ]);
      }
    },
  });

  useEffect(
    () => () => {
      profile_image.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [profile_image]
  );

  const thumbs = profile_image.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  var initialValues = {
    first_name: state.first_name,
    last_name: state.last_name,
    gender: state.gender,
    age: state.age,
    email_id: state.email_id,
    profile_image: [],
    mobile_no: state.mobile_no,
    experience: state.experience,
    available_from: state.available_from,
    available_till: state.available_till,
    language: state.language,
    status: state.status,
  };

  const validationSchema = yup.object({
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
        (value) => isValidEmail(value)
      ),
    mobile_no: yup
      .string()
      .typeError("Phone number must be a number")
      .required("Phone Number is Required")
      .matches(/^\d{10}$/, "Number should be 10 digits."),
    available_from: yup.string().required("Available From is Required"),
    available_till: yup.string().required("Available Till is Required"),
    experience: yup.number().required("Experience is Required"),
    language: yup
      .array()
      .of(yup.string())
      .min(1, "At least one language must be selected"),
    gender: yup.string().required("Gender is Required"),
    age: yup.number().required("Age is Required"),
  });

  const handleNutritionistAdd = async (data) => {
    console.log(data, "data");
    const formData = new FormData();

    profile_image.forEach((file) => {
      console.log(file, "file");
      formData.append(`profile_image`, file);
    });
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData.append("email_id", data.email_id);
    formData.append("password", data.password);
    formData.append("mobile_no", data.mobile_no);
    formData.append("experience", data.experience);
    formData.append("available_from", data.available_from);
    formData.append("available_till", data.available_till);
    formData.append("language", JSON.stringify([...data.language]));
    formData.append("status", data.status);
    try {
      await Axios.patch(`/health_fitness/nutritionist/edit/${id}`, formData);
      showAlert("success", "Nutritionist updated successfully.");
      navigate("/health/nutritionist");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  const Languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Arabic",
    "Russian",
    "Hindi",
    "Portuguese",
    "Bengali",
    "Urdu",
    "Indonesian",
    "Italian",
    "Turkish",
    "Thai",
    "Dutch",
    "Korean",
    "Vietnamese",
    "Polish",
    "Ukrainian",
    // Add more languages as needed
  ];

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT NUTRITIONIST
      </Typography>
      <Card>
        <CardContent>
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              console.log(data, "daaaaaaaaaaa");
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleNutritionistAdd(data);
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
                      type="number"
                      id="mobile_no"
                      name="mobile_no"
                      label="Phone No."
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

                  <Grid item xs={1}>
                    <JumboTextField
                      fullWidth
                      id="age"
                      type="number"
                      name="age"
                      label="Age"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl
                      fullWidth
                      error={errors.gender && touched.gender}
                    >
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={gender}
                        value={values.gender}
                        name="gender"
                        onChange={(event, val) => {
                          setFieldValue("gender", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.gender && touched.gender}
                            {...params}
                            label="Gender"
                          />
                        )}
                      />
                      {errors && errors.gender && touched.gender && (
                        <FormHelperText>{errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      id="experience"
                      type="number"
                      name="experience"
                      label="Years of Experience"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      type="time"
                      id="available_from"
                      name="available_from"
                      label="Available From"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      type="time"
                      id="available_till"
                      name="available_till"
                      label="Available Till"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      error={errors.language && touched.language}
                    >
                      <Autocomplete
                        multiple
                        limitTags={3}
                        fullWidth
                        size="small"
                        disablePortal
                        name="language"
                        options={Languages}
                        value={values.language}
                        getOptionLabel={(option) => option}
                        onChange={(event, val) => {
                          setFieldValue("language", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.language && touched.language}
                            {...params}
                            label="Languages Spoken"
                          />
                        )}
                      />

                      {errors && errors.language && touched.language && (
                        <FormHelperText>{errors.language}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

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

                <Grid container rowSpacing={3} columnSpacing={3} marginTop={-1}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Images :-</Typography>
                    <div
                      {...getRootProfile_imageProps({ className: "dropzone" })}
                      style={{ marginTop: "10px", width: "112px" }}
                    >
                      <input {...getInputProfile_imageProps()} />
                      <Button size="small" variant="contained">
                        Select Image
                      </Button>
                    </div>
                    <aside style={thumbsContainer}>
                      {/* Display initial image or selected images */}
                      {profile_image.length > 0 ? (
                        thumbs // Display selected images
                      ) : (
                        <div style={thumb}>
                          <div style={thumbInner}>
                            <img
                              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/nutritionist/${state.profile_image}`}
                              style={img}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </aside>
                  </Grid>
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
                            navigate("/health/nutritionist");
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

export default EditNutritionist;
