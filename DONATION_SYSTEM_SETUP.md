# 🎯 Complete Donation System - Setup Guide

## 📚 **Overview**

This is a complete donation system with:
- ✅ Animated donation modal
- ✅ Razorpay payment integration
- ✅ Backend API with payment verification
- ✅ Email receipts to donors
- ✅ Admin notifications
- ✅ Database storage (MongoDB)

---

## 🚀 **Frontend Setup**

### **1. Install Dependencies**

The donation modal uses:
- `framer-motion` (already installed)
- `lucide-react` (already installed)

### **2. Add Donation Modal to Your App**

```javascript
// In your main App.jsx or layout component
import { useState } from 'react';
import DonationModal from './components/DonationModal';

function App() {
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    return (
        <>
            {/* Your existing components */}
            
            {/* Donation Modal */}
            <DonationModal 
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
            />
        </>
    );
}
```

### **3. Trigger Modal from Buttons**

```javascript
// In Navbar or Hero section
<button onClick={() => setIsDonationModalOpen(true)}>
    Donate Now
</button>
```

### **4. Update Razorpay Key**

In `DonationModal.jsx`, line 82:
```javascript
key: 'rzp_test_YOUR_KEY_HERE', // Replace with your actual key
```

---

## 🔧 **Backend Setup**

### **1. Navigate to Backend Directory**

```bash
cd backend
```

### **2. Install Dependencies**

```bash
npm install
```

This will install:
- express
- razorpay
- mongoose
- nodemailer
- cors
- dotenv

### **3. Create .env File**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then fill in your actual values:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
MONGODB_URI=mongodb://localhost:27017/donation_ngo
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@bookhope.org
PORT=5000
```

### **4. Setup MongoDB**

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in .env

### **5. Setup Email (Gmail)**

1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password
4. Use that password in EMAIL_PASSWORD

### **6. Start Backend Server**

```bash
npm run dev
```

Server will run on http://localhost:5000

---

## 💳 **Razorpay Setup**

### **1. Create Razorpay Account**

1. Go to https://razorpay.com
2. Sign up for account
3. Complete KYC (for live mode)

### **2. Get API Keys**

1. Go to Dashboard → Settings → API Keys
2. Generate Test Keys (for development)
3. Copy Key ID and Secret
4. Add to .env file

### **3. Test Mode vs Live Mode**

**Test Mode (Development):**
- Use test keys (rzp_test_xxx)
- No real money transactions
- Use test cards for testing

**Live Mode (Production):**
- Complete KYC verification
- Use live keys (rzp_live_xxx)
- Real money transactions

### **4. Test Cards**

For testing in test mode:
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

---

## 🎨 **Features Implemented**

### **Modal Animations**
- ✅ Slide up from bottom
- ✅ Fade in/out
- ✅ Backdrop blur
- ✅ Close button rotation
- ✅ Amount button pulse on selection
- ✅ Input focus glow
- ✅ Button hover lift

### **Payment Flow**
- ✅ One-time / Monthly toggle
- ✅ Preset amounts (₹500, ₹1000, ₹2000, ₹4000)
- ✅ Custom amount input
- ✅ Donor details form
- ✅ Dedication option
- ✅ Razorpay checkout
- ✅ Success animation

### **Backend Features**
- ✅ Order creation
- ✅ Payment verification
- ✅ Signature validation
- ✅ Database storage
- ✅ Email receipts
- ✅ Admin notifications
- ✅ Tax benefit note

---

## 📧 **Email Templates**

### **Donor Receipt Email**
- NGO logo and branding
- Thank you message
- Donation amount
- Transaction ID
- Date and time
- Donation type
- Tax benefit note
- Call-to-action button

### **Admin Notification**
- Donor details
- Amount
- Payment ID
- Timestamp
- Dedication message (if any)

---

## 🔒 **Security Features**

- ✅ Environment variables for secrets
- ✅ Payment signature verification
- ✅ HTTPS only (production)
- ✅ CORS configuration
- ✅ Input validation
- ✅ Secure email transmission

---

## 📱 **Responsive Design**

- ✅ Desktop optimized
- ✅ Tablet friendly
- ✅ Mobile responsive
- ✅ Touch-friendly buttons
- ✅ Keyboard accessible (ESC to close)
- ✅ Background scroll disabled

---

## 🧪 **Testing**

### **1. Test Donation Flow**

1. Click "Donate Now"
2. Select amount or enter custom
3. Click "Continue to Details"
4. Fill donor information
5. Click "Donate and Support"
6. Complete Razorpay checkout
7. Verify success screen
8. Check email for receipt

### **2. Test Backend**

```bash
# Test order creation
curl -X POST http://localhost:5000/api/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000}'

# Check donations
curl http://localhost:5000/api/donations
```

---

## 🚀 **Deployment**

### **Frontend**
- Deploy to Vercel/Netlify
- Update Razorpay key to live key
- Update backend URL

### **Backend**
- Deploy to Heroku/Railway/Render
- Set environment variables
- Enable HTTPS
- Update CORS settings

### **Database**
- Use MongoDB Atlas for production
- Enable authentication
- Whitelist IP addresses

---

## 📊 **Database Schema**

```javascript
{
    donorName: String,
    email: String,
    phone: String,
    amount: Number,
    donationType: String, // 'onetime' or 'monthly'
    paymentId: String,
    orderId: String,
    isDedicated: Boolean,
    dedicationMessage: String,
    status: String, // 'completed', 'failed', 'pending'
    createdAt: Date
}
```

---

## 🎯 **Next Steps**

1. ✅ Test in development mode
2. ✅ Complete Razorpay KYC
3. ✅ Setup production database
4. ✅ Configure production email
5. ✅ Deploy backend
6. ✅ Deploy frontend
7. ✅ Switch to live keys
8. ✅ Test live donations

---

## 📞 **Support**

For issues:
1. Check console for errors
2. Verify environment variables
3. Check Razorpay dashboard
4. Review email logs
5. Check database connections

---

## 🎉 **You're All Set!**

Your complete donation system is ready with:
- Beautiful animated modal
- Secure payment processing
- Email receipts
- Database storage
- Admin notifications

**Happy fundraising! 💚📚**
