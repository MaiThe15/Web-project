const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/upload');
const { verifyToken, checkAdmin } = require('../middleware/authMiddleware');

// Ai cũng xem được
router.get('/', productController.getAllProducts);

// 'image' là tên key mà Frontend phải gửi trong Form Data
// Cần đăng nhập + Là Admin
router.post('/', verifyToken, checkAdmin, (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Nếu có lỗi từ Multer (VD: Sai định dạng file), trả về lỗi 400 JSON
            return res.status(400).json({ message: err.message });
        }
        // Nếu không lỗi, cho phép đi tiếp vào controller
        next();
    });
}, productController.createProduct);

// Cần ID và cho phép upload ảnh mới
// Cần đăng nhập + Là Admin
router.put('/:id', verifyToken, checkAdmin, (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, productController.updateProduct);

// Cần ID
// Cần đăng nhập + Là Admin
router.delete('/:id', verifyToken, checkAdmin, productController.deleteProduct);

module.exports = router;