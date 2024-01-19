import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import Div from "@jumbo/shared/Div/Div";
import { outerDiv } from "app/utils/constants/dropdowns";

const ListOptions = ({ name, label, options, sx, status }) => {
  const { values, handleChange, errors, touched } = useFormikContext();
  return (
    <Div sx={{ ...outerDiv, ...sx }}>
      <FormControl fullWidth>
        <Typography variant="h5">{label ? `${label}*` : ""}</Typography>
        <Field
          as={Select}
          id={name}
          disabled={status}
          name={name}
          // label={label}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: "#b2b2b2",
                opacity: 1,
              },
              "&& .Mui-hover": {
                backgroundColor: "#b2b2b2",
                opacity: 1,
              },
              maxHeight: "500px",
            },
          }}
          // style={{ height: "39px" }}
          value={values[name]}
          onChange={handleChange}
          size="small"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={{ bgcolor: "white" }}>
              {option}
            </MenuItem>
          ))}
        </Field>
      </FormControl>

      <Div style={{ height: "30px" }}>
        {errors[name] && touched[name] && (
          <ErrorMessage name={name} component="div" style={{ color: "red" }} />
        )}
      </Div>
    </Div>
  );
};

export default ListOptions;
