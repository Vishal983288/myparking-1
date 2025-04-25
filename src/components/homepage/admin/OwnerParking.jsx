import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #34495e 100%);
  padding: 2rem 0;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #3498db;
    border-radius: 2px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  background-color: white;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const ErrorMessage = styled.small`
  color: #e74c3c;
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #34495e 0%, #2980b9 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const OwnerParking = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  const handleVehicleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedVehicles((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const submitHandler = async (data) => {
    try {
      const parkingownerId = localStorage.getItem("ownerId");

      if (!parkingownerId) {
        alert("Error: Owner ID not found, please log in again");
        return;
      }

      data.parkingownerId = parkingownerId;
      data.vehicleTypesAllowed = selectedVehicles;

      localStorage.setItem("formData", JSON.stringify(data));

      const res = await axios.post("http://localhost:3000/owner/owneraddparking", data, {
        headers: { "Content-Type": "application/json" }
      });

      alert("Parking added successfully!");
      reset();
      setSelectedVehicles([]);

    } catch (error) {
      console.error("Error adding parking:", error.response?.data || error.message);
      alert("Failed to add parking. Please try again.");
    }
  };

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <Title>Add Parking</Title>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormGroup>
                <Label>Parking Name</Label>
                <Input type="text" {...register("parkingname", { required: "Parking name is required" })} />
                {errors.parkingname && <ErrorMessage>{errors.parkingname.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>State</Label>
                <Input type="text" {...register("state", { required: "State is required" })} />
                {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>City</Label>
                <Input type="text" {...register("city", { required: "City is required" })} />
                {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Area</Label>
                <Input type="text" {...register("area", { required: "Area is required" })} />
                {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Total Spots</Label>
                <Input type="number" {...register("totalSpots", { required: "Total spots are required", min: 1 })} />
                {errors.totalSpots && <ErrorMessage>{errors.totalSpots.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Parking Type</Label>
                <Select {...register("parkingType", { required: "Parking type is required" })}>
                  <option value="">Select Type</option>
                  <option value="Road">Road</option>
                  <option value="Ground">Ground</option>
                  <option value="Building">Building</option>
                </Select>
                {errors.parkingType && <ErrorMessage>{errors.parkingType.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Allowed Vehicle Types</Label>
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    value="2-Wheeler"
                    onChange={handleVehicleChange}
                    checked={selectedVehicles.includes("2-Wheeler")}
                  />
                  <Label>2-Wheeler</Label>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    value="4-Wheeler"
                    onChange={handleVehicleChange}
                    checked={selectedVehicles.includes("4-Wheeler")}
                  />
                  <Label>4-Wheeler</Label>
                </CheckboxContainer>
              </FormGroup>

              <FormGroup>
                <Label>Total Capacity (2-Wheeler)</Label>
                <Input type="number" {...register("totalCapacityTwoWheeler", { required: "This field is required", min: 0 })} />
                {errors.totalCapacityTwoWheeler && <ErrorMessage>{errors.totalCapacityTwoWheeler.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Total Capacity (4-Wheeler)</Label>
                <Input type="number" {...register("totalCapacityFourWheeler", { required: "This field is required", min: 0 })} />
                {errors.totalCapacityFourWheeler && <ErrorMessage>{errors.totalCapacityFourWheeler.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Hourly Rate</Label>
                <Input type="number" {...register("hourlyRate", { required: true, min: 0 })} />
              </FormGroup>

              <FormGroup>
                <Label>Daily Rate</Label>
                <Input type="number" {...register("dailyRate", { required: true, min: 0 })} />
              </FormGroup>

              <FormGroup>
                <Label>Open Time</Label>
                <Input type="time" {...register("openTime", { required: true })} />
              </FormGroup>

              <FormGroup>
                <Label>Close Time</Label>
                <Input type="time" {...register("closeTime", { required: true })} />
              </FormGroup>

              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
};
