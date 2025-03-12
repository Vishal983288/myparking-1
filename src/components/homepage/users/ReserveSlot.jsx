import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export const ReserveSlot = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("http://localhost:3000/getallstates");
    setStates(res.data.data);
    
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("http://localhost:3000/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("http://localhost:3000/getareabycity/" + id);
    setAreas(res.data.data);
  };

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    const res = await axios.post("http://localhost:3000/addReservetion/addreservetion", data);
    console.log(res.data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Reserve Slot</h2>
            <form onSubmit={handleSubmit(submitHandler)}>

              <div className="mb-3">
                <label className="form-label">Vehicle Type</label>
                <select className="form-select" {...register("vehicletype")}>
                  <option value="4 Wheeler">4 Wheeler</option>
                  <option value="2 Wheeler">2 Wheeler</option>
                  
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Hourly Charge</label>
                <select className="form-select" {...register("hourlycharge")}>
                  <option value="4 Wheeler-100">4 Wheeler-100</option>
                  <option value="2 Wheeler-70">2 Wheeler-70</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Start Time</label>
                  <input type="time" className="form-control" {...register("starttime")} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">End Time</label>
                  <input type="time" className="form-control" {...register("endtime")} />
                </div>
              </div>
              
              
              <div className="mb-3">
                <label className="form-label">Select State</label>
                <select
                  className="form-select"
                  {...register("stateId")}
                  onChange={(event) => getCityByStateId(event.target.value)}
                >
                  <option>SELECT STATE</option>
                  {states?.map((state) => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Select City</label>
                <select
                  className="form-select"
                  {...register("cityId")}
                  onChange={(event) => getAreaByCityId(event.target.value)}
                >
                  <option>SELECT CITY</option>
                  {cities?.map((city) => (
                    <option key={city._id} value={city._id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Select Area</label>
                <select className="form-select" {...register("areaId")}>
                  <option>SELECT AREA</option>
                  {areas?.map((area) => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};