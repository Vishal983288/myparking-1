import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Box,
  InputBase,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import BookParking from "./BookParking";

export const UserDashBoard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [reservations, setReservations] = useState({ active: [], history: [] });
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [userId, setUserId] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchText), 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  const fetchReservations = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`http://localhost:3000/getbookingbyid/${userId}`);
      const allReservations = res.data.data;
      const now = new Date();
      setReservations({
        active: allReservations.filter((res) => new Date(res.endTime) > now),
        history: allReservations.filter((res) => new Date(res.endTime) <= now),
      });
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchVehicleList = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/getvehiclebyuserid/${userId}`);
      setVehicleList(res.data.data);
    } catch (error) {
      console.error("Error fetching vehicle list:", error);
    }
  };

  const handleCancel = async (bookingId, startTime) => {
    const now = new Date();
    const bookingStart = new Date(startTime);
    if (bookingStart <= now) {
      alert("You can't cancel the booking after the start time.");
      return;
    }
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`http://localhost:3000/cancelbooking/${bookingId}`);
        alert("Booking cancelled successfully.");
        fetchReservations();
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReservations();
      fetchVehicleList();
      const interval = setInterval(fetchReservations, 60000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  const handleBookingSuccess = (newBooking) => {
    setReservations((prev) => ({
      ...prev,
      active: [...prev.active, newBooking],
    }));
  };

  const handleBookClick = () => {
    setSelectedParking({ _id: "demoParkingId", parkingname: "Demo Parking Lot" });
    setOpenBooking(true);
  };

  const highlightMatch = (text, keyword) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const filteredReservations = useMemo(() => {
    return reservations[activeTab].filter((res) => {
      const vehicleNumber = res.vehicleId?.registrationNumber || "";
      const parkingName = res.ownerparkingId?.parkingname || res.parkingname || "";
      return (
        vehicleNumber.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        parkingName.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });
  }, [reservations, activeTab, debouncedSearch]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}>
        Your Reservations
      </Typography>

      <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)} centered sx={{ mb: 3 }}>
        <Tab label={`Active (${reservations.active.length})`} value="active" />
        <Tab label={`History (${reservations.history.length})`} value="history" />
      </Tabs>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <InputBase
          placeholder="Search reservations..."
          
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ backgroundColor: "white", px: 2, py: 0.5, borderRadius: 2, boxShadow: 8 }}
        />
        <Button variant="contained" color="primary" onClick={handleBookClick}>
          Book New Parking
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {filteredReservations.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No reservations found.
          </Typography>
        ) : (
          filteredReservations.map((reservation) => (
            <Card
              key={reservation._id || reservation.id}
              sx={{ boxShadow: 3, borderRadius: 3 }}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardContent>
                <Typography variant="h6">
                  📍 {highlightMatch(reservation.ownerparkingId?.area || reservation.parkingname || "", debouncedSearch)}
                </Typography>
                <Typography color="text.secondary">
                  Parking Name: {highlightMatch(reservation.ownerparkingId?.parkingname || reservation.parkingname || "", debouncedSearch)}
                </Typography>
                <Typography color="text.secondary">Slot: {reservation.slot}</Typography>
                <Typography color="text.secondary">
                  🚗 Vehicle Number: {highlightMatch(reservation.vehicleId?.registrationNumber || "", debouncedSearch)}
                </Typography>
                <Typography color="text.secondary">🚗 Vehicle Type: {reservation.vehicleId?.vehicleType}</Typography>
                <Typography color="text.secondary">
                  ⏰ {reservation.startTime} - {reservation.endTime}
                </Typography>
                <Typography color="text.secondary">💰 {reservation.price || "N/A"}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                {activeTab === "active" && (
                  <Button variant="contained" color="secondary" onClick={() => handleCancel(reservation._id, reservation.startTime)}>
                    Cancel
                  </Button>
                )}
                <Button variant="contained" color="primary">Show QR</Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      {selectedParking && (
        <BookParking
          open={openBooking}
          onClose={() => setOpenBooking(false)}
          parking={selectedParking}
          userId={userId}
          vehicleList={vehicleList}
          refreshParkingData={fetchReservations}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </Container>
  );
};

export default UserDashBoard;
