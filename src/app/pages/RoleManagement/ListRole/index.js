import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import CustomTable from "app/components/Table";
import contactsList from "app/pages/UserManagement/ListUser/components/data";

export default function ListRole() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = JSON.parse(sessionStorage.getItem("permissions"));

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", sortable: true },
    { field: "designation", headerName: "Designation", sortable: true },
    {
      field: "thumb",
      headerName: "Thumb",
      render: (value) => (
        <Avatar
          sx={{
            width: 56,
            height: 56,
          }}
          variant="square"
          src={value}
        />
      ),
    },
  ];

  const actions = [
    {
      label: "Edit",
      color: "secondary",
      onClick: (row) => navigate(`/roles/edit/${row.id}`),
      icon: <EditIcon />,
    },
    {
      label: "Change Password",
      color: "primary",
      onClick: (row) => navigate(`/roles/edit/${row.id}`),
      icon: <EditIcon />,
    },
  ];
  const fetchData = (props) => {
    console.log(props);
  };

  const handleSearch = (value) => {
    // dispatch(getAllRoles(value,"",""));
  };

  useEffect(() => {
    // dispatch(getAllRoles());
  }, []);
  return (
    <Div style={{}}>
      <Typography variant="h1">Role Master</Typography>
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
            <Button variant="contained" sx={{ p: 1, pl: 4, pr: 4 }} onClick={() => navigate("/role/add")}>
              Add Role
            </Button>
          {/* )} */}
        </Div>
      </Div>
      <CustomTable data={contactsList} columns={columns} actions={actions} fetchData={fetchData} totalCount={20} />
    </Div>
  );
}
