import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
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
import { useSelector } from "react-redux";
import ToastAlerts from "app/components/Toast";
import { onEventList } from "app/redux/actions/Event";
import { getCustomDateTime } from "@jumbo/utils";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
export default function ViewBanquetBoking() {
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
        <Typography variant="h1">Banquet Registration List</Typography>

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

          {/* <Div>
          

            <Button
               size="small"
              variant="contained"
              sx={{ p: 1, pl: 4, pr: 4 }}
            //   onClick={() => navigate("/event/add")}
            >
             Import CSV
            </Button>
          </Div> */}
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
    </Div>
  );
}
