import React from "react";
import { Container, Typography, Card, CardContent, Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Phone, Email, LocationOn, Business, AccessTime, People } from "@mui/icons-material";
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

export const Contact = () => {
  const contactDetails = [
    { icon: <Phone fontSize="large" />, text: "+91 74456 97890" },
    { icon: <Email fontSize="large" />, text: "support@myparking.com" },
    { icon: <LocationOn fontSize="large" />, text: "Near Sarkhej, Ahmedabad, India" },
  ];

  const companyStats = [
    { icon: <Business fontSize="large" />, title: "Established", value: "2025" },
    { icon: <People fontSize="large" />, title: "Happy Customers", value: "10,000+" },
    { icon: <AccessTime fontSize="large" />, title: "24/7 Support", value: "Always Available" },
  ];

  const chartData = {
    labels: ['2025', '2026', '2027', '2028', '2029'],
    datasets: [
      {
        label: 'Customer Growth',
        data: [2000, 4000, 6000, 8000, 10000],
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
        text: 'Customer Growth Over Years',
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
    <Box sx={{ backgroundColor: "#2c3e50", minHeight: "100vh", py: 5, color: "white" }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h3" gutterBottom align="center">
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }} align="center">
            Get in touch with us for any inquiries or support.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {contactDetails.map((contact, index) => (
              <motion.div 
                key={index} 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: index * 0.3 }}
                whileHover="hover"
                variants={cardVariants}
              >
                <Card 
                  sx={{ 
                    backgroundColor: "#34495e", 
                    color: "white", 
                    p: 3, 
                    borderRadius: 3, 
                    my: 2,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#3d566e",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                    }
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <motion.div variants={iconVariants}>
                        {contact.icon}
                      </motion.div>
                      <Typography variant="h6">{contact.text}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Paper 
                sx={{ 
                  p: 3, 
                  backgroundColor: "#34495e", 
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#3d566e",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                  }
                }}
              >
                <Typography variant="h5" gutterBottom>About Our Company</Typography>
                <Typography paragraph>
                  MyParking is a leading parking management solution provider, dedicated to making urban parking more efficient and user-friendly. Since our establishment in 2025, we've been revolutionizing the way people park their vehicles.
                </Typography>
                <Typography paragraph>
                  Our mission is to reduce parking-related stress and contribute to smarter city planning through innovative technology solutions.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.01 }}
            >
              <Paper 
                sx={{ 
                  p: 3, 
                  backgroundColor: "#34495e", 
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#3d566e",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                  }
                }}
              >
                <Typography variant="h5" gutterBottom align="center">Our Growth</Typography>
                <Box sx={{ height: 300 }}>
                  <Line data={chartData} options={chartOptions} />
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.9 }}
            >
              <Grid container spacing={3}>
                {companyStats.map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <motion.div
                      whileHover="hover"
                      variants={cardVariants}
                    >
                      <Card 
                        sx={{ 
                          backgroundColor: "#34495e", 
                          color: "white", 
                          p: 3, 
                          height: "100%",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#3d566e",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                          }
                        }}
                      >
                        <CardContent>
                          <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                            <motion.div variants={iconVariants}>
                              {stat.icon}
                            </motion.div>
                            <Typography variant="h6" sx={{ mt: 1 }}>{stat.title}</Typography>
                            <Typography variant="h4" sx={{ mt: 1 }}>{stat.value}</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
