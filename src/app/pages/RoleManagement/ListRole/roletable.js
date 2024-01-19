import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableSortLabel,
  Pagination,
} from "@mui/material";
import "./user.css";

import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayDateFun } from "app/utils/constants/functions";
import { getAllRoles } from "app/redux/actions/roleAction";
export default function ListRoleTable({ searchTerm }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(1);
  const { allRoles, TotalPage } = useSelector((state) => state.roleReducer);
  const permissions = JSON.parse(sessionStorage.getItem("permissions"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getAllRoles(searchTerm, "", newPage));
  };

  const sortedData = allRoles?.sort((a, b) => {
    let aValue;
    let bValue;
    console.log(orderBy);
    if (orderBy == "role_name") {
      aValue = a.role_name.toLowerCase();
      bValue = b.role_name.toLowerCase();
    } else {
      aValue = a[orderBy];
      bValue = b[orderBy];
    }
    if (order === "desc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return bValue < aValue ? -1 : 1;
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#202020", color: "white" }}>
            <TableCell
              sx={{
                textAlign: "left",
                minWidth: "150px",
                verticalAlign: "middle",
              }}
            >
              <TableSortLabel
                active={orderBy === "id"}
                direction={order}
                onClick={() => handleSort("id")}
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >
                Role ID
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                minWidth: "150px",
                verticalAlign: "middle",
              }}
            >
              <TableSortLabel
                active={orderBy === "role_name"}
                direction={order}
                onClick={() => handleSort("role_name")}
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >
                Role Name
              </TableSortLabel>
            </TableCell>

            <TableCell
              sx={{
                textAlign: "left",
                minWidth: "80px",
                verticalAlign: "middle",
              }}
            >
              <TableSortLabel
                active={orderBy === "role_status"}
                direction={order}
                onClick={() => handleSort("role_status")}
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                minWidth: "80px",
                verticalAlign: "middle",
                color: "white",
              }}
            >
              Created Date
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                minWidth: "80px",
                verticalAlign: "middle",
                color: "white",
              }}
            >
              Updated Date
            </TableCell>
            {permissions.role_edit == true && (
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "40px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Configure
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((row, i) => (
            <TableRow key={i}>
              <TableCell
                sx={{
                  textAlign: "left",
                  pl: 5,
                }}
              >
                {row.id}
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>{row.role_name}</TableCell>

              <TableCell sx={{ textAlign: "left" }}>
                {row.role_status === 0 ? "Inactive" : "Active"}
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                {displayDateFun(row.role_create_date)}
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                {displayDateFun(row.role_update_date)}
              </TableCell>
              {permissions.role_edit == true && (
                <TableCell sx={{ textAlign: "left", pl: 5 }}>
                  <SettingsIcon
                    sx={{ "&:hover": { cursor: "pointer", color: "black" } }}
                    onClick={() => {
                      navigate("/configurerole", { state: row });
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={TotalPage || 1}
        page={page}
        onChange={handleChangePage}
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          backgroundColor: "white",
          borderTop: "1px solid #ddd",
        }}
      />
    </TableContainer>
  );
}
