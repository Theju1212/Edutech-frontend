import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://edutech-backend-6mkz.onrender.com/api/admin/login', { email, key });
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify({ email })); // 👈 Mark admin as logged in
        navigate('/admin-dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch {
      alert('Server error');
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>Admin Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
         
          placeholder="Secret Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
