require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Multer for File Uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: uploadStorage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Routes
app.get('/', (req, res) => {
  res.send('Association Backend API is running...');
});

// Contact Us Route
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // 1. Save to Database (Optional)
    try {
      await pool.query(
        'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)',
        [name, email, subject, message]
      );
    } catch (dbErr) {
      console.error('Database save failed (skipping):', dbErr.message);
      // We continue even if DB fails so the user can test the email
    }

    // 2. Set up Nodemailer transporter
    // Note: You need to provide real credentials in .env for this to actually send emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL || 'ahreshadahmadi020@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    // 3. Send Email (Disabled by default until credentials are provided)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error handling contact form:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// --- Upload Route ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// --- Companies Routes ---

// Get all companies
app.get('/api/companies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Add a new company
app.post('/api/companies', async (req, res) => {
  const { name, category, image, description, location } = req.body;
  console.log('Attempting to add company:', name);
  try {
    const result = await pool.query(
      'INSERT INTO companies (name, category, image, description, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, category, image, description, location]
    );
    console.log('Successfully added company to DB');
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB_INSERT_ERROR:', err.message);
    res.status(500).json({ error: 'Failed to add company' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
