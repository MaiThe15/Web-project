import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import UserHome from './components/UserHome';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';

// Component Bảo vệ Route (Chỉ cho phép truy cập nếu đúng role)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có quy định role cụ thể và user hiện tại không khớp
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Nếu User thường cố vào Admin -> đá về Home
    if (user.role === 'user') return <Navigate to="/home" replace />;
    // Nếu Admin cố vào trang gì đó lạ -> đá về Admin
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-md mb-6 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo link: Nếu là admin về /admin, user về /home, chưa login về /login */}
            <Link 
              to={user?.role === 'admin' ? "/admin" : (user ? "/home" : "/login")} 
              className="text-2xl font-bold text-blue-600"
            >
              MyStore {user?.role === 'admin' ? 'Admin' : ''}
            </Link>
            
            <div className="flex gap-6 items-center">
              {user ? (
                <>
                  <span className="text-gray-700">
                    Xin chào, <span className="font-semibold text-blue-600">{user.username}</span> ({user.role})
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 font-medium border border-red-500 px-3 py-1 rounded hover:bg-red-50 transition"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Đăng Nhập</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Đăng Ký</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Nội dung chính */}
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? "/admin" : "/home"} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? "/admin" : "/home"} />} />
          
          {/* ROUTE CHO ADMIN (Quản lý sản phẩm) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ProductList />
              </ProtectedRoute>
            } 
          />

          {/* ROUTE CHO USER (Xem sản phẩm) */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}> 
                {/* Admin cũng có thể xem trang User nếu muốn */}
                <UserHome />
              </ProtectedRoute>
            } 
          />

          {/* Mặc định chuyển hướng */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;