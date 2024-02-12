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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import DropMultiImage from "app/components/DropZone/multiImage";
import DropSingleImage from "app/components/DropZone/singleImage";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import QuillEmoji from "quill-emoji";

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

const AddGallery = () => {
  const [albumName, SetAlbumName] = useState(["sport", "religion"]);
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  var initialValues = {
    album_name: "",
    source: "",
    description: "",
    short_description: "",
    event_date: "",
    images: [],
    banner_image: [],
    status: true,
  };
  const validationSchema = yup.object({
    source: yup.string("Enter Source").required("Source is required"),
    album_name: yup
      .string("Album Name Title")
      .nullable()
      .required("Album Name is required"),
    short_description: yup
      .string("Short Description")
      .required("Short Description is required"),
    event_date: yup.string("Event Date").required("Event Date is required"),
    // images: yup
    //   .array()
    //   .of(yup.string())
    //   .min(1, "At least one image is required")
    //   .required("Images are required"),
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

  const handleGalleryAdd = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });

    // Append banner image to formData
    bannerImage.forEach((file) => {
      formData.append(`banner_image`, file);
    });
    formData.append("album_name", data.album_name);
    formData.append("source", data.source);
    formData.append("event_date", data.event_date);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("status", data.status);

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });

    try {
      await Axios.post("/gallery/add", formData);
      showAlert("success", "Gallery added successfully.");
      navigate("/gallery");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD GALLERY
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
                  handleGalleryAdd(data);
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
                    <FormControl
                      fullWidth
                      error={errors.album_name && touched.album_name}
                    >
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={albumName}
                        name="album_name"
                        onChange={(event, val) => {
                          setFieldValue("album_name", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.album_name && touched.album_name}
                            {...params}
                            label="Album Name"
                          />
                        )}
                      />
                      {errors && errors.album_name && touched.album_name && (
                        <FormHelperText>{errors.album_name}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      error={errors.event_date && touched.event_date}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          id="event_date"
                          name="event_date"
                          label="Event Date"
                          format="DD-MM-YYYY"
                          value={
                            values.event_date
                              ? new Date(values.event_date)
                              : null
                          }
                          onChange={(newValue) => {
                            setFieldValue("event_date", newValue);
                          }}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </LocalizationProvider>
                      {errors.event_date && touched.event_date && (
                        <FormHelperText>{errors.event_date}</FormHelperText>
                      )}
                    </FormControl>
                    {/* <JumboTextField
                      fullWidth
                      type="date"
                      id="event_date"
                      name="event_date"
                      label="Event Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    /> */}
                  </Grid>

                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="source"
                      name="source"
                      label="Source"
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
                    {/* {errors.images && touched.images && (
                      <FormHelperText error>{errors.images}</FormHelperText>
                    )} */}
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

export default AddGallery;
