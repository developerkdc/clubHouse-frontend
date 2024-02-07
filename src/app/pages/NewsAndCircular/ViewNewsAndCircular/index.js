import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Div from "@jumbo/shared/Div";
import React from "react";


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
const ViewNewsAndCircular = ({ openView, setOpenView, data }) => {
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
        News & Circular Details
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
              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/news/${data?.banner_image}`}
            />
          </Div>
          <Stack direction={"row"} color={"text.secondary"} mb={2}>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Type
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.type}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Title
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.title}
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
        </CardContent>
        <CardActions sx={{ p: 0, mx: "-1px" }}></CardActions>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewNewsAndCircular;
