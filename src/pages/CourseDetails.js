import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import './CourseDetails.css';
import { useCourseContext } from '../context/CourseContext';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrollCourse, completeCourse, enrolledCourses, completedCourses } = useCourseContext();

  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    axios
      .get(`https://edutech-backend-6mkz.onrender.com/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error('Course fetch failed:', err));
  }, [id]);

  useEffect(() => {
    if (course) {
      setEnrolled(enrolledCourses.some((c) => c.title === course.title));
      setCompleted(completedCourses.some((c) => c.title === course.title));
    }
  }, [course, enrolledCourses, completedCourses]);

  const handleEnroll = () => {
    enrollCourse(course);
    setEnrolled(true);
  };

  const handleVideoEnd = () => {
    if (enrolled && !completed) {
      completeCourse(course);
      setCompleted(true);
    }
  };

  const videoOptions = {
    height: '360',
    width: '100%',
    playerVars: { autoplay: 0 },
  };

  if (!course) {
    return (
      <div className="course-detail-container">
        <h2>Course not found.</h2>
        <button onClick={() => navigate(-1)}>⬅ Go Back</button>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail-inner">
        <h1>{course.title}</h1>
        <p className="tag">
          {course.category}
          {course.type && ` - ${course.type}`}
        </p>
        <p className="difficulty">LEVEL: {course.difficulty}</p>

        <div className="video-section">
          <YouTube videoId="dQw4w9WgXcQ" opts={videoOptions} onEnd={handleVideoEnd} />
        </div>

        <div className="description">
          <p>{course.description}</p>
          <p>
            This course will guide you through the fundamentals of {course.title} with interactive content tailored to your level.
          </p>
        </div>

        <div className="actions">
          <button onClick={handleEnroll} disabled={enrolled}>
            {enrolled ? '✅ Enrolled' : 'Enroll'}
          </button>
          <button disabled>
            {completed ? '🎉 Completed Automatically' : 'Will be marked complete after video ends'}
          </button>
          <button onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
