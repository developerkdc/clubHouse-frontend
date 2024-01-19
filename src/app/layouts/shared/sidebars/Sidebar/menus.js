

import React from "react";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";

const menus = [
  {
    label: "Masters",
    type: "section",
    children: [
      {
        uri: "/user",
        label: "User Management",
        type: "nav-item",
        icon: <PersonAddAltIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/roles",
        label: "Roles & Permissions",
        type: "nav-item",
        icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/members",
        label: "Member",
        type: "nav-item",
        icon: <ListAltOutlinedIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/News",
        label: "News & Circular",
        type: "nav-item",
        icon: <SupportAgentOutlinedIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/events",
        label: "Events",
        type: "nav-item",
        icon: <EventOutlinedIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/gallery",
        label: "Gallery",
        type: "nav-item",
        icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/banquet",
        label: "Banquet",
        type: "nav-item",
        icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/sports",
        label: "Sports Facility",
        type: "nav-item",
        icon: <SportsSoccerOutlinedIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/salon",
        label: "Salon",
        type: "nav-item",
        icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/spa",
        label: "Spa",
        type: "nav-item",
        icon: <SpaOutlinedIcon sx={{ fontSize: 25 }} />,
      },
      {
        uri: "/library",
        label: "Library",
        type: "nav-item",
        icon: <LibraryBooksOutlinedIcon sx={{ fontSize: 25 }} />,
      },
     
      {
        label: "Health & Fitness",
        type: "collapsible",
        icon: <DirectionsRunOutlinedIcon sx={{ fontSize: 25 }} />,
        children: [
          {
            uri: "/health/nutritionist",
            label: "Nutritionist",
            type: "nav-item",
            // target: "_blank",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/health/trainer",
            label: "Trainer",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
            // target: "_blank",
          },
        ],
      },
      {
        label: "Payment & Invoice",
        type: "collapsible",
        icon: <PaymentOutlinedIcon sx={{ fontSize: 25 }} />,
        children: [
          {
            uri: "/payment/payment",
            label: "Payment",
            type: "nav-item",
            // target: "_blank",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/payment/invoice",
            label: "Invoice",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
            // target: "_blank",
          },
        ],
      },
      {
        label: "Committee Support",
        type: "collapsible",
        icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
        children: [
          {
            uri: "/tickets",
            label: "Tickets",
            type: "nav-item",
            // target: "_blank",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/notification",
            label: "Notification & Announcement",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
            // target: "_blank",
          },
        ],
      },
      {
        label: "Feedback",
        type: "collapsible",
        icon: <FeedbackOutlinedIcon sx={{ fontSize: 25 }} />,
        children: [
          {
            uri: "/feedback",
            label: "Feedback",
            type: "nav-item",
            // target: "_blank",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/responses",
            label: "View All Responses",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
            // target: "_blank",
          },
        ],
      },
    ],
  },
];

export default menus;
