import React from 'react';
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import { ASSET_IMAGES } from "../../utils/constants/paths";
import { Typography } from '@mui/material';


const Logo = ({ mini, mode, sx }) => {
    return (
        <Div sx={{ display: "inline-flex", ...sx }}>
            <Link href={'/'}>
                {
                    // !mini ?
                    //     <img src={ mode === "light" ? `${ASSET_IMAGES}/logo.png` : `${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
                    //     :
                    //     <img src={mode === "light" ? `${ASSET_IMAGES}/logo-short.png` : `${ASSET_IMAGES}/logo-short-white.png`} alt="Jumbo React" />
                    //  <img style={{height:"90px"}} src={mode === "light" ? `${ASSET_IMAGES}/clubLogo.png` : `${ASSET_IMAGES}/logo-short-white.png`} alt="Jumbo React" />
                }
            <Typography variant='h1' sx={{fontWeight:"500"}}><span style={{color:"#7352C7"}}>CLUB  </span><span style={{color:"#475259"}}>  HOUSE</span></Typography>
            </Link>
        </Div>
    );
};

Logo.defaultProps = {
    mode: "light"
};

export default Logo;
