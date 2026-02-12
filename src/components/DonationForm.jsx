import React, { useState } from 'react';
import { Loader } from 'lucide-react';

const DonationForm = ({ onScrollToQr }) => {
    const [donationType, setDonationType] = useState('onetime');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Donor Details State
    const [donorDetails, setDonorDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isDedicated: false,
        dedicationMessage: ''
    });

    const presetAmounts = [500, 1000, 2000, 5000, 10000];

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
                key: 'rzp_test_YOUR_KEY_HERE', // Replace with actual key
                amount: amount * 100,
                currency: 'INR',
                name: 'SHAILENDRA KUMAR AJAY FOUNDATION',
                description: `${donationType === 'monthly' ? 'Monthly' : 'One-time'} Donation`,
                image: '/logo.png',
                handler: function (response) {
                    console.log('Payment Success:', response);
                    setIsProcessing(false);
                    alert(`Thank you! Payment ID: ${response.razorpay_payment_id}`);
                    // Ideally redirect to success page or show success state
                    window.location.href = '/'; 
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Make a Donation</h2>

            {/* Donation Type Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        donationType === 'onetime' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setDonationType('onetime')}
                >
                    One-time
                </button>
                <button
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        donationType === 'monthly' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setDonationType('monthly')}
                >
                    Monthly
                </button>
            </div>

            {/* Amount Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                    <button
                        key={amount}
                        className={`py-2 px-1 text-sm font-semibold border rounded-lg transition-all ${
                            selectedAmount === amount
                                ? 'border-green-600 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-green-400 text-gray-700'
                        }`}
                        onClick={() => handleAmountSelect(amount)}
                    >
                        ₹{amount.toLocaleString()}
                    </button>
                ))}
            </div>

            {/* Custom Amount Input */}
            <div className="relative mb-6">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input
                    type="tel"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg outline-none transition-all font-semibold ${
                        customAmount ? 'border-green-600 bg-green-50 text-green-900' : 'border-gray-200 focus:border-green-500'
                    }`}
                />
            </div>

            {/* Helper Text for QR - Only visible on Desktop where QR is on the side */}
            <div 
                className="hidden lg:flex items-center justify-between bg-blue-50 text-blue-700 px-3 py-2 rounded-lg mb-6 text-xs font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={onScrollToQr}
            >
                <span>Prefer instant payment?</span>
                <span className="flex items-center">Scan QR code <span className="ml-1">→</span></span>
            </div>

            {/* Donor Details Form */}
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={donorDetails.name}
                        onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={donorDetails.email}
                        onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={donorDetails.phone}
                        onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                    />
                </div>

                {/* Dedication Checkbox */}
                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        id="dedicate"
                        checked={donorDetails.isDedicated}
                        onChange={(e) => setDonorDetails({ ...donorDetails, isDedicated: e.target.checked })}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="dedicate" className="text-sm text-gray-600 select-none cursor-pointer">Dedicate this donation</label>
                </div>

                {donorDetails.isDedicated && (
                    <textarea
                        placeholder="Message (Optional)"
                        value={donorDetails.dedicationMessage}
                        onChange={(e) => setDonorDetails({ ...donorDetails, dedicationMessage: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 text-sm h-20 resize-none"
                    />
                )}
            </div>

            {/* Donate Button */}
            <button
                className={`w-full mt-6 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2 ${
                    isProcessing || getFinalAmount() < 100 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600'
                }`}
                onClick={handleDonation}
                disabled={isProcessing || getFinalAmount() < 100}
            >
                {isProcessing ? <Loader className="animate-spin" size={20} /> : 'Donate Now'}
                {!isProcessing && getFinalAmount() > 0 && <span>(₹{getFinalAmount()})</span>}
            </button>

             <p className="text-center text-xs text-gray-400 mt-4">
                Secure SSL encrypted payment
            </p>
        </div>
    );
};

export default DonationForm;
