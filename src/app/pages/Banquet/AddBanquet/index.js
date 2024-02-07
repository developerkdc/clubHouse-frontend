import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Chip from "@mui/material/Chip";
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
import styled from "@mui/material/styles/styled";

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

const AddBanquet = () => {
  const [tagsData, setTagsData] = useState([]);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [tags, setTages] = useState("");
  const [amenities, setAmenities] = useState("");

  const handleTagsDelete = (chipToDelete) => {
    let found = false;
    setTagsData((chips) => chips.filter((chip) => {
      if (chip === chipToDelete && !found) {
        found = true;
        return false;
      }
      return true;
    }));
  };
  const handleAmenitiesDelete = (chipToDelete) => {
    let found = false;
    setAmenitiesData((chips) => chips.filter((chip) => {
      if (chip === chipToDelete && !found) {
        found = true;
        return false;
      }
      return true;
    }));
  };
  

  const addTagsItem = (event) => {
    const message = event.target.value.trim();
    if (event.key === "Enter" && message) {
      const newItem = tagsData.concat(tags);
      setTagsData(newItem);
      setTages("");
      event.preventDefault();
    }
  };

  const addAmenitiesItem = (event) => {
    const message = event.target.value.trim();
    if (event.key === "Enter" && message) {
      const newItem = amenitiesData.concat(amenities);
      setAmenitiesData(newItem);
      setAmenities("");
      event.preventDefault();
    }
  };

  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  var initialValues = {
    name: "",
    location: "",
    short_description: "",
    description: "",
    capacity: "",
    rate: "",
    amenities: [],
    tags: [],
    images: [],
    banner_image: [],
    terms_condition: "",
    status: true,
  };
  const validationSchema = yup.object({
    name: yup.string("Enter Banquet Name").required("Banquet Name is required"),
    location: yup
      .string("Enter Location")
      .nullable()
      .required("Location is required"),
    short_description: yup
      .string("Short Description")
      .required("Short Description is required"),
    capacity: yup
      .string("Capacity")
      .nullable()
      .required("Capacity is required"),
    rate: yup.number("Rate").nullable().required("Rate is required"),
    terms_condition: yup
      .string("Terms Condition ")
      .nullable()
      .required("Terms & Condition is required"),
  });

  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

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

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  const thumbss = bannerImage.map((file) => (
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
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);
    formData.append("capacity", data.capacity);
    formData.append("rate", data.rate);
    formData.append("amenities", JSON.stringify([...tagsData]));
    formData.append("tags", JSON.stringify([...tagsData]));
    formData.append("end_date", data.tags);
    formData.append("terms_condition", data.terms_condition);
    formData.append("status", data.status);

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });

    try {
      await Axios.post("/banquet/add", formData);
      showAlert("success", "Banquet added successfully.");
      navigate("/banquet");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD BANQUET
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
                      label="Name"
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
                      id="capacity"
                      name="capacity"
                      type="number"
                      label="Capacity"
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
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={-1}>
                  <Grid item xs={2}>
                    <Typography variant="body1">Tags :-</Typography>
                    <TextField
                      variant="standard"
                      label="Add Tags..."
                      value={tags}
                      onChange={(e) => setTages(e.target.value)}
                      onKeyPress={addTagsItem}
                      component="li"
                      sx={{
                        mx: 1,
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        overflowY: "scroll",
                        maxHeight: "80px",
                        display: "flex",

                        flexWrap: "wrap",
                      }}
                    >
                      {tagsData?.map((data, Index) => (
                        <ListItem key={Index}>
                          <Chip
                            variant="outlined"
                            label={data}
                            onDelete={() => handleTagsDelete(data)}
                          />
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
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
                  <Grid item xs={4}>
                    <div
                      style={{
                        overflowY: "scroll",
                        maxHeight: "80px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {amenitiesData?.map((data, index) => (
                        <ListItem key={index}>
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
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={-1}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Banner Image :-</Typography>
                    <div
                      {...getRootBannerImageProps({ className: "dropzone" })}
                      style={{ marginTop: "10px" }}
                    >
                      <input {...getInputBannerImageProps()} />
                      <Button size="small" variant="contained">
                        Select Image
                      </Button>
                    </div>
                    <aside style={thumbsContainer}>{thumbss}</aside>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1">Images :-</Typography>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      style={{ marginTop: "10px" }}
                    >
                      <input {...getInputProps()} />
                      <Button size="small" variant="contained">
                        Select Images
                      </Button>
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  </Grid>
                </Grid>{" "}
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
                            navigate("/banquet");
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

export default AddBanquet;
