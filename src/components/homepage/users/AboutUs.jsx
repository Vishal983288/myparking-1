import React from "react";
import { Container, Typography, Card, CardContent, Box, Grid, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { 
  Speed, 
  Security, 
  Support, 
  Directions, 
  CalendarToday, 
  Search,
  TrendingUp,
  People,
  Business
} from "@mui/icons-material";

export const AboutUs = () => {
  const features = [
    {
      icon: <Speed fontSize="large" />,
      title: "Fast & Efficient",
      content: "Quick parking spot finding and reservation system that saves your valuable time."
    },
    {
      icon: <Security fontSize="large" />,
      title: "Secure Parking",
      content: "24/7 surveillance and security measures to ensure your vehicle's safety."
    },
    {
      icon: <Support fontSize="large" />,
      title: "24/7 Support",
      content: "Round-the-clock customer support to assist you with any parking needs."
    },
    {
      icon: <Directions fontSize="large" />,
      title: "Smart Navigation",
      content: "Get step-by-step navigation to your reserved parking spot."
    },
    {
      icon: <CalendarToday fontSize="large" />,
      title: "Easy Booking",
      content: "Simple and hassle-free reservation system for your parking needs."
    },
    {
      icon: <Search fontSize="large" />,
      title: "Real-time Updates",
      content: "Live updates on parking availability and slot status."
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Company Founded",
      description: "MyParking was established with a vision to revolutionize urban parking."
    },
    {
      year: "2026",
      title: "First Location",
      description: "Opened our first smart parking facility in Ahmedabad."
    },
    {
      year: "2027",
      title: "Mobile App Launch",
      description: "Launched our mobile application for seamless parking management."
    },
    {
      year: "2028",
      title: "Expansion",
      description: "Expanded to multiple cities across India."
    }
  ];

  const stats = [
    { icon: <People fontSize="large" />, number: "50,000+", label: "Happy Customers" },
    { icon: <Business fontSize="large" />, number: "100+", label: "Parking Locations" },
    { icon: <TrendingUp fontSize="large" />, number: "95%", label: "Customer Satisfaction" }
  ];

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
    <Box sx={{ backgroundColor: "#2c3e50", minHeight: "100vh", color: "white" }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            About My Parking
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }} align="center">
            A smart solution to optimize urban parking management
          </Typography>
        </motion.div>

        {/* Features Section */}
        <Box sx={{ backgroundColor: "#3A437A", py: 8, borderRadius: 3, mb: 6 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6 }}>
                Our Features
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
                            <Typography variant="body1">{feature.content}</Typography>
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

        {/* Milestones Section */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6 }}>
              Our Journey
            </Typography>
            <Grid container spacing={4}>
              {milestones.map((milestone, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <Paper 
                      sx={{ 
                        p: 3, 
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
                      <Typography variant="h4" color="primary" sx={{ mb: 1 }}>{milestone.year}</Typography>
                      <Typography variant="h5" sx={{ mb: 2 }}>{milestone.title}</Typography>
                      <Typography variant="body1">{milestone.description}</Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Stats Section */}
        <Box sx={{ backgroundColor: "#3A437A", py: 8, borderRadius: 3 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6 }}>
                By The Numbers
              </Typography>
              <Grid container spacing={4}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover="hover"
                      variants={cardVariants}
                    >
                      <Paper 
                        sx={{ 
                          p: 3, 
                          backgroundColor: '#7886C7',
                          color: 'white',
                          borderRadius: 3,
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#8a96d1',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                          }
                        }}
                      >
                        <motion.div variants={iconVariants}>
                          {stat.icon}
                        </motion.div>
                        <Typography variant="h3" sx={{ mt: 2, fontWeight: 'bold' }}>{stat.number}</Typography>
                        <Typography variant="h6">{stat.label}</Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
