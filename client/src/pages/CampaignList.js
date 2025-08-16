import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');
  const [sortOption, setSortOption] = useState('');



  const fetchCampaigns = () => {
  const token = localStorage.getItem('token');
  axios.get('http://localhost:5000/api/campaigns/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => setCampaigns(res.data))
    .catch(err => console.log(err));
};


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      axios.delete(`http://localhost:5000/api/campaigns/delete/${id}`)
        .then(() => {
          alert('Campaign deleted successfully');
          fetchCampaigns(); // refresh list
        })
        .catch(err => console.error(err));
    }
  };
  const toggleStatus = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await axios.patch(`http://localhost:5000/api/campaigns/status/${id}`, {
      status: newStatus
    });
    fetchCampaigns(); // Refresh the list
  } catch (err) {
    console.error('Failed to toggle status:', err);
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Campaigns</h2>
      <div className="row mb-3">
  <div className="col-md-4">
    <select className="form-select" value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)}>
      <option value="">All Platforms</option>
      <option value="Facebook">Facebook</option>
      <option value="Google">Google</option>
      <option value="Instagram">Instagram</option>
      <option value="LinkedIn">LinkedIn</option>
    </select>
  </div>
</div>
    <div className="col-md-3">
  <select className="form-select" onChange={(e) => setSortOption(e.target.value)}>
    <option value="">Sort By</option>
    <option value="date-desc">Start Date (Newest)</option>
    <option value="date-asc">Start Date (Oldest)</option>
    <option value="budget-desc">Budget (High to Low)</option>
    <option value="budget-asc">Budget (Low to High)</option>
  </select>
</div>

      <div className="mb-4">
  <input
    type="text"
    placeholder="Search by name"
    className="form-control mb-2"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <div className="row">
    <div className="col">
      <input
        type="number"
        className="form-control"
        placeholder="Min Budget"
        value={minBudget}
        onChange={(e) => setMinBudget(e.target.value)}
      />
    </div>
    <div className="col">
      <input
        type="number"
        className="form-control"
        placeholder="Max Budget"
        value={maxBudget}
        onChange={(e) => setMaxBudget(e.target.value)}
      />
    </div>
  </div>
</div>

      <div className="row">
        {campaigns.length === 0 && <p>No campaigns found.</p>}
        {campaigns
  .filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (minBudget === '' || c.budget >= parseInt(minBudget)) &&
    (maxBudget === '' || c.budget <= parseInt(maxBudget)) &&
    (filterPlatform === '' || c.platform === filterPlatform)
  )
  .sort((a, b) => {
    switch (sortOption) {
      case 'date-asc':
        return new Date(a.startDate) - new Date(b.startDate);
      case 'date-desc':
        return new Date(b.startDate) - new Date(a.startDate);
      case 'budget-asc':
        return a.budget - b.budget;
      case 'budget-desc':
        return b.budget - a.budget;
      default:
        return 0;
    }
  })
  .map((campaign) => (
    <div className="col-md-4 mb-3" key={campaign._id}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{campaign.name}</h5>
          <p className="card-text">{campaign.description}</p>
          <p className="card-text"><strong>Budget:</strong> ₹{campaign.budget}</p>
          <p className="card-text"><strong>Status:</strong> {campaign.status === 'active' ? '🟢 Active' : '🔴 Inactive'}</p>

          <Link to={`/edit-campaign/${campaign._id}`} className="btn btn-warning me-2">
            Edit
          </Link>
          <button className="btn btn-danger me-2" onClick={() => handleDelete(campaign._id)}>
            Delete
          </button>
          <button
            className={`btn btn-sm ${campaign.status === 'active' ? 'btn-secondary' : 'btn-success'}`}
            onClick={() => toggleStatus(campaign._id, campaign.status)}
          >
            {campaign.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>

                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampaignList;
