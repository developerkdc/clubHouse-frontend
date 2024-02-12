
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import { ListItem, ListItemText, Typography } from "@mui/material";




const ViewUser = ({ openView, setOpenView, data }) => {

  return (

    <Dialog
      open={openView}
      onClose={() => setOpenView(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"

    >
      <DialogTitle style={{ backgroundColor: "#7352C7", color: "white" }} id="alert-dialog-title">User Details</DialogTitle>
      <DialogContent headerSx={{
        borderBottom: 1, borderColor: 'divider'
      }}
        sx={{ mb: 3.75 }}>
        <List
          disablePadding
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme => theme.spacing(0, -2),
          }}
        >
          <ListItem
            sx={{
              width: { xs: '100%', sm: '50%', xl: '33.33%' },
              textAlign: 'center',
            }}
          >
            <ListItemText
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                USER ID </Typography>}
              secondary={<Typography variant="body1" color="text.primary">
                {data?.user_id || "--"}</Typography>}
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: '100%', sm: '50%', xl: '33.33%' },
              textAlign: 'center',
            }}
          >
            <ListItemText
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                First Name  </Typography>}
              secondary={<Typography variant="body1" color="text.primary">
                {data?.first_name || "--"}</Typography>}
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: '100%', sm: '50%', xl: '33.33%' },
              textAlign: 'center',
            }}
          >
            <ListItemText
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary"
                mb={.5}>Last Name</Typography>}
              secondary={<Typography variant="body1" color="text.primary">{data?.last_name || "--"}</Typography>}
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: '100%', sm: '50%', xl: '33.33%' },
              textAlign: 'center',
            }}
          >
            <ListItemText
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Phone No
              </Typography>}
              secondary={<Typography variant="body1" color="text.primary">{data?.mobile_no || "--"}</Typography>}
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: '100%', sm: '50%', xl: '33.33%' },
              textAlign: 'center',
            }}
          >
            <ListItemText
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                Email ID</Typography>}
              secondary={<Typography variant="body1" color="text.primary">{data?.email_id || "--"}</Typography>}
            />
          </ListItem>
      
          <ListItem
            sx={{
              width: { xs: '100%', sm: '50%', xl: '33.33%' },
              textAlign: 'center',
            }}
          >

            <ListItemText
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
              Role</Typography>}
              secondary={<Typography variant="body1" color="text.primary">{data?.role_id?.role_name || "--"}</Typography>}
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: '100%', sm: '50%', xl: '33.33%' },
              textAlign: 'center',
            }}
          >

            <ListItemText
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
              Status</Typography>}
              secondary={<Typography variant="body1" color="text.primary">   {data?.status ? "Active" : "Inactive"}</Typography>}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>

  );
};

export default ViewUser;
