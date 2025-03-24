import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../assets/Signup.css";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      console.log(data);
      data.roleId = "67c86502e7f2b9d497547408";

      const res = await axios.post("http://localhost:3000/user/signup", data);

      if (res.status === 201) {
        alert("User created successfully");
        navigate("/login");
      } else {
        alert("User not created. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="signup-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            {...register("firstname", { required: "First Name is required" })}
            className={`input-field ${errors.firstName ? "input-error" : ""}`}
          />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastname", { required: "Last Name is required" })}
            className={`input-field ${errors.lastName ? "input-error" : ""}`}
          />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            className={`input-field ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            {...register("phonenumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid phone number (10 digits required)",
              },
            })}
            className={`input-field ${errors.phone ? "input-error" : ""}`}
          />
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern:{
                  value:/(?=.*[A-Za-z])(?=.*d)/,
                  message:"password must contain at least one letter and on enumber"
              },
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
            className={`input-field ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 18, message: "You must be at least 18 years old" },
            })}
            className={`input-field ${errors.age ? "input-error" : ""}`}
          />
          {errors.age && <p className="error-message">{errors.age.message}</p>}
        </div>

        <div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;