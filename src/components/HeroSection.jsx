import React from 'react';
import DonationForm from './DonationForm';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Background Image with Overlay */}
            <div className="hero-background">
                <img
                    src="/hero_children_learning.webp"
                    alt="Children learning and growing with support from NALA"
                    className="hero-bg-img"
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-container">
                {/* Text Content Over Background Image */}
                <div className="hero-content-wrapper">
                    <div className="hero-text fade-in">
                        <h1 className="hero-title">
                            In a world that has neglected these easily preventable and treatable diseases, you can make real change.
                        </h1>
                        <p className="hero-subtitle">
                            Support NALA and give the opportunity of a healthy life to children around the world.
                        </p>

                        <div className="hero-donate-widget">
                            <button className="hero-donate-btn" aria-label="Donate now">
                                <div className="donate-icon-wrapper">
                                    <img src="/donate_icon.png" alt="Donate icon" className="donate-icon-img" />
                                </div>
                                <span className="donate-text">Donate</span>
                                <span className="donate-arrow">▶</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Donation Form with Background Image */}
                <div className="donation-form-wrapper slide-in-right">
                    <DonationForm />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
