import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css" 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
 <>
 <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Your Logo
        </Link>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/home" className="navbar-item" onClick={toggleNavbar}>
            Home
          </Link>
          <Link to="/about" className="navbar-item" onClick={toggleNavbar}>
            About
          </Link>
          <Link to="/contact" className="navbar-item" onClick={toggleNavbar}>
            Contact
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleNavbar}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
 </>
  );
}

export default Navbar;
