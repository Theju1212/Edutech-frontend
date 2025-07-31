// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate('/courses', { state: { category } });
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <h1>Empowering Students for the Future</h1>
        <p>
          One-stop learning platform for <span className="highlight">Academic</span> and <span className="highlight">Skill Development</span> courses
        </p>

        <div className="cards-container">
          <div className="course-card animated-border" onClick={() => goToCategory('Academic')}>
            <h2>📘 Academic Courses</h2>
            <p>Curriculum-aligned content for classes 6–10</p>
          </div>

          <div className="course-card animated-border" onClick={() => goToCategory('Skill Development')}>
            <h2>💡 Skill Development</h2>
            <p>Build essential life & tech skills for tomorrow</p>
          </div>
        </div>
      </div>

      <div className="blinking-box" onClick={() => navigate('/courses')}>
        📚<br />Courses
      </div>
    </section>
  );
};

export default Home;
