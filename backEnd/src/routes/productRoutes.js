const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Định nghĩa: Khi ai đó gọi GET vào đường dẫn này -> Chạy hàm getAllProducts
router.get('/', productController.getAllProducts);

module.exports = router;