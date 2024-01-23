import React from "react";
// import { ASSET_AVATARS } from '../../../../utils/constants/paths';
// import { getAssetPath } from '../../../../utils/appHelpers';
import contactsList from "app/pages/UserManagement/ListUser/components/data";
import DynamicTable from "./dynamicTable";
import { Avatar } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", sortable: true },
  { field: "designation", headerName: "Designation", sortable: true },
  // { field: "thumb", headerName: "Thumb", render: (value) => <img src={value} alt={value} /> },
  {
    field: "thumb",
    headerName: "Thumb",
    render: (value) => (
      <Avatar
        sx={{
          width: 56,
          height: 56,
          margin: "auto", // Center the Avatar
        }}
        variant="square"
        src={value}
      />
    ),
  },
  // Add more columns as needed
];

const actions = [
  {
    label: "1",
    color: "primary",
    onClick: (row) => console.log("Action 1 clicked for row:", row),
  },
  {
    label: "2",
    color: "secondary",
    onClick: (row) => console.log("Action 2 clicked for row:", row),
  },
  {
    label: "Edit",
    color: "primary",
    onClick: (row) => console.log("Action 2 clicked for row:", row),
  },
  // Add more actions as needed
];
const fetchData = (props) => {
  console.log(props);
};

const ExampleComponent = () => {
  return <DynamicTable data={contactsList} columns={columns} actions={actions} fetchData={fetchData} totalCount={20} />;
};

export default ExampleComponent;
