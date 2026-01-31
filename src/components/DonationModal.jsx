import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle, Loader } from 'lucide-react';
import './DonationModal.css';

const DonationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1); // 1: Amount, 2: Details, 3: Success
    const [donationType, setDonationType] = useState('onetime'); // 'onetime' or 'monthly'
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [donorDetails, setDonorDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isDedicated: false,
        dedicationMessage: ''
    });

    const presetAmounts = [500, 1000, 2000, 4000];

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    const handleClose = () => {
        setStep(1);
        setSelectedAmount(null);
        setCustomAmount('');
        setShowSuccess(false);
        onClose();
    };

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCustomAmount(value);
        setSelectedAmount(null);
    };

    const getFinalAmount = () => {
        return selectedAmount || parseInt(customAmount) || 0;
    };

    const handleContinueToDetails = () => {
        if (getFinalAmount() >= 100) {
            setStep(2);
        }
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleDonation = async () => {
        const amount = getFinalAmount();
        if (amount < 100) {
            alert('Minimum donation amount is ₹100');
            return;
        }

        if (!donorDetails.name || !donorDetails.email || !donorDetails.phone) {
            alert('Please fill all required fields');
            return;
        }

        setIsProcessing(true);

        try {
            // Load Razorpay script
            const res = await loadRazorpay();
            if (!res) {
                alert('Razorpay SDK failed to load. Please check your internet connection.');
                setIsProcessing(false);
                return;
            }

            // In production, create order from backend
            // For now, using test mode
            const options = {
                key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay key
                amount: amount * 100, // Amount in paise
                currency: 'INR',
                name: 'SHAILENDRA KUMAR AJAY FOUNDATION',
                description: `${donationType === 'monthly' ? 'Monthly' : 'One-time'} Donation`,
                image: '/logo.png', // Your NGO logo
                handler: function (response) {
                    // Payment successful
                    console.log('Payment Success:', response);
                    setIsProcessing(false);
                    setShowSuccess(true);

                    // Send to backend for verification and receipt
                    // sendPaymentToBackend(response);

                    setTimeout(() => {
                        handleClose();
                    }, 5000);
                },
                prefill: {
                    name: donorDetails.name,
                    email: donorDetails.email,
                    contact: donorDetails.phone
                },
                notes: {
                    donation_type: donationType,
                    is_dedicated: donorDetails.isDedicated,
                    dedication_message: donorDetails.dedicationMessage
                },
                theme: {
                    color: '#4a7c2c'
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Payment Error:', error);
            alert('Payment failed. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="donation-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="donation-modal-container"
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {!showSuccess ? (
                            <div className="donation-modal">
                                {/* Header */}
                                <div className="modal-header">
                                    <div className="header-content">
                                        <motion.div
                                            className="header-icon"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Heart size={32} fill="#facc15" color="#facc15" />
                                        </motion.div>
                                        <div>
                                            <h2>Donate & Support</h2>
                                            <p>Your contribution helps educate children</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        className="close-button"
                                        onClick={handleClose}
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>

                                {/* Step 1: Amount Selection */}
                                {step === 1 && (
                                    <motion.div
                                        className="modal-body"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        {/* Donation Type Toggle */}
                                        <div className="donation-type-toggle">
                                            <motion.button
                                                className={`toggle-btn ${donationType === 'onetime' ? 'active' : ''}`}
                                                onClick={() => setDonationType('onetime')}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                One-time
                                            </motion.button>
                                            <motion.button
                                                className={`toggle-btn ${donationType === 'monthly' ? 'active' : ''}`}
                                                onClick={() => setDonationType('monthly')}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Monthly
                                            </motion.button>
                                        </div>

                                        {/* Preset Amounts */}
                                        <div className="amount-grid">
                                            {presetAmounts.map((amount) => (
                                                <motion.button
                                                    key={amount}
                                                    className={`amount-btn ${selectedAmount === amount ? 'selected' : ''}`}
                                                    onClick={() => handleAmountSelect(amount)}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    animate={selectedAmount === amount ? {
                                                        boxShadow: [
                                                            '0 0 0 0 rgba(250, 204, 21, 0.4)',
                                                            '0 0 0 10px rgba(250, 204, 21, 0)',
                                                        ]
                                                    } : {}}
                                                    transition={{ duration: 1, repeat: selectedAmount === amount ? Infinity : 0 }}
                                                >
                                                    ₹{amount.toLocaleString()}
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Custom Amount */}
                                        <div className="custom-amount-section">
                                            <label>Or enter custom amount</label>
                                            <div className="custom-amount-input">
                                                <span className="currency">₹</span>
                                                <motion.input
                                                    type="text"
                                                    placeholder="Enter amount"
                                                    value={customAmount}
                                                    onChange={handleCustomAmountChange}
                                                    whileFocus={{
                                                        boxShadow: '0 0 0 4px rgba(74, 124, 44, 0.1)',
                                                        scale: 1.02
                                                    }}
                                                />
                                            </div>
                                            <small>Minimum donation: ₹100</small>
                                        </div>

                                        {/* Continue Button */}
                                        <motion.button
                                            className="continue-btn"
                                            onClick={handleContinueToDetails}
                                            disabled={getFinalAmount() < 100}
                                            whileHover={getFinalAmount() >= 100 ? { scale: 1.02, y: -2 } : {}}
                                            whileTap={getFinalAmount() >= 100 ? { scale: 0.98 } : {}}
                                        >
                                            Continue to Details
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* Step 2: Donor Details */}
                                {step === 2 && (
                                    <motion.div
                                        className="modal-body"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="amount-summary">
                                            <span>Donation Amount:</span>
                                            <strong>₹{getFinalAmount().toLocaleString()}</strong>
                                        </div>

                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <motion.input
                                                type="text"
                                                placeholder="Enter your name"
                                                value={donorDetails.name}
                                                onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                                                whileFocus={{ boxShadow: '0 0 0 4px rgba(74, 124, 44, 0.1)' }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Email Address *</label>
                                            <motion.input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={donorDetails.email}
                                                onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                                                whileFocus={{ boxShadow: '0 0 0 4px rgba(74, 124, 44, 0.1)' }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Phone Number *</label>
                                            <motion.input
                                                type="tel"
                                                placeholder="+91 XXXXX XXXXX"
                                                value={donorDetails.phone}
                                                onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                                                whileFocus={{ boxShadow: '0 0 0 4px rgba(74, 124, 44, 0.1)' }}
                                            />
                                        </div>

                                        <div className="dedication-checkbox">
                                            <input
                                                type="checkbox"
                                                id="dedicate"
                                                checked={donorDetails.isDedicated}
                                                onChange={(e) => setDonorDetails({ ...donorDetails, isDedicated: e.target.checked })}
                                            />
                                            <label htmlFor="dedicate">Dedicate this donation</label>
                                        </div>

                                        {donorDetails.isDedicated && (
                                            <motion.div
                                                className="form-group"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                            >
                                                <label>Dedication Message</label>
                                                <textarea
                                                    placeholder="In memory of..."
                                                    value={donorDetails.dedicationMessage}
                                                    onChange={(e) => setDonorDetails({ ...donorDetails, dedicationMessage: e.target.value })}
                                                />
                                            </motion.div>
                                        )}

                                        <div className="button-group">
                                            <motion.button
                                                className="back-btn"
                                                onClick={() => setStep(1)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Back
                                            </motion.button>
                                            <motion.button
                                                className="donate-btn"
                                                onClick={handleDonation}
                                                disabled={isProcessing}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <Loader className="spinner" size={20} />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Donate and Support'
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            /* Success Screen */
                            <motion.div
                                className="success-screen"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <motion.div
                                    className="success-icon"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                >
                                    <CheckCircle size={80} color="#4a7c2c" />
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Thank You! 🎉
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Your donation of <strong>₹{getFinalAmount().toLocaleString()}</strong> has been received.
                                </motion.p>
                                <motion.p
                                    className="success-message"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    A receipt has been sent to your email.
                                </motion.p>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DonationModal;
