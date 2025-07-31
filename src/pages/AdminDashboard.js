import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [courses, setCourses] = useState([]);

  // Load courses from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('allCourses')) || [];
    setCourses(stored);
  }, []);

  // Save to localStorage
  const saveCourses = (updatedCourses) => {
    localStorage.setItem('allCourses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      category,
      type: category === 'Skill Development' ? type : '',
      subject: title,
      description,
    };

    let updatedCourses;
    if (editIndex !== null) {
      updatedCourses = [...courses];
      updatedCourses[editIndex] = newCourse;
      setEditIndex(null);
    } else {
      updatedCourses = [...courses, newCourse];
    }

    saveCourses(updatedCourses);

    // Reset form
    setTitle('');
    setCategory('Academic');
    setType('');
    setDescription('');
  };

  const handleEdit = (index) => {
    const course = courses[index];
    setTitle(course.title);
    setCategory(course.category);
    setType(course.type || '');
    setDescription(course.description);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    saveCourses(updatedCourses);
  };

  return (
    <div className="admin-container">
      <h1>📋 Admin Dashboard - {editIndex !== null ? 'Edit Course' : 'Add Course'}</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" required />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Academic">Academic</option>
          <option value="Skill Development">Skill Development</option>
        </select>

        {category === 'Skill Development' && (
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Programming Languages">Programming Languages</option>
            <option value="Professional & Emerging Skills">Professional & Emerging Skills</option>
          </select>
        )}

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course Description"
          required
        />

        <button type="submit">{editIndex !== null ? '✏️ Update Course' : '➕ Add Course'}</button>
      </form>

      <h2> Existing Courses</h2>
      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <table className="course-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.type || '-'}</td>
                <td>
                  <button onClick={() => handleEdit(index)}> Edit</button>
                  <button onClick={() => handleDelete(index)}> Delete</button>
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
