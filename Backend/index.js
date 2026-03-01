require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool, initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
initDb();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for File Uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: uploadStorage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// Routes
app.get('/', (req, res) => {
  res.send('Association Backend API is running...');
});

// Contact Us Route
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    try {
      await pool.query(
        'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message]
      );
    } catch (dbErr) {
      console.error('Database save failed (skipping):', dbErr.message);
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_EMAIL || 'info@uigpmca.af',
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

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
    const [rows] = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Add a new company
app.post('/api/companies', async (req, res) => {
  const {
    name_en, name_da, name_ps,
    category_en, category_da, category_ps,
    image, logo,
    description_en, description_da, description_ps,
    location_en, location_da, location_ps,
    factory_address_en, factory_address_da, factory_address_ps,
    sales_office_address_en, sales_office_address_da, sales_office_address_ps,
    contact_numbers_en, contact_numbers_da, contact_numbers_ps
  } = req.body;

  try {
    const query = `
      INSERT INTO companies (
        name_en, name_da, name_ps,
        category_en, category_da, category_ps,
        image, logo,
        description_en, description_da, description_ps,
        location_en, location_da, location_ps,
        factory_address_en, factory_address_da, factory_address_ps,
        sales_office_address_en, sales_office_address_da, sales_office_address_ps,
        contact_numbers_en, contact_numbers_da, contact_numbers_ps
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name_en, name_da, name_ps,
      category_en, category_da, category_ps,
      image, logo,
      description_en, description_da, description_ps,
      location_en, location_da, location_ps,
      factory_address_en, factory_address_da, factory_address_ps,
      sales_office_address_en, sales_office_address_da, sales_office_address_ps,
      contact_numbers_en, contact_numbers_da, contact_numbers_ps
    ];

    const [result] = await pool.query(query, values);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('DB_INSERT_ERROR:', err.message);
    res.status(500).json({ error: `Database error: ${err.message}` });
  }
});

// Delete a company
app.delete('/api/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM companies WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.error('DB_DELETE_ERROR:', err.message);
    res.status(500).json({ error: `Database error: ${err.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
