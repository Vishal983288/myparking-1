import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  Container,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const UserProfile = ({ onProfileImageChange }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const fileInputRef = useRef(null);

  const userId = localStorage.getItem("userid"); // Changed to userid to match Login.jsx

  const fetchUserData = async () => {
    if (!userId) {
      setError("No user data found. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log("Fetching user data for ID:", userId);
    
      const response = await api.get(`/api/users/${userId}`);
      console.log("API Response:", response.data);
      
      if (response.data && response.data.data) {
        setUser(response.data.data);
        setProfileImage(response.data.data.profileImage);
        setSnackbar({
          open: true,
          message: "Profile loaded successfully!",
          severity: "success"
        });
      } else {
        setError("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 404) {
          setError("User not found. Please make sure you're logged in correctly.");
        } else {
          setError(error.response.data.message || "Failed to fetch user data");
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError("No response from server. Please check if the server is running.");
      } else {
        console.error("Error message:", error.message);
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await api.put(
        `/api/users/${userId}/upload-profile-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.imageUrl) {
        setProfileImage(response.data.imageUrl);
        if (onProfileImageChange) onProfileImageChange(response.data.imageUrl);
        setSnackbar({
          open: true,
          message: "Profile picture updated successfully!",
          severity: "success"
        });
      }
    } catch (err) {
      console.error("Upload failed", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to upload profile image",
        severity: "error"
      });
    }
  };

  const handleRefresh = () => {
    fetchUserData();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={120} height={120} />
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={30} />
            <Box sx={{ width: '100%', mt: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'error.light' }}>
            <ErrorOutlineIcon sx={{ fontSize: 40, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              Try Again
            </Button>
          </Paper>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 3, 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-5px)',
              transition: 'all 0.3s ease-in-out'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Tooltip title="Refresh profile">
              <IconButton onClick={handleRefresh} color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Card sx={{ 
            textAlign: "center", 
            boxShadow: 'none',
            background: 'transparent'
          }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Avatar
                src={profileImage}
                onClick={handleAvatarClick}
                sx={{
                  width: 120,
                  height: 120,
                  margin: "auto",
                  bgcolor: "primary.main",
                  fontSize: "2.5rem",
                  cursor: "pointer",
                  border: '4px solid white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              >
                {!profileImage && user?.firstname?.charAt(0)}
              </Avatar>
              <Tooltip title="Change profile picture">
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={handleAvatarClick}
                >
                  <PhotoCameraIcon sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </Box>

            <CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {user?.firstname} {user?.lastname}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
                  {user?.roleId?.name || 'User'}
                </Typography>

                <Box sx={{ 
                  mt: 2,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CakeIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      <strong>Age:</strong> {user?.age || 'Not specified'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      <strong>Phone:</strong> {user?.phonenumber || 'Not specified'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      <strong>Email:</strong> {user?.email}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </CardContent>
          </Card>
        </Paper>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
