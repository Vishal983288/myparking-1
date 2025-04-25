import { useEffect, useState } from 'react'
import { Login } from './components/pages/Login'
import SignUp from './components/pages/SignUp'

import { Navbar } from './components/Navbar'
import { HomePage } from './components/homepage/HomePage'
import { UserSidebar } from './components/layouts/UserSidebar'
import { UserProfile } from './components/homepage/users/UserProfile'

import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { ReserveSlot } from './components/homepage/users/ReserveSlot'
import { Parking } from './components/homepage/users/Parking'
import { UserDashBoard } from './components/homepage/users/UserDashBoard'
import { ResetPassword } from './components/pages/ResetPassword'
import OwnerSidebar from './components/layouts/OwnerSidebar'
import { OwnerParking } from './components/homepage/admin/OwnerParking'
import { Vehicle } from './components/homepage/users/Vehicle'
import SearchParking from './components/homepage/users/SearchParking'
import LandingPage from './components/homepage/common/LandingPage'
import AboutUs from './components/homepage/users/AboutUs'
import Contact from './components/homepage/users/Contact'
import OwnerLogin from './components/pages/OwnerLogin'
import OwnerSignUp from './components/pages/OwnerSignUp'

import OwnerProfile from './components/homepage/admin/OwnerProfile'
import OwnerDashboard from './components/homepage/admin/OwnerDashboard'

function App() {
  axios.defaults.baseURL = 'http://localhost:3000/user'

  

 
  return (
    <div>
      <>
        <div>
          <Routes>
          
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/ownerlogin' element={<OwnerLogin/>}></Route>
            <Route path='/ownersignup' element={<OwnerSignUp/>}></Route>
            
            <Route path='/resetpassword' element={<ResetPassword/>}></Route>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/owner' element={<OwnerSidebar/>}>
            <Route path='owneraddparking' element={<OwnerParking/>}></Route>
            <Route path='ownerprofile' element={<OwnerProfile/>}></Route>
            
            <Route path='ownerdash' element={<OwnerDashboard/>}></Route></Route>

            <Route path='/user' element={<UserSidebar/>}>
              <Route path='homepage' element={<HomePage/>}></Route>
              <Route path='searchparking' element={<SearchParking/>}></Route>
              <Route path='aboutus' element={<AboutUs/>}></Route>
              <Route path='contact' element={<Contact/>}></Route>
              {/* <Route path='booking' element={<BookParking/>}></Route> */}
              
              {/* <Route path='reserveslot' element={<ReserveSlot/>}></Route> */}
             
              <Route path='profile' element={<UserProfile/>}></Route>
              <Route path='userdash' element={<UserDashBoard/>}></Route>
              <Route path='vehicledetails' element={<Vehicle/>}></Route>
              {/* <Route path='parking' element={<Parking/>}></Route> */}
            </Route>
          </Routes>
        </div>
      </>
    </div>
  )
}

export default App