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
import DropSingleImage from "app/components/DropZone/singleImage";
import DropMultiImage from "app/components/DropZone/multiImage";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import QuillEmoji from "quill-emoji";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
Quill.register("modules/emoji", QuillEmoji);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "emoji"],
    ["clean"],
  ],

  clipboard: {
    matchVisual: false,
  },
  "emoji-toolbar": true,
  "emoji-textarea": false,
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
    start_date: "",
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
    end_date: yup
      .string("End Date")
      .nullable()
      .when("duration_type", {
        is: (durationType) => durationType === "multi",
        then: yup.string().required("End Date is required"),
        otherwise: yup.string(),
      }),
  });

  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

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
                            setFieldValue("end_date", "");
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
                    <FormControl
                      fullWidth
                      error={errors.start_date && touched.start_date}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Start Date"
                          id="start_date"
                          format="DD-MM-YYYY"
                          name="start_date"
                          value={
                            values.start_date
                              ? new Date(values.start_date)
                              : errors.start_date
                              ? ""
                              : null
                          }
                          onChange={(newValue) => {
                            setFieldValue("start_date", newValue);
                          }}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </LocalizationProvider>
                      {errors.start_date && touched.start_date && (
                        <FormHelperText>{errors.start_date}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl
                      key={values.end_date}
                      fullWidth
                      error={errors.end_date && touched.end_date}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          id="end_date"
                          name="end_date"
                          label="End Date"
                          format="DD-MM-YYYY"
                          value={
                            values.end_date
                              ? dayjs(values.end_date)
                              : errors.end_date
                              ? ""
                              : null
                          }
                          onChange={(newValue) => {
                            setFieldValue("end_date", newValue);
                          }}
                          slotProps={{ textField: { size: "small" } }}
                          disabled={values.duration_type !== "multi"}
                        />
                      </LocalizationProvider>
                      {errors.end_date && touched.end_date && (
                        <FormHelperText>{errors.end_date}</FormHelperText>
                      )}
                    </FormControl>
                    {/* <JumboTextField
                      fullWidth
                      type="date"
                      id="end_date"
                      name="end_date"
                      label="End Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={values.duration_type !== "multi"}
                    /> */}
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
                    <DropSingleImage
                      setImage={setBannerImage}
                      image={bannerImage}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1">Images :-</Typography>
                    <DropMultiImage setImages={setFiles} images={files} />
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
                      modules={modules}
                      formats={[
                        "header",
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "blockquote",
                        "list",
                        "bullet",
                        "link",
                        "image",
                        "emoji",
                      ]}
                      style={{ height: "200px" }}
                    />
                  </Grid>
                </Grid>
                <Grid container columnSpacing={3} mt={10}>
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
