import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, BASE_URL } from '../services/api';
import ProductForm from './ProductForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      text: 'Dữ liệu đã xóa sẽ không thể khôi phục!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        fetchProducts(); // Load lại sau khi xóa

        Swal.fire({
          icon: 'success',
          title: 'Xóa thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Xóa thất bại!',
          text: 'Vui lòng thử lại',
          confirmButtonText: 'OK'
        });
      }
    }
  };


  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleSuccess = () => {
    setIsFormVisible(false);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600 text-center">Quản Lý Sản Phẩm</h1>
        <button 
          onClick={() => { setEditingProduct(null); setIsFormVisible(!isFormVisible); }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isFormVisible ? 'Đóng Form' : '+ Thêm Mới'}
        </button>
      </div>

      {isFormVisible && (
        <ProductForm 
          currentProduct={editingProduct} 
          onSuccess={handleSuccess} 
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {/* Hiển thị danh sách dạng Grid Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow-lg overflow-hidden border">
            <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
              {p.image_url ? (
                <img 
                  src={`${BASE_URL}${p.image_url}`} 
                  alt={p.name} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400">Không có ảnh</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{p.description}</p>
              <p className="text-red-600 font-bold text-lg">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
              </p>
              
              <div className="mt-4 flex justify-end gap-3">
                <button 
                  onClick={() => handleEdit(p)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;