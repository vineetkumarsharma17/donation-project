import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
    const [donationType, setDonationType] = useState('monthly');
    const [selectedAmount, setSelectedAmount] = useState(900);
    const [customAmount, setCustomAmount] = useState('');
    const [dedicateDonation, setDedicateDonation] = useState(false);
    const [honoreeName, setHonoreeName] = useState('');
    const [currency, setCurrency] = useState('INR');

    const presetAmounts = [4000, 2000, 1000, 650, 600, 500];

    const handleAmountClick = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setCustomAmount(value);
        if (value) {
            setSelectedAmount(parseInt(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle donation submission
        console.log({
            donationType,
            amount: selectedAmount,
            dedicateDonation,
            honoreeName,
            currency
        });
        alert(`Thank you for your ${donationType} donation of ${currency} ${selectedAmount}!`);
    };

    return (
        <div className="donation-form-card">
            <div className="donation-type-toggle">
                <button
                    type="button"
                    className={`toggle-btn ${donationType === 'one-time' ? 'active' : ''}`}
                    onClick={() => setDonationType('one-time')}
                >
                    One-time
                </button>
                <button
                    type="button"
                    className={`toggle-btn ${donationType === 'monthly' ? 'active' : ''}`}
                    onClick={() => setDonationType('monthly')}
                >
                    ❤️ Monthly
                </button>
            </div>

            <form onSubmit={handleSubmit} className="donation-form">
                <div className="preset-amounts">
                    {presetAmounts.map((amount) => (
                        <button
                            key={amount}
                            type="button"
                            className={`amount-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                            onClick={() => handleAmountClick(amount)}
                        >
                            ₹{amount.toLocaleString()}
                        </button>
                    ))}
                </div>

                <div className="custom-amount-wrapper">
                    <div className="currency-selector">
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="currency-select"
                        >
                            <option value="INR">₹</option>
                            <option value="USD">$</option>
                            <option value="EUR">€</option>
                            <option value="GBP">£</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="custom-amount-input"
                    />
                    <div className="currency-label">{currency}</div>
                </div>

                <div className="form-check-wrapper">
                    <label className="form-check">
                        <input
                            type="checkbox"
                            checked={dedicateDonation}
                            onChange={(e) => setDedicateDonation(e.target.checked)}
                        />
                        <span>Dedicate this donation</span>
                    </label>
                </div>

                {dedicateDonation && (
                    <div className="honoree-section fade-in">
                        <input
                            type="text"
                            placeholder="Honoree name"
                            value={honoreeName}
                            onChange={(e) => setHonoreeName(e.target.value)}
                            className="form-input honoree-input"
                        />
                        <p className="honoree-info">
                            Once you've donated, you'll be able to add a personal message and send a card.
                        </p>
                    </div>
                )}

                <div className="designation-section">
                    <a href="#" className="designation-link">
                        Designate to where needed most
                    </a>
                    <a href="#" className="comment-link">
                        Add comment
                    </a>
                </div>

                <button type="submit" className="btn btn-success submit-btn">
                    Donate and Support
                </button>

                <p className="secure-info">
                    🔒 Secure donation powered by industry-leading encryption
                </p>
            </form>
        </div>
    );
};

export default DonationForm;
