import React, { useState } from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <div className="logo">
                            <Link to="/">
                                <img src="/logo.png" alt="Shailendrakumar Ajay - Helping Children, Changing Lives" className="logo-image" />
                            </Link>
                        </div>
                    </div>

                    <button
                        className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
                        <li className="navbar-item">
                            <Link to="/" className="navbar-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/about" className="navbar-link">About Us</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/programs" className="navbar-link">Programs</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/blog" className="navbar-link">Blog</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/events" className="navbar-link">Events</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/gallery" className="navbar-link">Gallery</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/contact" className="navbar-link">Contact</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/new-get-involved" className="navbar-link">Get Involved</Link>
                        </li>
                    </ul>

                    <div className="navbar-actions">
                        <Link to="/donate" className="btn btn-primary donate-btn">
                            Donate Now
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
