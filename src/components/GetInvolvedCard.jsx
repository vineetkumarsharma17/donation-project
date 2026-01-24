import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './GetInvolvedCard.css';

const GetInvolvedCard = ({
    icon,
    title,
    description,
    buttonText,
    onButtonClick,
    delay = 0,
    color = '#4a7c2c'
}) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            className="get-involved-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            whileHover={{
                y: -15,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                borderColor: '#facc15'
            }}
        >
            <motion.div
                className="card-icon-wrapper"
                style={{ background: color }}
                whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                }}
            >
                {icon}
            </motion.div>

            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>

            <motion.button
                className="card-button"
                onClick={onButtonClick}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
            >
                {buttonText}
            </motion.button>
        </motion.div>
    );
};

export default GetInvolvedCard;
