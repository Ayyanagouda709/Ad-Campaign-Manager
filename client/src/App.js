import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCampaign from './pages/AddCampaign';
import CampaignList from './pages/CampaignList';
import EditCampaign from './pages/EditCampaign';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/add-campaign"
            element={
              <PrivateRoute>
                <AddCampaign />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-campaigns"
            element={
              <PrivateRoute>
                <CampaignList />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-campaign/:id"
            element={
              <PrivateRoute>
                <EditCampaign />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
