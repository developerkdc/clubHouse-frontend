import React from "react";
import TabContext from "@mui/lab/TabContext";
import Div from "@jumbo/shared/Div";
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Stack from "@mui/material/Stack";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import styled from "@emotion/styled";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 24,
  height: 48,
  width: 48,
  borderRadius: "50%",
  minWidth: 42,
  marginRight: 16,
  padding: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
  border: `solid 1px ${theme.palette.divider}`,
}));
const About = () => {
  const AuthUser = JSON.parse(localStorage.getItem("authUser"));
  return (
    <JumboCardQuick
      title={"About"}
      action={
        <TabContext>
          <Div
            sx={{
              marginTop: -2.25,
              marginBottom: -2.5,

              "& .MuiTab-root": {
                py: 2.5,
              },
            }}
          ></Div>
        </TabContext>
      }
      headerSx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
      sx={{ mb: 3.75 }}
    >
      <List
        disablePadding
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: (theme) => theme.spacing(0, -2),
        }}
      >
        <ListItem
          sx={{
            width: { xs: "100%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            {/* <GroupsOutlinedIcon fontSize={"inherit"} /> */}
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                USER ID
              </Typography>
            }
            secondary={
              <Typography component={"div"} variant={"body1"}>
                {AuthUser.user_id}
                <Stack direction={"row"} flexWrap={"wrap"} sx={{}}></Stack>
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            {/* <ApartmentIcon fontSize={"inherit"} /> */}
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                Full Name{" "}
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {`${AuthUser.first_name} ${AuthUser.last_name}`}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            {/* <CakeOutlinedIcon fontSize={"inherit"} /> */}
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                Email Id
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {AuthUser.email_id}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            {/* <SchoolOutlinedIcon fontSize={"inherit"} /> */}
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                Phone No
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {AuthUser.mobile_no}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            {/* <CottageOutlinedIcon fontSize={"inherit"} /> */}
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                Role
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {AuthUser.role_id.role_name}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </JumboCardQuick>
  );
};

export default About;
