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
import { onGalleryList } from "app/redux/actions/Gallery";
import { getCustomDateTime } from "@jumbo/utils";
import ViewGallery from "../ViewGallery";
import Swal from "sweetalert2";
import { Axios } from "app/services/config";

export default function ListGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [galleryDetails, setGalleryDetails] = useState(false);
  const { role_id } = JSON.parse(localStorage.getItem("authUser")) || {};
  const { galleryList, totalPages, error, successMessage } = useSelector(
    (state) => state.galleryReducer
  );
  console.log(galleryList, "ddddddd");
  const [query, setQuery] = useState({});

  const columns = [
    { field: "album_name", headerName: "Album Name", sortable: true },
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
          src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/gallery/${value}`}
        />
      ),
    },
    {
      field: "event_date",
      headerName: "Event Date",
      sortable: true,
      render: (_, elm) =>
        getCustomDateTime(elm?.event_date, "days", "DD MMM YYYY"),
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
            title: `Change gallery status to ${
              status ? "inactive" : "active"
            } ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await Axios.patch(`/gallery/edit/${elm._id}`, { status: !status });
            showAlert("success", "Gallery status updated successfully.");
            navigate("/gallery");
            dispatch(onGalleryList(query));
          }
        } catch (error) {
          console.error("Error updating gallery:", error);
          showAlert("error", "Failed to update gallery.");
        }
      },
    },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setGalleryDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    ...(role_id?.permissions?.gallery?.edit
      ? [{
      label: "Edit",
      color: "secondary",
      onClick: (row) => navigate(`/gallery/edit/${row._id}`, { state: row }),
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
    dispatch(onGalleryList(query));
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
        <Typography variant="h1">Gallery Master</Typography>

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
          {role_id?.permissions?.gallery?.add === true && (
            <Button
              size="small"
              variant="contained"
              sx={{ p: 1, pl: 4, pr: 4 }}
              onClick={() => navigate("/gallery/add")}
            >
              Add Gallery
            </Button>
          )}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={galleryList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && galleryDetails && (
        <ViewGallery
          openView={openView}
          setOpenView={setOpenView}
          data={galleryDetails}
        />
      )}
    </Div>
  );
}
