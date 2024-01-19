import React, { useState } from "react";
import DndExample from "./components/DndExample";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  InputAdornment,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import Div from "@jumbo/shared/Div/Div";
import SearchIcon from "@mui/icons-material/Search";

const ListUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rolesList, setRolesList] = useState([
    { role_name: "user" },
    { role_name: "admin" },
    { role_name: "owner" },
  ]);
  const [selectedRole, setSelectedRole] = useState(null); // Add this line

  const handleFilter = () => {
    // Implement your filter logic here
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setRolesList([]);
  };

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant={"h1"}>USER LIST</Typography>
        <Link to="/user/add">
          <Button variant="contained" color="primary">
            ADD USER
          </Button>
        </Link>
      </Box>

      <Div sx={{ display: "flex", gap: 3, mb: 3 }}>
        <Div sx={{ width: "20%" }}>
          <Typography variant="h5">Role</Typography>
          <Autocomplete
            size="small"
            id="tags-standard"
            options={rolesList || []}
            getOptionLabel={(option) => option.role_name}
            value={selectedRole} // Use a single value for the selected role
            onChange={(event, newValue) => setSelectedRole(newValue)}
            inputValue={searchTerm}
            onInputChange={(event, newInputValue) =>
              setSearchTerm(newInputValue)
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </Div>
        <Button variant="outlined" sx={{ mt: 1 }}sonClick={handleFilter}>
          Apply
        </Button>
        
        <Button variant="outlined" sx={{ mt: 1 }} onClick={handleClearFilter}>
          Clear
        </Button>
      </Div>

      <TextField
        size="small"
        id="search"
        type="search"
        label="Search"
        sx={{ width: "20%", mb: 5 }}
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

      <DndExample />
    </React.Fragment>
  );
};

export default ListUser;
