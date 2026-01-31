import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import './BlogPage.css';

const BlogPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = ['All', 'Education', 'Stories', 'Impact'];

    const blogsData = [
        {
            id: 1,
            title: "Transforming Lives Through Literacy in Rural Bihar",
            excerpt: "Meet Anjali, a 10-year-old girl whose life changed when our mobile library reached her village. Her story of determination inspires us every day.",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
            category: "Stories",
            date: "Jan 15, 2026",
            featured: true
        },
        {
            id: 2,
            title: "How Digital Libraries Are Bridging the Education Gap",
            excerpt: "Exploring the impact of e-readers and digital content in remote communities where physical books are scarce.",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
            category: "Education",
            date: "Jan 12, 2026"
        },
        {
            id: 3,
            title: "5000 Books Donated: A Milestone Celebration",
            excerpt: "Celebrating our recent achievement of distributing 5,000 books across 50 schools in underserved regions.",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop",
            category: "Impact",
            date: "Jan 8, 2026"
        },
        {
            id: 4,
            title: "Teacher Training: Empowering Educators for Tomorrow",
            excerpt: "Our recent workshop equipped 100+ teachers with modern pedagogical tools and innovative teaching methods.",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
            category: "Education",
            date: "Jan 5, 2026"
        },
        {
            id: 5,
            title: "From Darkness to Light: Ravi's Reading Journey",
            excerpt: "A heartwarming story of a young boy who discovered the world of books and dreams of becoming a writer.",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2032&auto=format&fit=crop",
            category: "Stories",
            date: "Dec 28, 2025"
        },
        {
            id: 6,
            title: "Community Reading Circles: Building Social Bonds",
            excerpt: "How weekly reading sessions are creating stronger communities and fostering a love for literature.",
            image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
            category: "Impact",
            date: "Dec 22, 2025"
        }
    ];

    const filteredBlogs = activeCategory === 'All'
        ? blogsData
        : blogsData.filter(blog => blog.category === activeCategory);

    const featuredBlog = blogsData.find(blog => blog.featured);

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <motion.section
                className="blog-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="blog-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="blog-hero-title">Stories That Inspire Change</h1>
                    <p className="blog-hero-subtitle text-white">
                        Discover the impact of education, the power of books, and the voices of communities we serve.
                    </p>
                </motion.div>
            </motion.section>

            {/* Featured Blog Section */}
            {featuredBlog && (
                <section className="featured-blog-section">
                    <div className="container">
                        <motion.div
                            className="featured-blog-card"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="featured-blog-image-wrapper">
                                <motion.img
                                    src={featuredBlog.image}
                                    alt={featuredBlog.title}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                            <div className="featured-blog-content">
                                <span className="featured-tag">Featured Story</span>
                                <h2 className="featured-blog-title">{featuredBlog.title}</h2>
                                <p className="featured-blog-excerpt">{featuredBlog.excerpt}</p>
                                <button className="read-full-story-btn">Read Full Story →</button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Category Filter Tabs */}
            <section className="blog-filter-section">
                <div className="container">
                    <div className="category-tabs">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="blog-grid-section">
                <div className="container">
                    <motion.div
                        className="blog-grid"
                        key={activeCategory}
                    >
                        {filteredBlogs.map((blog, index) => (
                            <BlogCard key={blog.id} blog={blog} index={index} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Newsletter CTA Section */}
            <motion.section
                className="newsletter-cta"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <div className="container">
                    <h2 className="newsletter-title">Stay Connected with Our Mission</h2>
                    <p className="newsletter-subtitle">
                        Get inspiring stories, impact updates, and ways to make a difference delivered to your inbox.
                    </p>
                    <div className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="newsletter-input"
                        />
                        <motion.button
                            className="newsletter-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Subscribe
                        </motion.button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default BlogPage;
