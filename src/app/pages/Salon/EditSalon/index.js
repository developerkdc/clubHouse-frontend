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
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { useDropzone } from "react-dropzone";
import EditSalonImage from "./editImage";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import QuillEmoji from "quill-emoji";
import DropSingleImage from "app/components/DropZone/singleImage";

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
  marginTop: 0,
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

const EditSalon = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const [serviceType, SetServiceType] = useState(["Male", "Female", "Both"]);
  const [openView, setOpenView] = useState(false);
  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const [initialValues, setInitialValues] = useState({
    service_name: "",
    service_type: "",
    short_description: "",
    description: "",
    rate: "",
    duration: "",
    images: [],
    banner_image: [],
    terms_condition: "",
    status: "",
  });

  const getSalonDetail = async () => {
    try {
      let res = await Axios.get(`/salon/list?id=${id}`);
      let data = res.data.data;
      setInitialValues({
        service_name: data.service_name,
        service_type: data.service_type,
        short_description: data.short_description,
        description: data.description,
        rate: data.rate,
        duration: data.duration,
        images: [],
        banner_image: data.banner_image || [],
        terms_condition: data.terms_condition,
        status: data.status,
      });
      setFiles(data.images || []);
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  const validationSchema = yup.object({
    service_name: yup
      .string("Enter Service Name")
      .required("Service Name is required"),
    service_type: yup
      .string("Enter Service Type")
      .nullable()
      .required("Service Type is required"),
    short_description: yup
      .string("Short Description")
      .required("Short Description is required"),
    duration: yup
      .string("Duration")
      .nullable()
      .required("Duration is required"),
    rate: yup.number("Rate").nullable().required("Rate is required"),
    terms_condition: yup
      .string("Terms Condition ")
      .nullable()
      .required("Terms & Condition is required"),
  });

  const handleSalonEdit = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });

    // Append banner image to formData
    bannerImage.forEach((file) => {
      formData.append(`banner_image`, file);
    });

    formData.append("service_name", data.service_name);
    formData.append("service_type", data.service_type);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
    formData.append("rate", data.rate);
    formData.append("terms_condition", data.terms_condition);
    formData.append("status", data.status);

    try {
      await Axios.patch(`/salon/edit/${id}`, formData);
      showAlert("success", "Salon added successfully.");
      navigate("/salon");
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
    getSalonDetail();
  }, [openView]);
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT SALON
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
                  handleSalonEdit(data);
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
                      id="service_name"
                      name="service_name"
                      label="Service Name "
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      error={errors.service_type && touched.service_type}
                    >
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={serviceType}
                        name="service_type"
                        value={values?.service_type}
                        onChange={(event, val) => {
                          setFieldValue("service_type", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.service_type && touched.service_type}
                            {...params}
                            label="Service Type"
                          />
                        )}
                      />
                      {errors &&
                        errors.service_type &&
                        touched.service_type && (
                          <FormHelperText>{errors.service_type}</FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="duration"
                      name="duration"
                      type="number"
                      label="Duration (in min)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="rate"
                      name="rate"
                      type="number"
                      label="Rate"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="terms_condition"
                      name="terms_condition"
                      label="Terms & Condition"
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
                    style={{ padding: "0px", margin: "5px", height: "100%" }}
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/salon/${values.banner_image}`}
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
                      <EditSalonImage
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/salon/${file}`}
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
                <Grid container columnSpacing={3} marginTop={2}>
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
                            navigate("/salon");
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

export default EditSalon;
