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

// Hàm thêm sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    // Kiểm tra xem có file ảnh gửi lên không
    const image_url = req.file ? `/images/${req.file.filename}` : null;

    if (!name || !price) {
      return res.status(400).json({ message: 'Tên và giá là bắt buộc' });
    }

    const query = `
      INSERT INTO products (name, description, price, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    
    const values = [name, description, price, image_url];
    const result = await db.query(query, values);

    res.status(201).json({
      message: 'Thêm sản phẩm thành công',
      product: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi Server khi thêm sản phẩm');
  }
};