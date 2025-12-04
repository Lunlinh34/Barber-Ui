import * as httpRequest from '~/utils/httpRequest';
export const getBook = async () => {
    try {
        const res = await httpRequest.get('Booking');

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getBookById = async (id) => {
    try {
        const res = await httpRequest.get(`Booking/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createBook = async (bookingData) => {
  try {
    const res = await httpRequest.post('Booking', bookingData);
    return res.data;
  } catch (error) {
    console.log('error: ', error.message);
    throw error;
  }
};

// export const createBookService = async (bookingID, serID, employeID) => {
//     try {
//         const res = await httpRequest.post('BookingService', {
//             bookingID,
//             serID,
//             employeID,
//         });
//         return res.data;
//     } catch (error) {
//         console.log('error: ', error.message);
//     }
// };

export const updateBook = async (id, bookingData) => {
    try {
        // bookingData = { startDate, startTime, note, customerID, storeID, employeID, serID }
        const res = await httpRequest.put(`Booking/${id}`, bookingData);
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
                 throw error;

    }
};

export const deleteBook = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Booking/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
