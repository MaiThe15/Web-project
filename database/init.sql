-- 1. Tạo bảng Users (Nếu chưa tạo)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tạo bảng Products (Nếu chưa tạo)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT, -- Lưu đường dẫn ảnh
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Xóa dữ liệu cũ (nếu có) để tránh trùng lặp
TRUNCATE TABLE products RESTART IDENTITY;

-- 4. Thêm dữ liệu mẫu với đường dẫn ảnh local
-- LƯU Ý: Bạn nhớ tải ảnh về và đặt tên đúng như thế này trong folder public/images nhé
INSERT INTO products (name, description, price, image_url) VALUES
('iPhone 15 Pro', 'Điện thoại xịn nhất 2023', 29990000, '/images/iPhone15Pro.jpg'),
('MacBook Air M2', 'Laptop mỏng nhẹ pin trâu', 24500000, '/images/MacBookAirM2.jpg'),
('Sony WH-1000XM5', 'Tai nghe chống ồn đỉnh cao', 6500000, '/images/SonyWH-1000XM5.jpg');

-- 5. Cấp quyền cho admin
UPDATE users 
SET role = 'admin' 
WHERE username = 'admin';