// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";


// export const ReserveSlot = () => {
  

//   useEffect(() => {
   
//   }, []);

  

//   const { register, handleSubmit } = useForm();

//   const submitHandler = async (data) => {
//     data.userId = localStorage.getItem("id");
//     const res = await axios.post("http://localhost:3000/addReservetion/addreservetion", data);
//     console.log(res.data);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card p-4 shadow">
//             <h2 className="text-center mb-4">Reserve Slot</h2>
//             <form onSubmit={handleSubmit(submitHandler)}>

//               <div className="mb-3">
//                 <label className="form-label">Vehicle Type</label>
//                 <select className="form-select" {...register("vehicletype")}>
//                   <option value="4 Wheeler">4 Wheeler</option>
//                   <option value="2 Wheeler">2 Wheeler</option>
                  
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Hourly Charge</label>
//                 <select className="form-select" {...register("hourlycharge")}>
//                   <option value="4 Wheeler-100">4 Wheeler-100</option>
//                   <option value="2 Wheeler-70">2 Wheeler-70</option>
//                 </select>
//               </div>
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Start Time</label>
//                   <input type="time" className="form-control" {...register("starttime")} />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">End Time</label>
//                   <input type="time" className="form-control" {...register("endtime")} />
//                 </div>
//               </div>

//               <button type="submit" className="btn btn-primary w-100">Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
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
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reservation/active');

        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservations();
  }, []);

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
    } catch (error) {
      console.error('Reservation creation failed:',  error.response?.data || error.message);
    }
  };

  return (
    <div className="reservation-container" style={{paddingTop:"50px"}}>
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

              <div className="form-group">
                <label>Slot Number</label>
                <input
                  type="text"
                  name="slotNumber"
                  className="form-control"
                  value={formData.slotNumber}
                  onChange={handleInputChange}
                  required
                />
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
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

            {reservation.status === 'active' && (
              <div className="reservation-actions">
                <button className="btn btn-sm btn-warning">Modify</button>
                <button className="btn btn-sm btn-danger">Cancel</button>
                {reservation.paymentStatus === 'pending' && (
                  <button className="btn btn-sm btn-success">Pay Now</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReserveSlot;