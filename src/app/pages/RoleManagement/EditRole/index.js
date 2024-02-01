import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    Switch,
    Checkbox,
    Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles"
import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import { onRoleList } from "app/redux/actions/Roles";
import { useDispatch } from "react-redux";
const EditRole = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { state } = useLocation();
    const showAlert = ToastAlerts()

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

    const check =
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

    const [selectAll, setSelectAll] = useState(
        Object.keys(check).every(
            (key) => check[key].add && check[key].edit && check[key].view
        )
    );
    var initialValues = {
        role_name: state.role_name,
        permissions: state.permissions
        ,
        status: state.status,
    };
    const validationSchema = yup.object({
        role_name: yup.string("Enter Role Name").required("Role Name is required"),
    });
    const handleRoleEdit = async (data) => {
        try {
            await Axios.patch(`/role/edit/${id}`,data);
            showAlert("success", "Role updated successfully.");
            navigate("/roles");
        } catch (error) {
            showAlert("error", error.response.data.message);
        }
    };

    useEffect(() => {
        dispatch(onRoleList(id));
    }, []);



    return (
        <React.Fragment>
            <Typography variant="h1" mb={3}>
                EDIT ROLE
            </Typography>
            <Card>
                <CardContent>
                    <Formik
                        validateOnChange={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);
                            validationSchema
                                .validate(data, { abortEarly: false })
                                .then(() => {
                                    handleRoleEdit(data);
                                    setSubmitting(false);
                                })
                                .catch((validationErrors) => {
                                    console.error("Validation Errors:", validationErrors);
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({ setFieldValue, isSubmitting, values, errors, touched }) => (
                            <Form noValidate autoComplete="off">
                                <Grid container rowSpacing={3} columnSpacing={3}>
                                    <Grid item xs={6}>
                                        <JumboTextField fullWidth id="role_name" name="role_name" label="Role Name" />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                                    const updatedCheck = Object.keys(values.permissions).reduce((acc, key) => {
                                                        acc[key] = {
                                                            add: e.target.checked,
                                                            edit: e.target.checked,
                                                            view: e.target.checked,
                                                        };
                                                        return acc;
                                                    }, {});
                                                    setFieldValue('permissions', updatedCheck)
                                                    setSelectAll(e.target.checked)
                                                }}
                                            />
                                        </Div>
                                        {Object?.entries(values.permissions)?.map(([key, value]) => (
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
                                                                    setFieldValue('permissions', {
                                                                        ...values.permissions, [key]: {
                                                                            ...values.permissions[key],
                                                                            [subKey]: e.target.checked,
                                                                        },
                                                                    })
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

                                    </Grid>


                                    <Grid item xs={6} alignContent="center">
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
                                    </Grid>
                                </Grid>

                                <Grid container columnSpacing={3} mt={5}>
                                    <Grid item xs={6} textAlign="right">
                                        <LoadingButton variant="contained" size="medium" type="submit" loading={isSubmitting}>
                                            Save
                                        </LoadingButton>
                                    </Grid>
                                    <Grid item xs={6} textAlign="left">
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
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default EditRole;
