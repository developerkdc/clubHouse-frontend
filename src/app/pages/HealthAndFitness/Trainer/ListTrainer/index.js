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
import { Axios } from "app/services/config";
import Swal from "sweetalert2";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import { onTrainertList } from "app/redux/actions/Trainer";
import ViewTrainer from "../ViewTrainer";
export default function ListTrainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [trainerDetails, setTrainerDetails] = useState(false);
  const { trainerList, totalPages, error, successMessage } = useSelector(
    (state) => state.trainerReducer
  );
  const { role_id } = JSON.parse(localStorage.getItem("authUser"))|| {};

  const [query, setQuery] = useState({});

  const columns = [
    {
      field: "profile_image",
      headerName: "Image",
      render: (value) => (
        <Avatar
          sx={{
            width: 56,
            height: 56,
          }}
          variant="rounded"
          src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/nutritionist/${value}`}
        />
      ),
    },
    {
      field: "first_name",
      headerName: "Nutritionist Name",
      sortable: true,
      render: (_, elm) => elm.first_name + " " + elm.last_name,
    },
    { field: "email_id", headerName: "Email ID", sortable: true },
    { field: "mobile_no", headerName: "Mobil NO", sortable: true },

    { field: "gender", headerName: "Gender", sortable: true },
    { field: "experience", headerName: "Years of Experience", sortable: true },
    {
      field: "available_from",
      headerName: "Availability Time",
      sortable: true,
      render: (_, elm) => elm.available_from + "  -To-  " + elm.available_till,
    },

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
            title: `Change trainer status to ${
              status ? "inactive" : "active"
            } ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await Axios.patch(`/health_fitness/trainer/edit/${elm._id}`, {
              status: !status,
            });
            showAlert("success", "Trainer status updated successfully.");
            navigate("/health/trainer");
            dispatch(onTrainertList(query));
          }
        } catch (error) {
          console.error("Error updating trainer:", error);
          showAlert("error", "Failed to update trainer.");
        }
      },
    },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setTrainerDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    ...(role_id?.permissions?.trainer?.edit
      ? [
          {
            label: "Edit",
            color: "secondary",
            onClick: (row) =>
              navigate(`/health/trainer/edit/${row._id}`, { state: row }),
            icon: <ModeEditOutlinedIcon />,
          },
          {
            label: "Change Password",
            color: "primary",
            onClick: (row) =>
              navigate(`/health/trainer/change-password/${row._id}`),
            icon: <LockResetOutlinedIcon />,
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
    dispatch(onTrainertList(query));
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
        <Typography variant="h1">Trainer Master</Typography>
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
            {role_id?.permissions?.trainer?.add === true && (
              <Button
                size="small"
                variant="contained"
                sx={{ p: 1, pl: 4, pr: 4 }}
                onClick={() => navigate("/health/trainer/add")}
              >
                Add trainer
              </Button>
            )}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={trainerList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && trainerDetails && (
        <ViewTrainer
          openView={openView}
          setOpenView={setOpenView}
          data={trainerDetails}
        />
      )}
    </Div>
  );
}
