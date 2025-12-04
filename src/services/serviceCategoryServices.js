import * as httpRequest from '~/utils/httpRequest';
export const getServiceCategory = async () => {
    try {
        const res = await httpRequest.get('ServiceCategory');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getServiceCategoryById = async (id) => {
    try {
        const res = await httpRequest.get(`ServiceCategory/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createServiceCategory = async (roleName) => {
    try {
        const res = await httpRequest.post('ServiceCategory', {
            roleName,
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateServiceCategory = async (id, roleName) => {
    try {
        const res = await httpRequest.put(`ServiceCategory/${id}`, {
            roleName,
        });

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteServiceCategory = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`ServiceCategory/${id}`);

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
