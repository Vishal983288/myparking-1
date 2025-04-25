import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../assets/Signup.css";
import { Link } from "react-router-dom";

export const OwnerSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      console.log("Submitted Data:", data);
      
      data.roleId = "67fe54420fe0cb85afa80148"; 

      const res = await axios.post("http://localhost:3000/ownersignup", data);

      if (res.status === 201) {
        alert("Owner account created successfully!");
        navigate("/ownerlogin");
      } else {
        alert("Owner account creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating owner:", error.response?.data || error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container" style={{ paddingTop: "45px" }}>
      <h1>Owner Sign Up</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="signup-form">
        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            {...register("firstname", { required: "First Name is required" })}
            className={`input-field ${errors.firstname ? "input-error" : ""}`}
          />
          {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastname", { required: "Last Name is required" })}
            className={`input-field ${errors.lastname ? "input-error" : ""}`}
          />
          {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
            })}
            className={`input-field ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        {/* Business Name */}
        <div className="form-group">
          <label>Business Name</label>
          <input
            type="text"
            {...register("businessName", { required: "Business Name is required" })}
            className={`input-field ${errors.businessName ? "input-error" : ""}`}
          />
          {errors.businessName && <p className="error-message">{errors.businessName.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /(?=.*[A-Za-z])(?=.*\d)/,
                message: "Password must contain at least one letter and one number",
              },
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              maxLength: { value: 30, message: "Password must not exceed 30 characters" },
            })}
            className={`input-field ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="submit-btn">Sign Up</button>
          <p className="signup-link">
            Already have an account? <Link to="/ownerlogin">Login Here</Link>
          </p>
          <p className="signup-link">
            For User Sign Up <Link to="/signup">Click Here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OwnerSignUp;
