import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Avatar, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CustomTable from "app/components/Table";
import ViewUser from "../ViewUser";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import { onUserList } from "app/redux/actions/User";
import ToastAlerts from "app/components/Toast";

export default function ListUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [rolesList, setRolesList] = useState([{ role_name: "user" }, { role_name: "admin" }, { role_name: "owner" }]);
  const { role_id } = JSON.parse(localStorage.getItem("authUser"));
  const { userList, totalPages, error, successMessage } = useSelector((state) => state.userReducer);
  const [selectedRole, setSelectedRole] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [query, setQuery] = useState({});

  const columns = [
    { field: "user_id", headerName: "User ID" },
    { field: "first_name", headerName: "Name", sortable: true, render: (_, elm) => elm.first_name + " " + elm.last_name },
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
    setQuery({ ...query, ...props });
  };

  const handleSearch = (value) => {};
  const handleFilter = () => {
    setQuery({ ...query, role: selectedRole.role_name });
  };
  const handleClearFilter = () => {
    showAlert("warning", "Token not found. Please login to continue.");
    setSelectedRole(null);
  };
  useEffect(() => {
    setQuery({ ...query, search: searchTerm });
  }, [searchTerm]);

  if (error) {
    showAlert("error", error);
  } 

  useEffect(() => {
    dispatch(onUserList(query));
  }, [query]);
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
            <Autocomplete
              size="small"
              id="tags-standard"
              options={rolesList || []}
              getOptionLabel={(option) => option.role_name}
              value={selectedRole} // Use a single value for the selected role
              onChange={(e, newValue) => {
                handleSearch(newValue);
                // setSelectedRole(newValue);
              }}
              // inputValue={searchTerm}
              // onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
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
            label="Search"
            value={searchTerm}
            size="small"
            onChange={(e) => {
              setSearchTerm(e.target.value);
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
        <CustomTable data={userList} columns={columns} actions={actions} fetchData={fetchData} totalCount={totalPages} />
      </Div>
      {openView && userDetails && <ViewUser openView={openView} setOpenView={setOpenView} data={userDetails} />}
    </Div>
  );
}
