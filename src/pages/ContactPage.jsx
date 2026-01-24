import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, Heart, Users, MessageCircle } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const cardsRef = useRef(null);
    const formRef = useRef(null);
    const mapRef = useRef(null);
    const ctaRef = useRef(null);

    const areCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
    const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
    const isMapInView = useInView(mapRef, { once: true, margin: "-100px" });
    const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);

        setTimeout(() => {
            setIsSuccess(false);
            reset();
        }, 4000);
    };

    const contactCards = [
        {
            icon: <MapPin />,
            title: 'Visit Us',
            content: '123 Charity Street, City, Country',
            description: 'Come see our library and meet our team',
            color: '#4a7c2c',
            delay: 0
        },
        {
            icon: <Phone />,
            title: 'Call Us',
            content: '+1 (555) 123-4567',
            description: 'Mon - Fri, 9AM - 6PM',
            color: '#5a9638',
            delay: 0.1
        },
        {
            icon: <Mail />,
            title: 'Email Us',
            content: 'info@nala.org',
            description: 'We reply within 24 hours',
            color: '#facc15',
            delay: 0.2
        },
        {
            icon: <Users />,
            title: 'Volunteer With Us',
            content: 'Join Our Team',
            description: 'Make a difference in your community',
            color: '#f4c430',
            delay: 0.3
        }
    ];

    // WhatsApp integration
    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Hi! I'd like to learn more about donating books to NALA.");
        window.open(`https://wa.me/15551234567?text=${message}`, '_blank');
    };

    // Email integration
    const handleEmailClick = () => {
        window.location.href = 'mailto:info@nala.org?subject=Book Donation Inquiry';
    };

    return (
        <div className="contact-page-enhanced">
            {/* Hero Section with Illustration */}
            <motion.section
                className="contact-hero-enhanced"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-waves"></div>
                <div className="hero-content-wrapper">
                    <motion.div
                        className="hero-text-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Let's Connect for a Better Tomorrow
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            Together, we can spread literacy and change lives through the power of books.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="hero-illustration"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            className="floating-books"
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
                            className="floating-heart"
                            animate={{
                                y: [0, -15, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        >
                            💚
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Human-Style Contact Cards */}
            <section className="contact-cards-section" ref={cardsRef}>
                <div className="contact-cards-grid">
                    {contactCards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="contact-card-enhanced"
                            initial={{ opacity: 0, y: 50, rotateX: -15 }}
                            animate={areCardsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{ duration: 0.6, delay: card.delay }}
                            whileHover={{
                                y: -15,
                                rotateY: 5,
                                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                                borderColor: card.color
                            }}
                        >
                            <motion.div
                                className="card-icon"
                                style={{ background: card.color }}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: [0, -10, 10, 0],
                                    transition: { duration: 0.5 }
                                }}
                            >
                                {card.icon}
                            </motion.div>
                            <h3>{card.title}</h3>
                            <p className="card-content">{card.content}</p>
                            <p className="card-description">{card.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Split Layout: Illustration + Form */}
            <section className="split-section" ref={formRef}>
                <div className="split-container">
                    {/* Left: Illustration */}
                    <motion.div
                        className="split-illustration"
                        initial={{ opacity: 0, x: -100 }}
                        animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="illustration-content">
                            <motion.div
                                className="volunteer-icon"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                🤝
                            </motion.div>
                            <h3>We're Here to Help</h3>
                            <p>Whether you want to donate books, volunteer, or learn more about our mission, we'd love to hear from you.</p>

                            {/* Quick Contact Buttons */}
                            <div className="quick-contact-buttons">
                                <motion.button
                                    className="whatsapp-btn"
                                    onClick={handleWhatsAppClick}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        boxShadow: [
                                            "0 0 0 0 rgba(37, 211, 102, 0.4)",
                                            "0 0 0 15px rgba(37, 211, 102, 0)",
                                        ]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <MessageCircle size={20} />
                                    WhatsApp Us
                                </motion.button>

                                <motion.button
                                    className="email-btn"
                                    onClick={handleEmailClick}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Mail size={20} />
                                    Send Email
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        className="split-form"
                        initial={{ opacity: 0, x: 100 }}
                        animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>Send Us a Message</h2>
                        <p className="form-subtitle">Fill out the form and we'll get back to you soon 💚</p>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="enhanced-form">
                                {/* Name Field */}
                                <motion.div
                                    className="form-group-enhanced"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: { value: 2, message: "Name must be at least 2 characters" }
                                        })}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                            {errors.name.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Email Field */}
                                <motion.div
                                    className="form-group-enhanced"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                            {errors.email.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Subject Field */}
                                <motion.div
                                    className="form-group-enhanced"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        {...register("subject", { required: "Subject is required" })}
                                        className={errors.subject ? 'error' : ''}
                                    />
                                    {errors.subject && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                            {errors.subject.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Message Field */}
                                <motion.div
                                    className="form-group-enhanced"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                >
                                    <textarea
                                        placeholder="Your Message"
                                        rows="5"
                                        {...register("message", {
                                            required: "Message is required",
                                            minLength: { value: 10, message: "Message must be at least 10 characters" }
                                        })}
                                        className={errors.message ? 'error' : ''}
                                    ></textarea>
                                    {errors.message && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                            {errors.message.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className={`submit-btn-enhanced ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            className="loading-spinner"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            ⏳
                                        </motion.div>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        ) : (
                            <motion.div
                                className="success-message-enhanced"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="success-icon"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <Heart size={64} />
                                </motion.div>
                                <h3>Thank you for reaching out 💚</h3>
                                <p>We've received your message and will get back to you within 24 hours.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section-enhanced" ref={mapRef}>
                <motion.div
                    className="map-container-enhanced"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isMapInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Find Us Here</h2>
                    <div className="map-placeholder-enhanced">
                        <motion.div
                            className="location-pin"
                            animate={{
                                y: [0, -15, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <MapPin size={48} />
                        </motion.div>
                        <p className="location-address">123 Charity Street, City, Country</p>
                    </div>
                    <p className="trust-line">Visit us anytime during working hours. We'd love to show you around! 📖</p>
                </motion.div>
            </section>

            {/* Emotional CTA Section */}
            <section className="contact-cta-enhanced" ref={ctaRef}>
                <div className="cta-waves"></div>
                <motion.div
                    className="cta-content-enhanced"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Ready to Make a Difference?</h2>
                    <p>Every book you donate opens a new world of possibilities for someone in need.</p>
                    <div className="cta-buttons-enhanced">
                        <motion.button
                            className="cta-btn-primary"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    "0 0 0 0 rgba(250, 204, 21, 0.4)",
                                    "0 0 0 20px rgba(250, 204, 21, 0)",
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Donate Books Now
                        </motion.button>
                        <motion.button
                            className="cta-btn-secondary"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Become a Volunteer
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ContactPage;
