import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '~/contexts/AuthContext';
import BookingWarning from '~/components/common/BookingWarning';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Đang kiểm tra phiên đăng nhập...</div>;

  if (!user) return <BookingWarning title="Vui lòng đăng nhập để truy cập trang này" />;

  return children;
};

export default ProtectedRoute;
