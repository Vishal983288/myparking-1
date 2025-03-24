import { useEffect, useState } from 'react'
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
import { UserDashBoard } from './components/homepage/users/UserDashBoard'
import { AdminSidebar } from './components/layouts/AdminSidebar'

function App() {
  axios.defaults.baseURL = 'http://localhost:3000/user'

  

 
  return (
    <div>
      <>
        <div>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/reserveslot' element={<ReserveSlot/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/userdash' element={<UserDashBoard/>}></Route>
            <Route path='/admindash' element={<AdminDashBoard/>}></Route>
            <Route path='/admin' element={<AdminSidebar/>}></Route>


            <Route path='/user' element={<UserSidebar/>}>
              <Route path='signup' element={<SignUp/>}></Route>
              <Route path='homepage' element={<HomePage/>}></Route>
              <Route path='reserveslot' element={<ReserveSlot/>}></Route>
              <Route path='profile' element={<UserProfile/>}></Route>
              <Route path='userdash' element={<UserDashBoard/>}></Route>
              <Route path='parking' element={<Parking/>}></Route>
            </Route>
          </Routes>
        </div>
      </>
    </div>
  )
}

export default App