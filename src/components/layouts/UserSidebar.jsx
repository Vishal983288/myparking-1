import React, { useState } from "react";
import { UserNevbar } from "./UserNevbar";
import { Link, Outlet } from "react-router-dom";

export const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Pass toggle function to Navbar */}
      <UserNevbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <aside className={`app-sidebar bg-dark ${isSidebarOpen ? "open" : "closed"}`} data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="./index.html" className="brand-link">
            <img
              src="..\..\src\assets\download.png"
              alt="my parking Logo"
              className="brand-image opacity-75 shadow"
            />
            <span className="brand-text fw-light">MY PARKING</span>
          </a>
        </div>

        <div className=""
        
        data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
        tabIndex={-1}
        style={{
          marginRight: "-16px",
          marginBottom: "-16px",
          marginLeft: 0,
          top: "-8px",
          right: "auto",
          left: "-8px",
          width: "calc(100% + 16px)",
          padding: 8,
        }}
        >
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" data-according="false" role="menu">
              <li className="nav-item menu-open">
                <Link to="admindash" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./index.html" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Search Parking</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="reserveslot" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Reserve Slot</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="parking" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Parking</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/admindash" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Admin Dashboard</p>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Not Updated Yet
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="app-main">
        <Outlet />
      </main>

      {/* Sidebar Styling */}
      {/* <style>
        {`
          .app-sidebar {
            width: 250px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: #343a40;
            transition: transform 0.3s ease-in-out;
          }

          .app-sidebar.closed {
            transform: translateX(-100%);
          }

          .app-main {
            margin-left: ${isSidebarOpen ? "250px" : "0"};
            transition: margin-left 0.3s ease-in-out;
          }
        `}
      </style> */}
    </>
  );
};
