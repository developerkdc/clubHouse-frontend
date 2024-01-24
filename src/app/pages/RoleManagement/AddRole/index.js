import React, { useState } from "react";
import {
    Card,
    CardContent,
    Switch,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    FormControl
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";





const AddRole = () => {

    const GreenCheckbox = withStyles({
        root: {
            "&$checked": {
                color: "green",
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);
    const { state } = useLocation();

    const headingStyle = {
        minWidth: "20%",
        fontSize: "1rem",
        fontWeight: "bold",
    };
    const checkboxStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 4,
    };


    const [role_name, setRoleName] = useState(
        state?.role_name ? state?.role_name : ""
    );

    const [status, setStatus] = useState(state?.role_status === 0 ? 0 : 1);
    console.log(state?.role_status);
    const [check, setCheck] = useState(
        state?.current_data?.permissions
            ? state?.current_data?.permissions
            : {
                user: {
                    add: false,
                    edit: false,
                    view: false,
                },
                roles: {
                    add: false,
                    edit: false,
                    view: false,
                },
                member: {
                    add: false,
                    edit: false,
                    view: false,
                },
            }
    );

    const [selectAll, setSelectAll] = useState(
        Object.keys(check).every(
            (key) => check[key].add && check[key].edit && check[key].view
        )
    );
    const toggleAllCheckboxes = (status) => {
        // Create a new object by iterating over the current state and toggling each value
        setSelectAll(status);
        const updatedCheck = Object.keys(check).reduce((acc, key) => {
            acc[key] = {
                add: status,
                edit: status,
                view: status,
            };
            return acc;
        }, {});
        // Update the state with the new object
        setCheck(updatedCheck);
    };

    return (
        <React.Fragment>
            <Typography variant="h1" mb={3}>
                ADD ROLE
            </Typography>
            <Card sx={{ display: "flex", mb: 3.5 }}>
                <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    <CardContent>
                        <Box
                            component="form"
                            sx={{
                                mx: -1,
                                "& .MuiFormControl-root:not(.MuiTextField-root)": {
                                    p: 1,
                                    mb: 2,
                                    width: { xs: "100%", sm: "50%" },
                                },
                                "& .MuiFormControl-root.MuiFormControl-fluid": {
                                    width: "100%",
                                },
                            }}
                            autoComplete="off"
                        >

                            <Div sx={{ mt: 2 }}>
                                <Div sx={{ display: "flex", mt: 4 }}>
                                    <Div sx={{ width: "100%" }}>

                                        <FormControl>
                                            <TextField
                                                sx={{ width: "50%" }}
                                                id="role_name"
                                                name="role_name"
                                                label="Role Name"
                                                inputProps={{ style: { height: "12px" } }}
                                                InputLabelProps={{ style: { lineHeight: "12px" } }}
                                            />
                                        </FormControl>
                                        <Div
                                            sx={{
                                                width: "100%",
                                                mt: 3,
                                            }}
                                        >
                                            <Div sx={{ display: "flex", alignItems: "center" }}>
                                                <Typography
                                                    sx={{ textTransform: "capitalize", fontWeight: 700, mt: 1 }}
                                                    variant="h5"
                                                >
                                                    Select All
                                                </Typography>
                                                <GreenCheckbox
                                                    checked={selectAll}
                                                    onChange={(e) => {
                                                        toggleAllCheckboxes(e.target.checked);
                                                    }}
                                                />
                                            </Div>
                                            {Object?.entries(check)?.map(([key, value]) => (
                                                <Div key={key} sx={{ display: "flex" }}>
                                                    <Typography
                                                        sx={{ ...headingStyle, textTransform: "capitalize" }}
                                                    >
                                                        {key.split("_").join("  ")}
                                                    </Typography>
                                                    {Object?.entries(value)?.map(([subKey, subValue]) => (
                                                        <Div key={subKey} sx={{ display: "flex" }}>
                                                            <Div sx={checkboxStyle}>
                                                                <GreenCheckbox
                                                                    checked={subValue}
                                                                    onChange={(e) => {
                                                                        setCheck((prevCheck) => ({
                                                                            ...prevCheck,
                                                                            [key]: {
                                                                                ...prevCheck[key],
                                                                                [subKey]: e.target.checked,
                                                                            },
                                                                        }));
                                                                    }}
                                                                />
                                                                <Typography sx={{ textTransform: "capitalize" }}>
                                                                    {subKey}
                                                                </Typography>
                                                            </Div>
                                                        </Div>
                                                    ))}
                                                </Div>
                                            ))}
                                        </Div>
                                    </Div>
                                </Div>
                            </Div>

                            <FormControlLabel
                                label={<Typography variant="h5">Status</Typography>}
                                control={
                                    <Switch
                                        defaultChecked={status === 1}
                                        color={status === 1 ? "success" : "error"}
                                    />
                                }
                                labelPlacement="start"
                            />
                            <Div
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 3,
                                    mt: 3,
                                }}
                            >
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    sx={{ width: "100px" }}
                                >
                                    Save
                                </LoadingButton>
                                <Button variant="outlined">Cancel</Button>
                            </Div>
                        </Box>
                    </CardContent>
                </Div>
            </Card>
        </React.Fragment>
    );
};

export default AddRole;
