import React from 'react';
import PropTypes from "prop-types";

import {useDropzone} from "react-dropzone";
import Avatar from "@mui/material/Avatar";
import Div from '@jumbo/shared/Div';

const JumboAvatarDropzone = ({src, alt, onFileSelection, sx,variant}) => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            onFileSelection(acceptedFiles[0]);
        },
    });

    return (
        <Div sx={{...sx,cursor:'pointer'}} {...getRootProps({className: 'dropzone pointer'})} >
            <input {...getInputProps()} />
            <Avatar variant={variant} alt={alt} src={src} sx={sx}/>
        </Div>
    );
};

JumboAvatarDropzone.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    onFileSelection: PropTypes.func,
    sx: PropTypes.object,
};

export default JumboAvatarDropzone;
