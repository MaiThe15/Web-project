import { useState } from 'react';
import { loginAPI } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI({ username, password });
      // Lưu token và thông tin user vào localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert('Đăng nhập thành công!');
      // --- LOGIC CHUYỂN HƯỚNG ---
      const role = res.data.user.role;
      if (role === 'admin') {
        navigate('/admin'); // Chuyển sang trang quản lý
      } else {
        navigate('/home');  // Chuyển sang trang mua hàng
      }
      // Reload nhẹ để App.jsx cập nhật lại Navbar (nếu cần thiết kế lại Navbar)
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Đăng Nhập</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tên đăng nhập</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Đăng Nhập
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Chưa có tài khoản? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Đăng ký ngay</Link>
      </p>
    </div>
  );
};

export default Login;