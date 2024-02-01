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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { LoadingButton } from "@mui/lab";
// import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { useDropzone } from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ViewMember from "app/pages/Member/ViewMember";
import EditEventImage from "./editImage";
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
    start_date: state.start_date,
    entry_fee: state.entry_fee,
    images: state.images,
    banner_image: state.banner_image,
    end_date: state.end_date,
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
      then: yup.string().required("Entry Fee is required"),
      otherwise: yup.string(),
    }),
    end_date: yup.string("End Date").when("duration_type", {
      is: (durationType) => durationType === "multi",
      then: yup.string().required("End Date is required"),
      otherwise: yup.string(),
    }),
  });
  const [openView, setOpenView] = useState(false);

  const handleClick = () => {
    setOpenView(true);
  };
  const [files, setFiles] = useState(state.images ? state.images : []);
  const [addImage, setAddImageFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState(
    state.banner_image ? [state.banner_image] : []
  );

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    bannerImage.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [bannerImage]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAddImageFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleEventAdd = async (data) => {
    try {
      await Axios.post(`/event/edit/${id}`, data);
      showAlert("success", "Event updated successfully.");
      navigate("/event");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  //   const actions = [
  //     {
  //       label: "View Details",
  //       color: "secondary",
  //       onClick: (row) => {
  //         setMmberDetails(row);
  //         setOpenView(true);
  //       },
  //     },
  //   ];
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
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={2}>
                  <Grid item xs={12}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={values?.description}
                      config={{
                        toolbar: {
                          items: [
                            "undo",
                            "redo",
                            "|",
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link", // Include or exclude 'link' based on your requirements
                            "|",
                            "bulletedList",
                            "numberedList",
                          ],
                        },
                      }}
                      onChange={(event, editor) => {
                        console.log(editor);
                        if (editor) {
                          const data = editor.getData();
                          console.log(data, "ddddd");
                          setFieldValue("description", data);
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container rowSpacing={3} columnSpacing={3} marginTop={5}>
                  <Grid item xs={2}>
                    <Typography variant="body1">Banner Images :-</Typography>
                    <aside style={thumbsContainer}>
                      {bannerImage.map((file) => (
                        <div style={thumb} key={file}>
                          <div style={thumbInner}>
                            <img
                              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${file}`}
                              style={img}
                              alt=""
                            />
                          </div>
                        </div>
                      ))}
                    </aside>
                  </Grid>
                  <Grid item xs={10}>
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
                        thumbInner={thumbInner}
                        thumbsContainer={thumbsContainer}
                        thumb={thumb}
                        img={img}
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
                  {/* <Grid item xs={6}>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      style={{ marginTop: "10px" }}
                    >
                      <input {...getInputProps()} />
                      <Button variant="contained">Add Images</Button>
                      <aside style={thumbsContainer}>
                        {addImage.map((file) => (
                          <div style={thumb} key={file.name}>
                            <div style={thumbInner}>
                              <img src={file.preview} style={img} alt="" />
                            </div>
                          </div>
                        ))}
                      </aside>
                    </div>
                  </Grid>
                   */}
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
