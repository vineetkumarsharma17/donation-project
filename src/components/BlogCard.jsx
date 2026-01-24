import React from 'react';
import { motion } from 'framer-motion';
import './BlogCard.css';

const BlogCard = ({ blog, index }) => {
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
            y: -10,
            transition: { duration: 0.3 }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.1,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.article
            className="blog-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="blog-card-image-wrapper">
                <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-card-image"
                    variants={imageVariants}
                />
                <span className="blog-category-tag">{blog.category}</span>
            </div>

            <div className="blog-card-content">
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>

                <div className="blog-card-footer">
                    <span className="blog-date">{blog.date}</span>
                    <a href="#" className="blog-read-more">
                        Read More →
                    </a>
                </div>
            </div>
        </motion.article>
    );
};

export default BlogCard;
