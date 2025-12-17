const db = require('../config/db');

// 1.Hàm lấy tất cả sản phẩm
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

// 2.Hàm thêm sản phẩm mới
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

// 3. Hàm Sửa sản phẩm (Update)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ đường dẫn
    const { name, description, price } = req.body;
    
    // Logic: Nếu người dùng có up ảnh mới thì lấy đường dẫn mới
    // Nếu không up ảnh mới thì thôi, không sửa cột image_url
    let query;
    let values;

    if (req.file) {
      // Trường hợp 1: Có thay ảnh mới
      const image_url = `/images/${req.file.filename}`;
      query = `
        UPDATE products 
        SET name = $1, description = $2, price = $3, image_url = $4
        WHERE id = $5 RETURNING *
      `;
      values = [name, description, price, image_url, id];
    } else {
      // Trường hợp 2: Giữ nguyên ảnh cũ (Chỉ sửa thông tin text)
      query = `
        UPDATE products 
        SET name = $1, description = $2, price = $3
        WHERE id = $4 RETURNING *
      `;
      values = [name, description, price, id];
    }

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.status(200).json({
      message: 'Cập nhật thành công',
      product: result.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi Server khi update');
  }
};

// 4. Hàm Xóa sản phẩm (Delete)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Xóa trong Database
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa' });
    }

    // (Nâng cao: Nếu muốn xóa luôn file ảnh trong thư mục public thì dùng thư viện fs của Nodejs ở đây)

    res.status(200).json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi Server khi xóa');
  }
};