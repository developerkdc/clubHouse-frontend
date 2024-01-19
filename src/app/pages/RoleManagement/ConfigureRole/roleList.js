import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, Switch, TextField, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
// import { addRole } from "app/services/apis/addRole";
// import { updateRole } from "app/services/apis/updateRole";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PermissionList() {
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

  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [role_name, setRoleName] = useState(
    state?.role_name ? state?.role_name : ""
  );
  const [status, setStatus] = useState(state?.role_status === 0 ? 0 : 1);
  console.log(state?.role_status);
  const [check, setCheck] = useState(
    state?.permissions
      ? JSON.parse(state?.permissions)
      : {
          user_view: false,
          user_edit: false,
          user_create: false,
          role_view: false,
          role_edit: false,
          role_create: false,
          supplier_master_view: false,
          supplier_master_edit: false,
          supplier_master_create: false,
          fabric_master_view: false,
          fabric_master_edit: false,
          fabric_master_create: false,
          costing_master_view: false,
          costing_master_edit: false,
          costing_master_create: false,
          port_master_view: false,
          port_master_edit: false,
          port_master_create: false,
          add_on_master_view: false,
          add_on_master_edit: false,
          add_on_master_create: false,
          gst_master_create: false,
          gst_master_edit: false,
          gst_master_view: false,
          fabric_color_master_create: false,
          fabric_color_master_edit: false,
          fabric_color_master_view: false,
          unit_master_view: false,
          unit_master_edit: false,
          unit_master_create: false,
          factory_master_view: false,
          factory_master_edit: false,
          factory_master_create: false,
          product_master_view: false,
          product_master_edit: false,
          product_master_create: false,
          catalogue_master_view: false,
          catalogue_master_edit: false,
          catalogue_master_create: false,
          item_master_view: false,
          purchase_view: false,
          purchase_edit: false,
          purchase_create: false,
          inventory_view: false,
          inventory_edit: false,
          inventory_create: false,
          admin_order_view: false,
          admin_order_edit: false,
          admin_order_create: false,
          cutting_order_view: false,
          cutting_order_edit: false,
          cutting_order_create: false,
          receiver_order_view: false,
          receiver_order_edit: false,
          receiver_order_create: false,
          qc_order_view: false,
          qc_order_edit: false,
          qc_order_create: false,
          dispatch_order_view: false,
          dispatch_order_edit: false,
          dispatch_order_create: false,
          draft_order_view: false,
          draft_order_edit: false,
          draft_order_create: false,
          reports_view: false,
          reports_edit: false,
          reports_create: false,
          sales_view: false,
          sales_edit: false,
        }
  );

  const [selectAll, setSelectAll] = useState({
    edit: false,
    view: false,
    create: false,
  });
  // console.log( state?.permissions )
  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };

  const handleAllView = (e) => {
    const updatedObj = { ...check }; // Create a copy of the original object
    setSelectAll({ ...selectAll, view: e.target.checked });
    // Iterate through the keys of the object
    for (const key in updatedObj) {
      if (key.endsWith("_view")) {
        updatedObj[key] = e.target.checked;
      }
    }
    setCheck(updatedObj);
  };
  const handleAllEdit = (e) => {
    const updatedObj = { ...check }; // Create a copy of the original object
    setSelectAll({ ...selectAll, edit: e.target.checked });

    // Iterate through the keys of the object
    for (const key in updatedObj) {
      if (key.endsWith("_edit")) {
        updatedObj[key] = e.target.checked;
      }
    }
    setCheck(updatedObj);
  };
  const handleAllCreate = (e) => {
    const updatedObj = { ...check }; // Create a copy of the original object
    setSelectAll({ ...selectAll, create: e.target.checked });
    // Iterate through the keys of the object
    for (const key in updatedObj) {
      if (key.endsWith("_create")) {
        updatedObj[key] = e.target.checked;
      }
    }
    setCheck(updatedObj);
  };
  // const handleSubmit = async (e) => {
  //   // console.log(check)
  //   if (role_name == "") {
  //     return Swal.fire({ icon: "warning", title: "Fill Role Name", text: "" });
  //   }
  //   setSubmitting(true);

  //   if (pathname == "/addrole") {
  //     const details = {
  //       name: role_name,
  //       permissions: check,
  //       status: status,
  //     };
  //     // const data = await addRole(details);

  //     if (data.status == 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: data.data.message,
  //         text: "",
  //       });
  //       navigate("/dashboard/roles");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "User Not Added",
  //         text: "",
  //       });
  //     }
  //   } else {
  //     const details = {
  //       id: state.id,
  //       name: role_name,
  //       permissions: check,
  //       status: status,
  //     };
  //     const data = await updateRole(details);

  //     if (data.status == 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: data.data.message,
  //         text: "",
  //       });
  //       navigate("/dashboard/roles");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "User Not Updated",
  //         text: "",
  //       });
  //     }
  //   }
  //   setSubmitting(false);
  // };

  return (
    <Div sx={{ width: "100%" }}>
      <Div>
        <Typography variant="h5">Role Name:</Typography>
        <TextField
          size="small"
          value={role_name}
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
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <Typography sx={headingStyle}>Select</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox checked={selectAll.view} onChange={handleAllView} />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox checked={selectAll.edit} onChange={handleAllEdit} />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={selectAll.create}
            onChange={handleAllCreate}
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <Typography sx={headingStyle}>User Management</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.user_view}
            onChange={handleChange}
            name="user_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.user_edit}
            onChange={handleChange}
            name="user_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.user_create}
            onChange={handleChange}
            name="user_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Roles & Permissions</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.role_view}
            onChange={handleChange}
            name="role_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.role_edit}
            onChange={handleChange}
            name="role_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.role_create}
            onChange={handleChange}
            name="role_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Supplier Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.supplier_master_view}
            onChange={handleChange}
            name="supplier_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.supplier_master_edit}
            onChange={handleChange}
            name="supplier_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.supplier_master_create}
            onChange={handleChange}
            name="supplier_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Fabric Color Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.fabric_color_master_view}
            onChange={handleChange}
            name="fabric_color_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.fabric_color_master_edit}
            onChange={handleChange}
            name="fabric_color_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.fabric_color_master_create}
            onChange={handleChange}
            name="fabric_color_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Fabric Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.fabric_master_view}
            onChange={handleChange}
            name="fabric_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.fabric_master_edit}
            onChange={handleChange}
            name="fabric_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.fabric_master_create}
            onChange={handleChange}
            name="fabric_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Costing Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.costing_master_view}
            onChange={handleChange}
            name="costing_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.costing_master_edit}
            onChange={handleChange}
            name="costing_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.costing_master_create}
            onChange={handleChange}
            name="costing_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Port Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.port_master_view}
            onChange={handleChange}
            name="port_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.port_master_edit}
            onChange={handleChange}
            name="port_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.port_master_create}
            onChange={handleChange}
            name="port_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Add Ons Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.add_on_master_view}
            onChange={handleChange}
            name="add_on_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.add_on_master_edit}
            onChange={handleChange}
            name="add_on_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.add_on_master_create}
            onChange={handleChange}
            name="add_on_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>

      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>GST Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.gst_master_view}
            onChange={handleChange}
            name="gst_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.gst_master_edit}
            onChange={handleChange}
            name="gst_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.gst_master_create}
            onChange={handleChange}
            name="gst_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Unit Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.unit_master_view}
            onChange={handleChange}
            name="unit_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.unit_master_edit}
            onChange={handleChange}
            name="unit_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.unit_master_create}
            onChange={handleChange}
            name="unit_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Factory Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.factory_master_view}
            onChange={handleChange}
            name="factory_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.factory_master_edit}
            onChange={handleChange}
            name="factory_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.factory_master_create}
            onChange={handleChange}
            name="factory_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Product Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.product_master_view}
            onChange={handleChange}
            name="product_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.product_master_edit}
            onChange={handleChange}
            name="product_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.product_master_create}
            onChange={handleChange}
            name="product_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Catalogue Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.catalogue_master_view}
            onChange={handleChange}
            name="catalogue_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.catalogue_master_edit}
            onChange={handleChange}
            name="catalogue_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.catalogue_master_create}
            onChange={handleChange}
            name="catalogue_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Purchase Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.purchase_view}
            onChange={handleChange}
            name="purchase_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.purchase_edit}
            onChange={handleChange}
            name="purchase_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.purchase_create}
            onChange={handleChange}
            name="purchase_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Inventory Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.inventory_view}
            onChange={handleChange}
            name="inventory_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.inventory_edit}
            onChange={handleChange}
            name="inventory_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.inventory_create}
            onChange={handleChange}
            name="inventory_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Admin Order</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.admin_order_view}
            onChange={handleChange}
            name="admin_order_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.admin_order_edit}
            onChange={handleChange}
            name="admin_order_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.admin_order_create}
            onChange={handleChange}
            name="admin_order_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Cutter Order</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.cutting_order_view}
            onChange={handleChange}
            name="cutting_order_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.cutting_order_edit}
            onChange={handleChange}
            name="cutting_order_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.cutting_order_create}
            onChange={handleChange}
            name="cutting_order_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Receive Order</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.receiver_order_view}
            onChange={handleChange}
            name="receiver_order_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.receiver_order_edit}
            onChange={handleChange}
            name="receiver_order_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.receiver_order_create}
            onChange={handleChange}
            name="receiver_order_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>QC Order</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.qc_order_view}
            onChange={handleChange}
            name="qc_order_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.qc_order_edit}
            onChange={handleChange}
            name="qc_order_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.qc_order_create}
            onChange={handleChange}
            name="qc_order_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Dispatch Order</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.dispatch_order_view}
            onChange={handleChange}
            name="dispatch_order_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.dispatch_order_edit}
            onChange={handleChange}
            name="dispatch_order_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.dispatch_order_create}
            onChange={handleChange}
            name="dispatch_order_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Draft</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.draft_order_view}
            onChange={handleChange}
            name="draft_order_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.draft_order_edit}
            onChange={handleChange}
            name="draft_order_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.draft_order_create}
            onChange={handleChange}
            name="draft_order_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Reports</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.reports_view}
            onChange={handleChange}
            name="reports_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.reports_edit}
            onChange={handleChange}
            name="reports_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.reports_create}
            onChange={handleChange}
            name="reports_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Sales</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.sales_view}
            onChange={handleChange}
            name="sales_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.sales_edit}
            onChange={handleChange}
            name="sales_edit"
          />
          <Typography>Edit</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Item Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.item_master_view}
            onChange={handleChange}
            name="item_master_view"
          />
          <Typography>View</Typography>
        </Div>
      </Div>

      <Div sx={{ mt: 5 }}>
        <Typography variant="h5">Status</Typography>
        <Switch
          onChange={(e) => {
            setStatus(status == 1 ? 0 : 1);
          }}
          defaultChecked={status == 1 ? true : false}
          sx={{
            p: 0,
            width: "70px",
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: status === 1 ? "green" : "red",
              width: "90%",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: status === 1 ? "green" : "red",
            },
          }}
        />
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
                navigate("/dashboard/roles");
              }
            });
          }}
        >
          Cancel
        </Button>

        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ width: "100px" }}
          loading={isSubmitting}
          // onClick={handleSubmit}
        >
          Save
        </LoadingButton>
      </Div>
    </Div>
  );
}
