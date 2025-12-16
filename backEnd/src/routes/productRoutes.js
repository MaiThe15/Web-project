const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/upload');

// Định nghĩa: Khi ai đó gọi GET vào đường dẫn này -> Chạy hàm getAllProducts
router.get('/', productController.getAllProducts);

// 'image' là tên key mà Frontend phải gửi trong Form Data
router.post('/', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Nếu có lỗi từ Multer (VD: Sai định dạng file), trả về lỗi 400 JSON
            return res.status(400).json({ message: err.message });
        }
        // Nếu không lỗi, cho phép đi tiếp vào controller
        next();
    });
}, productController.createProduct);

module.exports = router;