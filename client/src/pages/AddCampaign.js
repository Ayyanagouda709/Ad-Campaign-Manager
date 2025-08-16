// src/pages/AddCampaign.js

import React, { useState } from 'react';
import axios from 'axios';

const AddCampaign = () => {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'active',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // 👇 get the token from localStorage (you must have set this after login)
    const token = localStorage.getItem("token"); 

    await axios.post(
      "http://localhost:5000/api/campaigns",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token
        },
      }
    );

    alert("✅ Campaign submitted!");
    setFormData({
      name: "",
      platform: "",
      startDate: "",
      endDate: "",
      budget: "",
      status: "active", // keep default
    });
  } catch (error) {
    alert("❌ Submission failed");
    console.error(error);
  }
};



  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create New Ad Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Campaign Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Platform</label>
          <select
            className="form-select"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option value="Facebook">Facebook</option>
            <option value="Google">Google</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Budget (in ₹)</label>
          <input
            type="number"
            className="form-control"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
  <label className="form-label">Status</label>
  <select
    className="form-select"
    name="status"
    value={formData.status}
    onChange={handleChange}
    required
  >
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</div>


        <button type="submit" className="btn btn-primary">Create Campaign</button>
      </form>
    </div>
  );
};

export default AddCampaign;