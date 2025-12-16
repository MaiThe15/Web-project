const db = require('../config/db');

// Hàm lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    // Gọi vào DB lấy dữ liệu
    const result = await db.query('SELECT * FROM products ORDER BY id DESC');
    
    // Trả về cho Frontend dạng JSON
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi Server');
  }
};