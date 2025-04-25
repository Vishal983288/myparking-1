import React, { useState, useEffect } from 'react';
import '../../../assets/reserveSlot.css';
import axios from 'axios';

export const ReserveSlot = () => {
  const [showForm, setShowForm] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    vehicleType: '4 Wheeler',
    hourlyCharge: '4 Wheeler-100',
    slotNumber: '',
    startTime: '',
    endTime: ''
  });

  // Fetch reservations on component mount
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reservation/active');
      setReservations(response.data.sort((a, b) => new Date(b.startTime) - new Date(a.startTime)));
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'vehicleType') {
      setFormData({
        ...formData,
        vehicleType: value,
        hourlyCharge: value === '4 Wheeler' ? '4 Wheeler-100' : '2 Wheeler-70'
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/reservation/create', formData);
      setReservations([...reservations, response.data]);
      setShowForm(false);
      fetchReservations(); // Refresh list dynamically
    } catch (error) {
      console.error('Reservation creation failed:', error.response?.data || error.message);
      alert("Failed to book slot. Try again later.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/reservation/cancel/${id}`);
      setReservations(reservations.filter((res) => res._id !== id));
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert("Error canceling reservation.");
    }
  };

  const handlePayment = async (id) => {
    try {
      await axios.post(`http://localhost:3000/reservation/pay/${id}`);
      setReservations(
        reservations.map((res) =>
          res._id === id ? { ...res, paymentStatus: 'paid' } : res
        )
      );
    } catch (error) {
      console.error('Payment failed:', error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="reservation-container" style={{ paddingTop: "50px" }}>
      <div className="header">
        <h2>Parking Reservations</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          New Reservation
        </button>
      </div>

      {/* Reservation Form Modal */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="reservation-modal">
            <h3>Create New Reservation</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vehicle Type</label>
                <select
                  name="vehicleType"
                  className="form-control"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="4 Wheeler">4 Wheeler</option>
                  <option value="2 Wheeler">2 Wheeler</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hourly Charge</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.hourlyCharge}
                  readOnly
                />
              </div>

              {/* Slot Number Dropdown */}
              <div className="form-group">
                <label>Slot Number</label>
                <select
                  name="slotNumber"
                  className="form-control"
                  value={formData.slotNumber}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Slot</option>
                  <option value="A-1">A-1</option>
                  <option value="A-2">A-2</option>
                  <option value="B-1">B-1</option>
                  <option value="B-2">B-2</option>
                </select>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="datetime-local"
                      name="startTime"
                      className="form-control"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="datetime-local"
                      name="endTime"
                      className="form-control"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Book Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reservations List */}
      <div className="reservation-list">
        {reservations.map(reservation => (
          <div key={reservation._id} className="reservation-card">
            <div className="reservation-header">
              <h4>Slot {reservation.slotNumber}</h4>
              <span className={`status-badge ${reservation.status}`}>
                {reservation.status}
              </span>
            </div>

            <div className="reservation-details">
              <div className="detail-item">
                <label>Vehicle Type:</label>
                <span>{reservation.vehicleType}</span>
              </div>
              <div className="detail-item">
                <label>Rate:</label>
                <span>${reservation.hourlyCharge.split('-')[1]}/hour</span>
              </div>
              <div className="detail-item">
                <label>Duration:</label>
                <span>
                  {new Date(reservation.startTime).toLocaleString()} - 
                  {new Date(reservation.endTime).toLocaleString()}
                </span>
              </div>
              <div className="detail-item">
                <label>Payment Status:</label>
                <span className={`payment-status ${reservation.paymentStatus}`}>
                  {reservation.paymentStatus}
                </span>
              </div>
            </div>

            <div className="reservation-actions">
              <button className="btn btn-sm btn-warning">Modify</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleCancel(reservation._id)}>Cancel</button>
              {reservation.paymentStatus === 'pending' && (
                <button className="btn btn-sm btn-success" onClick={() => handlePayment(reservation._id)}>Pay Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReserveSlot;
