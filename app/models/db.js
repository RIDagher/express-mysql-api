import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'testdb',
});

db.connect((err) => {
  if (err) {
    console.error(`Database connection failed ${err.message}`);
  } else {
    console.log('Successfully connected to the database');
  }
});

export default db;
