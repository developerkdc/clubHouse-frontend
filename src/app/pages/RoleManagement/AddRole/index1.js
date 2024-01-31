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
import { withStyles } from "@mui/styles"
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";

const AddRoleS = () => {
    const navigate = useNavigate()
    const showAlert = ToastAlerts();
    const GreenCheckbox = withStyles({
        root: {
            "&$checked": {
                color: "green",
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

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



    const [check, setCheck] = useState(
        {
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
            news: {
                add: false,
                edit: false,
                view: false,
            },
            event: {
                add: false,
                edit: false,
                view: false,
            },
            gallery: {
                add: false,
                edit: false,
                view: false,
            },

            banquet: {
                add: false,
                edit: false,
                view: false,
            },
            sport: {
                add: false,
                edit: false,
                view: false,
            },

            salon: {
                add: false,
                edit: false,
                view: false,
            },

            spa: {
                add: false,
                edit: false,
                view: false,
            },
            library: {
                add: false,
                edit: false,
                view: false,
            },
            nutritionist: {
                add: false,
                edit: false,
                view: false,
            },

            trainer: {
                add: false,
                edit: false,
                view: false,
            },

            payment: {
                add: false,
                edit: false,
                view: false,
            },
            invoice: {
                add: false,
                edit: false,
                view: false,
            },
            support: {
                add: false,
                edit: false,
                view: false,
            },
            feedback: {
                add: false,
                edit: false,
                view: false,
            }
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

    const initialValues = {
        role_name: "",
        permissions: check,
        status: true,
    }
    const validationSchema = yup.object({
        role_name: yup.string("Enter Role Name")
            .required("Role Name is required")
    });
    console.log(initialValues, 'initialValues');

    const handleRoleAdd = async (values) => {
        console.log(values, 'values');
        try {
            await Axios.post("/role/add", values);
            showAlert("success", "Role added successfully.");
            navigate("/roles");
        } catch (error) {
            showAlert("error", error.response.data.message);
        }
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
                            <Formik
                                validateOnChange={true}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(data, { setSubmitting }) => {
                                    console.log(data, 'data');
                                    validationSchema
                                        .validate(data, { abortEarly: false })
                                        .then(() => {
                                            handleRoleAdd(data);
                                            setSubmitting(true);
                                        })
                                        .catch((validationErrors) => {
                                            console.error("Validation Errors:", validationErrors);
                                            setSubmitting(false);
                                        });

                                }}
                            >

                                {({ setFieldValue, isSubmitting, values }) => (
                                    <Form noValidate autoComplete="off">

                                        <Div sx={{ mt: 2 }}>
                                            <Div sx={{ display: "flex", mt: 4 }}>
                                                <Div sx={{ width: "100%" }}>
                                                    <JumboTextField

                                                        sx={{ width: "50%" }}
                                                        id="role_name"
                                                        name="role_name"
                                                        label="Role Name"


                                                    >
                                                    </JumboTextField>
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
                                            style={{ padding: "0px", margin: "0px", height: "100%" }}
                                            control={
                                                <Switch
                                                    onChange={(e) => {
                                                        setFieldValue("status", values.status ? false : true);
                                                    }}
                                                    defaultChecked={values.status ? true : false}
                                                    color="primary"
                                                />
                                            }
                                            label="Status"
                                            name="status"
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
                                            <LoadingButton variant="contained" size="medium" type="submit" loading={isSubmitting} >
                                                Save
                                            </LoadingButton>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: "Are you sure you want to cancel?",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonText: "Yes",
                                                        cancelButtonText: "No",
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            navigate("/roles");
                                                        }
                                                    });
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Div>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </CardContent>
                </Div>
            </Card>
        </React.Fragment>
    );
};

export default AddRoleS;
