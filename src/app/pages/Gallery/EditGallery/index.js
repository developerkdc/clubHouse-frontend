import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  ImageList,
  ImageListItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditGalleryImage from "./editImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
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

const EditGallery = () => {
  const [albumName, SetAlbumName] = useState(["sport", "religion"]);
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state, "state");
  const [openView, setOpenView] = useState(false);
  var initialValues = {
    album_name: state.album_name,
    source: state.source,
    description: state.description,
    short_description: state.short_description,
    event_date: new Date(state.event_date).toISOString().split("T")[0],
    images: [],
    banner_image: [],
    status: state.status,
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
  });

  const [files, setFiles] = useState(state.images ? state.images : []);
  const [bannerImage, setBannerImage] = useState([]);
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
      bannerImage.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [bannerImage]
  );
  const thumbs = bannerImage.map((file) => (
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
    formData.append("album_name", data.album_name);
    formData.append("source", data.source);
    formData.append("event_date", data.event_date);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("status", data.status);

    try {
      await Axios.patch(`/gallery/edit/${id}`, formData);
      showAlert("success", "Gallery added successfully.");
      navigate("/gallery");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT GALLERY
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
                        value={values?.album_name}
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
                    <JumboTextField
                      fullWidth
                      type="date"
                      id="event_date"
                      name="event_date"
                      label="Event Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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

                <Grid container rowSpacing={3} columnSpacing={3} marginTop={5}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Images :-</Typography>
                    <div
                      {...getRootBannerImageProps({ className: "dropzone" })}
                      style={{ marginTop: "10px", width: "120px" }}
                    >
                      <input {...getInputBannerImageProps()} />
                      <Button size="small" variant="contained">
                        {" "}
                        Selecte Image
                      </Button>
                    </div>
                    <aside style={thumbsContainer}>
                      {/* Display initial image or selected images */}
                      {bannerImage.length > 0 ? (
                        thumbs // Display selected images
                      ) : (
                        <div style={thumb}>
                          <div style={thumbInner}>
                            <img
                              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/gallery/${state.banner_image}`}
                              style={img}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </aside>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1">Images:-</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={setOpenView}
                    >
                      <ModeEditIcon />
                    </Button>
                    {openView && (
                      <EditGalleryImage
                        openView={openView}
                        setOpenView={setOpenView}
                        data={files}
                      />
                    )}

                    <ImageList
                      sx={{ width: "90%", maxHeight: 250 }}
                      cols={5}
                      rowHeight={110}
                    >
                      {files.map((file) => (
                        <ImageListItem key={file}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/gallery/${file}`}
                            style={img}
                            alt=""
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>
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

export default EditGallery;
