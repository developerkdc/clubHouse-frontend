import React, { useState, useEffect } from "react";
import {
  Autocomplete,
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
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
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

const AddEvent = () => {
  const [category, SetCategory] = useState(["sport", "religion"]);
  const [eventType, SetEventType] = useState(["free", "paid"]);
  const [durationType, SetDurationType] = useState(["single", "multi"]);
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  var initialValues = {
    title: "",
    category: "",
    duration_type: "",
    event_type: "",
    short_description: "",
    description: "",
    start_date: new Date(Date.now()).toISOString().split("T")[0],
    entry_fee: "",
    images: [],
    banner_image: [],
    end_date: "",
    status: true,
  };
  const validationSchema = yup.object({
    title: yup.string("Enter Title").required("Title is required"),
    category: yup
      .string("Category Title")
      .nullable()
      .required("Category is required"),
    duration_type: yup
      .string("Duration Type")
      .nullable()
      .required("Duration Type is required"),
    event_type: yup
      .string("Event Type")
      .nullable()
      .required("Event Type is required"),
    short_description: yup
      .string("Short Description")
      .required("Short Description is required"),
    start_date: yup.string("Start Date").required("Start Date is required"),
    entry_fee: yup.string("Entry Fee").when(["event_type"], {
      is: (eventType) => eventType === "paid",
      then: yup.string().required("Entry Fee is required"),
      otherwise: yup.string(),
    }),
    end_date: yup.string("End Date").when("duration_type", {
      is: (durationType) => durationType === "multi",
      then: yup.string().required("End Date is required"),
      otherwise: yup.string(),
    }),
  });

  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const {
    getRootProps: getRootBannerImageProps,
    getInputProps: getInputBannerImageProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setBannerImage([
          Object.assign(selectedFile, {
            preview: URL.createObjectURL(selectedFile),
          }),
        ]);
      }
    },
  });

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(
    () => () => {
      bannerImage.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [bannerImage]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  const thumbss = bannerImage.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  const handleEventAdd = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });

    // Append banner image to formData
    bannerImage.forEach((file) => {
      formData.append(`banner_image`, file);
    });
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("duration_type", data.duration_type);
    formData.append("event_type", data.event_type);
    formData.append("start_date", data.start_date);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("end_date", data.end_date);
    formData.append("entry_fee", data.entry_fee);
    formData.append("status", data.status);

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });

    try {
      await Axios.post("/event/add", formData);
      showAlert("success", "Event added successfully.");
      navigate("/event");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD EVENT
      </Typography>
      <Card>
        <CardContent>
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              console.log(data, "datass");
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleEventAdd(data);
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
                      id="title"
                      name="title"
                      label="Title"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      error={errors.category && touched.category}
                    >
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={category}
                        name="category"
                        onChange={(event, val) => {
                          setFieldValue("category", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.category && touched.category}
                            {...params}
                            label="Category"
                          />
                        )}
                      />
                      {errors && errors.category && touched.category && (
                        <FormHelperText>{errors.category}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      error={errors.duration_type && touched.duration_type}
                    >
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={durationType}
                        name="duration_type"
                        onChange={(event, val) => {
                          if (val === "single") {
                            setFieldValue("end_date", "");
                          } else {
                            setFieldValue(
                              "end_date",
                              new Date(Date.now()).toISOString().split("T")[0]
                            );
                          }
                          setFieldValue("duration_type", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={
                              errors.duration_type && touched.duration_type
                            }
                            {...params}
                            label="Duration Type"
                          />
                        )}
                      />
                      {errors &&
                        errors.duration_type &&
                        touched.duration_type && (
                          <FormHelperText>
                            {errors.duration_type}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      type="date"
                      id="start_date"
                      name="start_date"
                      label="Start Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      type="date"
                      id="end_date"
                      name="end_date"
                      label="End Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={values.duration_type !== "multi"}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      error={errors.event_type && touched.event_type}
                    >
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={eventType}
                        name="eventType"
                        onChange={(event, val) => {
                          if (val === "free") {
                            setFieldValue("entry_fee", "");
                          }
                          setFieldValue("event_type", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.event_type && touched.event_type}
                            {...params}
                            label="Event Type"
                          />
                        )}
                      />
                      {errors && errors.event_type && touched.event_type && (
                        <FormHelperText>{errors.event_type}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      id="entry_fee"
                      type="number"
                      name="entry_fee"
                      label="Entry Fee"
                      disabled={values.event_type !== "paid"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <JumboTextField
                      multiline
                      rows={2}
                      fullWidth
                      id="short_description"
                      name="short_description"
                      label="Short Description"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2} alignContent="center">
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
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={-1}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Image :-</Typography>
                    <div
                      {...getRootBannerImageProps({ className: "dropzone" })}
                      style={{
                        marginTop: "10px",
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      <input
                        {...getInputBannerImageProps()}
                        style={{
                          position: "absolute",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      <Button size="small" variant="contained">
                        Select Image
                      </Button>
                    </div>
                    <aside style={thumbsContainer}>{thumbss}</aside>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1">Images :-</Typography>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      style={{
                        marginTop: "10px",
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      <input
                        {...getInputProps()}
                        style={{
                          position: "absolute",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      <Button size="small" variant="contained">
                        Select Images
                      </Button>
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  </Grid>
                </Grid>{" "}
                <Typography variant="body1" marginTop={1}>
                  Description :-
                </Typography>
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={-1}>
                  <Grid item xs={12}>
                    <ReactQuill
                      theme="snow"
                      value={values?.description}
                      onChange={(content, delta, source, editor) => {
                        console.log(content);
                        setFieldValue("description", content);
                      }}
                    />
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
                            navigate("/event");
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

export default AddEvent;
