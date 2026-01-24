import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import NewGetInvolvedPage from './pages/NewGetInvolvedPage';

import ProgramsSection from './components/ProgramsSection';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><HeroSection /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                <Route path="/programs" element={<PageTransition><ProgramsSection /></PageTransition>} />
                <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
                <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
                <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/donate" element={<PageTransition><DonatePage /></PageTransition>} />
                <Route path="/get-involved" element={<PageTransition><GetInvolvedPage /></PageTransition>} />
                <Route path="/new-get-involved" element={<PageTransition><NewGetInvolvedPage /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <AnimatedRoutes />
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
