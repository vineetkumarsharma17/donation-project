import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import './BlogSectionScroll.css';

const BlogSectionScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const blogs = [
        {
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
            title: 'The Power of Reading: Transforming Young Minds',
            excerpt: 'Discover how access to books is changing lives in rural communities across India.',
            author: 'Priya Sharma',
            date: 'Jan 20, 2026',
            category: 'Impact Stories'
        },
        {
            image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
            title: 'Building Community Libraries: A Step-by-Step Guide',
            excerpt: 'Learn how we establish sustainable learning centers in underserved areas.',
            author: 'Rahul Mehta',
            date: 'Jan 15, 2026',
            category: 'Programs'
        },
        {
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
            title: 'Volunteer Spotlight: Making a Difference Together',
            excerpt: 'Meet the amazing volunteers who dedicate their time to our mission.',
            author: 'Anjali Patel',
            date: 'Jan 10, 2026',
            category: 'Community'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <section id="blog" className="blog-section-scroll" ref={ref}>
            <div className="blog-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">Latest Updates</span>
                    <h2 className="section-title">From Our Blog</h2>
                    <div className="title-underline"></div>
                </motion.div>

                <motion.div
                    className="blog-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {blogs.map((blog, index) => (
                        <motion.article
                            key={index}
                            className="blog-card"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="blog-image-wrapper">
                                <img src={blog.image} alt={blog.title} />
                                <span className="blog-category">{blog.category}</span>
                            </div>

                            <div className="blog-content">
                                <h3 className="blog-title">{blog.title}</h3>
                                <p className="blog-excerpt">{blog.excerpt}</p>

                                <div className="blog-meta">
                                    <div className="meta-item">
                                        <User size={16} />
                                        <span>{blog.author}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Calendar size={16} />
                                        <span>{blog.date}</span>
                                    </div>
                                </div>

                                <motion.button
                                    className="blog-read-more"
                                    whileHover={{ gap: '1rem' }}
                                >
                                    Read More <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                <motion.div
                    className="blog-view-all"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button
                        className="view-all-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Articles
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogSectionScroll;
