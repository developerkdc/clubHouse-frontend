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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Fade from "@mui/material/Fade";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import { MoreHorizOutlined } from "@mui/icons-material";

const DynamicTable = ({ data, columns, actions, fetchData, totalCount }) => {
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
  }, [page, sortField, sortOrder, fetchData]);

  const renderCellContent = (row, column) => {
    if (column.renderCell) {
      return column.renderCell(row);
    }

    const value = row[column.field];
    return column.render ? column.render(value, row) : value;
  };

  const renderActions = (row) => <></>;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} variant="head" align="center">
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortField === column.field}
                      direction={sortField === column.field ? sortOrder : "asc"}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
              {actions && <TableCell align="center">Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} hover={true} sx={{ margin: "0px" }}>
                {columns.map((column) => (
                  <TableCell key={column.field} align="center">
                    {renderCellContent(row, column)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center">
                    <IconButton
                      sx={{
                        color: "inherit",
                      }}
                      onClick={(e) => {
                        setOpenMenu(true);
                        //   e.stopPropagation();
                      }}
                    >
                      <MoreHorizOutlined />
                    </IconButton>
                    {openMenu && (
                      <Menu open={openMenu} sx={{ boxShadow: "none", border: "2px solid" }} onClose={() => setOpenMenu(false)}>
                        {actions.map((action, index) => (
                          <MenuItem key={index} onClick={() => action.onClick(row)}>
                            {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}

                            <ListItemText>{action.label}</ListItemText>
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
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

export default DynamicTable;
