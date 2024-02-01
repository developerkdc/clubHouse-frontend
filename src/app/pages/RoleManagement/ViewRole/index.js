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
  Typography,
} from "@mui/material";
import React from "react";

const ViewRole = ({ openView, setOpenView, data }) => {
  return (

    <Dialog
      open={openView}
      onClose={() => setOpenView(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title"> {data?.role_name}</DialogTitle>
      <DialogContent>
   
      <Card style={{ marginBottom: "20px" }}>
  <CardContent>
    <Grid container style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.keys(data?.permissions).map((category, index) => (
        <Grid item xs={12} sm={5} md={5} lg={2.2} key={category} style={{ marginBottom: "5px" }}>
          <Box sx={{ height: 120 }}>
            <Typography variant="body2" style={{ fontSize: "18px"}}sx={{color:"blue"}} >
              <span style={{ opacity: "0.5" }}>{category}:</span>
            </Typography>
            {Object.keys(data?.permissions[category]).map((action) => (
              <Typography key={action} variant="body2" style={{ fontSize: "18px"}}>
                <span  style={{color:"black" }}>{action}:</span> {data?.permissions[category][action] ? "True" : "False"}
              </Typography>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  </CardContent>
</Card>



      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)} size="large">Close</Button> {/* Set size to "large" for a larger button */}
      </DialogActions>
    </Dialog>

  );
};

export default ViewRole;
