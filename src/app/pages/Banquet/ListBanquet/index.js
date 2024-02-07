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
import { onBanquetList } from "app/redux/actions/Banquet";
import ViewBanquet from "../ViewBanquet";

export default function ListBanquet() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [eventDetails, setMmberDetails] = useState(false);
  // const [clear, setClear] = useState(false);

  const [selectedEventDate, setSelectedEventDate] = useState(null);

  const { banquetList, totalPages, error, successMessage } = useSelector(
    (state) => state.banquetReducer
  );
  console.log(banquetList,'ddddddd');
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
          src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}/banquet/${value}`}
        />
      ),
    },
    { field: "location", headerName: "Location", sortable: true },
    { field: "capacity", headerName: "Capacity", sortable: true },
    { field: "rate", headerName: "Rate", sortable: true },
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
      onClick: (row) => navigate(`/banquet/edit/${row._id}`, { state: row }),
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
    dispatch(onBanquetList(query));
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
        <Typography variant="h1">Banquet Master</Typography>
        

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
              onClick={() => navigate("/banquet/add")}
            >
              Add BANQUET
            </Button>
            {/* )} */}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={banquetList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && eventDetails && (
        <ViewBanquet
          openView={openView}
          setOpenView={setOpenView}
          data={eventDetails}
        />
      )}
    </Div>
  );
}
