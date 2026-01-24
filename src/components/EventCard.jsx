import React from 'react';
import { motion } from 'framer-motion';
import './EventCard.css';

const EventCard = ({ event, index, onRegisterClick }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.15
            }
        },
        hover: {
            y: -12,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.08,
            transition: { duration: 0.4 }
        }
    };

    const badgeVariants = {
        hover: {
            scale: 1.15,
            rotate: 5,
            transition: { type: "spring", stiffness: 300 }
        }
    };

    return (
        <motion.article
            className="event-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="event-card-image-wrapper">
                <motion.img
                    src={event.image}
                    alt={event.title}
                    className="event-card-image"
                    variants={imageVariants}
                />
                <motion.div
                    className="event-date-badge"
                    variants={badgeVariants}
                >
                    <span className="badge-day">{event.day}</span>
                    <span className="badge-month">{event.month}</span>
                </motion.div>
            </div>

            <div className="event-card-content">
                <h3 className="event-card-title">{event.title}</h3>

                <div className="event-details">
                    <div className="event-detail-item">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{event.location}</span>
                    </div>
                    <div className="event-detail-item">
                        <span className="detail-icon">🕒</span>
                        <span className="detail-text">{event.time}</span>
                    </div>
                </div>

                <p className="event-description">{event.description}</p>

                <motion.button
                    className="register-btn"
                    onClick={() => onRegisterClick(event)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Register Now
                </motion.button>
            </div>
        </motion.article>
    );
};

export default EventCard;
