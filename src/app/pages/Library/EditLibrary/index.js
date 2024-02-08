import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  ImageList,
  ImageListItem,
  Switch,
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
import "react-quill/dist/quill.snow.css";
import EditLibraryImage from "./editImage";

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
const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

const EditLibrary = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  const { state } = useLocation();

  var initialValues = {
    book_name: state.book_name,
    category: state.category,
    author_name: state.author_name,
    book_summary: state.book_summary,
    book_location: state.book_location,
    total_quantity: state.total_quantity,
    booked_quantity: state.booked_quantity,
    issued_quantity: state.issued_quantity,
    available_quantity: state.available_quantity,
    images: [],
    banner_image: [],
    status: state.status,
  };
  const validationSchema = yup.object({
    book_name: yup.string("Enter Book Name").required("Book Name is required"),
    author_name: yup
      .string("Enter Author Name")
      .required("Author Name is required"),
    book_location: yup
      .string("Enter Book Location")
      .required("Book Location is required"),
    category: yup.string("Category").nullable().required("Categoryis required"),
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

  const [files, setFiles] = useState(state.images ? state.images : []);
  const [bannerImage, setBannerImage] = useState([]);
  const [openView, setOpenView] = useState(false);

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
      await Axios.patch(`/library/edit/${id}`, formData);
      showAlert("success", "Library added successfully.");
      navigate("/library");
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
        EDIT LIBRARY
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
                              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/library/${state.banner_image}`}
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
                      <EditLibraryImage
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/library/${file}`}
                            style={img}
                            alt=""
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
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

export default EditLibrary;
