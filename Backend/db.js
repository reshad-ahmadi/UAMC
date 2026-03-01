const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'uamc_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initDb = async () => {
  try {
    // Create companies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        category VARCHAR(255),
        image TEXT,
        logo TEXT,
        description TEXT,
        location VARCHAR(255),
        factory_address TEXT,
        sales_office_address TEXT,
        contact_numbers VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure columns exist for all languages (multilingual support)
    const columns = [
      'name_en', 'name_da', 'name_ps',
      'category_en', 'category_da', 'category_ps',
      'description_en', 'description_da', 'description_ps',
      'location_en', 'location_da', 'location_ps',
      'factory_address_en', 'factory_address_da', 'factory_address_ps',
      'sales_office_address_en', 'sales_office_address_da', 'sales_office_address_ps',
      'contact_numbers_en', 'contact_numbers_da', 'contact_numbers_ps'
    ];

    for (const col of columns) {
      try {
        let type = 'VARCHAR(255)';
        if (col.includes('description') || col.includes('address')) {
          type = 'TEXT';
        }
        // Check if column exists first (MySQL doesn't support ADD COLUMN IF NOT EXISTS)
        const [rows] = await pool.query(`
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'companies' 
          AND COLUMN_NAME = ?
          AND TABLE_SCHEMA = ?
        `, [col, process.env.DB_NAME || 'uamc_db']);

        if (rows.length === 0) {
          await pool.query(`ALTER TABLE companies ADD COLUMN ${col} ${type}`);
        }
      } catch (e) {
        console.error(`Error adding column ${col}:`, e.message);
      }
    }

    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Live MySQL Database connected and initialized');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};

module.exports = { pool, initDb };
