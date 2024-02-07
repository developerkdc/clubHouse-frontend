import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomTable from "app/components/Table";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ViewRole from "../ViewRole";
import { onRoleList } from "app/redux/actions/Roles";
import { useSelector } from "react-redux";
import ToastAlerts from "app/components/Toast";
import { Axios } from "app/services/config";
import Swal from "sweetalert2";
export default function ListRole() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [roleDetails, setRoleDetails] = useState(false);
  const { roleList, totalPages, error, successMessage } = useSelector(
    (state) => state.roleReducer
  );
  const [query, setQuery] = useState({});
  const columns = [
    { field: "role_name", headerName: "Role", sortable: true },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      render: (value, elm) =>
        value ? (
          <Button size="small" variant="outlined" color="success">
            Active
          </Button>
        ) : (
          <Button size="small" variant="outlined" color="error">
            Inactive
          </Button>
        ),
      onClick: async (elm) => {
        try {
          console.log(elm, "elmelm");
          let status = elm.status;
          const result = await Swal.fire({
            title: `Change role status to ${status ? "inactive" : "active"} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await Axios.patch(`/role/edit/${elm._id}`, { status: !status });
            showAlert("success", "Role status updated successfully.");
            navigate("/roles");
            dispatch(onRoleList(query));
          }
        } catch (error) {
          console.error("Error updating role:", error);
          showAlert("error", "Failed to update role.");
        }
      },
    },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setRoleDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    {
      label: "Edit",
      color: "secondary",
      onClick: (row) => navigate(`/roles/edit/${row._id}`, { state: row }),
      icon: <ModeEditOutlinedIcon />,
    },
  ];
  const fetchData = (props) => {
    console.log(props);
    setQuery({ ...query, ...props });
  };

  const handleSearch = (value) => {
    // dispatch(getAllRoles(value,"",""));
  };
  useEffect(() => {
    setQuery({ ...query, search: searchTerm });
  }, [searchTerm]);
  if (error) {
    showAlert("error", error);
  }
  useEffect(() => {
    dispatch(onRoleList(query));
  }, [query]);
  return (
    <Div
      sx={{
        mt: -4,
        maxHeight: "89vh",
        overflowY: "scroll",
        paddingRight: "10px",
      }}
    >
      <Div
        sx={{
          position: "sticky",
          top: 0,
          background: "#F5F7FA",
          zIndex: 10, // Ensure the header stays above the body
        }}
      >
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
            <Button
              size="small"
              variant="contained"
              sx={{ p: 1, pl: 4, pr: 4 }}
              onClick={() => navigate("/roles/add")}
            >
              Add Role
            </Button>
            {/* )} */}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={roleList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && roleDetails && (
        <ViewRole
          openView={openView}
          setOpenView={setOpenView}
          data={roleDetails}
        />
      )}
    </Div>
  );
}
