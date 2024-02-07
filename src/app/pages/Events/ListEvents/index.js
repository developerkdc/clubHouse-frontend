import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Avatar,
  Button,
  Grid,
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
import { onEventList } from "app/redux/actions/Event";
import ViewEvent from "../ViewEvent";
import { getCustomDateTime } from "@jumbo/utils";
import { formatDate } from "./date.js";

export default function ListEvent() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [eventDetails, setMmberDetails] = useState(false);


  const [selectedEventDate, setSelectedEventDate] = useState(null);

  const { eventList, totalPages, error, successMessage } = useSelector(
    (state) => state.eventReducer
  );
  const [query, setQuery] = useState({});

  const columns = [
    { field: "title", headerName: "Title", sortable: true },
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
          src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/event/${value}`}
        />
      ),
    },
    { field: "category", headerName: "Category", sortable: true },
    { field: "duration_type", headerName: "Duration Type", sortable: true },
    {
      field: "start_date",
      headerName: "Start Date",
      sortable: true,
      render: (_, elm) =>
        getCustomDateTime(elm?.start_date, "days", "DD MMM YYYY"),
    },
    {
      field: "end_date",
      headerName: "End Date",
      sortable: true,
      render: (_, elm) =>
        elm?.end_date
          ? getCustomDateTime(elm.end_date, "days", "DD MMM YYYY")
          : "-",
    },
    { field: "event_type", headerName: "Event Type", sortable: true },
    {
      field: "entry_fee",
      headerName: "Entry Fees",
      render: (_, elm) => (elm?.entry_fee ? elm?.entry_fee : "-"),
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
      onClick: (row) => navigate(`/event/edit/${row._id}`, { state: row }),
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
    dispatch(onEventList(query));
  }, [query]);

  const handleFilter = () => {
    setQuery({
      ...query,
      event_start_date: selectedEventDate?.start_date
        ? formatDate(selectedEventDate?.start_date)
        : "",
      end_date: selectedEventDate?.end_date
        ? formatDate(selectedEventDate?.end_date)
        : "",
    });
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
        <Typography variant="h1">Event Master</Typography>
        <Div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            marginBottom: 3,
          }}
        >
          <Grid container rowSpacing={3} columnSpacing={3} marginTop={-1}>
            <Grid item xs={3}>
              <Autocomplete
                size="small"
                id="tags-standard"
                options={eventList}
                getOptionLabel={(option) =>
                  getCustomDateTime(option?.start_date, "days", "DD MMM YYYY")
                }
                value={selectedEventDate}
                onChange={(e, newValue) => setSelectedEventDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Event Date" />
                )}
              />
            </Grid>
            <Grid item xs={2}>
            
            </Grid>
            <Grid item xs={2}>
            
            </Grid>
          </Grid>

          <Div
            sx={{ display: "flex", gap: 1, flex: "1", flexDirection: "row" }}
          >
            <Button
              size="small"
              variant="outlined"
              sx={{ mt: 1, height: "35px" }}
              onClick={handleFilter}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              sx={{ mt: 1, height: "35px" }}
              onClick={handleClearFilter}
            >
              Clear
            </Button>
          </Div>
        </Div>

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
              onClick={() => navigate("/event/add")}
            >
              Add Event
            </Button>
            {/* )} */}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={eventList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && eventDetails && (
        <ViewEvent
          openView={openView}
          setOpenView={setOpenView}
          data={eventDetails}
        />
      )}
    </Div>
  );
}
