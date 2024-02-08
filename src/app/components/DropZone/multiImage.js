import { Button, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const DropMultiImage = ({ setImages, images }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImages((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });
  const handleRemoveNewPhoto = (fileToRemove) => {
    const updatedData = images.filter((file) => file !== fileToRemove);
    setImages(updatedData);
  };
  const multiThumbsContainer = {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "320px",
    marginTop: 16,
    paddingTop: "10px",
    overflowY: "scroll",
    // border: "1px solid red",
  };
  const multiThumb = {
    display: "flex",
    borderRadius: 2,
    justifyContent: "center",
    alignContent: "center",
    border: "1px solid #eaeaea",
    marginBottom: 15,
    marginRight: 0,
    width: "17%",
    height: 130,
    padding: 4,
    // boxSizing: "border-box",
  };
  const img = {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
  };
  const thumbs = images.map((file) => (
    <>
      <div style={multiThumb} key={file.name}>
        <img src={file.preview} style={img} alt="" />
      </div>
      <HighlightOffIcon
        style={{
          position: "relative",
          top: "-11px",
          right: "12px",
          cursor: "pointer",
          color: "red",
        }}
        onClick={() => handleRemoveNewPhoto(file)}
      />
    </>
  ));

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
        cols={5}
        rowHeight={110}
      >
        {images?.map((file) => (
          <ImageListItem key={file}>
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
