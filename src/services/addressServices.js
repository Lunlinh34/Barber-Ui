import * as httpRequest from '~/utils/httpRequest';
export const getAddress = async () => {
    try {
        const res = await httpRequest.get('Address');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getAddressById = async (id) => {
    try {
        const res = await httpRequest.get(`Address/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createAddress = async (addressData) => {
    try {
        const res = await httpRequest.post('Address', addressData);
        return res.data;
    } catch (error) {
        console.error('Error creating address:', error.response?.data || error.message);
        throw error;
    }
};
export const updateAddress = async (id, firstName, lastName, picture = 'string', email, phone, dateOfBirth, userID) => {
    try {
        const res = await httpRequest.put(`Address/${id}`, {
            firstName,
            lastName,
            picture: picture,
            email,
            numberphone: phone,
            dateOfBirth,
            userID,
        });

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteAddress = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Address/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
// Lấy thông tin address theo addressID
export const getAddressByAddressID = async (addressID) => {
    try {
        const res = await httpRequest.get(`Address/${addressID}`);
        return res.data; // trả về object address
    } catch (error) {
        console.error('Lỗi khi lấy Address theo ID:', error.message);
        return null;
    }
};
