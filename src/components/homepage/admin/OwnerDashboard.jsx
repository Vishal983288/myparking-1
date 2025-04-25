import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { 
  Box, 
  Paper, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress,
  useTheme,
  styled,
  keyframes,
  CircularProgress
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #34495e, #f0f0f0)',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  animation: `${fadeIn} 0.5s ease-out`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '15px',
  background: 'linear-gradient(145deg, #34495e, #f0f0f0)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  animation: `${fadeIn} 0.5s ease-out`,
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const OwnerDashboard = () => {
  const theme = useTheme();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [dailyVisitors, setDailyVisitors] = useState([]);
  const [stats, setStats] = useState({
    totalSpots: 0,
    available: 0,
    occupied: 0,
    dailyVisitors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleRefresh = () => fetchDashboardData();
    window.addEventListener('refreshDashboard', handleRefresh);
    return () => window.removeEventListener('refreshDashboard', handleRefresh);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const ownerId = localStorage.getItem('ownerId');
      console.log('Debug - Owner ID:', ownerId);

      if (!ownerId) {
        throw new Error('Please login again to view the dashboard.');
      }

      // Correct API endpoint
      console.log('Fetching parkings for owner:', ownerId);
      const parkingRes = await axios.get(`http://localhost:3000/owner/ownergetparkings/${ownerId}`);
      console.log('Parking API Response:', parkingRes.data);

      if (!parkingRes.data || !parkingRes.data.data) {
        console.error('Invalid parking data:', parkingRes.data);
        throw new Error('Failed to fetch parking data');
      }

      const parkings = parkingRes.data.data;
      console.log('Fetched parkings:', parkings);

      // Get active bookings for all parking spots
      const now = new Date();
      const activeBookingsRes = await axios.get('http://localhost:3000/getactivebookings', {
        params: {
          ownerId: ownerId,
          currentTime: now.toISOString()
        }
      });
      console.log('Active Bookings Response:', activeBookingsRes.data.data);

      // Create a map of parking ID to active bookings count
      const activeBookingsMap = {};
      if (activeBookingsRes.data && activeBookingsRes.data.data) {
        activeBookingsRes.data.data.forEach(booking => {
          const parkingId = booking.ownerparkingId;
          activeBookingsMap[parkingId] = (activeBookingsMap[parkingId] || 0) + 1;
        });
      }

      const spots = parkings.map(parking => {
        const totalSpots = (parking.totalCapacityTwoWheeler || 0) + (parking.totalCapacityFourWheeler || 0);
        const activeBookings = activeBookingsMap[parking._id] || 0;
        const availableSpots = Math.max(0, totalSpots - activeBookings);

        return {
          id: parking._id,
          number: parking.parkingname,
          status: parking.status === 'Approved' ? 'available' : parking.status.toLowerCase(),
          totalSpots: totalSpots,
          availableSpots: availableSpots,
          twoWheelerCapacity: parking.totalCapacityTwoWheeler,
          fourWheelerCapacity: parking.totalCapacityFourWheeler,
          activeBookings: activeBookings
        };
      });
      
      console.log('Processed parking spots:', spots);
      setParkingSpots(spots);

      // Calculate total statistics across all parking spots
      const totalSpots = spots.reduce((sum, spot) => sum + spot.totalSpots, 0);
      const occupied = spots.reduce((sum, spot) => sum + spot.activeBookings, 0);
      const available = totalSpots - occupied;

      setStats({
        totalSpots,
        available,
        occupied,
        dailyVisitors: stats.dailyVisitors // Keep existing daily visitors count
      });

      // Get today's bookings
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      try {
        const visitorsRes = await axios.get('http://localhost:3000/getdailyvisitors', {
          params: {
            ownerId: ownerId,
            startDate: today.toISOString(),
            endDate: tomorrow.toISOString()
          }
        });
        console.log('Visitors API Response:', visitorsRes.data);

        if (!visitorsRes.data || !visitorsRes.data.success) {
          throw new Error(visitorsRes.data?.message || 'Failed to fetch visitors data');
        }

        const visitors = (visitorsRes.data.data || []).map(visitor => ({
          id: visitor._id || Math.random().toString(),
          plate: visitor.vehicleId?.registrationNumber || 'Unknown',
          checkIn: new Date(visitor.startTime).toLocaleTimeString(),
          checkOut: visitor.endTime ? new Date(visitor.endTime).toLocaleTimeString() : 'Still Parked',
          duration: calculateDuration(visitor.startTime, visitor.endTime)
        }));

        setDailyVisitors(visitors);
        setStats(prevStats => ({
          ...prevStats,
          dailyVisitors: visitors.length
        }));
      } catch (visitorError) {
        console.error('Error fetching visitors:', visitorError);
        setDailyVisitors([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Dashboard Error:', error);
      setError(error.message || 'Failed to load dashboard data');
      setLoading(false);
    }
  };

  const calculateDuration = (startTime, endTime) => {
    if (!endTime) return 'Still Parked';
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getSpotColor = (status) => {
    const colors = {
      available: '#4CAF50',
      occupied: '#F44336',
      reserved: '#FFC107',
      maintenance: '#9E9E9E'
    };
    return colors[status] || '#000';
  };

  const pieChartData = [
    { name: 'Available', value: stats.available },
    { name: 'Occupied', value: stats.occupied },
  ];

  if (loading) {
    return (
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6">Loading dashboard data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        gap: 2
      }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Typography variant="body1">Please try refreshing the page or contact support if the issue persists.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3,paddingTop:6 }}>
      <Typography variant="h4" sx={{ mb: 4, color: theme.palette.primary.main, fontWeight: 'bold' }}>
        Owner Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <StyledCard sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>Total Spots</Typography>
            <Typography variant="h3" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              {stats.totalSpots}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(stats.occupied / stats.totalSpots) * 100}
              sx={{ 
                height: 10, 
                borderRadius: 5, 
                mt: 2,
                backgroundColor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                }
              }}
            />
          </CardContent>
        </StyledCard>
        
        <StyledCard sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>Available</Typography>
            <Typography variant="h3" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
              {stats.available}
            </Typography>
          </CardContent>
        </StyledCard>

        <StyledCard sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>Occupied</Typography>
            <Typography variant="h3" sx={{ color: '#F44336', fontWeight: 'bold' }}>
              {stats.occupied}
            </Typography>
          </CardContent>
        </StyledCard>

        <StyledCard sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>Today's Visitors</Typography>
            <Typography variant="h3" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
              {stats.dailyVisitors}
            </Typography>
          </CardContent>
        </StyledCard>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <StyledPaper sx={{ flex: 1, minWidth: 400 }}>
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            Parking Status
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {parkingSpots.map((spot) => (
              <motion.div
                key={spot.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card sx={{
                  bgcolor: getSpotColor(spot.status),
                  color: 'white',
                  textAlign: 'center',
                  py: 2,
                  px: 3,
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}>
                  <Typography variant="h6">{spot.number}</Typography>
                  <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                    {spot.status}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </StyledPaper>

        <StyledPaper sx={{ flex: 1, minWidth: 400 }}>
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            Parking Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </StyledPaper>
      </Box>

      <StyledPaper sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Today's Visitors
        </Typography>
        <DataGrid
          rows={dailyVisitors}
          columns={[
            { field: 'plate', headerName: 'Plate', width: 150 },
            { field: 'checkIn', headerName: 'Check-in', width: 150 },
            { field: 'checkOut', headerName: 'Check-out', width: 150 },
            { field: 'duration', headerName: 'Duration', width: 150 },
          ]}
          pageSize={5}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 1)',
            },
          }}
        />
      </StyledPaper>
    </Box>
  );
};

export default OwnerDashboard; 