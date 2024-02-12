import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { CardActions, CardContent, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import Div from "@jumbo/shared/Div";

import React from "react";
import { getCustomDateTime } from "@jumbo/utils";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
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
const ViewGallery = ({ openView, setOpenView, data }) => {
  console.log(data, "data");
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
        Gallery Details
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
              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/gallery/${data?.banner_image}`}
            />
          </Div>
          <Stack direction={"row"} color={"text.secondary"} mb={2}>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Name
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.album_name}
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
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Source
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.source}
              </Typography>
            </Item>
     
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Event Date
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {getCustomDateTime(data?.event_date, "days", "DD MMM YYYY")}
              </Typography>
            </Item>
          </Stack>

          <Stack direction={"row"} alignSelf="stretch">
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Short Description
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.short_description}
              </Typography>
            </Item>
          </Stack>
          <Stack direction={"row"} alignSelf="stretch">
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Description
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {convertHtmlToPlainText(data?.description)}
              </Typography>
            </Item>
          </Stack>
          <Stack direction={"row"} alignSelf="stretch">
            <Item style={{ flex: 1, width: "50%" }}>
              <Typography variant={"h6"} color="text.secondary">
                Amenities
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                <div
                  style={{
                    overflowY: "scroll",
                    maxHeight: "80px",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {data &&
                    data?.length &&
                    data.amenities?.map((data, Index) => (
                      <ListItem key={Index}>
                        <Chip variant="outlined" label={data} />
                      </ListItem>
                    ))}
                </div>
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
                    src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/gallery/${file}`}
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

export default ViewGallery;
