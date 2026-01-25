// Backend API for Donation Processing
// server.js

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// MongoDB/Firebase connection (example with MongoDB)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Donation Schema
const donationSchema = new mongoose.Schema({
    donorName: String,
    email: String,
    phone: String,
    amount: Number,
    donationType: String,
    paymentId: String,
    orderId: String,
    isDedicated: Boolean,
    dedicationMessage: String,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;

        const options = {
            amount: amount * 100, // amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order'
        });
    }
});

// Verify Payment and Store Donation
app.post('/api/verify-payment', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            donorDetails,
            amount,
            donationType
        } = req.body;

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({
                success: false,
                message: 'Invalid signature'
            });
        }

        // Store donation in database
        const donation = new Donation({
            donorName: donorDetails.name,
            email: donorDetails.email,
            phone: donorDetails.phone,
            amount: amount,
            donationType: donationType,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            isDedicated: donorDetails.isDedicated || false,
            dedicationMessage: donorDetails.dedicationMessage || '',
            status: 'completed'
        });

        await donation.save();

        // Send receipt email to donor
        await sendReceiptEmail(donation);

        // Send notification to admin
        await sendAdminNotification(donation);

        res.json({
            success: true,
            message: 'Payment verified and donation recorded',
            donationId: donation._id
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed'
        });
    }
});

// Send Receipt Email
async function sendReceiptEmail(donation) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: donation.email,
        subject: 'Thank You for Your Donation - BookHope NGO',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2d5016, #4a7c2c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .logo { font-size: 2rem; font-weight: bold; color: #facc15; }
                    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
                    .amount { font-size: 2rem; color: #4a7c2c; font-weight: bold; text-align: center; margin: 20px 0; }
                    .details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .details-row { display: flex; justify-content: space-between; margin: 10px 0; }
                    .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; background: #4a7c2c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">📚 BookHope NGO</div>
                        <h1>Thank You for Your Donation!</h1>
                    </div>
                    
                    <div class="content">
                        <p>Dear ${donation.donorName},</p>
                        
                        <p>We are incredibly grateful for your generous donation. Your support helps us provide quality education and books to children in need.</p>
                        
                        <div class="amount">₹${donation.amount.toLocaleString()}</div>
                        
                        <div class="details">
                            <h3>Donation Details</h3>
                            <div class="details-row">
                                <span>Transaction ID:</span>
                                <strong>${donation.paymentId}</strong>
                            </div>
                            <div class="details-row">
                                <span>Date:</span>
                                <strong>${new Date(donation.createdAt).toLocaleDateString()}</strong>
                            </div>
                            <div class="details-row">
                                <span>Type:</span>
                                <strong>${donation.donationType === 'monthly' ? 'Monthly' : 'One-time'}</strong>
                            </div>
                            ${donation.isDedicated ? `
                            <div class="details-row">
                                <span>Dedication:</span>
                                <strong>${donation.dedicationMessage}</strong>
                            </div>
                            ` : ''}
                        </div>
                        
                        <p><strong>Tax Benefit:</strong> This donation is eligible for tax deduction under Section 80G of the Income Tax Act. Please keep this receipt for your records.</p>
                        
                        <p>Your contribution will directly impact the lives of children by providing them access to books and educational resources.</p>
                        
                        <center>
                            <a href="https://yourwebsite.com/impact" class="button">See Your Impact</a>
                        </center>
                    </div>
                    
                    <div class="footer">
                        <p>With gratitude,<br><strong>BookHope NGO Team</strong></p>
                        <p style="font-size: 0.9rem; color: #666;">
                            For any queries, contact us at support@bookhope.org<br>
                            📞 +91 XXXXX XXXXX
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    await transporter.sendMail(mailOptions);
}

// Send Admin Notification
async function sendAdminNotification(donation) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Donation Received - ₹${donation.amount}`,
        html: `
            <h2>New Donation Alert!</h2>
            <p><strong>Donor:</strong> ${donation.donorName}</p>
            <p><strong>Email:</strong> ${donation.email}</p>
            <p><strong>Phone:</strong> ${donation.phone}</p>
            <p><strong>Amount:</strong> ₹${donation.amount}</p>
            <p><strong>Type:</strong> ${donation.donationType}</p>
            <p><strong>Payment ID:</strong> ${donation.paymentId}</p>
            <p><strong>Date:</strong> ${new Date(donation.createdAt).toLocaleString()}</p>
            ${donation.isDedicated ? `<p><strong>Dedication:</strong> ${donation.dedicationMessage}</p>` : ''}
        `
    };

    await transporter.sendMail(mailOptions);
}

// Get all donations (admin)
app.get('/api/donations', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            donations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch donations'
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
