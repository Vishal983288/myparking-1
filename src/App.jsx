import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'



//import './App.css'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import { Login } from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import { Navbar } from './components/Navbar'
import { HomePage } from './components/homepage/HomePage'
import { UserSidebar } from './components/layouts/UserSidebar'
import { UserProfile } from './components/homepage/users/UserProfile'
import { AdminDashBoard } from './components/homepage/admin/AdminDashBoard'
import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ReserveSlot } from './components/homepage/users/ReserveSlot'
import { Parking } from './components/homepage/users/Parking'

function App() {
  axios.defaults.baseURL='http://localhost:3000/user'

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/homepage") {
      document.body.className = ""; // Remove  css class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);
  
  return (
    <div>
      <>
      {/* <Navbar></Navbar> */}
      <div className={location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/homepage"? "" : "app-wrapper"}>
        <Routes>
          
          {/* <Route path='/' element={<HomePage/>}></Route>
          <Route path='homepage' element={<HomePage/>}>
          <Route path='login' element={<Login/>}></Route>
          <Route path='signup' element={<SignUp/>}></Route>
          <Route path='reserveslot' element={<ReserveSlot/>}></Route>
          </Route> */}
          <Route path='/reserveslot' element={<ReserveSlot/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route pathoh='/signup' element={<SignUp/>}></Route>
          <Route path='/user' element={<UserSidebar/>}>
            <Route path='homepage' element={<HomePage/>}></Route>
            <Route path='reserveslot' element={<ReserveSlot/>}></Route>
            <Route path='profile' element={<UserProfile/>}></Route>
            <Route path='parking' element={<Parking/>}></Route>
            <Route path='admindash' element={<AdminDashBoard/>}></Route>
          </Route>
        </Routes>
      </div>
      </>
    </div>
  )
}

export default App
