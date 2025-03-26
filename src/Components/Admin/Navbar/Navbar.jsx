import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import {useNavigate } from "react-router-dom";
    
const AdminNavbar = () => {
    const navigate=useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    setIsLoggedIn(false);
    alert('Logged out successfully!');
    navigate("/login")
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark x">
      <div className="container-fluid">

        <a className="navbar-brand ">
          The Pet Pantry
        </a>
      
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
            </li>
          </ul>
        </div>
      </div> 
    </nav>
    </>
  );
};
export default AdminNavbar;
