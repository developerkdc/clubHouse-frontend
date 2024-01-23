import React from 'react';
import Avatar from "@mui/material/Avatar";
import ContentHeader from "../../../layouts/shared/headers/ContentHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {ASSET_AVATARS} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";


const Header = () => {
    return (
        <ContentHeader
            avatar={
                <Avatar
                    sx={{width: 72, height: 72}}
                    alt={"Remy Sharp"}
                    src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "72x72")}
                />
            }
            title={"Kiley Brown"}
            subheader={<Typography fontSize={12} variant={'body1'} color={'inherit'} mt={.5}>Florida, USA</Typography>}
            children={
                <Stack
                    direction={"row"}
                    justifyContent={"space-evenly"}
                    divider={<Divider orientation="vertical" flexItem/>}
                    spacing={2}
                    sx={{
                        mx: 1
                    }}
                >
                    
                </Stack>
            }
            
            sx={{
                position: 'relative',
                zIndex: 1,

                '& .MuiCardHeader-action': {
                    alignSelf: 'center'
                }
            }}
        />
    );
};

export default Header;
