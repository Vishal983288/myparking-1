import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../../assets/HomePage.css'; // Custom CSS for additional styling

export const HomePage = () => {
  return (
    <div className="home-page">
  
      <section className="hero-section text-center py-5 bg-light">
        <div className="container">
          <h1 className="display-4 animate-fade-in">Welcome to My Parking System</h1>
          <p className="lead animate-fade-in animate-delay-1">
            Find, Reserve, and Navigate to Parking Spaces with Ease
          </p>
          <div className="mt-4 animate-fade-in animate-delay-2">
            <Link to="/search" className="btn btn-primary btn-lg me-3">
              Search Parking
            </Link>
            <Link to="/reserveslot" className="btn btn-success btn-lg">
              Reserve Slot
            </Link>
          </div>
        </div>
      </section>

     
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 animate-fade-in">Key Features</h2>
          <div className="row">
            <div className="col-md-4 text-center animate-slide-in-left">
              <div className="feature-item p-4 border rounded">
                <h3>Real-Time Availability</h3>
                <p>
                  Check the availability of parking slots in real-time and avoid
                  unnecessary delays.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center animate-slide-in-up">
              <div className="feature-item p-4 border rounded">
                <h3>Reservation System</h3>
                <p>
                  Reserve your parking slot in advance and ensure a hassle-free
                  experience.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center animate-slide-in-right">
              <div className="feature-item p-4 border rounded">
                <h3>Navigation Assistance</h3>
                <p>
                  Get step-by-step navigation to your reserved parking spot with
                  ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <footer className="footer bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2025 My Parking System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;