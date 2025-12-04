import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as bookingServices from '~/services/bookServices';

function BookingNotificationButton({ storeIDs, userRole }) {
    const [bookingCount, setBookingCount] = useState(0);

    useEffect(() => {
        if (userRole !== '3' || storeIDs.length === 0) return;

        // Load lần đầu
        const fetchBookings = async () => {
            const allBookings = await bookingServices.getBook();
            const myBookings = allBookings.filter(b => storeIDs.includes(Number(b.storeID)));
            setBookingCount(myBookings.length);
        };
        fetchBookings();

        // Polling: kiểm tra mỗi 20s
        const interval = setInterval(async () => {
            const allBookings = await bookingServices.getBook();
            const myBookings = allBookings.filter(b => storeIDs.includes(Number(b.storeID)));
            
            if (myBookings.length > bookingCount) {
                toast.info(`📌 Bạn có ${myBookings.length - bookingCount} booking mới!`);
                setBookingCount(myBookings.length);
            }
        }, 20000);

        return () => clearInterval(interval);
    }, [bookingCount, storeIDs, userRole]);

    if (userRole !== '3') return null;

    return (
        <button style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            borderRadius: '50%',
            width: 60,
            height: 60,
            backgroundColor: '#4e9af1',
            color: 'white',
            fontSize: 24,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            cursor: 'pointer',
        }}>
            🔔
        </button>
    );
}

export default BookingNotificationButton;
