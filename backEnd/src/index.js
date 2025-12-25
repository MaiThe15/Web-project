const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// const db = require('./config/db'); // Import kết nối DB để chạy thử
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json()); // Để đọc được dữ liệu JSON gửi lên

// Đăng ký route Auth
app.use('/api/auth', authRoutes); // Đường dẫn sẽ là /api/auth/login, /api/auth/register

// Map đường dẫn URL '/images' vào thư mục 'public/images'
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// --- ĐĂNG KÝ ROUTE ---
// Mọi đường dẫn bắt đầu bằng /api/products sẽ chạy vào productRoutes
app.use('/api/products', productRoutes);

// Route test thử
app.get('/', (req, res) => {
  res.send('Backend đang chạy ngon lành!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});