import React, { useState } from 'react';

import { DataGrid } from "@mui/x-data-grid"; 

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  LinearProgress,

} from '@mui/material';
import {
  Menu as MenuIcon,
  LocalParking,
  DirectionsCar,
  People,
  Receipt,
  Timeline,
  Settings
} from '@mui/icons-material';

const drawerWidth = 240;

export const AdminDashBoard = () => {
  const [open, setOpen] = useState(true);
  const [parkingSpots] = useState([
    { id: 1, number: 'A1', status: 'available' },
    { id: 2, number: 'A2', status: 'occupied' },
    { id: 3, number: 'A3', status: 'reserved' },
    { id: 4, number: 'B1', status: 'available' },
    { id: 5, number: 'B2', status: 'maintenance' },
  ]);

  // Mock data
  const registeredVehicles = [
    { id: 1, plate: 'ABC-123', owner: 'John Doe', registered: '2023-01-15' },
    { id: 2, plate: 'XYZ-789', owner: 'Jane Smith', registered: '2023-02-20' },
  ];

  const dailyVisitors = [
    { id: 1, plate: 'ABC-123', checkIn: '08:30', checkOut: '17:45', duration: '9h 15m' },
    { id: 2, plate: 'XYZ-789', checkIn: '09:15', checkOut: '16:30', duration: '7h 15m' },
  ];

  const stats = {
    totalSpots: 150,
    available: 112,
    occupied: 38,
    dailyVisitors: 45,
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Parking Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Parking Spots', 'Visitors', 'Reports', 'Settings'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? <LocalParking /> :
                   index === 1 ? <DirectionsCar /> :
                   index === 2 ? <People /> :
                   index === 3 ? <Timeline /> : <Settings />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        {/* Statistics Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Spots</Typography>
                <Typography variant="h4">{stats.totalSpots}</Typography>
                <LinearProgress variant="determinate" value={(stats.occupied/stats.totalSpots)*100} />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Available</Typography>
                <Typography variant="h4" sx={{ color: '#4CAF50' }}>{stats.available}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Occupied</Typography>
                <Typography variant="h4" sx={{ color: '#F44336' }}>{stats.occupied}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Daily Visitors</Typography>
                <Typography variant="h4">{stats.dailyVisitors}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Parking Grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Parking Status</Typography>
              <Grid container spacing={2}>
                {parkingSpots.map((spot) => (
                  <Grid item xs={4} key={spot.id}>
                    <Card sx={{ 
                      bgcolor: getSpotColor(spot.status),
                      color: 'white',
                      textAlign: 'center',
                      py: 2
                    }}>
                      <Typography variant="h6">{spot.number}</Typography>
                      <Typography variant="caption">{spot.status}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Visitors */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>Today's Visitors</Typography>
              <DataGrid
                rows={dailyVisitors}
                columns={[
                  { field: 'plate', headerName: 'Plate', width: 150 },
                  { field: 'checkIn', headerName: 'Check-in', width: 150 },
                  { field: 'checkOut', headerName: 'Check-out', width: 150 },
                  { field: 'duration', headerName: 'Duration', width: 150 },
                ]}
                pageSize={5}
              />
            </Paper>
          </Grid>

          {/* Registered Vehicles */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Registered Vehicles</Typography>
              <DataGrid
                rows={registeredVehicles}
                columns={[
                  { field: 'plate', headerName: 'License Plate', width: 200 },
                  { field: 'owner', headerName: 'Owner', width: 200 },
                  { field: 'registered', headerName: 'Registration Date', width: 200 },
                ]}
                pageSize={5}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashBoard;