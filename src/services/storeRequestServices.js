import * as httpRequest from '~/utils/httpRequest';
import {jwtDecode} from 'jwt-decode'; // nhớ import jwtDecode

// 🔹 Lấy userID từ token
const getUserIDFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded?.userID || decoded?.id || null;
    } catch (err) {
        console.error('Token không hợp lệ:', err);
        return null;
    }
};

// 🔹 Lấy danh sách tất cả StoreRequest
export const getAllStoreRequests = async () => {
    try {
        const res = await httpRequest.get('StoreRequest');
        return res.data;
    } catch (error) {
        console.error('Lỗi getAllStoreRequests:', error.message);
        return null;
    }
};

// 🔹 Lấy StoreRequest theo ID
export const getStoreRequestById = async (id) => {
    try {
        const res = await httpRequest.get(`StoreRequest/${id}`);
        return res.data;
    } catch (error) {
        console.error('Lỗi getStoreRequestById:', error.message);
        return null;
    }
};

// 🔹 Tạo mới StoreRequest
export const createStoreRequest = async ({ WorkingHourID, WarehouseID, AddressID, StoreID, Status }) => {
    try {
        const userID = getUserIDFromToken();
        if (!userID) throw new Error('Người dùng chưa đăng nhập!');

        const res = await httpRequest.post('StoreRequest', {
            workingHourID: WorkingHourID,
            warehouseID: WarehouseID,
            addressID: AddressID,
            storeID: StoreID,
            userID,       // 🔹 tự động lấy từ token
            status: Status || 'Pending'
        });
        return res.data;
    } catch (error) {
        console.error('Lỗi createStoreRequest:', error.message);
        return null;
    }
};

// 🔹 Cập nhật StoreRequest
export const updateStoreRequest = async (id, { WorkingHourID, WarehouseID, AddressID, StoreID, Status }) => {
    try {
        const userID = getUserIDFromToken();
        if (!userID) throw new Error('Người dùng chưa đăng nhập!');

        const res = await httpRequest.put(`StoreRequest/${id}`, {
            workingHourID: WorkingHourID,
            warehouseID: WarehouseID,
            addressID: AddressID,
            storeID: StoreID,
            userID,       // 🔹 tự động lấy từ token
            status: Status
        });
        return res.data;
    } catch (error) {
        console.error('Lỗi updateStoreRequest:', error.message);
        return null;
    }
};

// 🔹 Xoá StoreRequest
export const deleteStoreRequest = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`StoreRequest/${id}`);
        return res.data;
    } catch (error) {
        console.error('Lỗi deleteStoreRequest:', error.message);
        return null;
    }
};
