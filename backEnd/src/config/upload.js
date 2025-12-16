const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Lưu vào thư mục public/images mà bạn đã tạo
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: function (req, file, cb) {
    // 1. Lấy đuôi file (VD: .jpg)
    const ext = path.extname(file.originalname);
    
    // 2. Lấy tên gốc nhưng bỏ đuôi đi
    const name = path.basename(file.originalname, ext);
    
    // 3. Xử lý tên gốc: Biến khoảng trắng thành dấu gạch ngang, bỏ ký tự đặc biệt
    // (Bước này quan trọng để tránh lỗi đường dẫn ảnh sau này)
    const sanitizedName = name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');

    // 4. Ghép lại: Timestamp - TênĐãXửLý . ĐuôiFile
    cb(null, `${Date.now()}-${sanitizedName}${ext}`);
  }
});

// Kiểm tra loại file (chỉ cho up ảnh)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ được upload file ảnh!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;