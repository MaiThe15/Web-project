import { useEffect, useState } from 'react';
import { getProducts, BASE_URL } from '../services/api';
import ProductDetailModal from '../components/ProductDetailModal';

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // thêm state tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi tải danh sách:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Sản Phẩm Của Chúng Tôi
      </h1>

      {/* Thanh tìm kiếm sản phẩm */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-red-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid hiển thị sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products
          .filter((p) => {
            // Chuyển cả tên sản phẩm và từ khóa về chữ thường để tìm chính xác hơn
            return p.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300"
            >
              {/* Ảnh – CLICK để mở popup */}
              <div
                className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer group"
                onClick={() => setSelectedProduct(p)}
              >
                {p.image_url ? (
                  <img
                    src={`${BASE_URL}${p.image_url}`}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-gray-400">Không có ảnh</span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {p.name}
                </h3>

                {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {p.description}
                </p> */}

                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                  <span className="text-gray-500 text-xs ml-2 mt-1">(5/5)</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-bold text-lg">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(p.price)}
                  </span>

                  {/* <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                    Thêm vào giỏ
                  </button> */}
                </div>
              </div>
            </div>
        ))}
      </div>

      {/* Modal chi tiết sản phẩm */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        BASE_URL={BASE_URL}
      />
    </div>
  );
};

export default UserHome;
