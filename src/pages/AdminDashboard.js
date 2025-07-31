// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useCourseContext } from "../context/CourseContext";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Academic");
  const [imageName, setImageName] = useState("");

  const { courses, setCourses } = useCourseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      category,
      imageName: imageName.replace(/\s+/g, "").toLowerCase(),
    };

    try {
      const response = await axios.post(
        "https://edutech-backend-6mkz.onrender.com/api/courses/add",
        newCourse
      );

      if (response.data) {
        setCourses((prev) => [...prev, response.data]);
        setTitle("");
        setCategory("Academic");
        setImageName("");
        alert("✅ Course added successfully");
      }
    } catch (err) {
      console.error("Error adding course:", err);
      alert("❌ Failed to add course");
    }
  };

  // Optional: Fetch courses again when admin page loads
  useEffect(() => {
    axios
      .get("https://edutech-backend-6mkz.onrender.com/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Fetch courses error:", err));
  }, [setCourses]);

  return (
    <div className="admin-container">
      <h1>📋 Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course Title"
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Academic">Academic</option>
          <option value="Skill Development">Skill Development</option>
        </select>

        <input
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          placeholder="Image File Name (e.g., leadershiptraining)"
          required
        />

        <button type="submit">➕ Add Course</button>
      </form>

      <h2>📚 Existing Courses</h2>
      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <table className="course-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>
                  <img
                    src={
                      course.category === "Skill Development"
                        ? `/images/courses/skill/${course.imageName}`
                        : `/images/courses/academic/${course.imageName}`
                    }
                    alt={course.title}
                    width="80"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
