import React, {useState} from 'react';
import {IconButton, TableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import BasicPagination from 'app/components/Pagination';
import EditIcon from '@mui/icons-material/Edit';

const ContactCell = props => {

    const {contact} = props;
   
    const {name, email, phone, designation} = contact;

    return (
        <>
        <TableRow>
            <TableCell width={"15%"}>
                <Typography variant={"h6"} mb={0}>{name}</Typography>
            </TableCell>
            <TableCell width={"20%"}>
                <Typography variant={"h6"} mb={0}>{name}</Typography>
            </TableCell>
            <TableCell width={"15%"}>
                <Typography variant={"h6"} mb={0}>{phone}</Typography>
            </TableCell>
            <TableCell width={"15%"}>
                <Typography variant={"h6"} mb={0}>{name}</Typography>
            </TableCell>
            <TableCell width={"15%"}>
                <Typography variant={"h6"} mb={0}>{name}</Typography>
            </TableCell>
            <TableCell width={"15%"}>
                <Typography variant={"h6"} mb={0}>{name}</Typography>
            </TableCell>
            <TableCell width={"15%"}>
                <Typography variant={"h6"} mb={0}>{name}</Typography>
            </TableCell>
            
            {/* <TableCell width={"15%"}>
            <Typography variant={"h6"} mb={0}></Typography>
            </TableCell> */}
            
            <TableCell width={"15%"}>
                <JumboDdMenu menuItems={menuItems}/>
            </TableCell>
        </TableRow>
           
         
            </>
        
    );
};

export default ContactCell;


const menuItems = [
    {
        title: "Edit User Details",
        slug: "edit",
        url: "/user/edit",
        icon: <EditIcon />,
    },
    {
        title: "Change Password",
        slug: "edit",
        url: "/user/edit",
        icon: <EditIcon />,
    },
];



