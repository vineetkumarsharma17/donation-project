import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Lock,
    Heart
} from 'lucide-react';
import './FooterNew.css';

const FooterNew = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-50px" });

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    const toggleAccordion = (section) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    const quickLinks = [
        { name: 'About Us', path: '/about', keywords: 'non-profit education organization' },
        { name: 'Programs', path: '/programs', keywords: 'education programs' },
        { name: 'Impact Stories', path: '/blog', keywords: 'success stories' },
        { name: 'Annual Reports', path: '/about#reports', keywords: 'transparency reports' },
        { name: 'Careers', path: '/about#careers', keywords: 'NGO jobs' }
    ];

    const getInvolvedLinks = [
        { name: 'Donate Books', path: '/donate', keywords: 'donate books NGO India' },
        { name: 'Volunteer', path: '/get-involved', keywords: 'volunteer for education NGO' },
        { name: 'Fundraise', path: '/get-involved#fundraise', keywords: 'fundraise for education' },
        { name: 'Partner with Us', path: '/contact', keywords: 'NGO partnership' },
        { name: 'Events', path: '/events', keywords: 'charity events' }
    ];

    const contactInfo = {
        address: '123 Education Street, Mumbai, Maharashtra, India',
        phone: '+91 98765 43210',
        email: 'info@shailendrakumarajay.org'
    };

    // JSON-LD Schema for SEO
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "Shailendrakumar Ajay",
        "alternateName": "Helping Children, Changing Lives",
        "url": "https://www.shailendrakumarajay.org",
        "logo": "https://www.shailendrakumarajay.org/logo.png",
        "description": "NGO for education and child welfare, dedicated to providing quality education to underprivileged children across India",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Education Street",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "Customer Service",
            "email": "info@shailendrakumarajay.org"
        },
        "sameAs": [
            "https://www.facebook.com/shailendrakumarajay",
            "https://twitter.com/shailendrakumar",
            "https://www.instagram.com/shailendrakumarajay",
            "https://www.linkedin.com/company/shailendrakumarajay"
        ],
        "keywords": "NGO for education, donate books NGO, child education charity, book donation India, volunteer for education NGO, non-profit education organization"
    };

    const AccordionSection = ({ title, children, sectionKey }) => (
        <div className="footer-accordion">
            <button
                className="accordion-header"
                onClick={() => toggleAccordion(sectionKey)}
                aria-expanded={activeAccordion === sectionKey}
                aria-controls={`accordion-${sectionKey}`}
            >
                <h4 className="footer-title">{title}</h4>
                <motion.div
                    animate={{ rotate: activeAccordion === sectionKey ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {activeAccordion === sectionKey && (
                    <motion.div
                        id={`accordion-${sectionKey}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="accordion-content"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <>
            {/* SEO Schema */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>

            <motion.footer
                className="footer-new"
                ref={footerRef}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                role="contentinfo"
                aria-label="Footer"
            >
                <div className="container">
                    {/* Newsletter Section */}
                    <motion.section
                        className="newsletter-section"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        aria-labelledby="newsletter-title"
                    >
                        <div className="newsletter-content">
                            <div className="newsletter-text">
                                <h3 id="newsletter-title">📚 Stay Connected</h3>
                                <p>Subscribe to our newsletter for updates on literacy programs and impact stories</p>
                            </div>
                            <form className="newsletter-form" onSubmit={handleSubscribe} aria-label="Newsletter subscription">
                                {!subscribed ? (
                                    <>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            aria-label="Email address"
                                            className="newsletter-input"
                                        />
                                        <motion.button
                                            type="submit"
                                            className="newsletter-button"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label="Subscribe to newsletter"
                                        >
                                            Subscribe
                                        </motion.button>
                                    </>
                                ) : (
                                    <motion.div
                                        className="subscribe-success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        ✓ Thank you for subscribing!
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.section>

                    {/* Donate CTA Section */}
                    <motion.section
                        className="donate-cta-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        aria-labelledby="donate-cta-title"
                    >
                        <div className="donate-cta-content">
                            <div className="donate-cta-text">
                                <Heart className="donate-heart-icon" size={32} />
                                <div>
                                    <h3 id="donate-cta-title">Your Small Help Can Change a Life</h3>
                                    <p>Support education for underprivileged children</p>
                                </div>
                            </div>
                            <Link to="/donate" className="donate-cta-button">
                                <motion.span
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                                >
                                    Donate Now
                                </motion.span>
                            </Link>
                            <div className="trust-signals">
                                <div className="trust-signal">
                                    <Lock size={14} />
                                    <span>100% Secure Payments</span>
                                </div>
                                <div className="trust-signal">
                                    <span>Tax Benefits Available</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Footer Main Grid */}
                    <div className="footer-content">
                        {/* Column 1 - Brand */}
                        <motion.div
                            className="footer-section footer-brand"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="footer-logo">
                                <img
                                    src="/logo.png"
                                    alt="Shailendrakumar Ajay - Helping Children, Changing Lives"
                                    className="footer-logo-image"
                                />
                            </div>
                            <p className="footer-description">
                                Empowering children through education and healthcare, creating lasting change in communities across India.
                            </p>
                            <div className="social-links" role="navigation" aria-label="Social media links">
                                <motion.a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Visit our Facebook page"
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Facebook size={20} />
                                </motion.a>
                                <motion.a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Visit our Twitter profile"
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Twitter size={20} />
                                </motion.a>
                                <motion.a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Visit our Instagram profile"
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Instagram size={20} />
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Visit our LinkedIn page"
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Linkedin size={20} />
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Column 2 - Quick Links */}
                        <motion.div
                            className="footer-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            {isMobile ? (
                                <AccordionSection title="Quick Links" sectionKey="quick-links">
                                    <nav aria-label="Quick links">
                                        <ul className="footer-links">
                                            {quickLinks.map((link, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={link.path}
                                                        aria-label={`Navigate to ${link.name}`}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </AccordionSection>
                            ) : (
                                <>
                                    <h4 className="footer-title">Quick Links</h4>
                                    <nav aria-label="Quick links">
                                        <ul className="footer-links">
                                            {quickLinks.map((link, index) => (
                                                <li key={index}>
                                                    <motion.div whileHover={{ x: 5 }}>
                                                        <Link
                                                            to={link.path}
                                                            aria-label={`Navigate to ${link.name}`}
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    </motion.div>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </>
                            )}
                        </motion.div>

                        {/* Column 3 - Get Involved */}
                        <motion.div
                            className="footer-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            {isMobile ? (
                                <AccordionSection title="Get Involved" sectionKey="get-involved">
                                    <nav aria-label="Get involved links">
                                        <ul className="footer-links">
                                            {getInvolvedLinks.map((link, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={link.path}
                                                        aria-label={`Navigate to ${link.name}`}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </AccordionSection>
                            ) : (
                                <>
                                    <h4 className="footer-title">Get Involved</h4>
                                    <nav aria-label="Get involved links">
                                        <ul className="footer-links">
                                            {getInvolvedLinks.map((link, index) => (
                                                <li key={index}>
                                                    <motion.div whileHover={{ x: 5 }}>
                                                        <Link
                                                            to={link.path}
                                                            aria-label={`Navigate to ${link.name}`}
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    </motion.div>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </>
                            )}
                        </motion.div>

                        {/* Column 4 - Contact */}
                        <motion.div
                            className="footer-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            {isMobile ? (
                                <AccordionSection title="Contact" sectionKey="contact">
                                    <address className="footer-contact">
                                        <div className="contact-item contact-card">
                                            <div className="contact-icon-wrapper">
                                                <MapPin size={24} className="contact-icon" />
                                            </div>
                                            <span>{contactInfo.address}</span>
                                        </div>
                                        <a href={`tel:${contactInfo.phone}`} className="contact-item contact-link contact-card">
                                            <div className="contact-icon-wrapper">
                                                <Phone size={24} className="contact-icon" />
                                            </div>
                                            <span>{contactInfo.phone}</span>
                                        </a>
                                        <a href={`mailto:${contactInfo.email}`} className="contact-item contact-link contact-card">
                                            <div className="contact-icon-wrapper">
                                                <Mail size={24} className="contact-icon" />
                                            </div>
                                            <span>{contactInfo.email}</span>
                                        </a>
                                    </address>
                                </AccordionSection>
                            ) : (
                                <>
                                    <h4 className="footer-title">Contact</h4>
                                    <address className="footer-contact">
                                        <motion.div
                                            className="contact-item contact-card"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="contact-icon-wrapper">
                                                <MapPin size={28} className="contact-icon" />
                                            </div>
                                            <span>{contactInfo.address}</span>
                                        </motion.div>
                                        <motion.a
                                            href={`tel:${contactInfo.phone}`}
                                            className="contact-item contact-link contact-card"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="contact-icon-wrapper">
                                                <Phone size={28} className="contact-icon" />
                                            </div>
                                            <span>{contactInfo.phone}</span>
                                        </motion.a>
                                        <motion.a
                                            href={`mailto:${contactInfo.email}`}
                                            className="contact-item contact-link contact-card"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="contact-icon-wrapper">
                                                <Mail size={28} className="contact-icon" />
                                            </div>
                                            <span>{contactInfo.email}</span>
                                        </motion.a>
                                    </address>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Bottom Bar */}
                    <motion.div
                        className="footer-bottom"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <p className="copyright">
                            © {currentYear} Shailendrakumar Ajay. All rights reserved.
                        </p>
                        <nav className="footer-legal" aria-label="Legal links">
                            <Link to="/privacy" aria-label="View privacy policy">Privacy Policy</Link>
                            <span className="separator" aria-hidden="true">|</span>
                            <Link to="/terms" aria-label="View terms of service">Terms of Service</Link>
                            <span className="separator" aria-hidden="true">|</span>
                            <Link to="/cookies" aria-label="View cookie policy">Cookie Policy</Link>
                        </nav>
                    </motion.div>
                </div>
            </motion.footer>
        </>
    );
};

export default FooterNew;
