import React from "react";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
const { role_id } = JSON.parse(localStorage.getItem("authUser")) || {};
const menus = [
  {
    label: "Masters",
    type: "section",
    children: [
      role_id?.permissions?.user?.view === true
        ? {
            uri: "/user",
            label: "User Management",
            isActiveUri: [
              "/user/add",
              "/user/edit/:id",
              "/user/change-password/:id",
            ],
            type: "nav-item",
            icon: <PersonAddAltIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.roles?.view === true
        ? {
            uri: "/roles",
            label: "Roles & Permissions",
            isActiveUri: ["/roles/add", "/roles/edit/:id"],
            type: "nav-item",
            icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.member?.view === true
        ? {
            uri: "/member",
            label: "Member",
            isActiveUri: [
              "/member/add",
              "/member/edit/:id",
              "/member/change-password/:id",
            ],
            type: "nav-item",
            icon: <ListAltOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.news?.view === true
        ? {
            uri: "/news",
            label: "News & Circular",
            isActiveUri: ["/news/add", "/news/edit/:id"],
            type: "nav-item",
            icon: <SupportAgentOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.event?.view === true
        ? {
            uri: "/event",
            isActiveUri: ["/event/add", "/event/edit/:id"],
            label: "Events",
            type: "nav-item",
            icon: <EventOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.gallery?.view === true
        ? {
            uri: "/gallery",
            label: "Gallery",
            isActiveUri: ["/gallery/add", "/gallery/edit/:id"],
            type: "nav-item",
            icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.banquet?.view === true
        ? {
            uri: "/banquet",
            label: "Banquet",
            isActiveUri: ["/banquet/add", "/banquet/edit/:id"],
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.sport?.view === true
        ? {
            uri: "/sport",
            isActiveUri: ["/sport/add", "/sport/edit/:id"],
            label: "Sports Facility",
            type: "nav-item",
            icon: <SportsSoccerOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.salon?.view === true
        ? {
            uri: "/salon",
            isActiveUri: ["/salon/add", "/salon/edit/:id"],
            label: "Salon",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.spa?.view === true
        ? {
            uri: "/spa",
            label: "Spa",
            isActiveUri: ["/spa/add", "/spa/edit/:id"],
            type: "nav-item",
            icon: <SpaOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,
      role_id?.permissions?.library?.view === true
        ? {
            uri: "/library",
            label: "Library",
            type: "nav-item",
            isActiveUri: ["/library/add", "/library/edit/:id"],
            icon: <LibraryBooksOutlinedIcon sx={{ fontSize: 25 }} />,
          }
        : null,

      {
        label: "Health & Fitness",
        type: "collapsible",
        icon: <DirectionsRunOutlinedIcon sx={{ fontSize: 25 }} />,
        children: [
          {
            uri: "/health/nutritionist",
            label: "Nutritionist",
            type: "nav-item",
            isActiveUri: [
              "/health/nutritionist/add",
              "/health/nutritionist/edit/:id",
              "/health/nutritionist/change-password/:id",
            ],
            permissions: role_id?.permissions?.nutritionist?.view,
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/health/trainer",
            label: "Trainer",
            type: "nav-item",
            isActiveUri: [
              "/health/trainer/add",
              "/health/trainer/edit/:id",
              "/health/trainer/change-password/:id",
            ],
            permissions: role_id?.permissions?.trainer?.view,
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
        ].filter((item) => item.permissions === true),
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
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/payment/invoice",
            label: "Invoice",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
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
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/notification",
            label: "Notification & Announcement",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
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
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
          {
            uri: "/responses",
            label: "View All Responses",
            type: "nav-item",
            icon: <NewspaperIcon sx={{ fontSize: 25 }} />,
          },
        ],
      },
    ],
  },
];

export default menus;
