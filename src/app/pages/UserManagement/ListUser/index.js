import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Avatar, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CustomTable from "app/components/Table";
import contactsList from "app/pages/UserManagement/ListUser/components/data";
import ViewUser from "../ViewUser";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";

export default function ListUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rolesList, setRolesList] = useState([{ role_name: "user" }, { role_name: "admin" }, { role_name: "owner" }]);
  const permissions = JSON.parse(sessionStorage.getItem("permissions"));
  const [selectedRole, setSelectedRole] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [userDetails, setUserDetails] = useState(false);

  const columns = [
    { field: "user_id", headerName: "User ID" },
    { field: "name", headerName: "Name", sortable: true, render: (_, elm) => elm.first_name + " " + elm.last_name },
    { field: "mobile_no", headerName: "Mobile", sortable: true },
    { field: "email_id", headerName: "Email Id", sortable: true },
    { field: "status", headerName: "Status", sortable: true, render: (value, elm) => (value ? "Active" : "Inactive") },
    { field: "role_id", headerName: "Role", render: (value, elm) => value.role_name },
    // {
    //   field: "thumb",
    //   headerName: "Thumb",
    //   render: (value) => (
    //     <Avatar
    //       sx={{
    //         width: 56,
    //         height: 56,
    //       }}
    //       variant="square"
    //       src={value}
    //     />
    //   ),
    // },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setUserDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    {
      label: "Edit",
      color: "secondary",
      onClick: (row) => navigate(`/user/edit/${row.user_id}`),
      icon: <ModeEditOutlinedIcon />,
    },
    {
      label: "Change Password",
      color: "primary",
      onClick: (row) => navigate(`/user/change-password/${row.user_id}`),
      icon: <LockResetOutlinedIcon />,
    },
  ];
  const fetchData = (props) => {
    console.log(props);
  };

  const handleSearch = (value) => {
    // dispatch(getAllRoles(value,"",""));
  };
  const handleFilter = () => {
    // Implement your filter logic here
  };
  const handleClearFilter = () => {
    setSearchTerm("");
    setRolesList([]);
  };

  useEffect(() => {
    // dispatch(getAllRoles());
  }, []);
  return (
    <Div sx={{ mt: -4, maxHeight: "89vh", overflowY: "scroll", paddingRight: "10px" }}>
      <Div
        sx={{
          position: "sticky",
          top: 0,
          background: "#F5F7FA",
          zIndex: 10, // Ensure the header stays above the body
        }}
      >
        <Typography variant="h1">User Master</Typography>
        <Div sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Div sx={{ width: "20%" }}>
            {/* <Typography variant="h5">Roles</Typography> */}
            <Autocomplete
              size="small"
              id="tags-standard"
              options={rolesList || []}
              getOptionLabel={(option) => option.role_name}
              value={selectedRole} // Use a single value for the selected role
              onChange={(event, newValue) => setSelectedRole(newValue)}
              inputValue={searchTerm}
              onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
              renderInput={(params) => <TextField {...params} label="Roles" />}
            />

            <Div sx={{ display: "flex", gap: 1, flex: "1" }}>
              <Button variant="outlined" sx={{ mt: 1, height: "35px" }} onClick={handleFilter}>
                Apply
              </Button>

              <Button variant="outlined" sx={{ mt: 1, height: "35px" }} onClick={handleClearFilter}>
                Clear
              </Button>
            </Div>
          </Div>
        </Div>
        <Div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            size="small"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            sx={{ width: 300, mb: 5, mt: 4 }}
            InputProps={{
              endAdornment: (
                <Div sx={{ cursor: "pointer" }}>
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                </Div>
              ),
            }}
          />
          <Div>
            {/* {permissions?.role_create == true && ( */}
            <Button variant="contained" sx={{ p: 1, pl: 4, pr: 4 }} onClick={() => navigate("/user/add")}>
              Add User
            </Button>
            {/* )} */}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable data={contactsList} columns={columns} actions={actions} fetchData={fetchData} totalCount={20} />
      </Div>
      {openView && userDetails && <ViewUser openView={openView} setOpenView={setOpenView} data={userDetails} />}
    </Div>
  );
}
