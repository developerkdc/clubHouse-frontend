import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Avatar,
  Button,
  FormControl,
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
import { Axios } from "app/services/config";
import Swal from "sweetalert2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// Inside your component:

export default function ListEvent() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [eventDetails, setEventDetails] = useState(false);

  const [selectedEventDate, setSelectedEventDate] = useState({
    start_date: "",
    end_date: "",
    event_start_date: "",
  });
  console.log(selectedEventDate, "selectedEventDate");

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
            title: `Change event status to ${status ? "inactive" : "active"} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await Axios.patch(`/event/edit/${elm._id}`, { status: !status });
            showAlert("success", "Event status updated successfully.");
            navigate("/event");
            dispatch(onEventList(query));
          }
        } catch (error) {
          console.error("Error updating event:", error);
          showAlert("error", "Failed to update event.");
        }
      },
    },
  ];
  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setEventDetails(row);
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
    console.log("111111");

    setQuery({
      ...query,
      event_start_date: selectedEventDate?.event_start_date,
      start_date: selectedEventDate?.start_date,
      end_date: selectedEventDate?.end_date,
    });
  };

  const handleClearFilter = () => {
    setSelectedEventDate({
      start_date: "",
      end_date: "",
      event_start_date: "",
    });
    setQuery({ event_start_date: "", start_date: "", end_date: "" });
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
          zIndex: 10,
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
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="event_start_date"
                    name="event_start_date"
                    label="Event Date"
                    format="DD-MM-YYYY"
                    value={
                      selectedEventDate?.event_start_date
                        ? new Date(selectedEventDate?.event_start_date)
                        : null
                    }
                    onChange={(selectedDate) => {
                      setSelectedEventDate((prevDate) => ({
                        ...prevDate,
                        event_start_date: selectedDate,
                      }));
                    }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </FormControl>

              {/* <TextField
                fullWidth
                type="date"
                id="event_start_date"
                name="event_start_date"
                label="Event Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setSelectedEventDate((prevDate) => ({
                    ...prevDate,
                    event_start_date: selectedDate,
                  }));
                }}
                size="small"
                value={selectedEventDate.event_start_date}
              /> */}
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="start_date"
                    name="start_date"
                    label="From Date"
                    format="DD-MM-YYYY"
                    value={
                      selectedEventDate?.start_date
                        ? new Date(selectedEventDate?.start_date)
                        : null
                    }
                    onChange={(selectedDate) => {
                      setSelectedEventDate((prevDate) => ({
                        ...prevDate,
                        start_date: selectedDate,
                      }));
                    }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </FormControl>
              {/* <TextField
                fullWidth
                type="date"
                id="start_date"
                name="start_date"
                label="From Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setSelectedEventDate((prevDate) => ({
                    ...prevDate,
                    start_date: selectedDate,
                  }));
                }}
                size="small"
                value={selectedEventDate.start_date}
              /> */}
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="end_date"
                    name="end_date"
                    label="To Date"
                    format="DD-MM-YYYY"
                    value={
                      selectedEventDate?.end_date
                        ? new Date(selectedEventDate?.end_date)
                        : null
                    }
                    onChange={(selectedDate) => {
                      setSelectedEventDate((prevDate) => ({
                        ...prevDate,
                        end_date: selectedDate,
                      }));
                    }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </FormControl>
              {/* <TextField
                fullWidth
                type="date"
                id="end_date"
                name="end_date"
                label="To Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setSelectedEventDate((prevDate) => ({
                    ...prevDate,
                    end_date: selectedDate,
                  }));
                }}
                size="small"
                value={selectedEventDate.end_date}
              /> */}
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
