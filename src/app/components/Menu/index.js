import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {MoreHorizOutlined} from "@mui/icons-material";
import { Link } from 'react-router-dom';

const CustomActionMenu = ({icon, menuItems, onClickCallback,row}) => {
    const [menuEl, setMenuEl] = React.useState(null);
    const openMenu = Boolean(menuEl);

    const handleMenuItemClick = (option) => {
        setMenuEl(null);
        if (typeof option.onClick === "function") {
            option.onClick();
            console.log(option.label, 'clicked'); 
        }
    };

    return (
        <>
            <IconButton
                sx={{
                    color: 'inherit'
                }}
                onClick={(e) => {
                    setMenuEl(e.currentTarget);
                    e.stopPropagation();
                }}
            >
                {
                    icon ? icon : <MoreHorizOutlined/>
                }
            </IconButton>
            <Menu open={openMenu}
                  anchorEl={menuEl}
                  onClose={() => setMenuEl(null)}

            >
                {menuItems.map((option, index) => (
                    // <Link to={option.url}>
                    <MenuItem key={index}
                    onClick={(e) => {
                        // handleMenuItemClick(option);
                        option.onClick(row)
                        // e.stopPropagation();
                    }}
                
                            //   onClick={(e) => option.onClick(option)}
                    >
                        {
                            option.icon &&
                            <ListItemIcon>{option.icon}</ListItemIcon>
                        }
                        
                        <ListItemText>{option.label}</ListItemText>
                    </MenuItem>
                        // </Link>
                ))}
            </Menu>
        </>

    );
};

CustomActionMenu.propTypes = {
    icon: PropTypes.node,
    menuItems: PropTypes.array,
    onClickCallback: PropTypes.func,
};

export default CustomActionMenu;