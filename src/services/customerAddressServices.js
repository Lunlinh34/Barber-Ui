import * as httpRequest from '~/utils/httpRequest';

export const getCustomerAddress = async () => {
    try {
        const res = await httpRequest.get('CustomerAddress');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getCustomerAddressById = async (id) => {
    try {
        const res = await httpRequest.get(`CustomerAddress/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createCustomerAddress = async (customerID, addressID) => {
    try {
        const res = await httpRequest.post('CustomerAddress', {
              customerID: Number(customerID),
            addressID: Number(addressID),
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateCustomerAddress = async (
    id,
    firstName,
    lastName,
    picture = 'string',
    email,
    phone,
    dateOfBirth,
    userID,
) => {
    try {
        const res = await httpRequest.put(`CustomerAddress/${id}`, {
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

export const deleteCustomerAddress = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`CustomerAddress/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
