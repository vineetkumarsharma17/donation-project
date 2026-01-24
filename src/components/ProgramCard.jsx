import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './ProgramCard.css';

const ProgramCard = ({ title, description, icon, index }) => {
    // Variants for staggered entrance animation
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2 // Stagger effect based on index
            }
        },
        hover: {
            y: -10,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    // Icon animation on card hover
    const iconVariants = {
        hover: {
            scale: 1.15,
            rotate: 5,
            transition: { type: "spring", stiffness: 300 }
        }
    };

    return (
        <motion.div
            className="program-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-50px" }}
        >
            <motion.div className="card-icon-wrapper" variants={iconVariants}>
                {icon}
            </motion.div>

            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>

            <button className="learn-more-btn">
                Learn More <FaArrowRight style={{ fontSize: '0.8em' }} />
            </button>
        </motion.div>
    );
};

export default ProgramCard;
