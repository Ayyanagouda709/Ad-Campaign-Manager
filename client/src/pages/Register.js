// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem("token", res.data.token);
      alert('✅ Registration successful');
      navigate('/');
    } catch (err) {
      alert('❌ Registration failed');
      console.error('Register error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="form-control mb-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
        <button type="submit" className="btn btn-success">Register</button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
