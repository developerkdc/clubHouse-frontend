import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {MoreHorizOutlined} from "@mui/icons-material";
import { Link } from 'react-router-dom';

const JumboDdMenu = ({icon, menuItems, onClickCallback}) => {
    const [menuEl, setMenuEl] = React.useState(null);
    const openMenu = Boolean(menuEl);

    const handleMenuItemClick = (option) => {
        setMenuEl(null);
        if (typeof onClickCallback === "function")
            onClickCallback(option);
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
                    <MenuItem key={index} selected={option.title === 'Refresh'}
                              onClick={(e) => {
                                  handleMenuItemClick(option);
                                  e.stopPropagation();
                              }}
                    >
                        {
                            option.icon &&
                            <ListItemIcon>{option.icon}</ListItemIcon>
                        }

                        <Link style={{textDecoration:'none'}} to={option.url}>
                        <ListItemText>{option.title}</ListItemText>
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </>

    );
};

JumboDdMenu.propTypes = {
    icon: PropTypes.node,
    menuItems: PropTypes.array,
    onClickCallback: PropTypes.func,
};

export default React.memo(JumboDdMenu);
