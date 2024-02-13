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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import EditGalleryImage from "./editImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DropSingleImage from "app/components/DropZone/singleImage";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import QuillEmoji from "quill-emoji";
import { formatDate } from "app/pages/Member/AddMember/date";
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

const thumbsContainer = {
  display: "flex",
  marginTop: 5,
  maxHeight: "250px",
};

const thumb = {
  display: "flex",
  borderRadius: 2,
  justifyContent: "center",
  alignContent: "center",
  border: "1px solid #eaeaea",
  // border: "1px solid red",
  marginBottom: 8,
  marginRight: 8,
  width: "70%",
  height: "150px",
  padding: 4,
  boxSizing: "border-box",
};

const EditGallery = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  const { state } = useLocation();
  const [openView, setOpenView] = useState(false);
  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);
  const [albumName, SetAlbumName] = useState(["sport", "religion"]);

  const [initialValues, setInitialValues] = useState({
    album_name: '',
    source: '',
    description: '',
    short_description: '',
    event_date: '',
    images: [],
    banner_image: [],
    status: '',
  });
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

  const getGalleryDetails = async () => {
    try {
      const res = await Axios.get(`/gallery/list?id=${id}`);
      let data = res.data.data;
      setInitialValues({
        album_name: data.album_name,
        source: data.source,
        description: data.description,
        short_description: data.short_description,
        event_date: new Date(data.event_date).toISOString().split("T")[0],
        images: [],
        banner_image: data.banner_image || [],
        status: data.status,
      });
      setFiles(data.images || []);
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
 
  const handleGalleryEdit = async (data) => {
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

  useEffect(
    () => () => {
      bannerImage.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [bannerImage]
  );

  useEffect(() => {
    getGalleryDetails();
  }, [openView]);
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT GALLERY
      </Typography>
      <Card>
        <CardContent>
          <Formik
           key={JSON.stringify(initialValues)}
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              console.log(data, "datass");
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleGalleryEdit(data);
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
                          defaultValue={dayjs(formatDate(values?.event_date))}
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

                <Grid container rowSpacing={3} columnSpacing={3} marginTop={0}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Image :-</Typography>
                    <DropSingleImage
                      setImage={setBannerImage}
                      image={bannerImage}
                    />
                    {bannerImage.length == 0 && (
                      <aside style={thumbsContainer}>
                        <div style={thumb}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/gallery/${values.banner_image}`}
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
                    <Typography variant="body1">Images :-</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={setOpenView}
                      style={{marginTop:"8px"}}
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
                      sx={{ width: "100%", maxHeight: 250 }}
                      cols={4}
                      rowHeight={110}
                    >
                      {files.map((file) => (
                        <ImageListItem key={file}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/gallery/${file}`}
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

export default EditGallery;
