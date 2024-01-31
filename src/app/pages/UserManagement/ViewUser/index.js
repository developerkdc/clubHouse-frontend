import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from "@mui/material";
import React from "react";

const ViewUser = ({ openView, setOpenView, data }) => {
  return (

    <Dialog
      open={openView}
      onClose={() => setOpenView(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">User Details</DialogTitle>
      <DialogContent>

        <Card style={{ marginBottom: "10px" }}>
          <CardContent>
            <Grid container style={{ display: "flex", justifyContent: "space-around" }}>
              <Box>
                <Typography variant="h5" component="div">
                  User Details
                </Typography>
                <Typography variant="body2">
                  <span style={{ opacity: "0.5" }}>Name:</span> {data.first_name || "--"}
                </Typography>
                <Typography variant="body2">
                  <span style={{ opacity: "0.5" }}>Email:</span> {data.email_id || "--"}
                </Typography>
                <Typography variant="body2">
                  <span style={{ opacity: "0.5" }}>Contact:</span> {data.mobile_no || "--"}
                </Typography>
                <Typography variant="body2">
                  <span style={{ opacity: "0.5" }}>City:</span> {data.status || "--"}
                </Typography>
                <Typography variant="body2">
                  <span style={{ opacity: "0.5" }}>Feedback:</span> {data.user_id || "--"}
                </Typography>
              </Box>
            </Grid>
          </CardContent>
        </Card>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>

  );
};

export default ViewUser;
