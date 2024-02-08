import React, { useEffect, useState } from "react";
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
import { useDropzone } from "react-dropzone";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { css } from "@emotion/react";
import "quill-emoji/dist/quill-emoji.css";
import QuillEmoji from "quill-emoji";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditEventImage from "./editImage";

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
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
const EditEvent = () => {
  const [category, SetCategory] = useState(["sport", "religion"]);
  const [eventType, SetEventType] = useState(["free", "paid"]);
  const [durationType, SetDurationType] = useState(["single", "multi"]);
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state, "state");

  var initialValues = {
    title: state.title,
    category: state.category,
    duration_type: state.duration_type,
    event_type: state.event_type,
    short_description: state.short_description,
    description: state.description,
    start_date: new Date(state.start_date).toISOString().split("T")[0],
    entry_fee: state.entry_fee,
    end_date: new Date(state.end_date).toISOString().split("T")[0],
    status: state.status,
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
      then: yup.string().nullable().required("Entry Fee is required"),
      otherwise: yup.string().nullable(),
    }),

    end_date: yup.string("End Date").when("duration_type", {
      is: (durationType) => durationType === "multi",
      then: yup.string().required("End Date is required"),
      otherwise: yup.string(),
    }),
  });
  const [openView, setOpenView] = useState(false);

  const [files, setFiles] = useState(state.images ? state.images : []);
  const [bannerImage, setBannerImage] = useState([]);

  const handleEventAdd = async (data) => {
    const formData = new FormData();
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
    try {
      await Axios.patch(`/event/edit/${id}`, formData);
      showAlert("success", "Event updated successfully.");
      navigate("/event");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
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

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT EVENT
      </Typography>
      <Card>
        <CardContent>
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              // console.log(data, "datass");
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
                        value={values?.category}
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
                        value={values?.duration_type}
                        name="duration_type"
                        onChange={(event, val) => {
                          if (val === "single") {
                            setFieldValue("end_date", "");
                          } else {
                            setFieldValue(
                              "end_date",
                              new Date(state.end_date)
                                .toISOString()
                                .split("T")[0]
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
                      value={values?.end_date}
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
                        value={values?.event_type}
                        name="eventType"
                        onChange={(event, val) => {
                          if (val === "free") {
                            setFieldValue("entry_fee", "");
                          } else {
                            setFieldValue("entry_fee", state.entry_fee);
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

                <Grid container rowSpacing={3} columnSpacing={3} marginTop={5}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Images :-</Typography>
                    <div
                      {...getRootBannerImageProps({ className: "dropzone" })}
                      style={{ marginTop: "10px", width: "112px" }}
                    >
                      <input {...getInputBannerImageProps()} />
                      <Button size="small" variant="contained">
                        Select Image
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
                              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${state.banner_image}`}
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
                      <EditEventImage
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${file}`}
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
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={2}>
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
                      css={css`
                        .ql-editor img {
                          max-width: 100%; /* Fix width */
                          height: auto; /* Maintain aspect ratio */
                        }
                        .ql-editor {
                          min-height: 18em;
                        }
                      `}
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

export default EditEvent;
