// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';
const BASE_URL = 'http://localhost:3000'; // Dùng để hiển thị ảnh

export const getProducts = () => axios.get(API_URL);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
export const createProduct = (data) => axios.post(API_URL, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export { BASE_URL };