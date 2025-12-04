// import { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import * as customerService from '~/services/customerService';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const LOGIN_SESSION_KEY = 'login_session_time';
// const BOOKING_COUNT_KEY = 'booking_count_at_login';

//   useEffect(() => {
//     const loadUser = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const decoded = jwtDecode(token);
//         const userId = decoded?.userID;
//         if (!userId) throw new Error('Token không hợp lệ');

//         const customers = await customerService.getCustomer();
//         const currentUser = customers.find(c => c.userID === userId);
//         if (!currentUser) throw new Error('Không tìm thấy user');

//         setUser(currentUser);
//       } catch (err) {
//         console.error('Lỗi xác thực token:', err);
//         localStorage.removeItem('token');
//         toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);
//   const navigate = useNavigate(); // ✅ khai báo ở đây

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as customerService from '~/services/customerService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ KEY DÙNG CHUNG CHO TOÀN APP
  const LOGIN_SESSION_KEY = 'login_session_time';
  const BOOKING_COUNT_KEY = 'booking_count_at_login';

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const userId = decoded?.userID;
        if (!userId) throw new Error('Token không hợp lệ');

        const customers = await customerService.getCustomer();
        const currentUser = customers.find(c => c.userID === userId);
        if (!currentUser) throw new Error('Không tìm thấy user');

        setUser(currentUser);

        // ✅ CHỈ RESET KHI LOGIN MỚI — KHÔNG RESET KHI REFRESH
        if (!localStorage.getItem(LOGIN_SESSION_KEY)) {
          localStorage.setItem(LOGIN_SESSION_KEY, Date.now().toString());

          // ✅ Reset số booking cho phiên đăng nhập mới
          localStorage.removeItem(BOOKING_COUNT_KEY);
        }

      } catch (err) {
        console.error('Lỗi xác thực token:', err);

        // ✅ Clean toàn bộ session
        localStorage.removeItem('token');
        localStorage.removeItem(LOGIN_SESSION_KEY);
        localStorage.removeItem(BOOKING_COUNT_KEY);

        toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const navigate = useNavigate();

  // ✅ LOGOUT PHẢI XOÁ SESSION
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem(LOGIN_SESSION_KEY);
    localStorage.removeItem(BOOKING_COUNT_KEY);

    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
