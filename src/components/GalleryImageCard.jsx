import React from 'react';
import { motion } from 'framer-motion';
import './GalleryImageCard.css';

const GalleryImageCard = ({ image, index, onClick }) => {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08
            }
        }
    };

    const overlayVariants = {
        initial: { opacity: 0 },
        hover: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    const captionVariants = {
        initial: { y: 20, opacity: 0 },
        hover: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, delay: 0.1 }
        }
    };

    return (
        <motion.div
            className="gallery-image-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover="hover"
            onClick={() => onClick(image)}
        >
            <motion.img
                src={image.src}
                alt={image.caption}
                className="gallery-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
            />

            <motion.div
                className="gallery-overlay"
                variants={overlayVariants}
                initial="initial"
            >
                <motion.div
                    className="gallery-caption"
                    variants={captionVariants}
                >
                    <span className="caption-category">{image.category}</span>
                    <h3 className="caption-text">{image.caption}</h3>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default GalleryImageCard;
