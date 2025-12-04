// import classNames from 'classnames/bind';
// import { jwtDecode } from 'jwt-decode';

// import styles from './BookingHistory.module.scss';
// import { useEffect, useState } from 'react';
// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';
// import * as storeServices from '~/services/storeServices';
// import * as serviceServices from '~/services/serviceServices';
// import * as employeeServices from '~/services/employeeServices';
// import BookHistoryForm from '~/components/feature/BookHistoryForm';
// import BookingWarning from '~/components/common/BookingWarning';

// const cx = classNames.bind(styles);

// function BookingHistory() {
//     const [currentUser, setCurrentUser] = useState(false);
//     const [bookings, setBookings] = useState([]);
//     const [userID, setUserID] = useState(null);
//     const [customerID, setCustomerID] = useState(null);
//     const [stores, setStores] = useState([]);
//     const [services, setServices] = useState([]);
//     const [employees, setEmployees] = useState([]);
//       const [editingBooking, setEditingBooking] = useState(null);

//       const handleEditBooking = (booking) => {
//     // Lưu booking cần sửa vào state
//     setEditingBooking(booking);
//     // Bạn có thể mở modal hoặc form inline để chỉnh sửa
//   };

//   const handleDeleteBooking = async (bookingID) => {
//     if (!window.confirm('Bạn có chắc muốn xoá lịch đặt này không?')) return;
//     try {
//       await bookServices.deleteBook(bookingID);
//       alert('Xoá thành công');
//       refreshBookings(); // gọi lại API để load lại danh sách booking
//     } catch (error) {
//       console.error('Lỗi xoá booking:', error);
//     }
//   };
//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             try {
//                 setCurrentUser(true);
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//             } catch (error) {
//                 setCurrentUser(false);
//                 console.error('Token không tồn tại:', error);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await customerService.getCustomer();
//                 const customer = response.find((item) => item?.userID === userID);
//                 if (customer) {
//                     setCustomerID(customer?.customerID);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUser();
//     }, [userID]);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await bookServices.getBook();
//             if (result) {
//                 const books = result.filter((book) => book.customerID === customerID);
//                 if (books) {
//                     setBookings(books);
//                 }
//             }
//         };

//         fetchApi();
//     }, [customerID]);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await storeServices.getStore();
//             if (result) {
//                 setStores(result);
//             }
//         };
//         fetchApi();
//     }, []);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await serviceServices.getService();
//             if (result) {
//                 setServices(result);
//             }
//         };
//         fetchApi();
//     }, []);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await employeeServices.getEmployee();
//             if (result) {
//                 setEmployees(result);
//             }
//         };
//         fetchApi();
//     }, []);

//     return (
//         <div className={cx('wrapper')}>
//             {currentUser ? (
//                 <BookHistoryForm bookings={bookings} stores={stores} services={services} employees={employees} 
                
//                 />
//             ) : (
//                 <BookingWarning title="Vui lòng đăng nhập trước khi xem lịch" />
//             )}
//         </div>
//     );
// }

// export default BookingHistory;
// import classNames from 'classnames/bind';
// import { jwtDecode } from 'jwt-decode';
// import { useEffect, useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import styles from './BookingHistory.module.scss';

// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';
// import * as storeServices from '~/services/storeServices';
// import * as serviceServices from '~/services/serviceServices';
// import * as employeeServices from '~/services/employeeServices';
// import BookHistoryForm from '~/components/feature/BookHistoryForm';
// import BookingWarning from '~/components/common/BookingWarning';
// import SideSidebarProfile from "../../components/common/SidebarProfile/sideSidebarProfile";

// const cx = classNames.bind(styles);

// function BookingHistory() {
//     const [currentUser, setCurrentUser] = useState(false);
//     const [bookings, setBookings] = useState([]);
//     const [userID, setUserID] = useState(null);
//     const [customerID, setCustomerID] = useState(null);
//     const [stores, setStores] = useState([]);
//     const [services, setServices] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [editingBooking, setEditingBooking] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const refreshBookings = async () => {
//         try {
//             const result = await bookServices.getBook();
//             if (result) {
//                 const books = result.filter((book) => book.customerID === customerID);
//                 setBookings(books);
//             }
//         } catch (error) {
//             console.error('Lỗi load lại booking:', error);
//         }
//     };

//     const handleEditBooking = (booking) => {
//         setEditingBooking(booking);
//         setShowModal(true);
//     };

//     const handleDeleteBooking = async (bookingID) => {
//         if (!window.confirm('Bạn có chắc muốn xoá lịch đặt này không?')) return;
//         try {
//             await bookServices.deleteBook(bookingID);
//             alert('Xoá thành công');
//             refreshBookings();
//         } catch (error) {
//             console.error('Lỗi xoá booking:', error);
//         }
//     };

//     const handleSaveEdit = async () => {
//         if (!editingBooking) return;

//         const updatedBooking = {
//             startDate: editingBooking.startDate,
//             startTime: editingBooking.startTime,
//             note: editingBooking.note,
//             customerID: editingBooking.customerID,
//             storeID: editingBooking.storeID,
//             employeID: editingBooking.employeID,
//             serID: editingBooking.serID,
//         };

//         try {
//             await bookServices.updateBook(editingBooking.bookingID, updatedBooking);
//             alert('Cập nhật thành công');
//             setShowModal(false);
//             setEditingBooking(null);
//             refreshBookings();
//         } catch (error) {
//             console.error('Lỗi cập nhật booking:', error);
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 setCurrentUser(true);
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//             } catch (error) {
//                 setCurrentUser(false);
//                 console.error('Token không hợp lệ:', error);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await customerService.getCustomer();
//                 const customer = response.find((item) => item?.userID === userID);
//                 if (customer) setCustomerID(customer?.customerID);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUser();
//     }, [userID]);

//     useEffect(() => {
//         refreshBookings();
//     }, [customerID]);

//     useEffect(() => {
//         storeServices.getStore().then(setStores);
//         serviceServices.getService().then(setServices);
//         employeeServices.getEmployee().then(setEmployees);
//     }, []);

//     return (
//         <div className={cx('wrapper')}>
//             {currentUser ? (
//                 <>  
//                     <BookHistoryForm
//                         bookings={bookings}
//                         stores={stores}
//                         employees={employees}
//                         handleEditBooking={handleEditBooking}
//                         handleDeleteBooking={handleDeleteBooking}
//                     />

//                     {/* Modal chỉnh sửa booking */}
//                     <Modal
//                         show={showModal}
//                         onHide={() => setShowModal(false)}
//                         centered
//                         className={cx('edit-modal')}
//                     >
//                         <Modal.Header closeButton>
//                             <Modal.Title className={cx('modal-title')}>Chỉnh sửa lịch đặt</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             {editingBooking && (
//                                 <Form className={cx('edit-form')}>
//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Ngày đặt</Form.Label>
//                                         <Form.Control
//                                             type="date"
//                                             value={editingBooking.startDate}
//                                             onChange={(e) =>
//                                                 setEditingBooking({ ...editingBooking, startDate: e.target.value })
//                                             }
//                                         />
//                                     </Form.Group>

//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Giờ đặt</Form.Label>
//                                         <Form.Control
//                                             type="time"
//                                             value={editingBooking.startTime}
//                                             onChange={(e) =>
//                                                 setEditingBooking({ ...editingBooking, startTime: e.target.value })
//                                             }
//                                         />
//                                     </Form.Group>

//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Cửa hàng</Form.Label>
//                                         <Form.Select
//                                             value={editingBooking.storeID}
//                                             onChange={(e) =>
//                                                 setEditingBooking({
//                                                     ...editingBooking,
//                                                     storeID: Number(e.target.value),
//                                                 })
//                                             }
//                                         >
//                                             {stores.map((store) => (
//                                                 <option key={store.storeID} value={store.storeID}>
//                                                     {store.storeName}
//                                                 </option>
//                                             ))}
//                                         </Form.Select>
//                                     </Form.Group>

//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Thợ cắt</Form.Label>
//                                         <Form.Select
//                                             value={editingBooking.employeID}
//                                             onChange={(e) =>
//                                                 setEditingBooking({
//                                                     ...editingBooking,
//                                                     employeID: Number(e.target.value),
//                                                 })
//                                             }
//                                         >
//                                             {employees.map((emp) => (
//                                                 <option key={emp.employeID} value={emp.employeID}>
//                                                     {emp.firstName} {emp.lastName}
//                                                 </option>
//                                             ))}
//                                         </Form.Select>
//                                     </Form.Group>

//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Ghi chú</Form.Label>
//                                         <Form.Control
//                                             as="textarea"
//                                             rows={3}
//                                             value={editingBooking.note || ''}
//                                             onChange={(e) =>
//                                                 setEditingBooking({ ...editingBooking, note: e.target.value })
//                                             }
//                                         />
//                                     </Form.Group>
//                                 </Form>
//                             )}
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setShowModal(false)}>
//                                 Hủy
//                             </Button>
//                             <Button variant="primary" onClick={handleSaveEdit}>
//                                 Lưu thay đổi
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
                   
//                 </>
//             ) : (
//                 <BookingWarning title="Vui lòng đăng nhập trước khi xem lịch" />
//             )}
//         </div>
//     );
// }

// export default BookingHistory;
// import classNames from 'classnames/bind';
// import { jwtDecode } from 'jwt-decode';
// import { useEffect, useState, useCallback } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import styles from './BookingHistory.module.scss';

// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';
// import * as storeServices from '~/services/storeServices';
// import * as serviceServices from '~/services/serviceServices';
// import * as employeeServices from '~/services/employeeServices';
// import BookHistoryForm from '~/components/feature/BookHistoryForm';
// import BookingWarning from '~/components/common/BookingWarning';

// const cx = classNames.bind(styles);

// function BookingHistory() {
//     const [currentUser, setCurrentUser] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [customerID, setCustomerID] = useState(null);
//     const [bookings, setBookings] = useState([]);
//     const [stores, setStores] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [editingBooking, setEditingBooking] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     // --- Lấy token và userID ---
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//                 setCurrentUser(true);
//             } catch (err) {
//                 console.error('Token không hợp lệ:', err);
//                 setCurrentUser(false);
//             }
//         }
//     }, []);

//     // --- Lấy customerID từ userID ---
//     useEffect(() => {
//         if (!userID) return;

//         const fetchCustomer = async () => {
//             try {
//                 const allCustomers = await customerService.getCustomer();
//                 const customer = allCustomers.find((c) => c.userID === userID);
//                 if (customer) setCustomerID(customer.customerID);
//             } catch (err) {
//                 console.error('Lỗi lấy customerID:', err);
//             }
//         };

//         fetchCustomer();
//     }, [userID]);

//     // --- Lấy danh sách booking của customer ---
//     const fetchBookings = useCallback(async () => {
//         if (!customerID) return;

//         try {
//             const allBookings = await bookServices.getBook();
//             const customerBookings = allBookings.filter(b => b.customerID === customerID);
//             setBookings(customerBookings);
//         } catch (err) {
//             console.error('Lỗi lấy bookings:', err);
//         }
//     }, [customerID]);

//     useEffect(() => {
//         fetchBookings();
//     }, [fetchBookings]);

//     // --- Lấy danh sách cửa hàng và nhân viên ---
//     useEffect(() => {
//         storeServices.getStore().then(setStores).catch(console.error);
//         employeeServices.getEmployee().then(setEmployees).catch(console.error);
//     }, []);

//     // --- Chỉnh sửa ---
//     const handleEditBooking = (booking) => {
//         setEditingBooking(booking);
//         setShowModal(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!editingBooking) return;

//         try {
//             await bookServices.updateBook(editingBooking.bookingID, editingBooking);
//             setShowModal(false);
//             setEditingBooking(null);
//             fetchBookings();
//         } catch (err) {
//             console.error('Lỗi cập nhật booking:', err);
//         }
//     };

//     // --- Xoá ---
//     const handleDeleteBooking = async (bookingID) => {
//         if (!window.confirm('Bạn có chắc muốn xoá lịch đặt này không?')) return;
//         try {
//             await bookServices.deleteBook(bookingID);
//             fetchBookings();
//         } catch (err) {
//             console.error('Lỗi xoá booking:', err);
//         }
//     };

//     if (!currentUser) {
//         return <BookingWarning title="Vui lòng đăng nhập trước khi xem lịch" />;
//     }

//     return (
//         <div className={cx('wrapper')}>
//             <BookHistoryForm
//                 bookings={bookings}
//                 stores={stores}
//                 employees={employees}
//                 handleEditBooking={handleEditBooking}
//                 handleDeleteBooking={handleDeleteBooking}
//             />

//             {/* Modal chỉnh sửa booking */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Chỉnh sửa lịch đặt</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {editingBooking && (
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Ngày đặt</Form.Label>
//                                 <Form.Control
//                                     type="date"
//                                     value={editingBooking.startDate}
//                                     onChange={(e) =>
//                                         setEditingBooking({ ...editingBooking, startDate: e.target.value })
//                                     }
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Giờ đặt</Form.Label>
//                                 <Form.Control
//                                     type="time"
//                                     value={editingBooking.startTime}
//                                     onChange={(e) =>
//                                         setEditingBooking({ ...editingBooking, startTime: e.target.value })
//                                     }
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Cửa hàng</Form.Label>
//                                 <Form.Select
//                                     value={editingBooking.storeID}
//                                     onChange={(e) =>
//                                         setEditingBooking({ ...editingBooking, storeID: Number(e.target.value) })
//                                     }
//                                 >
//                                     {stores.map(store => (
//                                         <option key={store.storeID} value={store.storeID}>
//                                             {store.storeName}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Thợ cắt</Form.Label>
//                                 <Form.Select
//                                     value={editingBooking.employeID}
//                                     onChange={(e) =>
//                                         setEditingBooking({ ...editingBooking, employeID: Number(e.target.value) })
//                                     }
//                                 >
//                                     {employees.map(emp => (
//                                         <option key={emp.employeID} value={emp.employeID}>
//                                             {emp.firstName} {emp.lastName}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Ghi chú</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     value={editingBooking.note || ''}
//                                     onChange={(e) =>
//                                         setEditingBooking({ ...editingBooking, note: e.target.value })
//                                     }
//                                 />
//                             </Form.Group>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Hủy
//                     </Button>
//                     <Button variant="primary" onClick={handleSaveEdit}>
//                         Lưu thay đổi
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// }

// export default BookingHistory;
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './BookingHistory.module.scss';

import * as bookServices from '~/services/bookServices';
import * as customerService from '~/services/customerService';
import * as storeServices from '~/services/storeServices';
import * as employeeServices from '~/services/employeeServices';
import BookHistoryForm from '~/components/feature/BookHistoryForm';
import BookingWarning from '~/components/common/BookingWarning';

const cx = classNames.bind(styles);

function BookingHistory() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userID, setUserID] = useState(null);
    const [customerID, setCustomerID] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [stores, setStores] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // 1. Lấy userID từ token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserID(decoded.userID);
                setCurrentUser(true);
            } catch (err) {
                console.error('Token không hợp lệ:', err);
                setCurrentUser(false);
            }
        }
    }, []);

    // 2. Lấy customerID từ userID
    useEffect(() => {
        if (!userID) return;

        const fetchCustomerID = async () => {
            try {
                const allCustomers = await customerService.getCustomer();
                console.log('All customers:', allCustomers); // debug
                const customer = allCustomers.find(c => c.userID === userID);
                if (customer) {
                    console.log('Customer found:', customer);
                    setCustomerID(customer.customerID);
                } else {
                    console.warn('Không tìm thấy customer cho user này');
                }
            } catch (err) {
                console.error('Lỗi lấy customerID:', err);
            }
        };

        fetchCustomerID();
    }, [userID]);

    // 3. Fetch bookings khi customerID có
    useEffect(() => {
        if (!customerID) return;

        const fetchBookings = async () => {
                if (!customerID) return;
                try {
                    const allBookings = await bookServices.getBook();
                    console.log('All bookings:', allBookings);
                    console.log('Filtering customerID:', customerID);
                    const myBookings = allBookings.filter(b => b.customerID === customerID);
                    console.log('My bookings:', myBookings);
                    setBookings(myBookings);
                } catch (err) {
                    console.error('Lỗi lấy bookings:', err);
                }
            };


        fetchBookings();
    }, [customerID]);

    // 4. Lấy stores và employees
    useEffect(() => {
        storeServices.getStore().then(setStores).catch(console.error);
        employeeServices.getEmployee().then(setEmployees).catch(console.error);
    }, []);

    const handleEditBooking = (booking) => {
        setEditingBooking(booking);
        setShowModal(true);
    };

    const handleSaveEdit = async () => {
        if (!editingBooking) return;

        try {
            await bookServices.updateBook(editingBooking.bookingID, editingBooking);
            setShowModal(false);
            setEditingBooking(null);
            // refresh bookings
            const allBookings = await bookServices.getBook();
            setBookings(allBookings.filter(b => b.customerID === customerID));
        } catch (err) {
            console.error('Lỗi cập nhật booking:', err);
        }
    };

    const handleDeleteBooking = async (bookingID) => {
        if (!window.confirm('Bạn có chắc muốn xoá lịch đặt này không?')) return;

        try {
            await bookServices.deleteBook(bookingID);
            const allBookings = await bookServices.getBook();
            setBookings(allBookings.filter(b => b.customerID === customerID));
        } catch (err) {
            console.error('Lỗi xoá booking:', err);
        }
    };

    if (!currentUser) return <BookingWarning title="Vui lòng đăng nhập trước khi xem lịch" />;

    return (
        <div className={cx('wrapper')}>
            <BookHistoryForm
                bookings={bookings}
                stores={stores}
                employees={employees}
                handleEditBooking={handleEditBooking}
                handleDeleteBooking={handleDeleteBooking}
            />
            {/* Modal chỉnh sửa */}
            <Modal
    show={showModal}
    onHide={() => setShowModal(false)}
    centered
    size="lg"
    dialogClassName={cx('edit-modal-dialog')}      // modal-dialog
    contentClassName={cx('edit-modal-content')}   // modal-content
>
    <Modal.Header closeButton className={cx('edit-modal-header')}>
        <Modal.Title>Chỉnh sửa lịch đặt</Modal.Title>
    </Modal.Header>
    <Modal.Body className={cx('edit-modal-body')}>
        {editingBooking && (
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Ngày đặt</Form.Label>
                    <Form.Control
                        type="date"
                        value={editingBooking.startDate}
                        onChange={(e) =>
                            setEditingBooking({ ...editingBooking, startDate: e.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Giờ đặt</Form.Label>
                    <Form.Control
                        type="time"
                        value={editingBooking.startTime}
                        onChange={(e) =>
                            setEditingBooking({ ...editingBooking, startTime: e.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cửa hàng</Form.Label>
                    <Form.Select
                        value={editingBooking.storeID}
                        onChange={(e) =>
                            setEditingBooking({ ...editingBooking, storeID: Number(e.target.value) })
                        }
                    >
                        {stores.map(store => (
                            <option key={store.storeID} value={store.storeID}>
                                {store.storeName}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Thợ cắt</Form.Label>
                    <Form.Select
                        value={editingBooking.employeID}
                        onChange={(e) =>
                            setEditingBooking({ ...editingBooking, employeID: Number(e.target.value) })
                        }
                    >
                        {employees.map(emp => (
                            <option key={emp.employeID} value={emp.employeID}>
                                {emp.firstName} {emp.lastName}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={editingBooking.note || ''}
                        onChange={(e) =>
                            setEditingBooking({ ...editingBooking, note: e.target.value })
                        }
                    />
                </Form.Group>
            </Form>
        )}
    </Modal.Body>
    <Modal.Footer className={cx('edit-modal-footer')}>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
        </Button>
        <Button variant="primary" onClick={handleSaveEdit}>
            Lưu thay đổi
        </Button>
    </Modal.Footer>
</Modal>

        </div>
    );
}

export default BookingHistory;
