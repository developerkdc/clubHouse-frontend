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


const EditEventImage = ({ openView, setOpenView, data }) => {
  console.log(data, "data");
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
        Selected Images ({data.length})
      </DialogTitle>
      <DialogContent
        headerSx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
        sx={{ mb: 3.75 }}
      >
        <ImageList
          sx={{ width: "100%", maxHeight: 250 }}
          cols={5}
          rowHeight={110}
        >
          {data.map((file) => (
            <ImageListItem key={file}>
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${file}`}
                alt=""
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventImage;
