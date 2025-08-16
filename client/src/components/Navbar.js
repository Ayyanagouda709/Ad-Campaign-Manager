// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Ad Campaign</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/">Login</Link>
            </li>
          )}
          {user && (
  <li className="nav-item d-flex align-items-center text-white me-3">
    👤 {user.username}
  </li>
)}

          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/add-campaign">Add Campaign</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-campaigns">View Campaigns</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
