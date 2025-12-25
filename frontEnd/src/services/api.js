import axios from 'axios';

const BASE_URL = 'http://13.212.147.250'; // Dùng để hiển thị ảnh
const PRODUCT_API_URL = `${BASE_URL}/api/products`;
const AUTH_API_URL = `${BASE_URL}/api/auth`;

// Hàm lấy headers có kèm Token (dùng cho các request cần bảo mật)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- AUTH SERVICES ---
export const loginAPI = (credentials) => axios.post(`${AUTH_API_URL}/login`, credentials);
export const registerAPI = (credentials) => axios.post(`${AUTH_API_URL}/register`, credentials);

// --- PRODUCT SERVICES ---
export const getProducts = () => axios.get(PRODUCT_API_URL);

// Cập nhật các hàm này để gửi kèm Token (nếu backend có middleware check token)
export const deleteProduct = (id) => axios.delete(`${PRODUCT_API_URL}/${id}`, {
  headers: getAuthHeaders()
});

export const createProduct = (data) => axios.post(PRODUCT_API_URL, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    ...getAuthHeaders()
  }
});
export const updateProduct = (id, data) => axios.put(`${PRODUCT_API_URL}/${id}`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    ...getAuthHeaders()
  }
});

export { BASE_URL };