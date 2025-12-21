import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetailModal from './components/ProductDetailModal';
import UserHome from './components/UserHome';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';

/* Protected Route */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'user') return <Navigate to="/home" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
  }

  return children;
};

/* Layout (Navbar) */
const Layout = ({ user, handleLogout }) => {
  const location = useLocation();

  // Ẩn Navbar ở Login & Register
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  if (hideNavbar) return null;

  return (
    <nav className="bg-red-600 shadow-md mb-6 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to={user?.role === 'admin' ? "/admin" : (user ? "/home" : "/login")}
          className="text-2xl font-bold text-white"
        >
          My Store {user?.role === 'admin' ? 'Admin' : ''}
        </Link>

        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <span className="text-white">
                Xin chào, <span className="font-semibold text-white">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-white font-medium border border-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                Đăng Nhập
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Đăng Ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

/* App */
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
        <Layout user={user} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? "/admin" : "/home"} />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? "/admin" : "/home"} />}
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ProductList />
              </ProtectedRoute>
            }
          />

          {/* USER */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <UserHome />
              </ProtectedRoute>
            }
          />

          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
