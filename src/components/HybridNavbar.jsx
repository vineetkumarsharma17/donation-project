import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './HybridNavbar.css';

const HybridNavbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
    const navRef = useRef(null);
    const location = useLocation();

    const menuItems = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'about', label: 'About Us', path: '/about' },
        { id: 'programs', label: 'Programs', path: '/programs' },
        { id: 'blog', label: 'Blog', path: '/blog' },
        { id: 'events', label: 'Events', path: '/events' },
        { id: 'gallery', label: 'Gallery', path: '/gallery' },
        { id: 'contact', label: 'Contact', path: '/contact' },
        { id: 'get-involved', label: 'Get Involved', path: '/get-involved' },
    ];

    useEffect(() => {
        // Update underline position when active section changes
        if (navRef.current && !isMobileMenuOpen) {
            const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`);
            if (activeLink) {
                const { offsetLeft, offsetWidth } = activeLink;
                setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
            }
        }
    }, [activeSection, isMobileMenuOpen]);

    // Update active section based on current route
    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = menuItems.find(item => item.path === currentPath);
        if (currentItem) {
            setActiveSection(currentItem.id);
        }
    }, [location.pathname]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="hybrid-navbar" role="navigation" aria-label="Main navigation">
            <div className="navbar-container">
                {/* Logo */}
                <RouterLink to="/" className="navbar-logo">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        BookHope NGO
                    </motion.h1>
                </RouterLink>

                {/* Desktop Menu - Always use Router Navigation */}
                <div className="navbar-menu-desktop" ref={navRef}>
                    {menuItems.map((item) => (
                        <RouterLink
                            key={item.id}
                            to={item.path}
                            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                            data-section={item.id}
                            aria-label={`Navigate to ${item.label}`}
                        >
                            {item.label}
                        </RouterLink>
                    ))}

                    {/* Animated Underline */}
                    <motion.div
                        className="nav-underline"
                        animate={{
                            left: underlineStyle.left,
                            width: underlineStyle.width,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                </div>

                {/* Donate Button */}
                <motion.div
                    className="navbar-donate-btn"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RouterLink
                        to="/donate"
                        className="donate-button"
                        aria-label="Donate Now"
                    >
                        Donate Now
                    </RouterLink>
                </motion.div>

                {/* Mobile Hamburger Icon */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileMenuOpen}
                >
                    <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="mobile-menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMobileMenu}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            className="mobile-menu-panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <motion.div
                                className="mobile-menu-items"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: {
                                        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                                    },
                                    closed: {
                                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                    }
                                }}
                            >
                                {menuItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={{
                                            open: {
                                                y: 0,
                                                opacity: 1,
                                                transition: {
                                                    y: { stiffness: 1000, velocity: -100 }
                                                }
                                            },
                                            closed: {
                                                y: 50,
                                                opacity: 0,
                                                transition: {
                                                    y: { stiffness: 1000 }
                                                }
                                            }
                                        }}
                                    >
                                        <RouterLink
                                            to={item.path}
                                            onClick={closeMobileMenu}
                                            className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                                            aria-label={`Navigate to ${item.label}`}
                                        >
                                            {item.label}
                                        </RouterLink>
                                    </motion.div>
                                ))}

                                {/* Mobile Donate Button */}
                                <motion.div
                                    variants={{
                                        open: { y: 0, opacity: 1 },
                                        closed: { y: 50, opacity: 0 }
                                    }}
                                    className="mobile-donate-wrapper"
                                >
                                    <RouterLink
                                        to="/donate"
                                        onClick={closeMobileMenu}
                                        className="mobile-donate-button"
                                        aria-label="Donate Now"
                                    >
                                        Donate Now
                                    </RouterLink>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default HybridNavbar;
