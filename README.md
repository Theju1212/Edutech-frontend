# 🎓 MERN Edutech Platform

A full-featured Edutech learning platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) to provide academic and skill-based courses for students from Classes 6–12. It also includes role-based login (Admin/User), certificate generation, and a quiz module.

---

🌐 Live Demo 
👉 https://theju1212.github.io/Edutech-frontend/


## 🚀 Features Overview

- 🔐 **User Authentication**
  - Login / Register / Forgot Password functionality
  - Secure role-based routing for Users and Admins

- 🧒 **Student Interface**
  - Browse academic and skill development courses
  - View course difficulty based on class (Easy/Medium/Hard)
  - Enroll in courses
  - Watch course videos
  - Attempt quizzes after completion
  - Get downloadable certificates

- 👨‍🏫 **Admin Interface**
  - Add/Edit/Delete courses
  - Manage content dynamically
  - Categorize courses by subject and class

- 📜 **Certificate Generation**
  - Beautiful downloadable certificate after quiz success

- 📧 **Contact Us**
  - User can reach out for any queries

---


## 🔄 Application Flow 

### 1. Landing / About Page

- Entry point with navigation to:
  - About
  - Admin Login
  - Contact
  - User Login/Register

![About Page](client/screenshots/about.png)

---

### 2. User Registration / Login

- Users can register with basic details
- Forgot password functionality with validation

![Register](client/screenshots/register.png)
![User Login](client/screenshots/userlogin.png)
![Forgot Password](client/screenshots/forgotpassword.png)

---

### 3. Home Page (User)

- Displays major categories:
  - Academic Courses
  - Skill Development

![Home](client/screenshots/home.png)

---

### 4. Courses Page

- Shows list of available courses by category
- Difficulty level changes based on class:
  - Class 6–7: Easy
  - Class 8–9: Medium
  - Class 10–12: Hard

![Courses](client/screenshots/courses.png)

---

### 5. Course Details Page

- Contains dummy video for preview
- Enroll button to start learning

![Course Details](client/screenshots/course-details.png)

---

### 6. Quiz & Certificate

- After course completion, quiz becomes available
- Successful quiz completion enables certificate download

![Quiz](client/screenshots/quiz-page.png)
![Certificate](client/screenshots/certificate.png)

---

### 7. User Dashboard

- Shows enrolled and completed courses
- Allows retaking quiz and viewing certificates

![User Dashboard](client/screenshots/user-dashboard.png)
![User Dashboard 2](client/screenshots/user-dashboard2.png)

---

### 8. Admin Panel

- Admin can:
  - Add new courses
  - Edit/Delete existing ones

![Admin Login](client/screenshots/admin-login.png)
![Admin Dashboard](client/screenshots/admin-dashboard.png)

---

### 9. Contact Page

- Simple contact form for reaching out

![Contact](client/screenshots/contact.png)

---

## 🛠️ Tech Stack

| Frontend        | Backend        | Database   | Other Tools       |
|-----------------|----------------|------------|-------------------|
| React.js        | Node.js        | MongoDB    | HTML2PDF.js       |
| React Router    | Express.js     | Mongoose   | LocalStorage API  |
| Tailwind CSS    | Axios          |            | Git, GitHub       |

---

## 📜 How to Run the Project Locally

```bash
# Clone the repository
git clone https://github.com/your-username/mern-edutech.git
cd mern-edutech

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Run backend
npm run server

# Run frontend
npm start


📌 Future Enhancements

📱 Mobile responsive UI

📊 Quiz analytics for users

🙋‍♀️ Author
Velvaluri Thejaswini






