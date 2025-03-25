import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Replace with actual user ID

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "50px auto" }} />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ maxWidth: 500, p: 3, textAlign: "center", boxShadow: 3 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            bgcolor: "primary.main",
          }}
        >
          {user?.firstname?.charAt(0)}
        </Avatar>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {user?.firstname} {user?.lastname}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Role ID: {user?.roleId}
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="body1" textAlign="left">
              <strong>Age:</strong> {user?.age}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {user?.phonenumber}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
