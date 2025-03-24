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
  ListItemText,
  Typography,
  Box,
  InputBase,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ChatBubbleOutline as ChatIcon,
  NotificationsNone as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
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

const UserNavbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <StyledToolbar >
      <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>

          {/* Home Link */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: { xs: "none", sm: "block" },
            }}
          >
            Home
          </Typography>

          {/* Contact Link */}
          <Typography
            component={Link}
            to="/contact"
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: { xs: "none", md: "block" },
            }}
          >
            Contact
          </Typography>
        </Box>
        {/* Toggle Sidebar Button */}
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>

        {/* Search Bar */}
        <Search>
          <SearchIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
          <InputBase placeholder="Search..." />
        </Search>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <ChatIcon />
            </Badge>
          </IconButton>

          <IconButton>
            <Badge badgeContent={5} color="warning">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>

          {/* User Profile */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar src="/profile.jpg" sx={{ width: 32, height: 32 }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/profile">
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>

            <MenuItem component={Link} to="/settings">
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

export default UserNavbar;
