import * as httpRequest from '~/utils/httpRequest';
export const getPayment = async () => {
    try {
        const res = await httpRequest.get('Payment');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getPaymentById = async (id) => {
    try {
        const res = await httpRequest.get(`Payment/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createPayment = async (name, content, video, courseCode) => {
    try {
        const res = await httpRequest.post('Payment', {
            tenBH: name,
            noiDungBH: content,
            video: video,
            maKH: courseCode,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updatePayment = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Payment/${id}`, {
            tenBH: name,
            noiDungBH: content,
            content: video,
            video: video,
            maKH: courseCode,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deletePayment = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Payment/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
