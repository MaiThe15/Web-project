const ProductDetailModal = ({ product, onClose, BASE_URL }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded">
            {product.image_url ? (
              <img
                src={`${BASE_URL}${product.image_url}`}
                alt={product.name}
                className="w-full h-64 object-contain rounded"
              />
            ) : (
              <span className="text-gray-400">Không có ảnh</span>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              {product.name}
            </h2>

            <p className="text-xl text-blue-600 font-semibold mb-3">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(product.price)}
            </p>

            <p className="mb-3">
              <b>Mô tả:</b><br />
              <span className="text-gray-700">
                {product.description}
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
