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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import JumboAvatarDropzone from "@jumbo/components/JumboAvatarDropzone";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import { LabelImportant } from "@mui/icons-material";

const AddEvent = () => {
  const [category, SetCategory] = useState(["News", "Circular"]);
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  var initialValues = {
    title: "",
    type: "",
    short_description: "",
    description: "",
    banner_image: "",
    source: "",
    status: true,
  };
  const validationSchema = yup.object({
    title: yup.string("Enter Title").required("Title is required."),
    source: yup.string("Enter source").required("Source is required."),
    type: yup.string("Select Type").nullable().required("Type is required."),
    short_description: yup.string("Short Description Type").required("Short Description Type is required"),
    description: yup.string("Description Required").required("Short Description Type is required"),
  });

  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    bannerImage.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [bannerImage]);

  const handleEventAdd = async (data, setSubmitting) => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append(`banner_image`, data.banner_image);
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("source", data.source);
    formData.append("status", data.status);

    try {
      await Axios.post("/news/add", formData);
      setSubmitting(false);
      showAlert("success", "Event added successfully.");
      navigate("/news");
    } catch (error) {
      setSubmitting(false);
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
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleEventAdd(data, setSubmitting);
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
                    <JumboTextField fullWidth id="title" name="title" label="Title" />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth error={errors.type && touched.type}>
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={category}
                        name="type"
                        onChange={(event, val) => {
                          setFieldValue("type", val);
                        }}
                        renderInput={(params) => <TextField error={errors.type && touched.type} {...params} label="Type" />}
                      />
                      {errors && errors.type && touched.type && <FormHelperText>{errors.type}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="source" name="source" label="Source" />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField fullWidth id="short_description" name="short_description" label="Short Description" />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container rowSpacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="">Description</Typography>
                      </Grid>

                      <Grid item xs={12} sx={{ maxHeight: "200px" }}>
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
                  </Grid>

                  <Grid item xs={3} alignContent="flex-start">
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

                  <Grid item xs={3}>
                    <Typography variant="">Banner Image</Typography>
                    <JumboAvatarField
                      name="banner_image"
                      alt={"banner pic"}
                      onFileSelection={(file) => setFieldValue("banner_image", file)}
                      sx={{ width: 100, height: 100 }}
                      variant="rounded"
                    />
                  </Grid>
                </Grid>
                <Grid container columnSpacing={3} mt={5}>
                  <Grid item xs={6} textAlign="right">
                    <LoadingButton variant="contained" size="medium" type="submit" loading={isSubmitting}>
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
