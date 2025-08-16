// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { user, token } = res.data;
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      alert('✅ Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert('❌ Login failed');
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-4 col-md-6 card p-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
