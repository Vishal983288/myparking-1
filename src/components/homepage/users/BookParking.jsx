import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  MenuItem,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export const BookParking = ({
  open,
  onClose,
  parking,
  userId,
  vehicleList = [],
  refreshParkingData,
  onBookingSuccess,
}) => {
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingType, setBookingType] = useState("hourly");
  const [hours, setHours] = useState(1);
  const [days, setDays] = useState(1);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (vehicleId) {
      const selectedVehicle = vehicleList.find(v => v._id === vehicleId);
      setVehicleType(selectedVehicle ? selectedVehicle.vehicleType : "");
    }
  }, [vehicleId, vehicleList]);

  useEffect(() => {
    calculatePrice();
  }, [bookingType, hours, days, parking]);

  const calculatePrice = () => {
    if (!parking) return;
    const price = bookingType === "hourly" 
      ? parking.hourlyRate * hours 
      : parking.dailyRate * days;
    setTotalPrice(price);
  };

  const validateBooking = () => {
    if (!vehicleId) {
      setError("Please select a vehicle");
      return false;
    }
    if (!startTime) {
      setError("Please select start time");
      return false;
    }

    const start = new Date(startTime);
    const now = new Date();
    
    if (start < now) {
      setError("Start time cannot be in the past");
      return false;
    }

    const parkingOpen = new Date();
    const parkingClose = new Date();
    const [openHour, openMinute] = parking.openTime.split(":");
    const [closeHour, closeMinute] = parking.closeTime.split(":");
    
    parkingOpen.setHours(parseInt(openHour), parseInt(openMinute), 0);
    parkingClose.setHours(parseInt(closeHour), parseInt(closeMinute), 0);

    if (start.getHours() < parkingOpen.getHours() || 
        (start.getHours() === parkingOpen.getHours() && start.getMinutes() < parkingOpen.getMinutes())) {
      setError(`Parking opens at ${parking.openTime}`);
      return false;
    }

    const end = new Date(startTime);
    if (bookingType === "hourly") {
      end.setHours(end.getHours() + hours);
    } else {
      end.setDate(end.getDate() + days);
    }

    if (end.getHours() > parkingClose.getHours() || 
        (end.getHours() === parkingClose.getHours() && end.getMinutes() > parkingClose.getMinutes())) {
      setError(`Parking closes at ${parking.closeTime}`);
      return false;
    }

    return true;
  };

  const handleBooking = async () => {
    setError("");
    if (!validateBooking()) return;

    try {
      const endTime = new Date(startTime);
      if (bookingType === "hourly") {
        endTime.setHours(endTime.getHours() + hours);
      } else {
        endTime.setDate(endTime.getDate() + days);
      }

      const res = await axios.post("http://localhost:3000/addbooking", {
        userId,
        ownerparkingId: parking?._id,
        vehicleId,
        vehicleType,
        startTime,
        endTime: endTime.toISOString(),
        price: totalPrice,
        bookingType
      });

      const newBooking = res.data.data;
      onBookingSuccess(newBooking);
    } catch (error) {
      setError(error.response?.data?.message || "Error booking parking. Please try again.");
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Book Parking at {parking?.parkingname}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: "#f5f5f5" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body1">
                <AccessTimeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                {parking?.openTime} - {parking?.closeTime}
              </Typography>
              <Typography variant="body1">
                <DirectionsCarIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                {parking?.vehicleTypesAllowed.join(", ")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">
                Hourly Rate: ₹{parking?.hourlyRate}
              </Typography>
              <Typography variant="body1">
                Daily Rate: ₹{parking?.dailyRate}
              </Typography>
            </Box>
          </Paper>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Select Vehicle"
              select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              required
            >
              {vehicleList.map((vehicle) => (
                <MenuItem key={vehicle._id} value={vehicle._id}>
                  {vehicle.registrationNumber} - {vehicle.vehicleType}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Booking Type</FormLabel>
            <RadioGroup
              row
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
            >
              <FormControlLabel value="hourly" control={<Radio />} label="Hourly" />
              <FormControlLabel value="daily" control={<Radio />} label="Daily" />
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              label="Start Time"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            {bookingType === "hourly" ? (
              <TextField
                label="Hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(1, parseInt(e.target.value)))}
                inputProps={{ min: 1 }}
                sx={{ width: "120px" }}
              />
            ) : (
              <TextField
                label="Days"
                type="number"
                value={days}
                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value)))}
                inputProps={{ min: 1 }}
                sx={{ width: "120px" }}
              />
            )}
          </Box>

          <Paper elevation={0} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Total Price: ₹{totalPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bookingType === "hourly" 
                ? `${hours} hour${hours > 1 ? 's' : ''} × ₹${parking?.hourlyRate}`
                : `${days} day${days > 1 ? 's' : ''} × ₹${parking?.dailyRate}`}
            </Typography>
          </Paper>
        </motion.div>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button 
          onClick={handleBooking} 
          variant="contained" 
          color="primary"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1
          }}
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookParking;
