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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DropSingleImage from "app/components/DropZone/singleImage";
import DropMultiImage from "app/components/DropZone/multiImage";

const AddLibrary = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  var initialValues = {
    book_name: "",
    category: "",
    author_name: "",
    book_summary: "",
    book_location: "",
    total_quantity: "",
    booked_quantity: "",
    issued_quantity: "",
    available_quantity: "",
    images: [],
    banner_image: [],
    status: true,
  };
  const validationSchema = yup.object({
    book_name: yup.string("Enter Book Name").required("Book Name is required"),
    author_name: yup
      .string("Enter Author Name")
      .required("Author Name is required"),
    book_location: yup
      .string("Enter Book Location")
      .required("Book Location is required"),
    category: yup
      .string("Category")
      .nullable()
      .required("Categoryis required"),
    total_quantity: yup
      .number("Total Quantity")
      .nullable()
      .required("Total Quantity is required"),
    booked_quantity: yup
      .number("Booked Quantity")
      .nullable()
      .required("Booked Quantity is required"),
    issued_quantity: yup
      .number("Issued Quantity")
      .nullable()
      .required("Issued Quantity is required"),
  });

  const handleLibraryAdd = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });

    // Append banner image to formData
    bannerImage.forEach((file) => {
      formData.append(`banner_image`, file);
    });
    formData.append("book_name", data.book_name);
    formData.append("category", data.category);
    formData.append("author_name", data.author_name);
    formData.append("book_location", data.book_location);
    formData.append("book_summary", data.book_summary);
    formData.append("total_quantity", data.total_quantity);
    formData.append("booked_quantity", data.booked_quantity);
    formData.append("issued_quantity", data.issued_quantity);
    formData.append("available_quantity", data.available_quantity);
    formData.append("status", data.status);

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });

    try {
      await Axios.post("/library/add", formData);
      showAlert("success", "Library added successfully.");
      navigate("/library");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

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

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD LIBRARY
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
                    handleLibraryAdd(data);
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
                      id="book_name"
                      name="book_name"
                      label="Book Name "
                    />
                  </Grid>
                  <Grid item xs={6}>
                  <JumboTextField
                      fullWidth
                      id="category"
                      name="category"
                      label="Category"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="author_name"
                      name="author_name"
                      label="Author Name"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="book_location"
                      name="book_location"
                      label="Book Location"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="book_summary"
                      name="book_summary"
                      label="Book Summary"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      id="total_quantity"
                      name="total_quantity"
                      type="number"
                      label="Total Quantity"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      id="booked_quantity"
                      name="booked_quantity"
                      type="number"
                      label="Booked Quantity"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      id="issued_quantity"
                      name="issued_quantity"
                      type="number"
                      label="Issued Quantity"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <JumboTextField
                      fullWidth
                      id="available_quantity"
                      name="available_quantity"
                      type="number"
                      label="Available Quantity"
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
                            navigate("/library");
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

export default AddLibrary;
