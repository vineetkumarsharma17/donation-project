import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './MobileStickyDonateBar.css';

const MobileStickyDonateBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            // Show bar after scrolling 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDonateClick = () => {
        navigate('/donate');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="mobile-sticky-donate-bar"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="donate-bar-content">
                        <div className="donate-bar-text">
                            <p className="donate-bar-title">Support Education ❤️</p>
                            <p className="donate-bar-subtitle">Secure & Tax Deductible</p>
                        </div>

                        <motion.button
                            className="donate-bar-button"
                            onClick={handleDonateClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    '0 4px 15px rgba(74, 124, 44, 0.3)',
                                    '0 6px 25px rgba(74, 124, 44, 0.5)',
                                    '0 4px 15px rgba(74, 124, 44, 0.3)',
                                ]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            Donate Now
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileStickyDonateBar;
