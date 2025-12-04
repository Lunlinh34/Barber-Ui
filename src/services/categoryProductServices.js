import * as httpRequest from '~/utils/httpRequest';

// Lấy tất cả category
export const getCategory = async () => {
    try {
        const res = await httpRequest.get('Category');
        return res.data; // trả về data trực tiếp
    } catch (error) {
        console.log('Error fetching categories: ', error.message);
    }
};

// Tạo category mới
export const createCategory = async (cateName) => {
    try {
        const res = await httpRequest.post('Category', {
            cateName: cateName,
        });
        return res;
    } catch (error) {
        console.log('Error creating category: ', error.message);
    }
};

// Cập nhật category
export const updateCategory = async (cateID, cateName) => {
    try {
        const res = await httpRequest.put(`Category/${cateID}`, {
            cateName: cateName,
        });
        return res;
    } catch (error) {
        console.log('Error updating category: ', error.message);
    }
};

// Xóa category
export const deleteCategory = async (cateID) => {
    try {
        const res = await httpRequest.deleteRequest(`Category/${cateID}`);
        return res;
    } catch (error) {
        console.log('Error deleting category: ', error.message);
    }
};
