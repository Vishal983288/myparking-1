import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/pages/Login'
import { SingUp } from './components/pages/SingUp'
import { Navbar } from './components/Navbar'
import { HomePage } from './components/homepage/HomePage'
import { UserSidebar } from './components/layouts/UserSidebar'
import { UserProfile } from './components/homepage/users/UserProfile'
function App() {
  

  return (
    <div>
      <>
      {/* <Navbar></Navbar>
    <Routes>

      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/singup' element={<SingUp/>}></Route>

    </Routes> */}
    <body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
      <div className='app-wrapper'>
        
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/singup' element={<SingUp/>}></Route>
          <Route path='/user' element={<UserSidebar/>}>
          <Route path='profile' element={<UserProfile/>}></Route>
          </Route>
        </Routes>
      </div>
    </body>


    </>
    </div>
  )
}

export default App
