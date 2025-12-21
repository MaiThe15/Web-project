import { useEffect, useState } from 'react';
import { getProducts, BASE_URL } from '../services/api';
import ProductDetailModal from '../components/ProductDetailModal';

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

      {/* Grid hiển thị sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
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
