const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Optional: for email notifications

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Database (Replace with MongoDB/Firebase logic)
const volunteers = [];

// Validation Helper
const validateVolunteer = (data) => {
    const errors = {};
    if (!data.name || data.name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Valid email is required";
    if (!data.phone || data.phone.length < 10) errors.phone = "Valid phone number is required";
    if (!data.availability) errors.availability = "Availability selection is required";
    if (!data.interest) errors.interest = "Area of interest is required";
    return errors;
};

// Routes
app.get('/', (req, res) => {
    res.send('Donation Website API is running...');
});

// POST /api/volunteer/register
app.post('/api/volunteer/register', async (req, res) => {
    try {
        const data = req.body;

        console.log("Received Volunteer Data:", data);

        // 1. Validate Input
        const validationErrors = validateVolunteer(data);
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        // 2. Store in Database (Mock)
        const newVolunteer = {
            id: Date.now(),
            ...data,
            submittedAt: new Date()
        };
        volunteers.push(newVolunteer);

        // 3. Simulate Email Notification (Console log for now)
        console.log(`📧 Sending confirmation email to ${data.email}...`);
        console.log(`📧 Notifying admin about new volunteer: ${data.name}`);

        // Simulate network delay
        setTimeout(() => {
            res.status(201).json({
                success: true,
                message: "Volunteer registered successfully!",
                volunteerId: newVolunteer.id
            });
        }, 1500);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
