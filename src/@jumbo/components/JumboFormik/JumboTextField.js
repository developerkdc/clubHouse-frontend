import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

//todo: to see how to define prop-types for this component

const JumboTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      // inputProps={{ style: { height: "12px" } }}
      // InputLabelProps={{ style: { lineHeight: "12px" } }}
      {...props}
      {...field}
      helperText={errorText}
      size="small"
      error={!!errorText}
      
    />
  );
};

export default JumboTextField;
