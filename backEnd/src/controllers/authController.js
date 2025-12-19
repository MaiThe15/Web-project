const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Đăng ký (Register)
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Kiểm tra user đã tồn tại chưa
    const userExist = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'Username hoặc Email đã tồn tại' });
    }

    // Mã hóa mật khẩu (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Lưu vào DB
    const newUser = await db.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email, role',
      [username, hashedPassword, email]
    );

    res.status(201).json({ message: 'Đăng ký thành công', user: newUser.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

// 2. Đăng nhập (Login)
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm user trong DB
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    // So sánh mật khẩu nhập vào với mật khẩu mã hóa trong DB
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    // Tạo Token (Cấp vé)
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        }, // Thông tin gói trong token
      process.env.JWT_SECRET,                   // Khóa bí mật
      { expiresIn: '1d' }                       // Hết hạn sau 1 ngày
    );

    res.status(200).json({ 
      message: 'Đăng nhập thành công',
      token, // Frontend sẽ lưu cái này để dùng cho các request sau
      user:
        {
            id: user.id,
            username: user.username,
            role: user.role
        }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};