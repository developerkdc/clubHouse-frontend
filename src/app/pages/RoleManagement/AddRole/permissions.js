import Div from "@jumbo/shared/Div/Div";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import AllApis from "app/Apis/apis";
import { Axios } from "index";
import Swal from "sweetalert2";
import deepDiff from "deep-diff";
import Heading from "app/pages/Component/Heading";

export default function ConfigureRole() {
    const { pathname, state } = useLocation();
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState(
        state?.current_data?.role_name ? state?.current_data?.role_name : ""
    );
    const [headingName, setHeadingName] = useState(pathname.split("/").pop() == "add" ? "Add New Role" : "Edit Role");
    const [isSubmitting, setSubmitting] = useState(false);
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
                category: {
                    add: false,
                    edit: false,
                    view: false,
                },
                unit: {
                    add: false,
                    edit: false,
                    view: false,
                },
                gst: {
                    add: false,
                    edit: false,
                    view: false,
                },
                hsn_code: {
                    add: false,
                    edit: false,
                    view: false,
                },
                product: {
                    add: false,
                    edit: false,
                    view: false,
                },
                suppliers: {
                    add: false,
                    edit: false,
                    view: false,
                },
                sskcompany: {
                    add: false,
                    edit: false,
                    view: false,
                },
                marketExecutive: {
                    add: false,
                    edit: false,
                    view: false,
                },
                retailer: {
                    add: false,
                    edit: false,
                    view: false,
                },
                offlineStore: {
                    add: false,
                    edit: false,
                    view: false,
                },
                ssk_po: {
                    add: false,
                    edit: false,
                    view: false,
                },
                inventory: {
                    add: false,
                    edit: false,
                    view: false,
                },
                sampleTracking: {
                    add: false,
                    edit: false,
                    view: false,
                },
                order: {
                    add: false,
                    edit: false,
                    view: false,
                },
                salesOrder: {
                    add: false,
                    edit: false,
                    view: false,
                },
                refund: {
                    add: false,
                    edit: false,
                    view: false,
                },
                dispatch: {
                    add: false,
                    edit: false,
                    view: false,
                },
                tds: {
                    add: false,
                    edit: false,
                    view: false,
                },
                term_days: {
                    add: false,
                    edit: false,
                    view: false,
                },
                faq: {
                    add: false,
                    edit: false,
                    view: false,
                },
                ticket: {
                    add: false,
                    edit: false,
                    view: false,
                },
                payments: {
                    add: false,
                    edit: false,
                    view: false,
                },
                payouts: {
                    add: false,
                    edit: false,
                    view: false,
                },
            }
    );
    //it checks whete all values are true or not
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

    function convertToNestedObject(differences) {
        const result = {};

        differences.forEach((diff) => {
            const path = diff.path.join(".");
            const keys = path.split(".");

            let currentObj = result;
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    // Only set the value if it's not undefined
                    if (diff.rhs !== undefined) {
                        currentObj[key] = diff.rhs;
                    }
                } else {
                    currentObj[key] =
                        currentObj[key] ||
                        (Number.isNaN(parseInt(keys[index + 1])) ? {} : []); // If the next key is a number, initialize an array
                    currentObj = currentObj[key];
                }
            });
        });

        return result;
    }

    function getUpdatedFields(oldObject, newObject) {
        const differences = deepDiff(oldObject, newObject);

        if (!differences) {
            // No differences found, objects are identical
            return null;
        }

        return convertToNestedObject(differences);
    }

    const handleSubmit = async () => {
        if (roleName == "") {
            return Swal.fire({
                icon: "warning",
                title: "Role Name is required",
                text: "",
                timer: 1000,
                showConfirmButton: false,
            });
        }
        const body = {
            role_name: roleName,
            permissions: check,
        };
        let response;
        try {
            setSubmitting(true);
            if (pathname.split("/").pop() == "add") {
                response = await Axios.post(AllApis.roles.add, body);
            } else {
                response = await Axios.patch(
                    AllApis.roles.edit(state._id),
                    getUpdatedFields(state.current_data, body)
                );
            }
            if (response?.data?.statusCode) {
                Swal.fire({
                    title:
                        pathname.split("/").pop() == "add"
                            ? "New Role Created"
                            : "Role Updated",
                    // text: "You clicked the button!",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                });
                navigate("/dashboards/roles");
            }
        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                icon: "error",
                timer: 1000,
                showConfirmButton: false,
            });
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Div sx={{ mt: -4 }}>
            <Heading Name={headingName} />

            <Div sx={{ mt: 2 }}>
                <Div sx={{ display: "flex", mt: 4 }}>
                    <Div sx={{ width: "100%" }}>
                        <Div>
                            <Typography variant="h5">Role Name:</Typography>
                            <TextField
                                size="small"
                                value={roleName}
                                sx={{
                                    width: "20%",
                                    height: "39px",
                                }}
                                onChange={(event) => {
                                    setRoleName(event.target.value);
                                }}
                            />
                        </Div>
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
            <Div
                sx={{
                    width: "93.5%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    mt: 3,
                }}
            >
                <Button
                    sx={{ width: "100px" }}
                    variant="outlined"
                    onClick={() => navigate("/dashboards/roles")}
                >
                    Back
                </Button>

                <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{ width: "100px" }}
                    loading={isSubmitting}
                    onClick={handleSubmit}
                >
                    Save
                </LoadingButton>
            </Div>
        </Div>
    );
}
