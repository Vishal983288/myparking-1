import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParkingDetails = () => {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/getparkings');
      setParkings(res.data);
    } catch (error) {
      console.error("Error fetching parking data:", error);
    }
  };

  const handleBooking = async (parkingId) => {
    try {
      const userId = localStorage.getItem('userId') || 'sampleUserId';
      await axios.post('http://localhost:3000/reserve', { parkingId, userId });
      alert("Parking reserved successfully!");
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Failed to reserve parking. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Parking</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Parking Name</th>
            <th>State</th>
            <th>City</th>
            <th>Area</th>
            <th>Total Spots</th>
            <th>Parking Type</th>
            <th>Allowed Vehicles</th>
            <th>Hourly Rate</th>
            <th>Daily Rate</th>
            <th>Open Time</th>
            <th>Close Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parkings.map((parking) => (
            <tr key={parking._id}>
              <td>{parking.parkingName}</td>
              <td>{parking.state}</td>
              <td>{parking.city}</td>
              <td>{parking.area}</td>
              <td>{parking.totalSpots}</td>
              <td>{parking.parkingType}</td>
              <td>{parking.vehicleTypesAllowed.join(', ')}</td>
              <td>{parking.hourlyRate}</td>
              <td>{parking.dailyRate}</td>
              <td>{parking.openTime}</td>
              <td>{parking.closeTime}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBooking(parking._id)}
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParkingDetails;
