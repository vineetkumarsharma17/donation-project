import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '../components/EventCard';
import EventRegistrationForm from '../components/EventRegistrationForm';
import './EventsPage.css';

const EventsPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const eventsData = [
        {
            id: 1,
            title: "Annual Book Fair & Distribution Drive",
            description: "Join us for our biggest book distribution event of the year, bringing thousands of books to children in need.",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop",
            location: "Community Center, Delhi",
            time: "10:00 AM - 4:00 PM",
            day: "15",
            month: "FEB"
        },
        {
            id: 2,
            title: "Reading Marathon for Rural Schools",
            description: "A 24-hour reading marathon to raise awareness and funds for establishing libraries in remote villages.",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
            location: "Online & Offline",
            time: "9:00 AM onwards",
            day: "22",
            month: "FEB"
        },
        {
            id: 3,
            title: "Volunteer Training Workshop",
            description: "Learn how to effectively teach reading skills and organize book donation drives in your community.",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
            location: "NGO Headquarters, Mumbai",
            time: "2:00 PM - 6:00 PM",
            day: "05",
            month: "MAR"
        },
        {
            id: 4,
            title: "Children's Storytelling Festival",
            description: "A magical day of stories, books, and imagination for children from underserved communities.",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2032&auto=format&fit=crop",
            location: "City Park, Bangalore",
            time: "11:00 AM - 5:00 PM",
            day: "12",
            month: "MAR"
        },
        {
            id: 5,
            title: "Digital Literacy Boot Camp",
            description: "Hands-on training for teachers on using e-readers and digital learning tools in classrooms.",
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
            location: "Tech Hub, Hyderabad",
            time: "9:30 AM - 3:30 PM",
            day: "20",
            month: "MAR"
        },
        {
            id: 6,
            title: "Community Book Swap Meet",
            description: "Bring your gently used books and exchange them with others while supporting our literacy mission.",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop",
            location: "Central Library, Pune",
            time: "10:00 AM - 2:00 PM",
            day: "28",
            month: "MAR"
        }
    ];

    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setShowRegistrationForm(true);
    };

    const handleCloseForm = () => {
        setShowRegistrationForm(false);
        setTimeout(() => setSelectedEvent(null), 300);
    };

    return (
        <div className="events-page">
            {/* Hero Section */}
            <motion.section
                className="events-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="events-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="events-hero-title">Upcoming Events</h1>
                    <p className="events-hero-subtitle">
                        Join us in making a difference. Participate in our events and help spread the joy of reading.
                    </p>
                </motion.div>
            </motion.section>

            {/* Events Grid */}
            <section className="events-grid-section">
                <div className="container">
                    <div className="events-grid">
                        {eventsData.map((event, index) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                index={index}
                                onRegisterClick={handleRegisterClick}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Form Modal */}
            <AnimatePresence>
                {showRegistrationForm && (
                    <EventRegistrationForm
                        event={selectedEvent}
                        onClose={handleCloseForm}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventsPage;
