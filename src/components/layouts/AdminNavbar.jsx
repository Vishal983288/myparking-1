import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Typography,
  Box,
  InputBase,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  NotificationsNone as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  width: "200px",
  display: "flex",
  alignItems: "center",
}));

const AdminNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        width: `calc(100% - ${isSidebarOpen ? 250 : 60}px)`,
        marginLeft: isSidebarOpen ? "250px" : "60px",
        transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
      }}
    >
      <StyledToolbar>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/admin/dashboard"
            variant="h6"
            sx={{ textDecoration: "none", color: "inherit", display: { xs: "none", sm: "block" } }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        <Search>
          <SearchIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
          <InputBase placeholder="Search..." />
        </Search>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <Badge badgeContent={5} color="warning">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>

          <IconButton onClick={handleMenuOpen}>
            <Avatar src="/admin-profile.jpg" sx={{ width: 32, height: 32 }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/admin/profile">
              <ListItemIcon>
                <AdminIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>

            <MenuItem component={Link} to="/admin/settings">
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem component={Link} to="/login">
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default AdminNavbar;
