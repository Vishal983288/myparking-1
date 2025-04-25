import React, { useState } from "react";
import { AppBar, Toolbar, Button, Container, Typography, Box, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bannerImage from "../../../assets/logo2.png";

const LandingPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLoginClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOption = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Smart Parking</Typography>
          <Box>
            <Button color="inherit" onClick={handleLoginClick}>Login</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleLoginOption("/login")}>User</MenuItem>
              <MenuItem onClick={() => handleLoginOption("/ownerlogin")}>Parking Owner</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ flex: 1, textAlign: "left", paddingRight: "2rem" }}
          >
            <Typography variant="h3" gutterBottom>
              Smart Parking Solutions
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Find and reserve parking spots effortlessly with our advanced parking system.
            </Typography>
            <Box mt={3} sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" size="large" onClick={() => navigate("/user")}>
                Get Started
              </Button>
              <Button variant="outlined" color="primary" size="large" onClick={() => navigate("/user/aboutus")}>
                Learn More
              </Button>
            </Box>
          </motion.div>
          <motion.img
            src={bannerImage}
            alt="Parking Banner"
            style={{ flex: 1, maxWidth: "100%", height: "auto" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;