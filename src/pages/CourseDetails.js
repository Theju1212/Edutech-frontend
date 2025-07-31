import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import './CourseDetails.css';
import { useCourseContext } from '../context/CourseContext';

const imageMap = {
  "webdevelopment": "webdev.jpg",
  "pythonbasics": "python.jpg",
  "datascience": "datasci.jpg",
  "graphicdesign": "graphic.jpg",
  // Add more mappings as needed
};

const CourseDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { enrollCourse, completeCourse, enrolledCourses, completedCourses } = useCourseContext();

  const course = state?.course;
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);

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
        <p className="tag">{course.category}{course.type && ` - ${course.type}`}</p>
        <p className="difficulty">LEVEL: {course.difficulty}</p>

        <div className="video-section">
          <img
            src={`/images/courses/${course.category.toLowerCase()}/${imageMap[course.title.toLowerCase().replace(/\s/g, "")]}`}
            alt={course.title}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
          <YouTube videoId="dQw4w9WgXcQ" opts={videoOptions} onEnd={handleVideoEnd} />
        </div>

        <div className="description">
          <p>{course.description}</p>
          <p>This course will guide you through the fundamentals of {course.title} with interactive content tailored to your level.</p>
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
