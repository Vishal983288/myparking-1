import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Login.css";

export const OwnerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

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
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:3000/ownerlogin", formData);
      
      if (res.data.message === "Login successful") {
        const userData = res.data.data;
        localStorage.setItem("ownerId", userData._id);
        localStorage.setItem("role", "owner");
        localStorage.setItem("ownerName", userData.firstname);
        alert("Login successful");
        navigate("/owner");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h1>Owner Login</h1>
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

      <p className="signup-link">
        Don't have an account? <Link to="/ownersignup">Sign up</Link>
      </p>
      <p className="signup-link">
        Forget password? <Link to="/resetpassword">Click here</Link>
      </p>
      <p className="signup-link">
        For User Login <Link to="/login">Click here</Link>
      </p>
    </div>
  );
};

export default OwnerLogin;
