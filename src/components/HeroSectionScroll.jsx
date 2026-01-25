import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Users, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HeroSectionScroll.css';
import './HeroRedesign.css';

const HeroSectionScroll = () => {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        navigate('/donate');
    };

    return (
        <section id="home" className="hero-section-scroll">
            {/* Background with overlay */}
            <div className="hero-background" />
            <div className="hero-overlay" />

            <div className="hero-content-wrapper">
                {/* Left Content */}
                <motion.div
                    className="hero-text-content"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Empowering Through
                        <span className="hero-highlight">Education</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Join us in our mission to provide books and educational resources to underprivileged children.
                        Every donation brings hope and knowledge to those who need it most.
                    </motion.p>

                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <div className="stat-item">
                            <BookOpen className="stat-icon" />
                            <div>
                                <h3>50,000+</h3>
                                <p>Books Donated</p>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Users className="stat-icon" />
                            <div>
                                <h3>10,000+</h3>
                                <p>Children Helped</p>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Heart className="stat-icon" />
                            <div>
                                <h3>500+</h3>
                                <p>Volunteers</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-cta-buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <motion.button
                            className="cta-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                        <motion.button
                            className="cta-tertiary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Watch Video
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Right CTA Card */}
                <motion.div
                    className="hero-cta-card"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                >
                    <motion.div
                        className="cta-card-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <motion.div
                            className="cta-icon-wrapper"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart size={64} fill="#facc15" color="#facc15" />
                        </motion.div>

                        <h2 className="cta-card-title">Make a Difference Today</h2>
                        <p className="cta-card-description">
                            Your contribution provides books and hope to children who need it most.
                        </p>

                        <motion.button
                            className="hero-donate-btn"
                            onClick={handleDonateClick}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 40px rgba(250, 204, 21, 0.6)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    '0 0 20px rgba(250, 204, 21, 0.4)',
                                    '0 0 40px rgba(250, 204, 21, 0.6)',
                                    '0 0 20px rgba(250, 204, 21, 0.4)',
                                ]
                            }}
                            transition={{
                                boxShadow: {
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            Donate Now
                            <ArrowRight size={20} />
                        </motion.button>

                        <div className="cta-trust-badge">
                            <Lock size={16} />
                            <span>Secure & Tax Deductible</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            >
                <div className="scroll-arrow">↓</div>
                <p>Scroll to explore</p>
            </motion.div>
        </section>
    );
};

export default HeroSectionScroll;
