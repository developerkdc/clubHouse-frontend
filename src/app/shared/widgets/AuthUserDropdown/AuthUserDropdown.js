import React from 'react';
import Avatar from "@mui/material/Avatar";
import {authUser} from "./fake-db";
import {ListItemIcon, ListItemText, ThemeProvider, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useNavigate} from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const AuthUserDropdown = () => {
    const navigate = useNavigate();
    const {theme} = useJumboTheme();
    // const {setAuthToken} = useJumboAuth();

    const onLogout = () => {
        // setAuthToken(null);
        navigate("/login");
    };

    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={
                    <Avatar
                        src={authUser.profile_pic}
                        sizes={"small"}
                        sx={{boxShadow: 25, cursor: 'pointer'}}
                    />
                }
            >
                <Div sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: theme => theme.spacing(2.5),
                }}>
                    <Avatar src={authUser.profile_pic} alt={authUser.name} sx={{width: 60, height: 60, mb: 2}}/>
                    <Typography variant={"h5"}>{authUser.name}</Typography>
                    <Typography variant={"body1"} color="text.secondary">{authUser.handle}</Typography>
                </Div>
                <Divider/>
                <nav>
                    <List disablePadding sx={{pb: 1}}>
                    {/* <Link style={{textDecoration:'none'}} to={'/dashboard/user/profile'}> */}
                        <ListItemButton  >
                            <ListItemIcon sx={{minWidth: 36}}>
                                <PersonOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Profile" sx={{my: 0}} onClick={() => navigate("/profile")}/>
                        </ListItemButton>
                        {/* </Link> */}
                        <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <EditOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" sx={{my: 0}} onClick={() => navigate("/profile/edit")}/>
                        </ListItemButton>
                      
                        <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Change Password" sx={{my: 0}} onClick={() => navigate("/profile/changePassword")}/>
                        </ListItemButton>
                        <ListItemButton onClick={onLogout}>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{my: 0}}/>
                        </ListItemButton>
                    </List>
                </nav>
            </JumboDdPopover>
        </ThemeProvider>
    );
};

export default AuthUserDropdown;
