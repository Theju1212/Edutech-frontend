// context/CourseContext.js
import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

// Create Context
const CourseContext = createContext();

// Difficulty mapping function
const difficultyMap = (cls) => {
  if (cls <= 7) return "Easy";
  if (cls <= 9) return "Medium";
  return "Hard";
};

// CourseProvider
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  // Fetch courses from backend once on mount
  useEffect(() => {
    axios
      .get("https://edutech-backend-6mkz.onrender.com/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  // Filter courses based on selected class and category
  const filteredCourses = courses.filter((course) => {
    const matchClass = selectedClass ? true : true;
    const matchCategory = selectedCategory
      ? course.category === selectedCategory
      : true;
    return matchClass && matchCategory;
  });

  // Enroll in a course
  const enrollCourse = (course) => {
    setEnrolledCourses((prev) =>
      prev.find((c) => c.title === course.title) ? prev : [...prev, course]
    );
  };

  // Mark course as completed
  const completeCourse = (course) => {
    setCompletedCourses((prev) =>
      prev.find((c) => c.title === course.title)
        ? prev
        : [...prev, { ...course, completedAt: new Date().toISOString() }]
    );
  };

  return (
    <CourseContext.Provider
      value={{
        courses: filteredCourses,
        setCourses,
        selectedClass,
        setSelectedClass,
        selectedCategory,
        setSelectedCategory,
        enrolledCourses,
        completedCourses,
        enrollCourse,
        completeCourse,
        difficultyMap,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook
export const useCourseContext = () => useContext(CourseContext);
