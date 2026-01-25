import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, X } from 'lucide-react';
import './EventsSectionScroll.css';

const EventsSectionScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            title: 'Annual Book Drive 2026',
            date: 'Feb 15, 2026',
            time: '10:00 AM - 4:00 PM',
            location: 'Community Center, Delhi',
            attendees: '200+',
            image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80',
            description: 'Join us for our biggest book collection event of the year!'
        },
        {
            title: 'Volunteer Training Workshop',
            date: 'Feb 22, 2026',
            time: '2:00 PM - 5:00 PM',
            location: 'NGO Office, Mumbai',
            attendees: '50+',
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80',
            description: 'Learn how to make a bigger impact as a volunteer.'
        },
        {
            title: 'Reading Festival for Kids',
            date: 'Mar 5, 2026',
            time: '11:00 AM - 3:00 PM',
            location: 'City Park, Bangalore',
            attendees: '500+',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
            description: 'A fun-filled day of stories, books, and activities for children.'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="events" className="events-section-scroll" ref={ref}>
            <div className="events-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                >
                    <span className="section-tag">Join Us</span>
                    <h2 className="section-title">Upcoming Events</h2>
                    <div className="title-underline"></div>
                </motion.div>

                <motion.div
                    className="events-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            className="event-card"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="event-image">
                                <img src={event.image} alt={event.title} />
                                <div className="event-date-badge">
                                    <Calendar size={20} />
                                    <span>{event.date}</span>
                                </div>
                            </div>

                            <div className="event-content">
                                <h3 className="event-title">{event.title}</h3>

                                <div className="event-details">
                                    <div className="detail-item">
                                        <Clock size={18} />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="detail-item">
                                        <MapPin size={18} />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="detail-item">
                                        <Users size={18} />
                                        <span>{event.attendees} Expected</span>
                                    </div>
                                </div>

                                <motion.button
                                    className="event-register-btn"
                                    onClick={() => setSelectedEvent(event)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Register Now
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Registration Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <>
                        <motion.div
                            className="modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                        />
                        <motion.div
                            className="modal-content"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        >
                            <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                                <X size={24} />
                            </button>
                            <h3>Register for {selectedEvent.title}</h3>
                            <p>{selectedEvent.description}</p>
                            <form className="registration-form">
                                <input type="text" placeholder="Your Name" required />
                                <input type="email" placeholder="Your Email" required />
                                <input type="tel" placeholder="Phone Number" required />
                                <button type="submit">Complete Registration</button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default EventsSectionScroll;
