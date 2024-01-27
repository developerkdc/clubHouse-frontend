import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Fade from "@mui/material/Fade";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import { MoreHorizOutlined } from "@mui/icons-material";
import CustomActionMenu from "app/components/Menu";

const CustomTable = ({ data, columns, actions, fetchData, totalCount }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [openMenu, setOpenMenu] = React.useState(false);
  //   const openMenu = Boolean(menuEl);

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData({ page: page + 1, sortField, sortOrder });
  }, [page, sortField, sortOrder]);

  const renderCellContent = (row, column) => {
    if (column.renderCell) {
      return column.renderCell(row);
    }

    const value = row[column.field];
    return column.render ? column.render(value, row) : value;
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  variant="head"
                  sx={{
                    padding: "10px 0px 10px 20px",
                    fontSize: "16px",
                    // position: "sticky",
                    // top: 0,
                    // // background: "#fff",
                    // zIndex: 1, // Ensure the header stays above the body
                  }}
                  align="left"
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortField === column.field}
                      direction={sortField === column.field ? sortOrder : "desc"}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
              {actions && (
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }} align="center">
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {data && data.length ? (
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} hover={true} sx={{ margin: "0px" }}>
                  {columns.map((column) => (
                    <TableCell key={column.field} align="left" sx={{ padding: "8px 0px 8px 20px" }}>
                      {renderCellContent(row, column)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="center" sx={{ padding: "0px" }}>
                      <CustomActionMenu menuItems={actions} row={row} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center">
                  Data Not Found !!
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={""}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default CustomTable;
