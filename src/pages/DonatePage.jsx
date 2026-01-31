import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, Loader } from 'lucide-react';
import './DonatePage.css';

const DonatePage = () => {
    const [donationType, setDonationType] = useState('onetime');
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

    const presetAmounts = [500, 1000, 2000, 4000, 5000, 10000];

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
            const res = await loadRazorpay();
            if (!res) {
                alert('Razorpay SDK failed to load. Please check your internet connection.');
                setIsProcessing(false);
                return;
            }

            const options = {
                key: 'rzp_test_YOUR_KEY_HERE',
                amount: amount * 100,
                currency: 'INR',
                name: 'SHAILENDRA KUMAR AJAY FOUNDATION',
                description: `${donationType === 'monthly' ? 'Monthly' : 'One-time'} Donation`,
                image: '/logo.png',
                handler: function (response) {
                    console.log('Payment Success:', response);
                    setIsProcessing(false);
                    setShowSuccess(true);

                    setTimeout(() => {
                        window.location.href = '/';
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

    if (showSuccess) {
        return (
            <div className="donate-page">
                <motion.div
                    className="success-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <motion.div
                        className="success-icon"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                        <CheckCircle size={100} color="#4a7c2c" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Thank You! 🎉
                    </motion.h1>
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
                    <motion.p
                        className="redirect-message"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        Redirecting to home page...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="donate-page">
            <div className="donate-container">
                {/* Header */}
                <motion.div
                    className="donate-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        className="header-icon"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart size={48} fill="#facc15" color="#facc15" />
                    </motion.div>
                    <h1>Donate & Support</h1>
                    <p>Your contribution helps educate children and change lives</p>
                </motion.div>

                <div className="donate-content">
                    {/* Left Side - Amount Selection */}
                    <motion.div
                        className="amount-section"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2>Select Donation Amount</h2>

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
                                <input
                                    type="text"
                                    placeholder="Enter amount"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                />
                            </div>
                            <small>Minimum donation: ₹100</small>
                        </div>
                    </motion.div>

                    {/* Right Side - Donor Details */}
                    <motion.div
                        className="details-section"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2>Your Details</h2>

                        {getFinalAmount() >= 100 && (
                            <div className="amount-display">
                                <span>Donation Amount:</span>
                                <strong>₹{getFinalAmount().toLocaleString()}</strong>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={donorDetails.name}
                                onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={donorDetails.email}
                                onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                placeholder="+91 XXXXX XXXXX"
                                value={donorDetails.phone}
                                onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
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

                        <motion.button
                            className="donate-btn"
                            onClick={handleDonation}
                            disabled={isProcessing || getFinalAmount() < 100}
                            whileHover={!isProcessing && getFinalAmount() >= 100 ? { scale: 1.02, y: -2 } : {}}
                            whileTap={!isProcessing && getFinalAmount() >= 100 ? { scale: 0.98 } : {}}
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

                        <div className="trust-badge">
                            <span>🔒</span>
                            <p>Your data is safe with us. We respect your privacy and will never share your information.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DonatePage;
