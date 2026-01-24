import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Book, Heart, CreditCard, Truck, Home, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import './DonatePage.css';

const DonatePage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [donationComplete, setDonationComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const optionsRef = useRef(null);
    const stepsRef = useRef(null);

    const areOptionsInView = useInView(optionsRef, { once: true, margin: "-100px" });
    const areStepsInView = useInView(stepsRef, { once: true, margin: "-100px" });

    const donationOptions = [
        {
            id: 'books',
            icon: <Book size={48} />,
            title: 'Donate Books',
            description: 'Share your books and spread knowledge to those who need it most.',
            color: '#4a7c2c'
        },
        {
            id: 'money',
            icon: <Heart size={48} />,
            title: 'Monetary Support',
            description: 'Make a financial contribution to help us reach more communities.',
            color: '#facc15'
        }
    ];

    const bookDonationSteps = [
        {
            title: 'Choose Collection Method',
            description: 'Select how you want to donate your books',
            content: 'pickup-dropoff'
        },
        {
            title: 'Book Details',
            description: 'Tell us about the books you\'re donating',
            content: 'book-details'
        },
        {
            title: 'Confirmation',
            description: 'Review and confirm your donation',
            content: 'confirmation'
        }
    ];

    const monetarySteps = [
        {
            title: 'Choose Amount',
            description: 'Select or enter your donation amount',
            content: 'amount'
        },
        {
            title: 'Payment Method',
            description: 'Choose your preferred payment method',
            content: 'payment'
        },
        {
            title: 'Complete Donation',
            description: 'Finalize your contribution',
            content: 'complete'
        }
    ];

    const steps = selectedOption === 'books' ? bookDonationSteps : monetarySteps;

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId);
        setCurrentStep(0);
        setDonationComplete(false);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeDonation();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            setSelectedOption(null);
        }
    };

    const completeDonation = () => {
        setDonationComplete(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    return (
        <div className="donate-page">
            {/* Hero Section */}
            <motion.section
                className="donate-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="donate-hero-overlay"></div>
                <motion.div
                    className="donate-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Donate Books, Change Lives
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Every book you donate opens a new world of possibilities for someone in need.
                    </motion.p>
                </motion.div>
            </motion.section>

            {/* Donation Options */}
            {!selectedOption && !donationComplete && (
                <section className="donation-options-section" ref={optionsRef}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={areOptionsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        Choose How You'd Like to Help
                    </motion.h2>
                    <div className="donation-options-grid">
                        {donationOptions.map((option, index) => (
                            <motion.div
                                key={option.id}
                                className="donation-option-card"
                                initial={{ opacity: 0, y: 50 }}
                                animate={areOptionsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{
                                    y: -15,
                                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                                    transition: { duration: 0.3 }
                                }}
                                onClick={() => handleOptionSelect(option.id)}
                            >
                                <motion.div
                                    className="option-icon"
                                    style={{ background: option.color }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {option.icon}
                                </motion.div>
                                <h3>{option.title}</h3>
                                <p>{option.description}</p>
                                <motion.button
                                    className="option-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started <ArrowRight size={20} />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Donation Flow */}
            <AnimatePresence mode="wait">
                {selectedOption && !donationComplete && (
                    <motion.section
                        className="donation-flow-section"
                        ref={stepsRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Progress Steps */}
                        <div className="steps-indicator">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`step-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                                >
                                    <motion.div
                                        className="step-circle"
                                        animate={index === currentStep ? {
                                            scale: [1, 1.2, 1],
                                            boxShadow: [
                                                "0 0 0 0 rgba(74, 124, 44, 0.4)",
                                                "0 0 0 10px rgba(74, 124, 44, 0)",
                                                "0 0 0 0 rgba(74, 124, 44, 0)"
                                            ]
                                        } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        {index < currentStep ? <CheckCircle size={20} /> : index + 1}
                                    </motion.div>
                                    <div className="step-info">
                                        <h4>{step.title}</h4>
                                        <p>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Step Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                className="step-content"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                {selectedOption === 'books' && (
                                    <BookDonationContent step={currentStep} />
                                )}
                                {selectedOption === 'money' && (
                                    <MonetaryDonationContent step={currentStep} />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flow-navigation">
                            <motion.button
                                className="nav-button secondary"
                                onClick={handleBack}
                                whileHover={{ scale: 1.05, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft size={20} />
                                {currentStep === 0 ? 'Back to Options' : 'Previous'}
                            </motion.button>
                            <motion.button
                                className="nav-button primary"
                                onClick={handleNext}
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {currentStep === steps.length - 1 ? 'Complete Donation' : 'Next Step'}
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Success Animation */}
            <AnimatePresence>
                {donationComplete && (
                    <motion.section
                        className="donation-success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        {showConfetti && <Confetti />}
                        <motion.div
                            className="success-content"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                className="success-icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            >
                                <CheckCircle size={80} />
                            </motion.div>
                            <h2>Thank You for Your Generosity!</h2>
                            <p>Your {selectedOption === 'books' ? 'book donation' : 'contribution'} will make a real difference in someone's life.</p>
                            <motion.button
                                className="success-button"
                                onClick={() => {
                                    setDonationComplete(false);
                                    setSelectedOption(null);
                                    setCurrentStep(0);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Make Another Donation
                            </motion.button>
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

// Book Donation Step Content
const BookDonationContent = ({ step }) => {
    if (step === 0) {
        return (
            <div className="collection-method">
                <h3>How would you like to donate?</h3>
                <div className="method-options">
                    <motion.div
                        className="method-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Truck size={40} />
                        <h4>Pickup Service</h4>
                        <p>We'll collect books from your location</p>
                    </motion.div>
                    <motion.div
                        className="method-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Home size={40} />
                        <h4>Drop-off</h4>
                        <p>Bring books to our collection center</p>
                    </motion.div>
                </div>
            </div>
        );
    } else if (step === 1) {
        return (
            <div className="book-details-form">
                <h3>Tell us about your books</h3>
                <input type="number" placeholder="Number of books" />
                <textarea placeholder="Book categories (optional)" rows="3"></textarea>
                <input type="text" placeholder="Your name" />
                <input type="tel" placeholder="Phone number" />
                <input type="text" placeholder="Address" />
            </div>
        );
    } else {
        return (
            <div className="confirmation-details">
                <h3>Confirm Your Donation</h3>
                <div className="detail-item">
                    <strong>Collection Method:</strong> Pickup Service
                </div>
                <div className="detail-item">
                    <strong>Number of Books:</strong> 25
                </div>
                <div className="detail-item">
                    <strong>Contact:</strong> +1 (555) 123-4567
                </div>
                <p className="confirmation-note">We'll contact you within 24 hours to schedule the pickup.</p>
            </div>
        );
    }
};

// Monetary Donation Step Content
const MonetaryDonationContent = ({ step }) => {
    if (step === 0) {
        const amounts = [10, 25, 50, 100];
        return (
            <div className="amount-selection">
                <h3>Choose Your Donation Amount</h3>
                <div className="amount-options">
                    {amounts.map(amount => (
                        <motion.button
                            key={amount}
                            className="amount-button"
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ${amount}
                        </motion.button>
                    ))}
                </div>
                <input type="number" placeholder="Or enter custom amount" className="custom-amount" />
            </div>
        );
    } else if (step === 1) {
        return (
            <div className="payment-methods">
                <h3>Select Payment Method</h3>
                <div className="payment-options">
                    <motion.div className="payment-card" whileHover={{ scale: 1.05 }}>
                        <CreditCard size={32} />
                        <span>Credit/Debit Card</span>
                    </motion.div>
                    <motion.div className="payment-card" whileHover={{ scale: 1.05 }}>
                        <span style={{ fontSize: '32px' }}>📱</span>
                        <span>UPI</span>
                    </motion.div>
                    <motion.div className="payment-card" whileHover={{ scale: 1.05 }}>
                        <span style={{ fontSize: '32px' }}>📷</span>
                        <span>QR Code</span>
                    </motion.div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="payment-complete">
                <h3>Complete Your Donation</h3>
                <div className="donation-summary">
                    <div className="summary-item">
                        <span>Amount:</span>
                        <strong>$50.00</strong>
                    </div>
                    <div className="summary-item">
                        <span>Payment Method:</span>
                        <strong>Credit Card</strong>
                    </div>
                </div>
                <input type="email" placeholder="Email for receipt" />
            </div>
        );
    }
};

// Confetti Component
const Confetti = () => {
    const pieces = Array.from({ length: 50 });
    return (
        <div className="confetti-container">
            {pieces.map((_, i) => (
                <motion.div
                    key={i}
                    className="confetti-piece"
                    initial={{
                        y: -20,
                        x: Math.random() * window.innerWidth,
                        rotate: 0,
                        opacity: 1
                    }}
                    animate={{
                        y: window.innerHeight + 20,
                        rotate: Math.random() * 720,
                        opacity: 0
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 0.5,
                        ease: "easeIn"
                    }}
                    style={{
                        background: ['#4a7c2c', '#facc15', '#2d5016'][Math.floor(Math.random() * 3)]
                    }}
                />
            ))}
        </div>
    );
};

export default DonatePage;
