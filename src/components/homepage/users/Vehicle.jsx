import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Alert,
  Card,
} from "@mui/material";
import { motion } from "framer-motion";

export const Vehicle = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [userId, setUserId] = useState(null);
  const [vehicleType, setVehicleType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // ✅ Get userId from localStorage once when the component loads
  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setErrorMessage("User ID not found. Please log in again.");
    }
  }, []);

  // ✅ Handle form submission
  const submitHandler = async (data) => {
    try {
      if (!userId) {
        setErrorMessage("User ID is missing. Please log in again.");
        return;
      }

      // ✅ Attach userId and vehicleType to data
      const requestData = {
        ...data,
        userId,
        vehicleType,
      };

      console.log("🚀 Submitting Data:", requestData);

      // ✅ Send POST request
      const res = await axios.post("http://localhost:3000/addvehicle", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage("✅ Vehicle added successfully!");
      setErrorMessage(null);
      reset();
      setVehicleType(""); // Reset vehicleType after submission
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "❌ An error occurred");
      setSuccessMessage(null);
      console.error("Error adding vehicle:", error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 3, fontWeight: "bold", color: "#1976d2", textTransform: "uppercase", letterSpacing: 1 }}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Register Your Vehicle
          </Typography>

          {/* Error & Success Messages */}
          {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

          {/*  FORM STARTS HERE */}
          <form onSubmit={handleSubmit(submitHandler)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              
              {/*  Registration Number Input */}
              <TextField
                label="Registration Number"
                variant="outlined"
                fullWidth
                {...register("registrationNumber", { required: "Registration number is required" })}
              />

              {/*  Vehicle Type Select */}
              <FormControl fullWidth>
                <InputLabel>Vehicle Type</InputLabel>
                <Select
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value);
                    setValue("vehicleType", e.target.value); // Sync with react-hook-form
                  }}
                  required
                >
                  <MenuItem value="4 Wheeler">4 Wheeler</MenuItem>
                  <MenuItem value="2 Wheeler">2 Wheeler</MenuItem>
                </Select>
              </FormControl>

              {/*  Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Vehicle;
