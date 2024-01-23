import React from "react";
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
} from "@mui/material";

const DynamicTable = ({ columns, data, totalData, page, handleChangePage, onRequestSort,sortOrder }) => {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={false} // Set to false as we're handling sorting on the API
                  direction={sortOrder} // Default direction (you can set it to 'desc' if needed)
                  onClick={createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          component="div"
          count={totalData}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={10}
        />
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
