import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BookHeart, Users, Calendar, Megaphone, CheckCircle, Heart, Mail, Phone, User, MessageSquare } from 'lucide-react';
import './NewGetInvolvedPage.css';

// Reusable GetInvolvedCard Component
const GetInvolvedCard = ({ icon, title, description, buttonText, onClick, delay = 0 }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            className="involvement-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 3px rgba(250, 204, 21, 0.3)"
            }}
        >
            <motion.div
                className="card-icon"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {icon}
            </motion.div>
            <h3>{title}</h3>
            <p>{description}</p>
            <motion.button
                className="card-button"
                onClick={onClick}
                whileHover={{
                    scale: 1.05,
                    background: "linear-gradient(135deg, #facc15, #f4c430)"
                }}
                whileTap={{ scale: 0.95 }}
            >
                {buttonText}
            </motion.button>
        </motion.div>
    );
};

const NewGetInvolvedPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const formRef = useRef(null);
    const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // Real API Integration
            const response = await fetch('http://localhost:5001/api/volunteer/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                // If the backend returns an error (400, 500 etc)
                throw new Error(result.message || 'Submission failed');
            }

            console.log('Success:', result);
            setIsSubmitting(false);
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
                reset();
            }, 5000);

        } catch (error) {
            console.error('Submission Error:', error);
            setIsSubmitting(false);
            alert(`Failed to submit: ${error.message}. Please make sure the backend server is running on port 5000.`);
        }
    };

    const involvementOptions = [
        {
            icon: <BookHeart size={48} />,
            title: "Donate Books",
            description: "Share your books and spread knowledge to those who need it most. Every book makes a difference.",
            buttonText: "Donate Now",
            onClick: () => navigate('/donate')
        },
        {
            icon: <Users size={48} />,
            title: "Volunteer",
            description: "Join our team of passionate volunteers and help organize book drives and literacy programs.",
            buttonText: "Join as Volunteer",
            onClick: () => document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            icon: <Calendar size={48} />,
            title: "Join Events",
            description: "Participate in our community events, book fairs, and reading sessions to make an impact.",
            buttonText: "View Events",
            onClick: () => navigate('/events')
        },
        {
            icon: <Megaphone size={48} />,
            title: "Spread Awareness",
            description: "Share our mission on social media and help us reach more people who want to make a difference.",
            buttonText: "Share Now",
            onClick: () => console.log("Spread Awareness")
        }
    ];

    return (
        <div className="new-get-involved-page">
            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Animated Background Pattern */}
                <div className="hero-background">
                    <motion.div
                        className="floating-book book-1"
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        📚
                    </motion.div>
                    <motion.div
                        className="floating-book book-2"
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, -5, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    >
                        📖
                    </motion.div>
                    <motion.div
                        className="floating-leaf leaf-1"
                        animate={{
                            y: [0, -25, 0],
                            x: [0, 10, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        🍃
                    </motion.div>
                    <motion.div
                        className="floating-leaf leaf-2"
                        animate={{
                            y: [0, -15, 0],
                            x: [0, -10, 0]
                        }}
                        transition={{
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    >
                        🌿
                    </motion.div>
                </div>

                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Get Involved
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Your time, books, and voice can change lives.
                    </motion.p>
                </div>
            </motion.section>

            {/* Involvement Cards Section */}
            <section className="involvement-cards-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Ways to Make a Difference</h2>
                    <p>Choose how you'd like to contribute to our mission</p>
                </motion.div>

                <div className="cards-grid">
                    {involvementOptions.map((option, index) => (
                        <GetInvolvedCard
                            key={index}
                            icon={option.icon}
                            title={option.title}
                            description={option.description}
                            buttonText={option.buttonText}
                            onClick={option.onClick}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </section>

            {/* Volunteer Form Section */}
            <section className="volunteer-form-section" id="volunteer-form" ref={formRef}>
                <motion.div
                    className="form-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isFormInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <div className="form-header">
                        <motion.div
                            className="form-icon"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={isFormInView ? { scale: 1, rotate: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                        >
                            <Heart size={40} />
                        </motion.div>
                        <h2>Join Our Volunteer Team</h2>
                        <p>Fill out the form below and we'll get in touch with you soon!</p>
                    </div>

                    {!isSuccess ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="volunteer-form">
                            {/* Full Name */}
                            <motion.div
                                className="form-field"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <div className="input-wrapper">
                                    <User className="input-icon" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: { value: 2, message: "Name must be at least 2 characters" }
                                        })}
                                        className={errors.name ? 'error' : ''}
                                    />
                                </div>
                                {errors.name && (
                                    <motion.span
                                        className="error-message"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {errors.name.message}
                                    </motion.span>
                                )}
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                className="form-field"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={20} />
                                    <input
                                        type="email"
                                        placeholder="Email Address *"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={errors.email ? 'error' : ''}
                                    />
                                </div>
                                {errors.email && (
                                    <motion.span
                                        className="error-message"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {errors.email.message}
                                    </motion.span>
                                )}
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                className="form-field"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="input-wrapper">
                                    <Phone className="input-icon" size={20} />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number (+91) *"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9+\-\s()]+$/,
                                                message: "Invalid phone number"
                                            }
                                        })}
                                        className={errors.phone ? 'error' : ''}
                                    />
                                </div>
                                {errors.phone && (
                                    <motion.span
                                        className="error-message"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {errors.phone.message}
                                    </motion.span>
                                )}
                            </motion.div>

                            {/* Availability */}
                            <motion.div
                                className="form-field"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <select
                                    {...register("availability", { required: "Please select your availability" })}
                                    className={errors.availability ? 'error' : ''}
                                >
                                    <option value="">Select Availability *</option>
                                    <option value="weekdays">Weekdays</option>
                                    <option value="weekends">Weekends</option>
                                    <option value="flexible">Flexible</option>
                                </select>
                                {errors.availability && (
                                    <motion.span
                                        className="error-message"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {errors.availability.message}
                                    </motion.span>
                                )}
                            </motion.div>

                            {/* Area of Interest */}
                            <motion.div
                                className="form-field"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <select
                                    {...register("interest", { required: "Please select your area of interest" })}
                                    className={errors.interest ? 'error' : ''}
                                >
                                    <option value="">Area of Interest *</option>
                                    <option value="teaching">Teaching</option>
                                    <option value="collection">Book Collection</option>
                                    <option value="events">Events</option>
                                    <option value="logistics">Logistics</option>
                                </select>
                                {errors.interest && (
                                    <motion.span
                                        className="error-message"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {errors.interest.message}
                                    </motion.span>
                                )}
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                className="form-field"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <div className="input-wrapper">
                                    <MessageSquare className="input-icon" size={20} />
                                    <textarea
                                        placeholder="Tell us why you want to volunteer (optional)"
                                        rows="4"
                                        {...register("message")}
                                    ></textarea>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className={`premium-volunteer-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                whileHover={!isSubmitting ? {
                                    scale: 1.02,
                                    y: -3,
                                    boxShadow: "0 10px 30px rgba(74, 124, 44, 0.4)"
                                } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        className="spinner"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                ) : (
                                    "Join as Volunteer"
                                )}
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            className="success-state"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="success-icon"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            >
                                <CheckCircle size={80} />
                            </motion.div>
                            <h3>Thank You! 🎉</h3>
                            <p>We've received your application. Our team will contact you within 48 hours.</p>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* Call-to-Action Section */}

        </div>
    );
};

export default NewGetInvolvedPage;
