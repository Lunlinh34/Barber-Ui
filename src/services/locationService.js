// src/api/location.js
import * as httpRequest from '~/utils/httpRequest';
import { deleteRequest } from '~/utils/httpRequest';

/** --- READ --- */

// Lấy danh sách tất cả tỉnh/thành phố
export const getProvinces = async () => {
  try {
    const res = await httpRequest.get('/VNDb'); // API của bạn
    return res.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

// Lấy danh sách quận/huyện theo provinceCode
export const getDistrictsByProvince = async (provinceCode) => {
  if (!provinceCode) return [];
  try {
    const res = await httpRequest.get(`/VNDb/${provinceCode}/districts`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching districts for provinceCode=${provinceCode}:`, error);
    return [];
  }
};

/** --- CREATE --- */
// (nếu bạn muốn tạo mới tỉnh/huyện, ví dụ dưới đây là placeholder)
export const createProvince = async (province) => {
  try {
    const res = await httpRequest.post('/VNDb', province);
    return res.data;
  } catch (error) {
    console.error('Error creating province:', error);
    return null;
  }
};

/** --- UPDATE --- */
export const updateProvince = async (provinceCode, province) => {
  try {
    const res = await httpRequest.put(`/VNDb/${provinceCode}`, province);
    return res.data;
  } catch (error) {
    console.error(`Error updating provinceCode=${provinceCode}:`, error);
    return null;
  }
};

/** --- DELETE --- */
export const deleteProvince = async (provinceCode) => {
  try {
    await deleteRequest(`/VNDb/${provinceCode}`);
    return true;
  } catch (error) {
    console.error(`Error deleting provinceCode=${provinceCode}:`, error);
    return false;
  }
};
