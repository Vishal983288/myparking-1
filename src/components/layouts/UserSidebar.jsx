import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  styled,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  BookOnline as ReserveIcon,
  LocalParking as ParkingIcon,
  Person as UserIcon,
  Inventory as BoxIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import UserNavbar from "./UserNevbar"; 

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UserNavbar toggleSidebar={toggleSidebar}  
  isSidebarOpen={isSidebarOpen}   />

      {/* Sidebar Drawer */}
      <Drawer
        sx={{ 
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
      >
        {/* Sidebar Header */}
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Avatar src="/profile.jpg" sx={{ width: 56, height: 56, mb: 1 }} />
          <Typography variant="h6">MY PARKING</Typography>
        </Box>

        <Divider />

        {/* Sidebar Menu */}
        <List>
          <ListItemButton component={Link} to="admindash">
            <ListItemIcon sx={{ color: "white" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/">
            <ListItemIcon sx={{ color: "white" }}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Parking" />
          </ListItemButton>

          <ListItemButton component={Link} to="reserveslot">
            <ListItemIcon sx={{ color: "white" }}>
              <ReserveIcon />
            </ListItemIcon>
            <ListItemText primary="Reserve Slot" />
          </ListItemButton>

          <ListItemButton component={Link} to="parking">
            <ListItemIcon sx={{ color: "white" }}>
              <ParkingIcon />
            </ListItemIcon>
            <ListItemText primary="Parking" />
          </ListItemButton>

          <ListItemButton component={Link} to="userdash">
            <ListItemIcon sx={{ color: "white" }}>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="User Dashboard" />
          </ListItemButton>

          <Divider />

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <BoxIcon />
            </ListItemIcon>
            <ListItemText primary="Not Updated Yet" />
          </ListItemButton>
        </List>
      </Drawer>

      <Main open={isSidebarOpen}>
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default UserSidebar;
