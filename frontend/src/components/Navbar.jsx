import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import '../styles/Navbar.css';  

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);  


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <span className="app-name">NO CHURN</span>
        </Link>
      </div>

      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>

        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">Prediction</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
       
      </div>
    </nav>
  );
};

export default Navbar;
