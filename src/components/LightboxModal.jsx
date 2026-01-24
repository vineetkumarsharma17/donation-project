import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LightboxModal.css';

const LightboxModal = ({ image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && hasNext) onNext();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev, hasNext, hasPrev]);

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            className="lightbox-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <motion.div
                className="lightbox-modal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <motion.button
                    className="lightbox-close"
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    ✕
                </motion.button>

                <AnimatePresence mode="wait">
                    <motion.img
                        key={image.id}
                        src={image.src}
                        alt={image.caption}
                        className="lightbox-image"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    />
                </AnimatePresence>

                <div className="lightbox-caption-container">
                    <span className="lightbox-category">{image.category}</span>
                    <h3 className="lightbox-caption">{image.caption}</h3>
                </div>

                {hasPrev && (
                    <motion.button
                        className="lightbox-nav lightbox-prev"
                        onClick={onPrev}
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        ‹
                    </motion.button>
                )}

                {hasNext && (
                    <motion.button
                        className="lightbox-nav lightbox-next"
                        onClick={onNext}
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        ›
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    );
};

export default LightboxModal;
