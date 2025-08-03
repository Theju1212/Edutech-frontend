// src/pages/About.js
import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="about-section">
      <div className="about-content">
        <h1>Welcome to <span className="highlight">EduVerse</span></h1>
        <p>
          EduVerse is a modern Edutech web platform designed to deliver online learning resources 
          to students from Classes 6 to 12, along with skill development programs across technical 
          and personal development domains.
        </p>

        <div className="cards-container">
          <div className="about-card" onClick={() => navigate('/login')}>
            <h2>Already a User?</h2>
            <button className="about-btn">Login</button>
          </div>

          <div className="about-card" onClick={() => navigate('/register')}>
            <h2>New Here?</h2>
            <button className="about-btn">Register</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
