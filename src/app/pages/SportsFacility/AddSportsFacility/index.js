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
import styled from "@mui/material/styles/styled";
import DropSingleImage from "app/components/DropZone/singleImage";
import DropMultiImage from "app/components/DropZone/multiImage";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
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

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.1),
  borderRadius: "4px",
  display: "inline-block",
  padding: theme.spacing(0.1),
}));

const AddSport = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [amenities, setAmenities] = useState("");

  var initialValues = {
    name: "",
    location: "",
    description: "",
    field_name: "",
    field_no: "",
    rate: "",
    amenities: [],
    images: [],
    banner_image: [],
    terms_condition: "",
    status: true,
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

  const addAmenitiesItem = (event) => {
    if (amenities.trim() === "") {
      return;
    }
    const newItem = amenitiesData.concat(amenities);
    setAmenitiesData(newItem);
    setAmenities("");
    event.preventDefault();
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

  const handleSportAdd = async (data) => {
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
      await Axios.post("/sport/add", formData);
      showAlert("success", "Sport added successfully.");
      navigate("/sport");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        ADD SPORT
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
                  handleSportAdd(data);
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
                      component="li"
                      sx={{
                        mx: 1,
                      }}
                    />
                  </Grid>
                  <Grid item xs={1} mt={5}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={addAmenitiesItem}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={9}>
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

export default AddSport;
