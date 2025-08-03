import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsMenuOpen(false); // Close menu after logout
    navigate('/about');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close menu on link click
  };

  const authPaths = ['/login', '/register', '/forgot-password'];
  const isAuthPage = authPaths.includes(location.pathname);

  return (
    <header className="header">
      <h1 className="logo">Eduverse</h1>

      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        {isAuthPage ? (
          <Link to="/about" onClick={handleLinkClick}>About</Link>
        ) : !isLoggedIn ? (
          <>
            <Link to="/about" onClick={handleLinkClick}>About</Link>
            <Link to="/admin" onClick={handleLinkClick}>Admin</Link>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          </>
        ) : location.pathname.startsWith('/admin-dashboard') ? (
          <>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/home" onClick={handleLinkClick}>Home</Link>
            <Link to="/courses" onClick={handleLinkClick}>Courses</Link>
            <Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
