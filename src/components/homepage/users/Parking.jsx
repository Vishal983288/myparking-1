import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export const Parking = () => {
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
    const res = await axios.post("http://localhost:3000/addparking", data);
    console.log(res.data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Parking</h2>
            <form onSubmit={handleSubmit(submitHandler)}>

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" {...register("title")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Capacity Two Wheeler</label>
                <input type="number" className="form-control" {...register("totalCapacityTwoWheeler")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Capacity Four Wheeler</label>
                <input type="number" className="form-control" {...register("totalCapacityfouroWheeler")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Parking Type</label>
                <select className="form-select" {...register("parkingtype")}>
                  <option value="Road">Road</option>
                  <option value="Ground">Ground</option>
                  <option value="Building">Building</option>
                </select>
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