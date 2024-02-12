import { Button, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const DropMultiImage = ({ setImages, images }) => {
  console.log(images, "images");
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImages((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: Date.now() + Math.random(),
          })
        ),
      ]);
    },
  });

  const handleRemoveNewPhoto = (idToRemove) => {
    setImages((prevImages) => {
      const updatedData = prevImages.filter((file) => file.id !== idToRemove);
      return updatedData;
    });
  };

  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{ marginTop: "10px", width: "120px" }}
      >
        <input {...getInputProps()} />
        <Button size="small" variant="contained">
          Select Images
        </Button>
      </div>
      <ImageList
        sx={{ width: "100%", maxHeight: 250 }}
        cols={4}
        rowHeight={110}
      >
        {images?.map((file) => (
          <ImageListItem key={file.id}>
            <HighlightOffIcon
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => handleRemoveNewPhoto(file.id)}
            />
            <img
              src={file.preview}
              alt=""
              style={{ width: "100%", height: "100%", display: "block" }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default DropMultiImage;
