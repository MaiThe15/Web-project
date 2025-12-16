const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Kiểm tra kết nối
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Lỗi kết nối Database:', err.stack);
  }
  console.log('Đã kết nối thành công tới PostgreSQL!');
  release();
});

module.exports = pool;