import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@mui/material/styles/styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditSportImage from "./editImage";
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

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.1),
    borderRadius: '4px',
    display: 'inline-block', 
    padding: theme.spacing(.1),
  }));

const EditSport = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state, "state");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  var initialValues = {
    name: state.name,
    location: state.location,
    field_name: state.field_name,
    field_no: state.field_no,
    description: state.description,
    rate: state.rate,
    amenities: [],
    images: [],
    banner_image: [],
    terms_condition: state.terms_condition,
    status: state.status,
  };
  const validationSchema = yup.object({
    name: yup.string("Enter Sport Name").required("Sport Name is required"),
    location: yup
      .string("Enter Location")
      .nullable()
      .required("Location is required"),
    field_name: yup
      .string("Field Name")
      .nullable()
      .required("Field Name is required"),
    field_no: yup
      .number("Field No ")
      .nullable()
      .required("Field No is required"),
    rate: yup.number("Rate").nullable().required("Rate is required"),
    terms_condition: yup
      .string("Terms Condition ")
      .nullable()
      .required("Terms & Condition is required"),
  });

  const [amenitiesData, setAmenitiesData] = useState(state?.amenities?state?.amenities :[]);
  const [amenities, setAmenities] = useState("");
  const addAmenitiesItem = (event) => {
    const message = event.target.value.trim();
    if (event.key === "Enter" && message) {
      const newItem = amenitiesData.concat(amenities);
      setAmenitiesData(newItem);
      setAmenities("");
      event.preventDefault();
    }
  };
  const handleAmenitiesDelete = (chipToDelete) => {
    let found = false;
    setAmenitiesData((chips) =>
      chips.filter((chip) => {
        if (chip === chipToDelete && !found) {
          found = true;
          return false;
        }
        return true;
      })
    );
  };

  const [files, setFiles] = useState(state.images ? state.images : []);
  const [bannerImage, setBannerImage] = useState([]);
  const [openView, setOpenView] = useState(false);
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

  const handleBanquetAdd = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });

    // Append banner image to formData
    bannerImage.forEach((file) => {
      formData.append(`banner_image`, file);
    });

    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("field_name", data.field_name);
    formData.append("field_no", data.field_no);
    formData.append("rate", data.rate);
    formData.append("amenities", JSON.stringify([...amenitiesData]));
    formData.append("terms_condition", data.terms_condition);
    formData.append("status", data.status);

    try {
      await Axios.patch(`/sport/edit/${id}`, formData);
      showAlert("success", "Sport added successfully.");
      navigate("/sport");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        Edit SPORT
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
                  handleBanquetAdd(data);
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
                      id="name"
                      name="name"
                      label="Sport Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="location"
                      name="location"
                      label="Location"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="field_name"
                      name="field_name"
                      label="Field name"
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
                      id="field_no"
                      name="field_no"
                      type="number"
                      label="Field number"
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
                </Grid>
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={-1}>
                  <Grid item xs={2}>
                    <Typography variant="body1">Amenities :-</Typography>
                    <TextField
                      variant="standard"
                      label="Add Amenities..."
                      value={amenities}
                      onChange={(e) => setAmenities(e.target.value)}
                      onKeyPress={addAmenitiesItem}
                      component="li"
                      sx={{
                        mx: 1,
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <div
                      style={{
                        overflowY: "scroll",
                        maxHeight: "80px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {amenitiesData.map((data, Index) => (
                        <ListItem key={Index}>
                          <Chip
                            variant="outlined"
                            label={data}
                            onDelete={() => handleAmenitiesDelete(data)}
                          />
                        </ListItem>
                      ))}
                    </div>
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

                <Grid container rowSpacing={3} columnSpacing={3} marginTop={5}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Images :-</Typography>
                    <div
                      {...getRootBannerImageProps({ className: "dropzone" })}
                      style={{ marginTop: "10px", width: "114px" }}
                    >
                      <input {...getInputBannerImageProps()} />
                      <Button size="small" variant="contained">Select Image</Button>
                    </div>
                    <aside style={thumbsContainer}>
                      {/* Display initial image or selected images */}
                      {bannerImage.length > 0 ? (
                        thumbs // Display selected images
                      ) : (
                        <div style={thumb}>
                          <div style={thumbInner}>
                            <img
                              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/sport/${state.banner_image}`}
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
                      <EditSportImage
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/sport/${file}`}
                            style={img}
                            alt=""
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>

                <Grid container columnSpacing={3} marginTop={2}>
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
                            navigate("/sport");
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

export default EditSport;
