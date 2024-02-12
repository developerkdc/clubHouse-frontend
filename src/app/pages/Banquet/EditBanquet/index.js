import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  ImageList,
  ImageListItem,
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
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import styled from "@mui/material/styles/styled";
import EditBanquetImage from "./editImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DropSingleImage from "app/components/DropZone/singleImage";
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

const thumbsContainer = {
  display: "flex",
  marginTop: 16,
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

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.1),
  borderRadius: "4px",
  display: "inline-block",
  padding: theme.spacing(0.1),
}));

const EditBanquet = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  const [openView, setOpenView] = useState(false);
  const [tagsData, setTagsData] = useState([]);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [tags, setTags] = useState("");
  const [amenities, setAmenities] = useState("");
  const [files, setFiles] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const [initialValues, setInitialValues] = useState({
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
    status: "",
  });

  const getBanquetDetails = async () => {
    try {
      const res = await Axios.get(`/banquet/list?id=${id}`);
      let data = res.data.data;
      setInitialValues({
        name: data.name,
        location: data.location,
        short_description: data.short_description,
        description: data.description,
        capacity: data.capacity,
        rate: data.rate,
        amenities: [],
        tags: [],
        images: [],
        banner_image: data.banner_image || [],
        terms_condition: data.terms_condition,
        status: data.status,
      });
      setAmenitiesData(data.amenities || []);
      setTagsData(data.tags || []);
      setFiles(data.images || []);
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
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
    tags: yup.array("Tags").nullable().required("Tags is required"),
    rate: yup.number("Rate").nullable().required("Rate is required"),
    terms_condition: yup
      .string("Terms Condition ")
      .nullable()
      .required("Terms & Condition is required"),
  });

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

  useEffect(
    () => () => {
      bannerImage.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [bannerImage]
  );

  const handleBanquetEdit = async (data) => {
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
    formData.append("amenities", JSON.stringify([...amenitiesData]));
    formData.append("tags", JSON.stringify([...tagsData]));
    formData.append("end_date", data.tags);
    formData.append("terms_condition", data.terms_condition);
    formData.append("status", data.status);

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });

    try {
      await Axios.patch(`/banquet/edit/${id}`, formData);
      showAlert("success", "Banquet added successfully.");
      navigate("/banquet");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  useEffect(() => {
    getBanquetDetails();
  }, [openView]);
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT BANQUET
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
                  handleBanquetEdit(data);
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
                      label="Add Chips..."
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
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
                      {tagsData.map((data, Index) => (
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
                      label="Add Chips..."
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
                  <Grid item xs={3}>
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/banquet/${values.banner_image}`}
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
                      <EditBanquetImage
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
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/banquet/${file}`}
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

export default EditBanquet;
