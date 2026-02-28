const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const connectionParams = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT) || 5432,
  ssl: process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

const pool = new Pool(
  process.env.DB_URL ? { connectionString: process.env.DB_URL, ssl: connectionParams.ssl } : connectionParams
);

console.log(`📡 Attempting DB connection to: ${connectionParams.host}:${connectionParams.port} (User: ${connectionParams.user})`);

// Create table if it doesn't exist
const initDb = async () => {
  try {
    // Create companies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name_en VARCHAR(255),
        name_da VARCHAR(255),
        name_ps VARCHAR(255),
        category VARCHAR(255),
        image TEXT,
        logo TEXT,
        description_en TEXT,
        description_da TEXT,
        description_ps TEXT,
        location_en VARCHAR(255),
        location_da VARCHAR(255),
        location_ps VARCHAR(255),
        factory_address_en TEXT,
        factory_address_da TEXT,
        factory_address_ps TEXT,
        sales_office_address_en TEXT,
        sales_office_address_da TEXT,
        sales_office_address_ps TEXT,
        contact_numbers VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

      // Ensure columns exist for all languages
      try {
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
          let type = 'VARCHAR(255)';
          if (col.includes('description') || col.includes('address')) {
            type = 'TEXT';
          }
          await pool.query(`ALTER TABLE companies ADD COLUMN IF NOT EXISTS ${col} ${type}`);
        }

        // Fix legacy NOT NULL constraints that block new inserts
        const legacyColumns = ['name', 'category', 'description', 'location', 'factory_address', 'sales_office_address', 'contact_numbers'];
        for (const col of legacyColumns) {
          try {
            await pool.query(`ALTER TABLE companies ALTER COLUMN ${col} DROP NOT NULL`);
          } catch (e) {
            // Column might not exist, which is fine
          }
        }
      } catch (e) {
        console.log('Skipped adding or altering some columns');
      }

    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database Tables Ready: companies & contacts');
  } catch (err) {
    console.error('Database Init Error:', err.message);
  }
};

initDb();

module.exports = pool;
