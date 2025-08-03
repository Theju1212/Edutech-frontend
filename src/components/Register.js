import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://edutech-backend-6mkz.onrender.com/api/register', user);
      if (res.data.success) {
        alert('Registered successfully!');
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="home-section">
      <div className="home-content">
        <h1>Register</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>Create Account</button>

          <div style={{ marginTop: '1rem' }}>
            <Link to="/" style={linkStyle}>Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
};

const inputStyle = {
  padding: '0.8rem 1rem',
  width: '250px',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  backgroundColor: '#22c55e',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
};

const linkStyle = {
  color: '#22c55e',
  textDecoration: 'none',
  fontSize: '0.95rem',
};

export default Register;
