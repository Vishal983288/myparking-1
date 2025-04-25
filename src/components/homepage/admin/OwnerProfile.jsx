import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "0 auto",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: "0 auto",
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[4],
}));

const OwnerProfile = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerId = localStorage.getItem("ownerId");
        console.log("Fetching owner data for ID:", ownerId);

        if (!ownerId) {
          setError("No owner ID found. Please log in again.");
          setLoading(false);
          return;
        }

        console.log("Making API request to:", `http://localhost:3000/getownerbyid/${ownerId}`);
        const response = await axios.get(`http://localhost:3000/getownerbyid/${ownerId}`);
        console.log("Full API Response:", response);

        if (response.data.data) {
          const ownerData = response.data.data;
          console.log("Owner data received:", ownerData);
          setOwnerData({
            name: `${ownerData.firstname} ${ownerData.lastname}`,
            email: ownerData.email,
            businessName: ownerData.businessName,
            phone: ownerData.phone || "Not specified",
            profileImage: ownerData.profileImage || "/default-avatar.png"
          });
          setSnackbar({
            open: true,
            message: "Profile loaded successfully",
            severity: "success",
          });
        } else {
          console.error("No data in response:", response.data);
          setError(response.data.message || "Failed to load owner data");
        }
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config
        });
        setError(err.response?.data?.message || "Error fetching owner data");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!ownerData) {
    return (
      <Container maxWidth="sm">
        <Alert severity="warning" sx={{ mt: 4 }}>
          No owner data found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            mb: 4,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Owner Profile
        </Typography>

        <StyledCard
          component={motion.div}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
              <StyledAvatar
                src={ownerData.profileImage || "/default-avatar.png"}
                alt={ownerData.name}
              />

              <Box width="100%" textAlign="center">
                <Typography variant="h5" gutterBottom>
                  {ownerData.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {ownerData.email}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Phone: {ownerData.phone}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Role: Owner
                </Typography>
              </Box>

              <Box width="100%" mt={3}>
                <Typography variant="h6" gutterBottom>
                  Parking Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Parkings: {ownerData.parkings?.length || 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OwnerProfile; 