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
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import styled from "@mui/material/styles/styled";
import DropSingleImage from "app/components/DropZone/singleImage";
import DropMultiImage from "app/components/DropZone/multiImage";
import ReactQuill, { Quill } from "react-quill";
import QuillEmoji from "quill-emoji";
import * as yup from "yup";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";

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

const AddBanquet = () => {
  const [tagsData, setTagsData] = useState([]);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [tags, setTags] = useState("");
  const [amenities, setAmenities] = useState("");
  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  
  const addTagsItem = (event) => {
    if (tags.trim() === "") {
      return;
    }
    const newItem = tagsData.concat(tags);
    setTagsData(newItem);
    setTags("");
    event.preventDefault();
  };

  const addAmenitiesItem = (event) => {
    if (amenities.trim() === "") {
      return;
    }
    const newItem = amenitiesData.concat(amenities);
    setAmenitiesData(newItem);
    setAmenities("");
    event.preventDefault();
  };

  const handleTagsDelete = (chipToDelete) => {
    let found = false;
    setTagsData((chips) =>
      chips.filter((chip) => {
        if (chip === chipToDelete && !found) {
          found = true;
          return false;
        }
        return true;
      })
    );
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

  const handleBanquetAdd = async (data) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });
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
                <Grid container rowSpacing={3} columnSpacing={3} marginTop={0}>
                  <Grid item xs={2} >
                    <TextField
                      variant="standard"
                      fullWidth
                      size="small"
                      label="Add Tags..."
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1} mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={addTagsItem}
                    >
                      Add
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
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
                            size="small"
                            label={data}
                            onDelete={() => handleTagsDelete(data)}
                          />
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="standard"
                      label="Add Amenities..."
                      fullWidth
                      size="small"
                      value={amenities}
                      onChange={(e) => setAmenities(e.target.value)}
                      component="li"
                      sx={{
                        mx: 1,
                      }}
                    />
                  </Grid>
                  <Grid item xs={1} mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={addAmenitiesItem}
                    >
                      Add
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
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
                            size="small"
                            onDelete={() => handleAmenitiesDelete(data)}
                          />
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={2} mt={2} alignContent="center">
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
