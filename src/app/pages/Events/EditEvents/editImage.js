import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
} from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { useNavigate, useParams } from "react-router-dom";

const EditEventImage = ({ openView, setOpenView, data, setAddImageFiles }) => {
  // const [newPhotos, setNewPhotos] = useState([]);
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const { id } = useParams();
  const [oldImage, setOldImageImages] = useState(data);
  const [newPhotos, setNewPhotos] = useState([]);
  const [deleteImage, setDeleteImages] = useState([]);
  

  const handleRemovePhoto = (fileToRemove) => {
    console.log(fileToRemove,'fileToRemove');
    const updatedData = oldImage.filter((file) => file !== fileToRemove);
    console.log(deleteImage, "111111111");
    setDeleteImages((prevDeletedImages) => [
      ...prevDeletedImages,
      fileToRemove,
    ]);
    setOldImageImages(updatedData);
  };
  console.log(deleteImage, "2222222222");
  
  const handleRemoveNewPhoto = (fileToRemove) => {
    const updatedData = newPhotos.filter((file) => file !== fileToRemove);
    setNewPhotos(updatedData);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log("Accepted Files:", acceptedFiles);
      setNewPhotos(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      newPhotos.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [newPhotos]
  );

  const handileUploadImage = async () => {
    const formData = new FormData();
    newPhotos.forEach((file) => {
      formData.append(`images`, file);
    });
    formData.append(`deleteImages`, JSON.stringify([...deleteImage]));
    try {
      await Axios.post(`/event/update-images/${id}`,formData);
      showAlert("success", "Event updated successfully.");

      setOpenView(false)
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  // console.log(data, "data");
  return (
    <Dialog
      open={openView}
      onClose={() => setOpenView(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle
        style={{ backgroundColor: "#7352C7", color: "white" }}
        id="alert-dialog-title"
      >
        Selected Images ({oldImage.length})
      </DialogTitle>

      <DialogContent
        headerSx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
        sx={{ mb: 3.75 }}
      >
        <ImageListItem>
          <div
            {...getRootProps({ className: "dropzone" })}
            style={{ marginTop: "10px" }}
          >
            <input {...getInputProps()} />
            <Button variant="contained">Add Photo</Button>
          </div>
        </ImageListItem>
        <ImageList
          sx={{ width: "100%", maxHeight: 250 }}
          cols={3}
          rowHeight={110}
        >
          {oldImage?.map((file) => (
          
            <ImageListItem key={file}>
              <HighlightOffIcon
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => handleRemovePhoto(file)}
              />
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${file}`}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ImageListItem>
          ))}
          {newPhotos?.map((file) => (
            <ImageListItem key={file.name}>
              <HighlightOffIcon
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => handleRemoveNewPhoto(file)}
              />
              <img
                src={file.preview}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          type="submit"
          variant="contained"
          onClick={() => handileUploadImage(newPhotos)}
        >
          update images
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setOpenView(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventImage;
