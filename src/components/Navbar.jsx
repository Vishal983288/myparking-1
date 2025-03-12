import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div style={{}}>
      <h1 style={{ textAlign: 'center', tabSize: 50, color: 'dark' }}>MY PARKING</h1>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">My Parking</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/homepage">Home <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search Parking</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reserve">Reserve Slot</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/navigation">Navigation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payment">Payment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admindash">Admin Dashboard</Link>
            </li>
          </ul>

          {/* Right-aligned Login and Sign Up buttons */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};


/* navbar.css 

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}

.title {
  text-align: center;
  font-size: 50px;
  color: dark;
  animation: fadeIn 2s ease-in-out;
}

.navbar {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: slideIn 1s ease-in-out;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  transition: transform 0.5s ease-in-out;
}

.navbarHidden {
  transform: translateY(-100%);
}

.navHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navButton {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.navButton span {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #000;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.navLinks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.navList {
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
}

.navItem {
  margin-right: 10px;
}

.navLink {
  color: #000;
  text-decoration: none;
  transition: color 0.3s;
}

.navLink:hover {
  color: #007bff;
}

.content {
  margin-top: 20px;
  text-align: center;
  font-size: 24px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}*/

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './navbar.module.css';

// export const Navbar = () => {
//   const [isNavbarVisible, setIsNavbarVisible] = useState(true);
//   const [selectedContent, setSelectedContent] = useState('');

//   const handleNavItemClick = (content) => {
//     setIsNavbarVisible(false);
//     setSelectedContent(content);
//   };

//   const handleShowNavbar = () => {
//     setIsNavbarVisible(true);
//     setSelectedContent('');
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>MY PARKING</h1>

//       <nav className={`${styles.navbar} ${!isNavbarVisible ? styles.navbarHidden : ''}`}>
//         <div className={styles.navHeader}>
//           <Link className={styles.navLink} to="/" onClick={() => handleNavItemClick('My Parking')}>
//             My Parking
//           </Link>
//           <button className={styles.navButton} type="button" onClick={handleShowNavbar}>
//             <span></span>
//           </button>
//         </div>

//         <div className={styles.navLinks}>
//           <ul className={styles.navList}>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/" onClick={() => handleNavItemClick('Home')}>
//                 Home
//               </Link>
//             </li>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/search" onClick={() => handleNavItemClick('Search Parking')}>
//                 Search Parking
//               </Link>
//             </li>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/reserve" onClick={() => handleNavItemClick('Reserve Slot')}>
//                 Reserve Slot
//               </Link>
//             </li>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/navigation" onClick={() => handleNavItemClick('Navigation')}>
//                 Navigation
//               </Link>
//             </li>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/payment" onClick={() => handleNavItemClick('Payment')}>
//                 Payment
//               </Link>
//             </li>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/dashboard" onClick={() => handleNavItemClick('Admin Dashboard')}>
//                 Admin Dashboard
//               </Link>
//             </li>
//           </ul>

//           <ul className={styles.navList}>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/login" onClick={() => handleNavItemClick('Login')}>
//                 Login
//               </Link>
//             </li>
//             <li className={styles.navItem}>
//               <Link className={styles.navLink} to="/signup" onClick={() => handleNavItemClick('Sign Up')}>
//                 Sign Up
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {!isNavbarVisible && (
//         <div className={styles.content}>
//           <h2>{selectedContent}</h2>
//           <p>This is the content for {selectedContent}.</p>
//         </div>
//       )}
//     </div>
//   );
// };