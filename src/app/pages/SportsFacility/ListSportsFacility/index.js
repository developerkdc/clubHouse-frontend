import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomTable from "app/components/Table";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useSelector } from "react-redux";
import ToastAlerts from "app/components/Toast";
import { onSportList } from "app/redux/actions/Sport";
import ViewSport from "../ViewSport";
import Swal from "sweetalert2";
import { Axios } from "app/services/config";

export default function ListSport() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [sportDetails, setSportDetails] = useState(false);
  const { role_id } = JSON.parse(localStorage.getItem("authUser"))|| {};
  const { sportList, totalPages, error, successMessage } = useSelector(
    (state) => state.sportReducer
  );

  const [query, setQuery] = useState({});

  const columns = [
    { field: "name", headerName: "Name", sortable: true },
    {
      field: "banner_image",
      headerName: "Image",
      render: (value) => (
        <Avatar
          sx={{
            width: 56,
            height: 56,
          }}
          variant="rounded"
          src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/sport/${value}`}
        />
      ),
    },
    { field: "location", headerName: "Location", sortable: true },
    { field: "field_name", headerName: "Field Name", sortable: true },
    { field: "field_no", headerName: "Field NO", sortable: true },
    { field: "rate", headerName: "Rate", sortable: true },
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
            title: `Change sport status to ${status ? "inactive" : "active"} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await Axios.patch(`/sport/edit/${elm._id}`, { status: !status });
            showAlert("success", "Sport status updated successfully.");
            navigate("/sport");
            dispatch(onSportList(query));
          }
        } catch (error) {
          console.error("Error updating sport:", error);
          showAlert("error", "Failed to update sport.");
        }
      },
    },
  ];
  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setSportDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    ...(role_id?.permissions?.sport?.edit
      ? [
          {
            label: "Edit",
            color: "secondary",
            onClick: (row) =>
              navigate(`/sport/edit/${row._id}`, { state: row }),
            icon: <ModeEditOutlinedIcon />,
          },
        ]
      : []),
  ];

  const fetchData = (props) => {
    setQuery({ ...query, ...props });
  };

  useEffect(() => {
    setQuery({ ...query, search: searchTerm });
  }, [searchTerm]);

  if (error) {
    showAlert("error", error);
  }

  useEffect(() => {
    dispatch(onSportList(query));
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
        <Typography variant="h1">Sport Master</Typography>

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
            type="search"
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
            {role_id?.permissions?.sport?.add === true && (
              <Button
                size="small"
                variant="contained"
                sx={{ p: 1, pl: 4, pr: 4 }}
                onClick={() => navigate("/sport/add")}
              >
                Add SPORT
              </Button>
            )}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={sportList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && sportDetails && (
        <ViewSport
          openView={openView}
          setOpenView={setOpenView}
          data={sportDetails}
        />
      )}
    </Div>
  );
}
