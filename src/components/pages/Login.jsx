import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      console.log('Login Submitted:', { email, password });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow p-3">

            <div className="card-body text-center">
              <h2 className="mb-4 text-center">Login</h2>


              <form onSubmit={handleSubmit}>
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
                    type="password"
                  className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`}


                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">

                  Login
                </button>
              </form>
              <p className="mt-3">
                Don't have an account? <Link to="/singup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
