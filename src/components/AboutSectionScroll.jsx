import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Award } from 'lucide-react';
import './AboutSectionScroll.css';

const AboutSectionScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <section id="about" className="about-section-scroll" ref={ref}>
            <div className="about-container">
                <motion.div
                    className="about-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Section Header */}
                    <motion.div className="section-header" variants={itemVariants}>
                        <span className="section-tag">Who We Are</span>
                        <h2 className="section-title">About SHAILENDRA KUMAR AJAY FOUNDATION</h2>
                        <div className="title-underline"></div>
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="about-grid">
                        {/* Left: Image */}
                        <motion.div
                            className="about-image-wrapper"
                            variants={itemVariants}
                        >
                            <div className="about-image">
                                <img
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                                    alt="Children reading books"
                                />
                                <div className="image-overlay">
                                    <div className="overlay-stat">
                                        <h3>15+</h3>
                                        <p>Years of Impact</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Text Content */}
                        <motion.div
                            className="about-text-content"
                            variants={itemVariants}
                        >
                            <h3 className="about-subtitle">Our Story</h3>
                            <p className="about-description">
                                Founded in 2009, SHAILENDRA KUMAR AJAY FOUNDATION began with a simple mission: to ensure every child has access
                                to quality educational resources. What started as a small book donation drive has grown into
                                a nationwide movement, touching the lives of thousands of children across India.
                            </p>
                            <p className="about-description">
                                We believe that education is the foundation of a better future. Through our programs, we've
                                distributed over 50,000 books, established community libraries, and provided educational
                                support to underprivileged children in rural and urban areas.
                            </p>

                            {/* Mission, Vision, Values */}
                            <div className="about-values">
                                <div className="value-card">
                                    <div className="value-icon">
                                        <Target size={32} />
                                    </div>
                                    <div>
                                        <h4>Our Mission</h4>
                                        <p>To provide quality education and resources to every child, regardless of their background.</p>
                                    </div>
                                </div>

                                <div className="value-card">
                                    <div className="value-icon">
                                        <Eye size={32} />
                                    </div>
                                    <div>
                                        <h4>Our Vision</h4>
                                        <p>A world where every child has the opportunity to learn, grow, and achieve their dreams.</p>
                                    </div>
                                </div>

                                <div className="value-card">
                                    <div className="value-icon">
                                        <Award size={32} />
                                    </div>
                                    <div>
                                        <h4>Our Values</h4>
                                        <p>Integrity, compassion, excellence, and a commitment to making a lasting difference.</p>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                className="about-cta-btn"
                                whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(45, 80, 22, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Learn More About Us
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSectionScroll;
