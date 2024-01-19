import React, { useState } from "react";
import { arrayMove, SortableContainer } from "react-sortable-hoc";
import contactsList from "./data";
import ContactCell from "./ContactCell";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import BasicPagination from "app/components/Pagination";

const Contacts = SortableContainer(({ contacts }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
            {/* <TableCell></TableCell>/ */}
            <TableCell
             sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}
            >
              <TableSortLabel
                // active={orderBy === "employee_id"}
                // direction={order}
                // onClick={() => handleSort("employee_id")}
                sx={{
                  color: "black",
                  "&:hover": { color: "red" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >
                User ID
              </TableSortLabel>
            </TableCell>
            {/* <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}>User ID</TableCell> */}
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}>
            <TableSortLabel
                // active={orderBy === "employee_id"}
                // direction={order}
                // onClick={() => handleSort("employee_id")}
                sx={{
                  color: "black",
                  "&:hover": { color: "red" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >
              
              First Name
              </TableSortLabel>
              </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}>
              
            <TableSortLabel
                // active={orderBy === "employee_id"}
                // direction={order}
                // onClick={() => handleSort("employee_id")}
                sx={{
                  color: "black",
                  "&:hover": { color: "red" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              > Last Name  </TableSortLabel></TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}>
              
            <TableSortLabel
                // active={orderBy === "employee_id"}
                // direction={order}
                // onClick={() => handleSort("employee_id")}
                sx={{
                  color: "black",
                  "&:hover": { color: "red" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >  Email ID
              </TableSortLabel></TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}>
            <TableSortLabel
                // active={orderBy === "employee_id"}
                // direction={order}
                // onClick={() => handleSort("employee_id")}
                sx={{
                  color: "black",
                  "&:hover": { color: "red" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >  
              Phone No  </TableSortLabel></TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}>
              
            <TableSortLabel
                // active={orderBy === "employee_id"}
                // direction={order}
                // onClick={() => handleSort("employee_id")}
                sx={{
                  color: "black",
                  "&:hover": { color: "red" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >   Status  </TableSortLabel></TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc' }}>
              
            <TableSortLabel
                // active={orderBy === "employee_id"}
                // direction={order}
                // onClick={() => handleSort("employee_id")}
                sx={{
                  color: "black",
                  "&:hover": { color: "red" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >  Role  </TableSortLabel></TableCell>

            <TableCell sx={{ fontWeight: 'bold', fontSize: 16, borderBottom: '1px solid #ccc',color:"black" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => (
            <ContactCell key={index} index={index} contact={contact} />
          ))}
        </TableBody>
      </Table>
      <BasicPagination />
    </TableContainer>
  );
});

const DndExample = () => {
  const [contacts, setContacts] = useState(contactsList);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setContacts(arrayMove(contacts, oldIndex, newIndex));
  };

  return (
    <JumboDemoCard>
      <Contacts
        contacts={contacts}
        onSortEnd={onSortEnd}
        useDragHandle={true}
      />
    </JumboDemoCard>
  );
};

export default DndExample;
