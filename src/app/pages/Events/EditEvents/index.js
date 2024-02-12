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
import "quill-emoji/dist/quill-emoji.css";
import QuillEmoji from "quill-emoji";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditEventImage from "./editImage";
import DropSingleImage from "app/components/DropZone/singleImage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { formatDate } from "../ListEvents/date";

const thumbsContainer = {
  display: "flex",
  marginTop: 0,
  maxHeight: "250px",
};

const thumb = {
  display: "flex",
  borderRadius: 2,
  justifyContent: "center",
  alignContent: "center",
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "70%",
  height: "150px",
  padding: 4,
  boxSizing: "border-box",
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
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  // const { state } = useLocation();
  const [category, SetCategory] = useState(["sport", "religion"]);
  const [eventType, SetEventType] = useState(["free", "paid"]);
  const [durationType, SetDurationType] = useState(["single", "multi"]);
  const [openView, setOpenView] = useState(false);

  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const [initialValues, setInitialValues] = useState({
    title: "",
    category: "",
    duration_type: "",
    event_type: "",
    short_description: "",
    description: "",
    start_date: "",
    entry_fee: "",
    end_date: "",
    status: false,
    banner_image: [],
  });

  const getEventDetail = async () => {
    try {
      let res = await Axios.get(`/event/list?id=${id}`);
      let data = res.data.data;
      setInitialValues({
        title: data.title,
        category: data.category,
        duration_type: data.duration_type,
        event_type: data.event_type,
        short_description: data.short_description,
        description: data.description,
        start_date: data.start_date,
        entry_fee: data.entry_fee,
        end_date: data.end_date,
        status: data.status,
        banner_image: data.banner_image || [],
      });
      setFiles(data.images || []);
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
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

  const handleEventEdit = async (data) => {
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

  useEffect(
    () => () => {
      bannerImage.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [bannerImage]
  );
  useEffect(() => {
    getEventDetail();
  }, [openView]);

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT EVENT
      </Typography>
      <Card>
        <CardContent>
          <Formik
            key={JSON.stringify(initialValues)}
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleEventEdit(data);
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
                          console.log("first ", values.end_date);
                          if (val === "single") {
                            setFieldValue("end_date", "");
                            console.log("last ", values.end_date);
                          } else {
                            setFieldValue("end_date", initialValues.end_date);
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
                          defaultValue={dayjs(formatDate(values?.start_date))}
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
                      fullWidth
                      error={errors.end_date && touched.end_date}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          id="end_date"
                          name="end_date"
                          label="End Date"
                          format="DD-MM-YYYY"
                          defaultValue={dayjs(formatDate(values?.end_date))}
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
                            setFieldValue("entry_fee", initialValues.entry_fee);
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

                <Grid container rowSpacing={3} columnSpacing={3} marginTop={1}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Images :-</Typography>
                    <DropSingleImage
                      setImage={setBannerImage}
                      image={bannerImage}
                    />
                    {bannerImage.length == 0 && (
                      <aside style={thumbsContainer}>
                        <div style={thumb}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${values.banner_image}`}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "100%",
                            }}
                            alt=""
                          />
                        </div>
                      </aside>
                    )}
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
                      sx={{ width: "100%", maxHeight: 250 }}
                      cols={4}
                      rowHeight={110}
                    >
                      {files.map((file) => (
                        <ImageListItem key={file}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${file}`}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "100%",
                            }}
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
                      style={{ height: "200px" }}
                      // css={css`
                      //   .ql-editor img {
                      //     max-width: 10px; /* Fix width */
                      //     height: 10px; /* Maintain aspect ratio */
                      //   }
                      //   .ql-editor {
                      //     min-height: 18em;
                      //   }
                      // `}
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

export default EditEvent;
