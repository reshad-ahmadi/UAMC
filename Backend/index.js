require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Root Route
app.get('/api', (req, res) => {
  res.send('UAMC API is live. Use /api/contact for form submissions.');
});

// Contact Form Handler
const contactHandler = async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  try {
    // Send Email via cPanel server
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: 'mail.uigpmca.af',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: { rejectUnauthorized: false }
      });

      await transporter.sendMail({
        from: `"USMA Website" <${process.env.EMAIL_USER}>`,
        to: 'info@uigpmca.af',
        replyTo: email, 
        subject: `📩 New Contact: ${subject}`,
        html: `<h3>New Message Received</h3><p><b>From:</b> ${name} (${email})</p><p><b>Message:</b><br/>${message}</p>`
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Message processed successfully!'
      });
    } else {
      res.status(500).json({ success: false, error: 'Server email misconfiguration.' });
    }
  } catch (err) {
    console.error('SERVER ERROR during contact processing:', err.message);
    res.status(500).json({ success: false, error: 'Internal server error: ' + err.message });
  }
};

// Handle routes
app.post('/api/contact', contactHandler);
app.post('/contact', contactHandler);

// For local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
}

// Export for Vercel
module.exports = app;

