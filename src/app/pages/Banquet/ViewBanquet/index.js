import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
const ViewBanquet = ({ openView, setOpenView, data }) => {
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
        Banquet Details
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
              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/banquet/${data?.banner_image}`}
            />
          </Div>
          <Stack direction={"row"} color={"text.secondary"} mb={2}>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Name
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.name}
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
          <Typography
            fontSize={"12px"}
            variant={"body1"}
            color="text.secondary"
            mb={2}
          >
            {data?.handle}
          </Typography>

          <Stack direction={"row"} alignSelf="stretch">
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Location
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.location}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Capacity
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.capacity}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Rate
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.rate}
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
          <Grid container rowSpacing={1} columnSpacing={1} marginTop={-1}>
            <Grid item xs={6}>
              <Item style={{ flex: 1, width: "50%" }}>
                <Typography variant={"h6"} color="text.secondary">
                  Tags
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
                      data?.tags.map((tags, Index) => (
                        <ListItem key={Index}>
                          <Chip variant="outlined" label={tags} />
                        </ListItem>
                      ))}
                  </div>
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
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
                      data?.amenities.map((amenity, index) => (
                        <ListItem key={index}>
                          <Chip variant="outlined" label={amenity} />
                        </ListItem>
                      ))}
                  </div>
                </Typography>
              </Item>
            </Grid>
          </Grid>

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
                    src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/banquet/${file}`}
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

export default ViewBanquet;
