import { useState } from 'react';
import { loginAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAPI({ username, password });

      // Lưu thông tin đăng nhập
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Thông báo thành công
      Swal.fire({
        title: 'Thành công',
        text: 'Đăng nhập thành công!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626', // đỏ
        color: '#dc2626'
      }).then(() => {
        const role = res.data.user.role;
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
        window.location.reload();
      });

    } catch (err) {
      // Thông báo thất bại
      Swal.fire({
        title: 'Thất bại',
        text: err.response?.data?.message || 'Đăng nhập thất bại',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
        color: '#dc2626'
      });
    }
  };

  const onSwitchToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-600">
            Đăng Nhập
          </h2>
          <p className="text-gray-600">Chào mừng bạn quay trở lại</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            Đăng Nhập
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <button
            onClick={onSwitchToRegister}
            className="text-red-600 hover:underline font-medium"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
