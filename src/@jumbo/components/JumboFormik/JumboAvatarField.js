import React from 'react';
import {useField} from "formik";
import JumboAvatarDropzone from "@jumbo/components/JumboAvatarDropzone";
import { ASSET_IMAGES } from 'app/utils/constants/paths';

const JumboAvatarField = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <JumboAvatarDropzone
            src={ field.value ? URL.createObjectURL(field.value) : `${ASSET_IMAGES}/addImage.png`}
            {...props}
            {...field}
            helperText={errorText}
            error={!!errorText}
        />
    );
};

export default JumboAvatarField;