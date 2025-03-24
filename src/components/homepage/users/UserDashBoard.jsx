import React, { useState } from 'react';
import '../../../assets/UserDashboard.css';

 export const UserDashBoard = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Sample data
  const activeReservations = [
    {
      id: 1,
      location: 'Navrangpura',
      slot: 'B-23',
      date: '2023-08-15',
      startTime: '14:00',
      endTime: '18:00',
      price: '₹100.00'
    },
    // Add more sample data
  ];

  const pastReservations = [
    {
      id: 2,
      location: 'Central Mall Parking',
      slot: 'A-12',
      date: '2023-08-10',
      startTime: '10:00',
      endTime: '14:00',
      price: '₹100.00'
    },
    // Add more sample data
  ];

  return (
    <div className="dashboard-container" style={{paddingTop:"50px"}}>
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <h1>Welcome Back, User</h1>
            <div className="navigation-help">
              <button className="btn btn-primary">
                <i className="bi bi-geo-alt"></i> Navigation Assistance
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container main-content">
        <div className="reservation-tabs">
          <button 
            className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Reservations ({activeReservations.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History ({pastReservations.length})
          </button>
        </div>

        {activeTab === 'active' ? (
          <div className="active-reservations">
            {activeReservations.map(reservation => (
              <div key={reservation.id} className="reservation-card">
                <div className="reservation-info">
                  <h3>{reservation.location}</h3>
                  <div className="details-grid">
                    <div>
                      <label>Slot Number</label>
                      <p>{reservation.slot}</p>
                    </div>
                    <div>
                      <label>Date</label>
                      <p>{reservation.date}</p>
                    </div>
                    <div>
                      <label>Time</label>
                      <p>{reservation.startTime} - {reservation.endTime}</p>
                    </div>
                    <div>
                      <label>Price</label>
                      <p>{reservation.price}</p>
                    </div>
                  </div>
                </div>
                <div className="reservation-actions">
                  <button 
                    className="btn btn-warning"
                    onClick={() => {
                      setSelectedReservation(reservation);
                      setShowEditModal(true);
                    }}
                  >
                    Modify
                  </button>
                  <button className="btn btn-danger">Cancel</button>
                  <button className="btn btn-primary">
                    <i className="bi bi-qr-code"></i> Show QR
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="past-reservations">
            {pastReservations.map(reservation => (
              <div key={reservation.id} className="history-card">
                <div className="history-info">
                  <h4>{reservation.location}</h4>
                  <p>{reservation.date} • {reservation.startTime}-{reservation.endTime}</p>
                  <p className="slot-number">Slot {reservation.slot}</p>
                </div>
                <div className="history-price">
                  {reservation.price}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Reservation Modal */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="edit-modal">
              <h2>Modify Reservation</h2>
              <form>
                <div className="form-group">
                  <label>New Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label>New Time Slot</label>
                  <select className="form-select">
                    <option>14:00 - 18:00</option>
                    <option>15:00 - 19:00</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashBoard;
