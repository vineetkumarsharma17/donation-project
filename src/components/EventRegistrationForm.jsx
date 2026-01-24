import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EventRegistrationForm.css';

const EventRegistrationForm = ({ event, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventId: event?.id || '',
        participants: '1',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 2500);
        }, 500);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.3 }
        }
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4
            }
        })
    };

    const successVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            className="registration-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="registration-form-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div key="form" exit={{ opacity: 0 }}>
                            <div className="form-header">
                                <h2 className="form-title">Event Registration</h2>
                                {event && <p className="form-event-name">{event.title}</p>}
                                <button className="close-btn" onClick={onClose}>✕</button>
                            </div>

                            <form onSubmit={handleSubmit} className="registration-form">
                                <motion.div
                                    className={`form-field ${focusedField === 'name' ? 'focused' : ''}`}
                                    custom={0}
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </motion.div>

                                <motion.div
                                    className={`form-field ${focusedField === 'email' ? 'focused' : ''}`}
                                    custom={1}
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </motion.div>

                                <motion.div
                                    className={`form-field ${focusedField === 'phone' ? 'focused' : ''}`}
                                    custom={2}
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </motion.div>

                                <motion.div
                                    className={`form-field ${focusedField === 'participants' ? 'focused' : ''}`}
                                    custom={3}
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <label htmlFor="participants">Number of Participants</label>
                                    <select
                                        id="participants"
                                        name="participants"
                                        value={formData.participants}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('participants')}
                                        onBlur={() => setFocusedField(null)}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </motion.div>

                                <motion.div
                                    className={`form-field ${focusedField === 'message' ? 'focused' : ''}`}
                                    custom={4}
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <label htmlFor="message">Message (Optional)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        rows="4"
                                        placeholder="Any special requirements or questions?"
                                    />
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="submit-btn"
                                    custom={5}
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 30px rgba(45, 95, 63, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Complete Registration
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            className="success-message"
                            variants={successVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="success-checkmark"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    delay: 0.2
                                }}
                            >
                                ✓
                            </motion.div>
                            <h3>Registration Successful!</h3>
                            <p>Thank you for registering. We've sent a confirmation email to {formData.email}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default EventRegistrationForm;
