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
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // e.g. https://your-app.vercel.app
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Render health check)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true);
    }
    // In production allow all vercel.app domains for flexibility
    if (process.env.NODE_ENV === 'production' && (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com'))) {
      return callback(null, true);
    }
    callback(null, true); // Allow all for now; restrict after testing
  },
  credentials: true,
}));
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
  
  console.log('Attempting to add company (Multilingual):', name_en);
  
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *
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

    const result = await pool.query(query, values);
    console.log('Successfully added company to DB');
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB_INSERT_ERROR:', err.message);
    res.status(500).json({ error: `Database error: ${err.message}` });
  }
});

// Delet a company
app.delete('/api/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully', company: result.rows[0] });
  } catch (err) {
    console.error('DB_DELETE_ERROR:', err.message);
    res.status(500).json({ error: `Database error: ${err.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
