import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure correct import
import "../../assets/Login.css";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter and one number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      console.error("Form validation failed");
      return;
    }

    try {
      console.log("Submitting Login Request:", formData);
      const res = await axios.post("http://localhost:3000/api/user/login", formData);

      console.log("Full API Response:", res);
      if (res.status === 200) {
        const userData = res.data?.data;
        console.log("User Data:", userData);

        if (!userData || !userData._id) {
          console.error("Error: User data is missing or invalid.");
          alert("Login failed: User data missing.");
          return;
        }

        // Clear any existing login data
        localStorage.clear();
        
        // Set new user data
        localStorage.setItem("userid", userData._id);
        console.log("Stored UserID:", userData._id);

        if (userData.roleId?.name) {
          localStorage.setItem("role", userData.roleId.name);
          alert("Login successful");
          navigate(userData.roleId.name === "user" ? "/user/homepage" : "/owner");
        } else {
          console.error("Role ID missing");
          alert("Role not found.");
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input-field ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div>
          <button type="submit" className="submit-btn">Login</button>
        </div>
      </form>

      <p>Don't have an account? Click <Link to="/signup">here</Link></p>
      <p className="signup-link">
        Forgot password? <Link to="/resetpassword">Click here</Link>
      </p>
      <p className="signup-link">
        Login for Parking Owner? <Link to="/ownerlogin">Click here</Link>
      </p>
    </div>
  );
};

export default Login;
