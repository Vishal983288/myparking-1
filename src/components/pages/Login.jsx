import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    if (!validateForm()) return;
    
    try {
      const res = await axios.post("http://localhost:3000/user/login", formData);
      console.log("Response Data:", res.data); // Debugging step
    
      if (res.status === 200) {
        alert("Login successful");
    
        const userData = res.data.data;
        
        if (!userData) {
          console.error("User data is undefined");
          return;
        }
    
        localStorage.setItem("id", userData._id);
    
        if (userData.roleId && userData.roleId.name) {
          localStorage.setItem("role", userData.roleId.name);
          if (userData.roleId.name === "user") {
            navigate("/user");
          } else if (userData.roleId.name === "parkingowner") {
            navigate("/parkingowner");
          }
        } else {
          console.error("roleId or roleId.name is undefined");
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error);
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
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p className="signup-link">
        Forget password <Link to="/resetpassword">Here</Link>
      </p>
    </div>
  );
};

export default Login;
