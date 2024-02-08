import { Button } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  marginTop: 16,
  maxHeight: "250px",
};

const DropSingleImage = ({ setImage, image }) => {
  const {
    getRootProps: getRootBannerImageProps,
    getInputProps: getInputBannerImageProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setImage([
          Object.assign(selectedFile, {
            preview: URL.createObjectURL(selectedFile),
          }),
        ]);
      }
    },
  });
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
  const img = {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
  };
  const thumbss = image.map((file) => (
    <div style={thumb} key={file.name}>
      {/* <div style={thumbInner}> */}
      <img src={file.preview} style={img} alt="" />
      {/* </div> */}
    </div>
  ));
  return (
    <>
      <div
        {...getRootBannerImageProps({ className: "dropzone" })}
        style={{ marginTop: "10px", width: "112px" }}
      >
        <input {...getInputBannerImageProps()} />
        <Button size="small" variant="contained">
          Select Image
        </Button>
      </div>
      <aside style={thumbsContainer}>{thumbss}</aside>
    </>
  );
};

export default DropSingleImage;
