import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
const ViewNutritionist = ({ openView, setOpenView, data }) => {
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
        Nutritionist Details
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
              Profile Pic
            </Typography>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt=""
              src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/nutritionist/${data?.profile_image}`}
            />
          </Div>
          <Stack direction={"row"} color={"text.secondary"} mb={2}>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                First Name
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.first_name}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary" fontSize={13}>
                Last Name
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.last_name}
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
              <Typography variant={"h6"} color="text.secondary">
                Email ID
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.email_id}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Mobil NO
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.mobile_no}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Gender
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.gender}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Age
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.age}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Available Time
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.available_from} To {data?.available_till}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Experience
              </Typography>
              <Typography variant={"h6"} mb={0.5}>
                {data?.experience}
              </Typography>
            </Item>
          </Stack>
          <Grid item xs={6}>
            <Item>
              <Typography variant={"h6"} color="text.secondary">
                Language
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
                    data?.language.map((language, index) => (
                      <ListItem key={index}>
                        <Chip variant="outlined" label={language} />
                      </ListItem>
                    ))}
                </div>
              </Typography>
            </Item>
          </Grid>
        </CardContent>
        <CardActions sx={{ p: 0, mx: "-1px" }}></CardActions>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewNutritionist;
