import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomTable from "app/components/Table";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ViewMember from "../ViewMember";
import { useSelector } from "react-redux";
import { onMemberList } from "app/redux/actions/Member";
import ToastAlerts from "app/components/Toast";
import { getCustomDateTime } from "@jumbo/utils";
import { Axios } from "app/services/config";
import Swal from "sweetalert2";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
export default function ListMember() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [memberDetails, setMmberDetails] = useState(false);
  const { memberList, totalPages, error, successMessage } = useSelector(
    (state) => state.memberReducer
  );
  const [query, setQuery] = useState({});

  const columns = [
    { field: "member_id", headerName: "Member ID" },
    {
      field: "first_name",
      headerName: "Name",
      sortable: true,
      render: (_, elm) => elm.first_name + " " + elm.last_name,
    },
    { field: "email_id", headerName: "Email ID", sortable: true },
    { field: "mobile_no", headerName: "Mobil NO", sortable: true },

    {
      field: "dob",
      headerName: "Date Of Birth",
      sortable: true,
      render: (_, elm) => getCustomDateTime(elm?.dob, "days", "DD MMM YYYY"),
    },
    { field: "member_type", headerName: "Member Type", sortable: true },
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
            title: `Change member status to ${
              status ? "inactive" : "active"
            } ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await Axios.patch(`/member/edit/${elm._id}`, { status: !status });
            showAlert("success", "Member status updated successfully.");
            navigate("/member");
            dispatch(onMemberList(query));
          }
        } catch (error) {
          console.error("Error updating member:", error);
          showAlert("error", "Failed to update member.");
        }
      },
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
      onClick: (row) => navigate(`/member/edit/${row._id}`, { state: row }),
      icon: <ModeEditOutlinedIcon />,
    },
    {
      label: "Change Password",
      color: "primary",
      onClick: (row) => navigate(`/member/change-password/${row._id}`),
      icon: <LockResetOutlinedIcon />,
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
    dispatch(onMemberList(query));
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
        <Typography variant="h1">Member Master</Typography>
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
              onClick={() => navigate("/member/add")}
            >
              Add Member
            </Button>
            {/* )} */}
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={memberList}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPages}
        />
      </Div>
      {openView && memberDetails && (
        <ViewMember
          openView={openView}
          setOpenView={setOpenView}
          data={memberDetails}
        />
      )}
    </Div>
  );
}
