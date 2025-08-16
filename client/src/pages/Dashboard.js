import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/campaigns/all')
      .then(res => setCampaigns(res.data))
      .catch(err => console.error('Failed to fetch campaigns:', err));
  }, []);

  const totalCampaigns = campaigns.length;
  const totalBudget = campaigns.reduce((sum, c) => sum + Number(c.budget), 0);

  const today = new Date();
  const active = campaigns.filter(c =>
    new Date(c.startDate) <= today && new Date(c.endDate) >= today
  ).length;

  const upcoming = campaigns.filter(c =>
    new Date(c.startDate) > today
  ).length;

  const completed = campaigns.filter(c =>
    new Date(c.endDate) < today
  ).length;

  const platformCount = campaigns.reduce((acc, c) => {
    acc[c.platform] = (acc[c.platform] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 Campaign Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5>Total Campaigns</h5>
              <p className="card-text fs-4">{totalCampaigns}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5>Total Budget (₹)</h5>
              <p className="card-text fs-4">{totalBudget}</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-info mb-3">
            <div className="card-body">
              <h5>Active</h5>
              <p className="card-text fs-4">{active}</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-warning mb-3">
            <div className="card-body">
              <h5>Upcoming</h5>
              <p className="card-text fs-4">{upcoming}</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-secondary text-white mb-3">
            <div className="card-body">
              <h5>Completed</h5>
              <p className="card-text fs-4">{completed}</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mb-3">Platform-wise Distribution</h4>
      <ul className="list-group">
        {Object.keys(platformCount).map(platform => (
          <li key={platform} className="list-group-item d-flex justify-content-between align-items-center">
            {platform}
            <span className="badge bg-dark rounded-pill">{platformCount[platform]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
