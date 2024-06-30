// const db = require("./postgres");
const { Pool } = require('pg');

// Configure the PostgreSQL connection pool
require('dotenv').config();
const pool = new Pool({
    connectionString: "postgres://default:uXTR7EMLBkw1@ep-late-sky-a4ev4uz7-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

// Function to execute SQL queries
const query = async (sqlQuery) => {
  const client = await pool.connect();
  try {
    await client.query(sqlQuery);
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    client.release();
  }
};



async function createCompanyTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS company (
      ID SERIAL PRIMARY KEY,
      name VARCHAR(30) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_delete BOOLEAN DEFAULT FALSE
    );
  `;
  await query(sql);



//   const insertDataSQL = `
//     INSERT INTO company (id, name)
//     VALUES 
//       (1, 'Vs'),
//       (2, 'Vs2'),
//       (3, 'Example Organization'),
//       (4, 'Example Organization1'),
//       (5, 'Example Organization2'),
//       (6, 'Example Organization3'),
//       (7, 'Example Organization4'),
//       (8, 'Example Organization5'),
//       (9, 'Vs3'),
//       (10, 'Vs21'),
//       (11, 'Vs4'),
//       (12, 'Vs5');
//   `;

//   await query(insertDataSQL);
}

async function createUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      ID SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      profile_image VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      company_id INTEGER NOT NULL,
      password VARCHAR(255) NOT NULL,
      address TEXT,
      currency VARCHAR(10),
      timezone VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_delete BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (company_id) REFERENCES company (ID) ON DELETE CASCADE
    );
  `;
  await query(sql);
}

async function createEmployeesTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS employees (
      ID SERIAL PRIMARY KEY,
      user_id INTEGER,
      created_by INTEGER,
      role VARCHAR(20) CHECK (role IN ('admin', 'sales associate')) NOT NULL DEFAULT 'sales associate',
      status VARCHAR(20) CHECK (status IN ('active', 'inactive')) NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_delete BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users (ID) ON DELETE CASCADE,
      FOREIGN KEY (created_by) REFERENCES users (ID) ON DELETE CASCADE
    );
  `;
  await query(sql);
}

async function createCategoryTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS category (
      ID SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      company_id INTEGER NOT NULL,
      created_user INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_delete BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (created_user) REFERENCES users (ID) ON DELETE CASCADE,
      FOREIGN KEY (company_id) REFERENCES company (ID) ON DELETE CASCADE
    );
  `;
  await query(sql);
}

async function createSubCategoryTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS sub_category (
      ID SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      created_user INTEGER NOT NULL,
      company_id INTEGER NOT NULL,
      category INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_delete BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (created_user) REFERENCES users (ID) ON DELETE CASCADE,
      FOREIGN KEY (company_id) REFERENCES company (ID) ON DELETE CASCADE,
      FOREIGN KEY (category) REFERENCES category (ID) ON DELETE CASCADE
    );
  `;
  await query(sql);
}

async function createManufactureTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS manufacture (
      ID SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      company_id INTEGER NOT NULL,
      created_user INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_delete BOOLEAN DEFAULT FALSE,
      image VARCHAR(255),
      FOREIGN KEY (created_user) REFERENCES users (ID) ON DELETE CASCADE,
      FOREIGN KEY (company_id) REFERENCES company (ID) ON DELETE CASCADE
    );
  `;
  await query(sql);
}

async function createProductTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS product (
      ID SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      company_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      manufacture_id INTEGER NOT NULL,
      sku VARCHAR(100) NOT NULL,
      unit VARCHAR(100) NOT NULL,
      selling_price DECIMAL(20,2) NOT NULL,
      barcode VARCHAR(100) NOT NULL,
      image VARCHAR(255) NOT NULL,
      sub_category_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_delete BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (company_id) REFERENCES company (ID) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES category (ID) ON DELETE CASCADE,
      FOREIGN KEY (manufacture_id) REFERENCES manufacture (ID) ON DELETE CASCADE,
      FOREIGN KEY (sub_category_id) REFERENCES sub_category (ID) ON DELETE CASCADE
    );
  `;
  await query(sql);
}

async function main() {
  try {
    await createCompanyTable();
    await createUsersTable();
    await createEmployeesTable();
    await createCategoryTable();
    await createSubCategoryTable();
    await createManufactureTable();
    await createProductTable();

    console.log('All tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } 
}

main();
