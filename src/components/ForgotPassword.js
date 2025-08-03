import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('https://edutech-backend-6mkz.onrender.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => navigate('/'), 3000);
      } else {
        alert(data.message || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Check console.');
    }
  };

  return (
    <div className="home-section">
      <div className="home-content">
        <h1>Reset Password</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>Reset Password</button>

            <div style={{ marginTop: '1rem' }}>
              <Link to="/" style={linkStyle}>Back to Login</Link>
            </div>
          </form>
        ) : (
          <p className="success-message">Password reset successful. Redirecting to login...</p>
        )}
      </div>
    </div>
  );
};

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

export default ForgotPassword;
