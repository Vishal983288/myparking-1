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
  People as UsersIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar"; 

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

export const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <Drawer
        sx={{ 
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#222",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Avatar src="/admin-profile.jpg" sx={{ width: 56, height: 56, mb: 1 }} />
          <Typography variant="h6">ADMIN PANEL</Typography>
        </Box>

        <Divider />

        <List>
          <ListItemButton component={Link} to="admindash">
            <ListItemIcon sx={{ color: "white" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/users">
            <ListItemIcon sx={{ color: "white" }}>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/settings">
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
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

export default AdminSidebar;
