import * as httpRequest from '~/utils/httpRequest';

// 🔹 Lấy danh sách cửa hàng
export const getStore = async () => {
    try {
        const res = await httpRequest.get('Store');
        return res.data;
    } catch (error) {
        console.error('Error fetching stores:', error.message);
    }
};

// 🔹 Lấy cửa hàng theo ID
export const getStoreById = async (id) => {
    try {
        const res = await httpRequest.get(`Store/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching store by ID:', error.message);
    }
};

// 🔹 Tạo mới cửa hàng (payload trực tiếp)
export const createStore = async (store) => {
    try {
        const res = await httpRequest.post('Store', store); // ✅ payload trực tiếp
        return res.data;
    } catch (error) {
        console.error('Error creating store:', error.message);
    }
};

// 🔹 Cập nhật cửa hàng (payload trực tiếp)
export const updateStore = async (id, store) => {
    try {
        const res = await httpRequest.put(`Store/${id}`, store); // ✅ payload trực tiếp
        return res.data;
    } catch (error) {
        console.error('Error updating store:', error.message);
    }
};

// 🔹 Xóa cửa hàng
export const deleteStore = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Store/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting store:', error.message);
    }
};
