import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  const enrollCourse = (course) => {
    setEnrolledCourses((prev) =>
      prev.find((c) => c.title === course.title) ? prev : [...prev, course]
    );
  };

  const completeCourse = (course) => {
    setCompletedCourses((prev) =>
      prev.find((c) => c.title === course.title)
        ? prev
        : [...prev, { ...course, completedAt: new Date().toISOString() }]
    );
  };

  return (
    <CourseContext.Provider
      value={{ enrolledCourses, completedCourses, enrollCourse, completeCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);
