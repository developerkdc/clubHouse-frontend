
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
import {  Card, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import Div from "@jumbo/shared/Div";


const Item = ({ children, sx }) => (
  <Div sx={{ textAlign: 'center', flexBasis: '50%', ...sx }}>
    {children}
  </Div>
);



const ViewMember = ({ openView, setOpenView, data }) => {


  return (

    <Dialog
      open={openView}
      onClose={() => setOpenView(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"

    >
      <DialogTitle style={{ backgroundColor: "#7352C7", color: "white" }} id="alert-dialog-title">Member Details</DialogTitle>
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
              primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}> Member Type
              </Typography>}
              secondary={<Typography variant="body1" color="text.primary">{data?.member_type || "--"}</Typography>}
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
                Member ID</Typography>}
              secondary={<Typography variant="body1" color="text.primary">{data?.member_id || "--"}</Typography>}
            />
          </ListItem>
        </List>
        {/* <DialogTitle style={{ backgroundColor: "#7352C7", color: "white" }} id="alert-dialog-title">Member Details</DialogTitle> */}
        {data && data?.family_member.length && data?.family_member?.map((member, index) => (
          <Card style={{ width: "100%", marginTop: "5px" }}>
            <DialogTitle id="alert-dialog-title">{`Family Member ${index + 1
              }`} </DialogTitle>
            <CardContent sx={{
              pt: 0,
              display: 'flex',
              flexDirection: 'column',
             
            }}>
              <Stack direction={"row"} color={"text.secondary"} mb={1}>
                <Item>
                  <Typography variant={"body1"} color="text.secondary" fontSize={13}>First Name</Typography>
                  <Typography variant={"h6"} mb={.5}> {member?.first_name || "--"}</Typography>
                </Item>
                <Item>
                  <Typography variant={"body1"} color="text.secondary" fontSize={13}>Last Name</Typography>
                  <Typography variant={"h6"} mb={.5}> {member?.last_name || "--"}</Typography>
                </Item>
              </Stack>
              <Stack direction={"row"} color={"text.secondary"} mb={1}>
                <Item>
                  <Typography variant={"body1"} color="text.secondary" fontSize={13}>Mobil NO</Typography>
                  <Typography variant={"h6"} mb={.5}>{member.mobile_no}</Typography>
                </Item>
                <Item>
                  <Typography variant={"body1"} color="text.secondary" fontSize={13}>Data of Birth</Typography>
                  <Typography variant={"h6"} mb={.5}>{member.dob}</Typography>
                </Item>
              </Stack>
              <Stack direction={"row"} alignSelf="stretch">
                <Item>
                  <Typography variant={"body1"} color="text.secondary" fontSize={13}>Relation</Typography>
                  <Typography variant={"h6"} mb={.5}>{member.relation}</Typography>
                </Item>
                <Item>
                  <Typography variant={"body1"} color="text.secondary" fontSize={13}>Email ID</Typography>
                  <Typography variant={"h6"} mb={.5}>{member.email_id}</Typography>
                </Item>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>

  );
};

export default ViewMember;
