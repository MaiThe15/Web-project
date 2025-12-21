import { useState } from 'react';
import { registerAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: ''
});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerAPI(formData);

      Swal.fire({
        title: 'Thành công',
        text: 'Đăng ký thành công! Vui lòng đăng nhập.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626', // đỏ
        color: '#dc2626'
      }).then(() => {
        navigate('/login');
      });

    } catch (err) {
      Swal.fire({
        title: 'Thất bại',
        text: err.response?.data?.message || 'Đăng ký thất bại',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
        color: '#dc2626'
      });
    }
  };

  const onSwitchToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-600">
            Đăng Ký
          </h2>
          <p className="text-gray-600">Tạo tài khoản mới của bạn</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md
                       hover:bg-red-700 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Đăng Ký
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-red-600 hover:underline font-medium"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
