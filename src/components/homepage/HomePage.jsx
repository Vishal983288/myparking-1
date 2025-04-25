import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent, Box, Grid, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { Phone, Email, LocationOn, Search, CalendarToday, Directions, Security, Speed, Support } from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const HomePage = () => {
  const features = [
    { 
      icon: <Search fontSize="large" />, 
      title: "Real-Time Availability", 
      desc: "Check the availability of parking slots in real-time with our advanced tracking system." 
    },
    { 
      icon: <CalendarToday fontSize="large" />, 
      title: "Reservation System", 
      desc: "Reserve your parking slot in advance and never worry about finding a spot again." 
    },
    { 
      icon: <Directions fontSize="large" />, 
      title: "Navigation Assistance", 
      desc: "Get step-by-step navigation to your reserved spot with our integrated maps." 
    },
    { 
      icon: <Security fontSize="large" />, 
      title: "Secure Parking", 
      desc: "24/7 surveillance and security measures to ensure your vehicle's safety." 
    },
    { 
      icon: <Speed fontSize="large" />, 
      title: "Quick Check-in", 
      desc: "Fast and hassle-free check-in process with our automated system." 
    },
    { 
      icon: <Support fontSize="large" />, 
      title: "24/7 Support", 
      desc: "Round-the-clock customer support to assist you with any parking needs." 
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "100+", label: "Parking Locations" },
    { number: "24/7", label: "Customer Support" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Parking Usage',
        data: [65, 59, 80, 81, 56, 85],
        borderColor: '#3498db',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Parking Usage',
      },
    },
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box sx={{ backgroundColor: "#2D336B", minHeight: "100vh", color: "white" }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Welcome to My Parking
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }} align="center">
            Find, Reserve, and Navigate to Parking Spaces with Ease
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                component={Link} 
                to="/user/searchparking" 
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#3498db',
                  '&:hover': {
                    backgroundColor: '#2980b9',
                  }
                }}
              >
                Search Parking
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: "#3A437A", py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6 }}>
              Key Features
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        backgroundColor: '#7886C7',
                        color: 'white',
                        p: 3,
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#8a96d1',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                          <motion.div variants={iconVariants}>
                            {feature.icon}
                          </motion.div>
                          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{feature.title}</Typography>
                          <Typography variant="body1">{feature.desc}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Paper 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center',
                        backgroundColor: '#34495e',
                        color: 'white',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#3d566e',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{stat.number}</Typography>
                      <Typography variant="h6">{stat.label}</Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Usage Chart Section */}
      <Box sx={{ backgroundColor: "#3A437A", py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Paper 
              sx={{ 
                p: 4, 
                backgroundColor: '#34495e',
                color: 'white',
                borderRadius: 3
              }}
            >
              <Typography variant="h4" gutterBottom align="center">
                Parking Usage Analytics
              </Typography>
              <Box sx={{ height: 400, mt: 4 }}>
                <Line data={chartData} options={chartOptions} />
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Typography variant="h3" gutterBottom align="center">
              Contact Us
            </Typography>
            <Box sx={{ mt: 4 }}>
              {[
                { icon: <Phone />, text: "+91 85733 78375" },
                { icon: <Email />, text: "support@myparking.com" },
                { icon: <LocationOn />, text: "Near Sarkhej Road, Ahmedabad, India" },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                >
                  <Paper 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      backgroundColor: '#34495e',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#3d566e',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    {contact.icon}
                    <Typography variant="body1">{contact.text}</Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
