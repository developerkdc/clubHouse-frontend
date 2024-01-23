import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import contactsList from "app/pages/UserManagement/ListUser/components/data";
import CustomTable from "app/components/Table";

export default function ListMember() {
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
      label: "1",
      color: "primary",
      onClick: (row) => console.log("Action 1 clicked for row:", row),
    },
    {
      label: "2",
      color: "secondary",
      onClick: (row) => console.log("Action 2 clicked for row:", row),
    },
    {
      label: "Edit",
      color: "primary",
      onClick: (row) => navigate(`member/edit/${row.id}`),
    },
    // Add more actions as needed
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
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">Member Master</Typography>
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
          <Button variant="contained" sx={{ p: 1, pl: 4, pr: 4 }} onClick={() => navigate("/member/add")}>
            Add Member
          </Button>
          {/* )} */}
        </Div>
      </Div>
      <CustomTable data={contactsList} columns={columns} actions={actions} fetchData={fetchData} totalCount={20} />
    </Div>
  );
}
