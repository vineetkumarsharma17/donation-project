import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Heart } from 'lucide-react';
import './ProgramsSectionScroll.css';

const ProgramsSectionScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const programs = [
        {
            icon: BookOpen,
            title: 'Book Donation Drive',
            description: 'Collecting and distributing books to children in underserved communities across India.',
            stats: '25,000+ books distributed',
            color: '#2d5016'
        },
        {
            icon: GraduationCap,
            title: 'Education Support',
            description: 'Providing scholarships, tutoring, and educational materials to help children succeed.',
            stats: '5,000+ students supported',
            color: '#3d6b1f'
        },
        {
            icon: Users,
            title: 'Community Outreach',
            description: 'Building libraries and learning centers in rural areas to promote literacy and learning.',
            stats: '50+ libraries established',
            color: '#4d7b2f'
        },
        {
            icon: Heart,
            title: 'Mentorship Program',
            description: 'Connecting volunteers with students to provide guidance, support, and inspiration.',
            stats: '1,000+ mentor matches',
            color: '#2d5016'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <section id="programs" className="programs-section-scroll" ref={ref}>
            <div className="programs-container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">What We Do</span>
                    <h2 className="section-title">Our Programs</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        We run multiple initiatives to ensure every child has access to quality education and learning resources.
                    </p>
                </motion.div>

                {/* Programs Grid */}
                <motion.div
                    className="programs-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            className="program-card"
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                boxShadow: '0 20px 50px rgba(45, 80, 22, 0.2)'
                            }}
                        >
                            <div className="program-icon-wrapper" style={{ backgroundColor: program.color }}>
                                <program.icon size={40} className="program-icon" />
                            </div>

                            <h3 className="program-title">{program.title}</h3>
                            <p className="program-description">{program.description}</p>

                            <div className="program-stats">
                                <span className="stats-icon">📊</span>
                                <span className="stats-text">{program.stats}</span>
                            </div>

                            <motion.button
                                className="program-learn-more"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Learn More →
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="programs-cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h3>Want to support our programs?</h3>
                    <p>Your contribution can make a real difference in a child's life.</p>
                    <div className="cta-buttons">
                        <motion.button
                            className="cta-donate"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 215, 0, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Donate Now
                        </motion.button>
                        <motion.button
                            className="cta-volunteer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Become a Volunteer
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProgramsSectionScroll;
