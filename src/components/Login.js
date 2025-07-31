import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://edutech-backend-6mkz.onrender.com/api/login', { email, password });

      if (res.data.success) {
        // ✅ Store user info in localStorage
        localStorage.setItem("user", JSON.stringify({ username: "demoUser" }));

        // ✅ Navigate to home page
        navigate('/home');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Login failed. Server error.');
    }
  };

  return (  
    <div className="home-section">
      <div className="home-content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>

          <div style={{ marginTop: '1rem' }}>
            <Link to="/forgot-password" style={linkStyle}>Forgot Password?</Link> |{" "}
            <Link to="/register" style={linkStyle}>Create Account</Link>
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

export default Login;
