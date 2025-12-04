// utils/auth.js
import {jwtDecode} from 'jwt-decode';

export const getUserRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded?.role || null;
  } catch (err) {
    console.error('Token không hợp lệ:', err);
    return null;
  }
};

export const getUserIDFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded?.userID || null;
  } catch (err) {
    console.error('Token không hợp lệ:', err);
    return null;
  }
};
