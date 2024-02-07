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
import { useDispatch, useSelector } from "react-redux";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CustomTable from "app/components/Table";

import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";

import ToastAlerts from "app/components/Toast";

import Swal from "sweetalert2";

import { onNewsList } from "app/redux/actions/NewsAndCircular";
import { getCustomDateTime } from "@jumbo/utils";
import { Axios } from "app/services/config";
import ViewNewsAndCircular from "../ViewNewsAndCircular";

export default function ListNews() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  // const [rolesList, setRolesList] = useState([{ role_name: "user" }, { role_name: "admin" }, { role_name: "owner" }]);
  const { role_id } = JSON.parse(localStorage.getItem("authUser"));
  const { newsList, totalPages, error } = useSelector(
    (state) => state.newsReducer
  );
  const [openView, setOpenView] = useState(false);
  const [newsDetails, setNewsDetails] = useState(false);
  const [query, setQuery] = useState({});

  const columns = [
    { field: "title", headerName: "Title", sortable: true, width: "400px" },
    {
      field: "banner_image",
      headerName: "Image",
      width: "100px",
      render: (value) => (
        <Avatar
          sx={{
            width: 56,
            height: 56,
          }}
          variant="rounded"
          src={`${process.env.REACT_APP_BACKEND_IMAGE_PATH}news/${value}`}
        />
      ),
    },
    { field: "source", headerName: "Source", width: "200px" },
    { field: "type", headerName: "Type", sortable: true },
    {
      field: "created_at",
      headerName: "Created Date",
      sortable: true,
      // render: (_, elm) => getCustomDateTime(elm?.created_at, "days", "DD MMMM YYYY hh:mm A"),
      render: (_, elm) =>
        getCustomDateTime(elm?.created_at, "days", "DD MMM YYYY"),
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
            title: `Change news status to ${status ? "inactive" : "active"} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await Axios.patch(`/news/edit/${elm._id}`, { status: !status });
            showAlert("success", "News status updated successfully.");
            navigate("/news");
            dispatch(onNewsList(query));
          }
        } catch (error) {
          console.error("Error updating news:", error);
          showAlert("error", "Failed to update news.");
        }
      },
    },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setNewsDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    {
      label: "Edit",
      color: "secondary",
      onClick: (row) => navigate(`/news/edit/${row._id}`, { state: row }),
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
    dispatch(onNewsList(query));
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
        <Typography variant="h1">News Master</Typography>
        <Div
          sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
        ></Div>
        <Div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="search"
            autoComplete="onInputChange"
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
            {role_id?.permissions?.news?.add && (
              <Button
                size="small"
                variant="contained"
                sx={{ p: 1, pl: 4, pr: 4 }}
                onClick={() => navigate("/news/add")}
              >
                Add news
              </Button>
            )}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={newsList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && newsDetails && (
        <ViewNewsAndCircular
          openView={openView}
          setOpenView={setOpenView}
          data={newsDetails}
        />
      )}
    </Div>
  );
}
