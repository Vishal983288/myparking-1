import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Container,
  InputBase,
  Chip,
  Grid,
  Paper,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import BookParking from "./BookParking";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import InfoIcon from "@mui/icons-material/Info";

export const SearchParking = () => {
  const [parkingData, setParkingData] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);
  const [userId, setUserId] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Debounce logic
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch parking data
  const fetchParkingData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/owner/ownergetallparkings");
      setParkingData(res.data.data);
    } catch (error) {
      console.error("Error fetching parking data:", error);
    }
  };

  // Fetch user vehicles
  const fetchUserVehicles = async () => {
    try {
      const user = localStorage.getItem("userid");
      if (!user) return;
      setUserId(user);
      const res = await axios.get(`http://localhost:3000/getvehiclebyuserid/${user}`);
      setVehicleList(res.data.data);
    } catch (error) {
      console.error("Error fetching user vehicles:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchParkingData();
    fetchUserVehicles();
  }, []);

  const handleBookClick = (parking) => {
    if (vehicleList.length === 0) {
      alert("⚠️ No registered vehicles found. Please add a vehicle before booking.");
      return;
    }
    setSelectedParking(parking);
  };

  const handleBookingSuccess = (newBooking) => {
    fetchParkingData();
    setSelectedParking(null);
    alert("Booking successful! Check your dashboard for details.");
  };

  const filteredParkings = useMemo(() => {
    return parkingData.filter((parking) => {
      const values = [
        parking.parkingname,
        parking.area,
        parking.city,
        parking.state,
        ...parking.vehicleTypesAllowed,
      ]
        .join(" ")
        .toLowerCase();
      return values.includes(debouncedSearchText.toLowerCase());
    });
  }, [parkingData, debouncedSearchText]);

  const highlightMatch = (text) => {
    if (!debouncedSearchText) return text;
    const regex = new RegExp(`(${debouncedSearchText})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "yellow", color: "black" }}>{part}</span>
      ) : (
        part
      )
    );
  };

  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ 
            mb: 4, 
            fontWeight: "bold", 
            color: "#1976d2",
            textTransform: "uppercase",
            letterSpacing: 2
          }}
        >
          Available Parkings
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            backgroundColor: "#f5f5f5"
          }}
        >
          <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
          <InputBase
            placeholder="Search by name, location, or vehicle type..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            sx={{ fontSize: "1.1rem" }}
          />
        </Paper>
      </motion.div>

      <Grid container spacing={3}>
        {filteredParkings.length > 0 ? (
          filteredParkings.map((parking, index) => {
            const isFull = parking.totalCapacityTwoWheeler === 0 && parking.totalCapacityFourWheeler === 0;
            const availableTwoWheeler = parking.totalCapacityTwoWheeler > 0;
            const availableFourWheeler = parking.totalCapacityFourWheeler > 0;

            return (
              <Grid item xs={12} md={6} key={parking._id}>
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: 6,
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          {highlightMatch(parking.parkingname)}
                        </Typography>
                        <Chip
                          label={isFull ? "Full" : "Available"}
                          color={isFull ? "error" : "success"}
                          size="small"
                        />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography color="text.secondary">
                          {highlightMatch(`${parking.area}, ${parking.city}, ${parking.state}`)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <AccessTimeIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography color="text.secondary">
                          {parking.openTime} - {parking.closeTime}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <Tooltip title="Two-Wheeler Slots">
                          <Chip
                            icon={<TwoWheelerIcon />}
                            label={`${parking.totalCapacityTwoWheeler} slots`}
                            color={availableTwoWheeler ? "primary" : "default"}
                            variant={availableTwoWheeler ? "filled" : "outlined"}
                          />
                        </Tooltip>
                        <Tooltip title="Four-Wheeler Slots">
                          <Chip
                            icon={<DirectionsCarIcon />}
                            label={`${parking.totalCapacityFourWheeler} slots`}
                            color={availableFourWheeler ? "primary" : "default"}
                            variant={availableFourWheeler ? "filled" : "outlined"}
                          />
                        </Tooltip>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <InfoIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Hourly Rate: ₹{parking.hourlyRate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <InfoIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Daily Rate: ₹{parking.dailyRate}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        Allowed Vehicles: {highlightMatch(parking.vehicleTypesAllowed.join(", "))}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                      <Button
                        variant="contained"
                        color={isFull ? "error" : "primary"}
                        disabled={isFull}
                        onClick={() => handleBookClick(parking)}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          px: 3,
                          py: 1
                        }}
                      >
                        {isFull ? "Full" : "Book Now"}
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "#f5f5f5"
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No parking spaces found matching your search.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {selectedParking && (
        <BookParking
          open={!!selectedParking}
          onClose={() => setSelectedParking(null)}
          parking={selectedParking}
          userId={userId}
          vehicleList={vehicleList}
          refreshParkingData={fetchParkingData}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </Container>
  );
};

export default SearchParking;