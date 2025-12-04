// import classNames from 'classnames/bind';
// import styles from './BookHistoryForm.module.scss';
// import Table from 'react-bootstrap/Table';

// const cx = classNames.bind(styles);

// function BookHistoryForm({ ...props }) {
//     const { bookings, stores, services, employees } = props;

//     return (
//         <div className={cx('wrapper')}>
//   <h2 className={cx('title')}>Lịch Sử Đặt Lịch</h2>
//   <Table striped>
//     <thead>
//       <tr>
//         <th>Mã đặt</th>
//         <th>Ngày đặt</th>
//         <th>Thời gian</th>
//         <th>Cửa hàng</th>
//         {/* <th>Dịch vụ</th> */}
//         <th>Tên thợ</th>
//       </tr>
//     </thead>
//    <tbody>
//   {bookings.map((booking) => (
//     <tr key={booking.bookingID}>
//       <td>{booking.bookingID}</td>
//       <td>{booking.startDate}</td>
//       <td>{booking.startTime}</td>
//       <td>{stores?.find((store) => store?.storeID === booking?.storeID)?.storeName}</td>
//       {/* <td>{services?.find((service) => service?.serID === booking?.serID)?.serName}</td> */}
//       <td>
//         {employees
//           ?.find((employee) => employee?.employeID === booking?.employeID)
//           .firstName.concat(
//             ' ',
//             employees?.find((employee) => employee?.employeID === booking?.employeID)
//               .lastName,
//           )}
//       </td>
//       {/* Thêm cột hành động */}
//       <td>
//         <button
//           className={cx('edit-btn')}
//           onClick={() => handleEditBooking(booking)}
//         >
//           Sửa
//         </button>
//         <button
//           className={cx('delete-btn')}
//           onClick={() => handleDeleteBooking(booking.bookingID)}
//         >
//           Xoá
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>

//   </Table>
// </div>

//     );
// }

// export default BookHistoryForm;
// import classNames from 'classnames/bind';
// import styles from './BookHistoryForm.module.scss';
// import Table from 'react-bootstrap/Table';

// const cx = classNames.bind(styles);

// function BookHistoryForm({
//     bookings,
//     stores,
//     employees,
//     editingBooking,
//     setEditingBooking,
//     handleEditBooking,
//     handleDeleteBooking,
//     handleSaveEdit
// }) {
//     return (
//         <div className={cx('wrapper')}>
//             <h2 className={cx('title')}>Lịch Sử Đặt Lịch</h2>
//             <Table striped>
//                 <thead>
//                     <tr>
//                         <th>Mã đặt</th>
//                         <th>Ngày đặt</th>
//                         <th>Thời gian</th>
//                         <th>Cửa hàng</th>
//                         <th>Tên thợ</th>
//                         <th>Hành động</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map((booking) => {
//                         const isEditing = editingBooking?.bookingID === booking.bookingID;
//                         return (
//                             <tr key={booking.bookingID}>
//                                 <td>{booking.bookingID}</td>
//                                 <td>
//                                     {isEditing ? (
//                                         <input
//                                             type="date"
//                                             value={editingBooking.startDate}
//                                             onChange={(e) =>
//                                                 setEditingBooking({ ...editingBooking, startDate: e.target.value })
//                                             }
//                                         />
//                                     ) : (
//                                         booking.startDate
//                                     )}
//                                 </td>
//                                 <td>
//                                     {isEditing ? (
//                                         <input
//                                             type="time"
//                                             value={editingBooking.startTime}
//                                             onChange={(e) =>
//                                                 setEditingBooking({ ...editingBooking, startTime: e.target.value })
//                                             }
//                                         />
//                                     ) : (
//                                         booking.startTime
//                                     )}
//                                 </td>
//                                 <td>
//                                     {isEditing ? (
//                                         <select
//                                             value={editingBooking.storeID}
//                                             onChange={(e) =>
//                                                 setEditingBooking({ ...editingBooking, storeID: Number(e.target.value) })
//                                             }
//                                         >
//                                             {stores.map((store) => (
//                                                 <option key={store.storeID} value={store.storeID}>
//                                                     {store.storeName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     ) : (
//                                         stores.find((s) => s.storeID === booking.storeID)?.storeName
//                                     )}
//                                 </td>
//                                 <td>
//                                     {employees.find((e) => e.employeID === booking.employeID)?.firstName}{' '}
//                                     {employees.find((e) => e.employeID === booking.employeID)?.lastName}
//                                 </td>
//                                 <td>
//                                     {isEditing ? (
//                                         <>
//                                             <button className={cx('edit-btn')} onClick={handleSaveEdit}>
//                                                 Lưu
//                                             </button>
//                                             <button
//                                                 className={cx('delete-btn')}
//                                                 onClick={() => setEditingBooking(null)}
//                                             >
//                                                 Hủy
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button
//                                                 className={cx('edit-btn')}
//                                                 onClick={() => handleEditBooking(booking)}
//                                             >
//                                                 Sửa
//                                             </button>
//                                             <button
//                                                 className={cx('delete-btn')}
//                                                 onClick={() => handleDeleteBooking(booking.bookingID)}
//                                             >
//                                                 Xoá
//                                             </button>
//                                         </>
//                                     )}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </Table>
//         </div>
//     );
// }

// export default BookHistoryForm;
import classNames from 'classnames/bind';
import styles from './BookHistoryForm.module.scss';
import { FaCalendarAlt, FaClock, FaStore, FaUser } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

function BookHistoryForm({ bookings, stores, employees, handleEditBooking, handleDeleteBooking }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Lịch Sử Đặt Lịch</h2>
            <div className={cx('cards-container')}>
                {bookings.length === 0 && <p className={cx('no-bookings')}>Bạn chưa có lịch đặt nào.</p>}
                {bookings.map((booking) => {
                    const store = stores.find((s) => s.storeID === booking.storeID);
                    const emp = employees.find((e) => e.employeID === booking.employeID);

                    return (
                        <div key={booking.bookingID} className={cx('booking-card')}>
                            <div className={cx('booking-info')}>
                                <div className={cx('info-row')}>
                                    <FaCalendarAlt className={cx('icon')} />
                                    <span>{booking.startDate}</span>
                                </div>
                                <div className={cx('info-row')}>
                                    <FaClock className={cx('icon')} />
                                    <span>{booking.startTime}</span>
                                </div>
                                <div className={cx('info-row')}>
                                    <FaStore className={cx('icon')} />
                                    <span>{store?.storeName || '--'}</span>
                                </div>
                                <div className={cx('info-row')}>
                                    <FaUser className={cx('icon')} />
                                    <span>{emp ? `${emp.firstName} ${emp.lastName}` : '--'}</span>
                                </div>
                                {booking.note && (
                                    <div className={cx('info-row', 'note')}>
                                        <span>{booking.note}</span>
                                    </div>
                                )}
                            </div>
                            <div className={cx('action-buttons')}>
                                <Button
                                    className={cx('edit-btn')}
                                    onClick={() => handleEditBooking(booking)}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    className={cx('delete-btn')}
                                    onClick={() => handleDeleteBooking(booking.bookingID)}
                                >
                                    Xoá
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BookHistoryForm;
