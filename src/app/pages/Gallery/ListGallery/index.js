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


export default function ListGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [eventDetails, setMmberDetails] = useState(false);
  // const [clear, setClear] = useState(false);

  const [selectedEventDate, setSelectedEventDate] = useState(null);

  const { galleryList, totalPages, error, successMessage } = useSelector(
    (state) => state.galleryReducer
  );
  console.log(galleryList,'ddddddd');
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
      render: (value, elm) => (value ? "Active" : "Inactive"),
    },
  ];
 
  const [inputs, setInputs] = useState({});
  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setMmberDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    {
      label: "Edit",
      color: "secondary",
      onClick: (row) => navigate(`/gallery/edit/${row._id}`, { state: row }),
      icon: <ModeEditOutlinedIcon />,
    },
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

  const handleFilter = () => {
    setQuery({
      ...query});
  };
  const handleClearFilter = () => {
    setSelectedEventDate(null);
    setQuery({ ...query, event_start_date: "", end_date: "" });
  };
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
            <Button
              size="small"
              variant="contained"
              sx={{ p: 1, pl: 4, pr: 4 }}
              onClick={() => navigate("/gallery/add")}
            >
              Add Gallery
            </Button>
            {/* )} */}
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
      {openView && eventDetails && (
        <ViewGallery
          openView={openView}
          setOpenView={setOpenView}
          data={eventDetails}
        />
      )}
    </Div>
  );
}
