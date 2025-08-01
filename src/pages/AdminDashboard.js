import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import axios from 'axios';

const API_URL = 'https://edutech-backend-6mkz.onrender.com/api/courses';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setCourses(res.data))
      .catch(err => console.error('Fetch failed', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = {
      title,
      category,
      type: category === 'Skill Development' ? type : '',
      subject: title,
      description,
    };

    if (editingId) {
      const res = await axios.put(`${API_URL}/${editingId}`, newCourse);
      const updatedCourses = courses.map(c => c._id === editingId ? res.data : c);
      setCourses(updatedCourses);
      setEditingId(null);
    } else {
      const res = await axios.post(API_URL, newCourse);
      setCourses([...courses, res.data]);
    }

    // Reset form
    setTitle('');
    setCategory('Academic');
    setType('');
    setDescription('');
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const course = courses[index];
    setTitle(course.title);
    setCategory(course.category);
    setType(course.type || '');
    setDescription(course.description);
    setEditIndex(index);
    setEditingId(course._id);
  };

  const handleDelete = async (index) => {
    const id = courses[index]._id;
    await axios.delete(`${API_URL}/${id}`);
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
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
