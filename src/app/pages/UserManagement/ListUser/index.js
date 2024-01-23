import React, { useState } from "react";
import DndExample from "./components/DndExample";
import { Link } from "react-router-dom";
import { Button, Box, InputAdornment, TextField, Typography, Autocomplete, TablePagination } from "@mui/material";
import Div from "@jumbo/shared/Div/Div";
import SearchIcon from "@mui/icons-material/Search";
import DynamicTable from "./components/dummy";
import contactsList from "./components/data";

const ListUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rolesList, setRolesList] = useState([{ role_name: "user" }, { role_name: "admin" }, { role_name: "owner" }]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "thumb", label: "Thumbnail" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "designation", label: "Designation" },
    { id: "selected", label: "Selected" },
    { id: "starred", label: "Starred" },
    { id: "frequently", label: "Frequently" },
  ];
  const [selectedRole, setSelectedRole] = useState(null); // Add this line

  const handleFilter = () => {
    // Implement your filter logic here
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setRolesList([]);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // const handleRequestSort = (property) => {
  //   setSortField(()=>property);
  //   // setSortOrder((prevSortOrder) => {
  //   //   const isAsc = prevSortOrder === "asc";
  //   //   return isAsc ? "desc" : "asc";
  //   // });

  //   console.log(sortField, sortOrder);
  // };
  const handleRequestSort = (property) => {
    setSortField(property);
    const isAsc = sortOrder === "asc" ? "desc" : "asc";
    // setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setSortOrder(isAsc);
    console.log(property, sortOrder); // Log the property directly, as setSortField might not have updated immediately
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
            onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Div>
        <Button variant="outlined" sx={{ mt: 1 }} onClick={handleFilter}>
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
      <DynamicTable
        columns={columns}
        data={contactsList} // Pass the updated data
        totalData={contactsList.length}
        page={page}
        handleChangePage={handleChangePage}
        onRequestSort={handleRequestSort}
        sortOrder={sortOrder}
      />
    </React.Fragment>
  );
};

export default ListUser;
