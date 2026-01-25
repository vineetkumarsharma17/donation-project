import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import './GallerySectionScroll.css';

const GallerySectionScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', caption: 'Children enjoying books' },
        { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80', caption: 'Community library' },
        { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80', caption: 'Reading session' },
        { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80', caption: 'Volunteer team' },
        { url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80', caption: 'Book distribution' },
        { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80', caption: 'Workshop event' }
    ];

    return (
        <section id="gallery" className="gallery-section-scroll" ref={ref}>
            <div className="gallery-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                >
                    <span className="section-tag">Our Impact</span>
                    <h2 className="section-title">Gallery</h2>
                    <div className="title-underline"></div>
                </motion.div>

                <motion.div
                    className="gallery-grid"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="gallery-item"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img src={image.url} alt={image.caption} />
                            <div className="gallery-overlay">
                                <ZoomIn size={32} />
                                <p>{image.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <>
                        <motion.div
                            className="lightbox-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        />
                        <motion.div
                            className="lightbox-content"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                                <X size={32} />
                            </button>
                            <img src={selectedImage.url} alt={selectedImage.caption} />
                            <p className="lightbox-caption">{selectedImage.caption}</p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySectionScroll;
