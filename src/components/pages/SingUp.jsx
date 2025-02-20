import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const SingUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!firstName) {
      newErrors.firstName = 'First Name is required';
    }

    // Last Name validation
    if (!lastName) {
      newErrors.lastName = 'Last Name is required';
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone Number must be 10 digits';
    }

    // City validation
    if (!city) {
      newErrors.city = 'City is required';
    }

    // Address validation
    if (!address) {
      newErrors.address = 'Address is required';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/;
      if (!passwordRegex.test(password)) {
        newErrors.password =
          'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign Up Submitted:', {
        firstName,
        lastName,
        email,
        phone,
        city,
        address,
        password
      });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow p-3">
            <div className="card-body text-center">
              <h2 className="mb-4 text-center">Sign Up</h2>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className={`form-control mb-2 ${errors.firstName ? 'is-invalid' : ''}`}
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className={`form-control mb-2 ${errors.lastName ? 'is-invalid' : ''}`}
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    className={`form-control mb-2 ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control mb-2 ${errors.city ? 'is-invalid' : ''}`}
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>

                <div className="mb-3">
                  <textarea
                    className={`form-control mb-2 ${errors.address ? 'is-invalid' : ''}`}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Sign Up
                </button>
              </form>
              <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
