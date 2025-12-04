import * as httpRequest from '~/utils/httpRequest';

// Lấy toàn bộ danh sách kho
export const getWarehouse = async () => {
    try {
        const res = await httpRequest.get('Warehouse');
        return res.data;
    } catch (error) {
        console.error('Error fetching warehouses:', error.message);
    }
};

// Lấy thông tin kho theo ID
export const getWarehouseById = async (id) => {
    try {
        const res = await httpRequest.get(`Warehouse/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching warehouse by ID:', error.message);
    }
};

// Tạo mới kho (không cần warehouseID)
export const createWarehouse = async (warehouse) => {
  try {
    const res = await httpRequest.post('Warehouse', warehouse);
    return res.data;
  } catch (error) {
    console.error('Error creating warehouse:', error.message);
  }
};

// Cập nhật kho
export const updateWarehouse = async (id, warehouse) => {
    try {
        const res = await httpRequest.put(`Warehouse/${id}`, warehouse);
        return res.data;
    } catch (error) {
        console.error('Error updating warehouse:', error.message);
    }
};

// Xoá kho
export const deleteWarehouse = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Warehouse/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting warehouse:', error.message);
    }
};
