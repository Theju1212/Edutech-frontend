const courseImageMap = {
  mathematics: 'Mathematics.jpg',
  physics: 'Physics.jpeg',
  chemistry: 'Chemistry.png',
  biology: 'Biology.jpeg',
  english: 'English.jpeg',

  java: 'Java.png',
  python: 'Python.png',
  c: 'C.jpeg',
  cpp: 'Cpp.jpeg',
  html: 'HTML.png',
  css: 'CSS.png',
  javascript: 'Javascript.png',
  mern:'Mern.png',

  msexcel: 'MsExcel.jpeg',
  ai: 'AI.jpeg',
  generativeai: 'GenerativeAi.jpeg',
  leadership: 'Leadership.png',
  communicationskills: 'CommunicationSkills.jpeg',
};

const getCourseImageSrc = (course) => {
  const folder = course.category === 'Academic' ? 'academic' : 'skill';
  const key = course.title.toLowerCase().replace(/\+\+/g, 'pp').replace(/\s+/g, '');
  const file = courseImageMap[key];
  return file
    ? `${process.env.PUBLIC_URL}/images/courses/${folder}/${file}`
    : `${process.env.PUBLIC_URL}/images/placeholder.png`;
};

export default getCourseImageSrc;
