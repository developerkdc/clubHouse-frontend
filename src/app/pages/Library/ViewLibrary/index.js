import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";

import { CardActions, CardContent, Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Div from "@jumbo/shared/Div";

import React from "react";
import styled from "@mui/material/styles/styled";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.1),
  borderRadius: "4px",
  display: "inline-block",
  padding: theme.spacing(0.1),
}));
const Item = ({ children, sx }) => (
  <Div
    sx={{
      textAlign: "center",
      flexBasis: "33.33%",
      p: (theme) => theme.spacing(1, 2),
      ...sx,
    }}
  >
    {children}
  </Div>
);
const ViewLibrary = ({ openView, setOpenView, data }) => {
  const convertHtmlToPlainText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
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
        Trainer Details
      </DialogTitle>
      <DialogContent
        headerSx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
        sx={{ mb: 3.75 }}
      >
        <CardContent
          sx={{
            pt: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Div sx={{ mb: 3 }}>
            <Typography variant={"h6"} color="text.secondary" mb={0.5}>
              Banner Image
            </Typography>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt=""
              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/library/${data?.banner_image}`}
            />
          </Div>
          <Stack direction={"row"} color={"text.secondary"} mb={2}>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Book Name
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.book_name}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Author Name
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.author_name}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Status
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.status ? "Active" : "Inactive"}
              </Typography>
            </Item>
          </Stack>

          <Stack direction={"row"} alignSelf="stretch">
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Category
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.category}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Book Location
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.book_location}
              </Typography>
            </Item>

            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Total Quantity
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.total_quantity}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Booked Quantity
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.booked_quantity}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Issued Quantity
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.issued_quantity}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Available Quantity
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.available_quantity}
              </Typography>
            </Item>
          </Stack>
          <Stack direction={"row"} alignSelf="stretch">
            <Item>
              <Typography variant={"h6"} color="text.secondary">
              Book Summary
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.book_summary}
              </Typography>
            </Item>
          </Stack>
          <Typography variant={"h6"} color="text.secondary">
            Images
          </Typography>
          <ImageList
            sx={{ width: "100%", maxHeight: 250 }}
            cols={3}
            rowHeight={110}
          >
            {data &&
              data?.images?.length &&
              data?.images?.map((file) => (
                <ImageListItem key={file}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/library/${file}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </CardContent>
        <CardActions sx={{ p: 0, mx: "-1px" }}></CardActions>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewLibrary;
