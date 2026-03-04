require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { pool, initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database (Async, will log error but not block server start)
initDb();

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
  console.log('Received contact form submission:', req.body);
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  let dbSaved = false;
  let emailSent = false;

  try {
    // 1. Save to Database (Optional - won't block if DB is unreachable)
    try {
      await pool.query(
        'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message]
      );
      dbSaved = true;
      console.log('Successfully saved contact to database');
    } catch (dbErr) {
      console.warn('⚠️ Database saving failed:', dbErr.message);
      // We continue even if DB fails
    }

    // 2. Send Email via cPanel server
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Attempting to send email via', process.env.EMAIL_USER);
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
      emailSent = true;
      console.log('Email sent successfully');
    } else {
      console.warn('⚠️ Skipping email: EMAIL_USER or EMAIL_PASS not set in environment.');
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message processed successfully!',
      details: { dbSaved, emailSent }
    });
  } catch (err) {
    console.error('SERVER ERROR during contact processing:', err.message);
    res.status(500).json({ success: false, error: 'Internal server error: ' + err.message });
  }
};

// Handle routes
app.post('/api/contact', contactHandler);
app.post('/contact', contactHandler);

// Members/Companies Route
app.get('/api/companies', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching companies:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
}

// Export for Vercel
module.exports = app;

