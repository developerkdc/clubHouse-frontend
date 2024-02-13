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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { useDropzone } from "react-dropzone";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DropSingleImage from "app/components/DropZone/singleImage";
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

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const [type, SetType] = useState(["News", "Circular"]);
  const [bannerImage, setBannerImage] = useState([]);

  const [initialValues, setInitialValues] = useState({
    title: '',
    type: '',
    source: '',
    short_description: '',
    description: '',
    banner_image: [],
    status: '',
  });

  const getNewsDetail = async () => {
    try {
      let res = await Axios.get(`/news/list?id=${id}`);
      let data = res.data.data;
      setInitialValues({
        title: data.title,
        type: data.type,
        source: data.source,
        short_description: data.short_description,
        description: data.description,
        status: data.status,
        banner_image: data.banner_image || [],
      });
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  const validationSchema = yup.object({
    title: yup.string("Enter Title").required("Title is required"),
    type: yup.string("Enter Type").nullable().required("Type is required"),
    source: yup
      .string("Enter Source")
      .nullable()
      .required("Source is required"),
    short_description: yup
      .string("Short Description")
      .required("Short Description is required"),
  });

  const handleNewsEdit = async (data) => {
    console.log(data, "data");
    const formData = new FormData();

    // Append banner image to formData
    bannerImage.forEach((file) => {
      formData.append(`banner_image`, file);
    });
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("source", data.source);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("status", data.status);

    try {
      await Axios.patch(`/news/edit/${id}`, formData);
      showAlert("success", "News update successfully.");
      navigate("/news");
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
    getNewsDetail();
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT NEWS & CIRCULAR
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
                  handleNewsEdit(data);
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
                    <FormControl fullWidth error={errors.type && touched.type}>
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={type}
                        value={values?.type}
                        name="type"
                        onChange={(event, val) => {
                          setFieldValue("type", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.type && touched.type}
                            {...params}
                            label="Type"
                          />
                        )}
                      />
                      {errors && errors.type && touched.type && (
                        <FormHelperText>{errors.type}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="title"
                      name="title"
                      label="Title"
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
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={1}>
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/news/${values.banner_image}`}
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
                            navigate("/news");
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

export default EditNews;
