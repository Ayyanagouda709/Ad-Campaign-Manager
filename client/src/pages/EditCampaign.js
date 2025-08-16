import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    budget: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/campaigns/single/${id}`)
      .then(res => setCampaign(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/campaigns/update/${id}`, campaign)
      .then(() => {
        alert("✅ Campaign updated");
        navigate('/view-campaigns');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h3>Edit Campaign</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={campaign.name}
            onChange={handleChange}
            className="form-control"
            required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={campaign.description}
            onChange={handleChange}
            className="form-control"
            required />
        </div>
        <div className="mb-3">
          <label className="form-label">Budget (₹)</label>
          <input
            type="number"
            name="budget"
            value={campaign.budget}
            onChange={handleChange}
            className="form-control"
            required />
        </div>
        <button type="submit" className="btn btn-primary">Update Campaign</button>
      </form>
    </div>
  );
}

export default EditCampaign;
