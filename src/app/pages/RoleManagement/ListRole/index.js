import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListRoleTable from "./roletable";
import { useDispatch } from "react-redux";
import { getAllRoles } from "app/redux/actions/roleAction";

export default function ListRole() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = JSON.parse(sessionStorage.getItem("permissions"));

  const handleSearch = (value) => {
    dispatch(getAllRoles(value,"",""));
  };

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);
  return (
    <Div sx={{ mt: -4 }}>
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
          <Button
            variant="contained"
            sx={{
              mr: 2,
              p: 1,
              pl: 4,
              pr: 4,
            }}
            onClick={() => navigate("/dashboard/roles/log")}
          >
            Log
          </Button>
          {permissions?.role_create == true && (
            <Button
              variant="contained"
              sx={{ p: 1, pl: 4, pr: 4 }}
              onClick={() => navigate("/addrole")}
            >
              Add Role
            </Button>
          )}
        </Div>
      </Div>
      <ListRoleTable searchTerm={searchTerm}/>
    </Div>
  );
}
