const jwt = require('jsonwebtoken');

// Middleware 1: Chỉ cần đăng nhập là được (Dùng cho các việc nhẹ nhàng)
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Không có quyền truy cập (Thiếu Token)' });
  }

  try {
    // Cắt bỏ chữ "Bearer " nếu có (thường token gửi lên có dạng: Bearer eyJhbG...)
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = verified; // Lưu thông tin user vào biến req để dùng ở bước sau
    next(); // Cho phép đi tiếp
  } catch (err) {
    res.status(400).json({ message: 'Token không hợp lệ' });
  }
};

// Middleware 2: Phải là Admin mới được qua (Dùng cho việc quan trọng: Xóa/Sửa)
exports.checkAdmin = (req, res, next) => {
  // Hàm này chạy SAU hàm verifyToken, nên đã có thông tin req.user
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Bạn không đủ quyền hạn để làm việc này!' });
  }
};