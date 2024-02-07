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
// import ViewBanquet from "../ViewBanquet";

export default function ListSport() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [eventDetails, setMmberDetails] = useState(false);

  const { sportList, totalPages, error, successMessage } = useSelector(
    (state) => state.sportReducer
  );
  console.log(sportList, "ddddddd");
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
      render: (value, elm) => (value ? "Active" : "Inactive"),
    },
  ];
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
      onClick: (row) => navigate(`/sport/edit/${row._id}`, { state: row }),
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
              onClick={() => navigate("/sport/add")}
            >
              Add SPORT
            </Button>
            {/* )} */}
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
      {openView && eventDetails && (
        <ViewSport
          openView={openView}
          setOpenView={setOpenView}
          data={eventDetails}
        />
      )}
    </Div>
  );
}
