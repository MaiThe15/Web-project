
import { useState, useEffect } from 'react';
import { createProduct, updateProduct, BASE_URL } from '../services/api';
import Swal from 'sweetalert2';

const ProductForm = ({ currentProduct, onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  // Nếu đang mode Sửa, đổ dữ liệu cũ vào form
  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
      if (currentProduct.image_url) {
        setPreview(`${BASE_URL}${currentProduct.image_url}`);
      }
    }
  }, [currentProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Xem trước ảnh vừa chọn
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image); // Key 'image' phải khớp với upload.single('image') ở Backend
    }

    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData);

        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await createProduct(formData);

        Swal.fire({
          icon: 'success',
          title: 'Thêm mới thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      }

      onSuccess(); // Load lại danh sách
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra!',
        text: 'Vui lòng thử lại',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">{currentProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên sản phẩm</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <textarea 
            className="w-full border p-2 rounded" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Giá</label>
          <input 
            type="number" 
            className="w-full border p-2 rounded" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hình ảnh</label>
          <input type="file" onChange={handleImageChange} className="mb-2" />
          {preview && (
            <img src={preview} alt="Preview" className="h-32 object-cover rounded border" />
          )}
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Lưu
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;