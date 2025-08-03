import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getCourseImageSrc from '../utils/getCourseImageSrc';
import './Courses.css';

const classLevels = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

const getDifficulty = (studentClass) => {
  const classNumber = parseInt(studentClass.split(' ')[1]);
  if (classNumber <= 7) return 'Easy';
  if (classNumber <= 9) return 'Medium';
  return 'Hard';
};

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Fetch from backend instead of localStorage
    axios.get('https://edutech-backend-6mkz.onrender.com/api/courses')
      .then(res => setAllCourses(res.data))
      .catch(err => console.error('Failed to fetch courses:', err));
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    const categoryMatch = selectedCategory ? course.category === selectedCategory : true;
    const subjectMatch = selectedSubject ? course.subject === selectedSubject : true;
    if (selectedClass && selectedCategory) {
      return categoryMatch && subjectMatch;
    }
    return true;
  });

  return (
    <div className="courses-container">
      <h1>📘 Courses</h1>

      <div className="filters">
        <select onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
          <option value="">Select Class</option>
          {classLevels.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Skill Development">Skill Development</option>
        </select>

        {selectedCategory && (
          <select onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
            <option value="">Select Subject</option>
            {[...new Set(allCourses
              .filter(course => course.category === selectedCategory)
              .map(course => course.subject))].map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        )}
      </div>

      <div className="course-list">
        {filteredCourses.map((course, index) => {
          const difficulty = selectedClass ? getDifficulty(selectedClass) : '—';
          const imagePath = getCourseImageSrc(course);

          return (
            <div key={index} className="course-card">
              <div className="course-image">
                <img src={imagePath} alt={course.title} />
              </div>
              <h3>{course.title}</h3>
              <p className="tag">{course.category}{course.type ? ` - ${course.type}` : ''}</p>
              {selectedClass && <p className="difficulty">Level: {difficulty}</p>}
              <p>{course.description}</p>
              <button onClick={() => navigate(`/course/${course._id}`)}>
                View Course
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
