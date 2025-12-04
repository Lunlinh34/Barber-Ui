// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';
// const cx = classNames.bind(styles);

// function BookingForm({ ...props }) {
//     const {
//         customerItem,
//         selectedStore,
//         store,
//         employee,
//         employees,
//         selectedService,
//         services,
//         startDate,
//         startTime,
//         note,
//         storeID,
//         handleStoreChange,
//         handleStylistChange,
//         handleServiceChange,
//         handleDateChange,
//         handleTimeChange,
//         handleNoteChange,
//         handleSubmit,
//     } = props;
//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('bookingForm')}>
//                 <div className={cx('formGroup')}>
//                     <label>Họ tên:</label>
//                     <span>
//                         {customerItem?.firstName === undefined && customerItem?.lastName === undefined
//                             ? null
//                             : customerItem?.firstName.concat(' ', customerItem?.lastName)}
//                     </span>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="store">Chi nhánh:</label>
//                     <select
//                         id="store"
//                         value={selectedStore?.storeID}
//                         onChange={handleStoreChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn chi nhánh --</option>
//                         {store.map((store) => (
//                             <option key={store.storeID} value={store.storeID}>
//                                 {store.storeName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="employee">Thợ :</label>
//                     <select
//                         id="employee"
//                         value={employee?.employeID}
//                         onChange={handleStylistChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn thợ --</option>
//                         {storeID &&
//                             employees
//                                 .filter((employee) => employee?.storeID === parseInt(storeID))
//                                 .map((employee) => (
//                                     <option key={employee.employeeID} value={employee.employeeID}>
//                                         {employee.firstName} {employee.lastName}
//                                     </option>
//                                 ))}
//                     </select>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="service">Dịch vụ:</label>
//                     <select
//                         id="service"
//                         value={selectedService?.serID}
//                         onChange={handleServiceChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn dịch vụ --</option>
//                         {services.map((service) => (
//                             <option key={service.serID} value={service.serID}>
//                                 {service.serName} - {service.serPrice}₫
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="date">Ngày:</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={startDate}
//                         onChange={handleDateChange}
//                         min={moment().format('DD-MM-YYY')}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="time">Giờ:</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={startTime}
//                         onChange={handleTimeChange}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="notes">Ghi chú: </label>
//                     <textarea
//                         id="note"
//                         value={note}
//                         onChange={handleNoteChange}
//                         className={cx('inputField')}
//                     ></textarea>
//                 </div>
//             </div>
//             <div className={cx('btn-submit')}>
//                 <button onClick={handleSubmit} className={cx('submitButton')}>
//                     Xác nhận đặt lịch
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default BookingForm;
// import React from 'react';
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';

// const cx = classNames.bind(styles);

// function BookingForm({
//     customerItem,
//     store = [],                // ✅ đảm bảo không undefined
//     services = [],              // ✅ đảm bảo không undefined
//     filteredEmployees = [],     // ✅ đảm bảo không undefined
//     employee,
//         employees = [],          // ✅ thêm dòng này
//        selectedEmployeeID,        // ✅ thêm
//     setSelectedEmployeeID,   
//     storeID,
//     selectedStore,
//     selectedService,
//     startDate,
//     startTime,
//     note,
//     handleStoreChange,
//     handleStylistChange,
//     handleServiceChange,
//     handleDateChange,
//     handleTimeChange,
//     handleNoteChange,
//     handleSubmit,
// }) {
//     return (
//         <section className={cx('heForm', 'heFormWide')}>
//             <h2 className={cx('formTitle')}>Đặt lịch hẹn</h2>

//             <form className={cx('heFormEl')} onSubmit={(e) => e.preventDefault()}>
//                 <div className={cx('heGrid')}>
//                     {/* Họ tên khách hàng */}
//                     <div className={cx('heField')}>
//                         <label>Họ tên khách hàng</label>
//                         <span className={cx('readonly')}>
//                             {customerItem?.firstName || customerItem?.lastName
//                                 ? `${customerItem.firstName || ''} ${customerItem.lastName || ''}`
//                                 : 'Chưa có thông tin'}
//                         </span>
//                     </div>

//                     {/* Chi nhánh */}
//                     <div className={cx('heField')}>
//                         <label htmlFor="store">Chi nhánh</label>
//                         <select
//                             id="store"
//                             value={selectedStore?.storeID || ''}
//                             onChange={handleStoreChange}
//                             className={cx('inputField')}
//                         >
//                             <option value="">-- Chọn chi nhánh --</option>
//                             {store?.map((s) => (
//                                 <option key={s.storeID} value={s.storeID}>
//                                     {s.storeName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Nhân viên */}
//                     {/* Nhân viên */}  
//                         <div className={cx('heField')}>
//                         <label htmlFor="employee">Thợ</label>
//                         <select
//                             id="employee"
//                             value={selectedEmployeeID || ''} // dùng ID thay vì object
//                             onChange={handleStylistChange}
//                             disabled={!storeID}
//                             className={cx('inputField')}
//                         >
//                             <option value="">-- Chọn thợ --</option>
//                             {(filteredEmployees && filteredEmployees.length > 0
//                                 ? filteredEmployees
//                                 : employees || []
//                             ).map((e) => (
//                                 <option key={e.employeID} value={String(e.employeID)}>
//                                     {e.firstName} {e.lastName}
//                                 </option>
//                             ))}
//                         </select>
//                         </div>


//                     {/* Dịch vụ */}
//                     <div className={cx('heField')}>
//                         <label htmlFor="service">Dịch vụ</label>
//                         <select
//                             id="service"
//                             value={selectedService?.serID || ''}
//                             onChange={handleServiceChange}
//                             className={cx('inputField')}
//                         >
//                             <option value="">-- Chọn dịch vụ --</option>
//                             {services?.map((s) => (
//                                 <option key={s.serID} value={s.serID}>
//                                     {s.serName} - {s.serPrice}₫
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Ngày */}
//                     <div className={cx('heField')}>
//                         <label htmlFor="date">Ngày</label>
//                         <input
//                             type="date"
//                             id="date"
//                             value={startDate}
//                             onChange={handleDateChange}
//                             min={moment().format('YYYY-MM-DD')}
//                             className={cx('inputField')}
//                         />
//                     </div>

//                     {/* Giờ */}
//                     <div className={cx('heField')}>
//                         <label htmlFor="time">Giờ</label>
//                         <input
//                             type="time"
//                             id="time"
//                             value={startTime}
//                             onChange={handleTimeChange}
//                             className={cx('inputField')}
//                         />
//                     </div>

//                     {/* Ghi chú */}
//                     <div className={cx('heField', 'heFieldFull')}>
//                         <label htmlFor="note">Ghi chú</label>
//                         <textarea
//                             id="note"
//                             value={note}
//                             onChange={handleNoteChange}
//                             className={cx('inputField')}
//                         ></textarea>
//                     </div>
//                 </div>

//                 <div className={cx('heActions')}>
//                     <button onClick={handleSubmit} className={cx('heBtn')} type="button">
//                         Xác nhận đặt lịch
//                     </button>
//                     <span className={cx('heMiniLink')}>
//                         Powered by{' '}
//                         <a
//                             href="https://engine.com/travel-trends-tech/free-hotel-booking-forms"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             Engine.com
//                         </a>
//                     </span>
//                 </div>
//             </form>
//         </section>
//     );
// }

// export default BookingForm;
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';
// const cx = classNames.bind(styles);

// function BookingForm({ ...props }) {
//     const {
//         customerItem,
//         selectedStore,
//         store,
//         employee,
//         employees,
//         selectedService,
//         services,
//         startDate,
//         startTime,
//         note,
//         storeID,
//         handleStoreChange,
//         handleStylistChange,
//         handleServiceChange,
//         handleDateChange,
//         handleTimeChange,
//         handleNoteChange,
//         handleSubmit,
//     } = props;
//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('bookingForm')}>
//                 <div className={cx('formGroup')}>
//                     <label>Họ tên:</label>
//                     <span>
//                         {customerItem?.firstName === undefined && customerItem?.lastName === undefined
//                             ? null
//                             : customerItem?.firstName.concat(' ', customerItem?.lastName)}
//                     </span>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="store">Chi nhánh:</label>
//                     <select
//                         id="store"
//                         value={selectedStore?.storeID}
//                         onChange={handleStoreChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn chi nhánh --</option>
//                         {store.map((store) => (
//                             <option key={store.storeID} value={store.storeID}>
//                                 {store.storeName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="employee">Thợ :</label>
//                     <select
//                         id="employee"
//                         value={employee?.employeID}
//                         onChange={handleStylistChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn thợ --</option>
//                         {storeID &&
//                             employees
//                                 .filter((employee) => employee?.storeID === parseInt(storeID))
//                                 .map((employee) => (
//                                     <option key={employee.employeeID} value={employee.employeeID}>
//                                         {employee.firstName} {employee.lastName}
//                                     </option>
//                                 ))}
//                     </select>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="service">Dịch vụ:</label>
//                     <select
//                         id="service"
//                         value={selectedService?.serID}
//                         onChange={handleServiceChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn dịch vụ --</option>
//                         {services.map((service) => (
//                             <option key={service.serID} value={service.serID}>
//                                 {service.serName} - {service.serPrice}₫
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="date">Ngày:</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={startDate}
//                         onChange={handleDateChange}
//                         min={moment().format('DD-MM-YYY')}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="time">Giờ:</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={startTime}
//                         onChange={handleTimeChange}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 <div className={cx('formGroup')}>
//                     <label htmlFor="notes">Ghi chú: </label>
//                     <textarea
//                         id="note"
//                         value={note}
//                         onChange={handleNoteChange}
//                         className={cx('inputField')}
//                     ></textarea>
//                 </div>
//             </div>
//             <div className={cx('btn-submit')}>
//                 <button onClick={handleSubmit} className={cx('submitButton')}>
//                     Xác nhận đặt lịch
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default BookingForm;
// import React from 'react';
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';

// const cx = classNames.bind(styles);

// function BookingForm({
//     customerItem,
//     store = [],
//     services = [],
//     employees = [],
//     filteredEmployees = [],
//     selectedEmployeeID,
//     setSelectedEmployeeID,
//     storeID,
//     selectedStore,
//     selectedService,
//     startDate,
//     startTime,
//     note,
//     handleStoreChange,
//     handleStylistChange,
//     handleServiceChange,
//     handleDateChange,
//     handleTimeChange,
//     handleNoteChange,
//     handleSubmit,
//        serviceCategories = [],        // ✅ thêm
//     selectedCategoryID,            // ✅ thêm
//     handleCategoryChange,          // ✅ thêm
//     filteredServices = [], 
// }) {
//     return (
//         <section className={cx('bookingFormWrapper')}>
//             <h2 className={cx('formTitle')}>Đặt lịch hẹn</h2>

//             <form className={cx('bookingForm')} onSubmit={(e) => e.preventDefault()}>
//                 {/* Khối 1: Tên khách hàng */}
//                 <div className={cx('formBlock')}>
//                     <label>Họ tên khách hàng</label>
//                     <span className={cx('readonly')}>
//                         {customerItem?.firstName || customerItem?.lastName
//                             ? `${customerItem.firstName || ''} ${customerItem.lastName || ''}`
//                             : 'Chưa có thông tin'}
//                     </span>
//                 </div>

//                 {/* Khối 2: Chọn Cửa Hàng */}
//                 <div className={cx('formBlock')}>
//                     <label htmlFor="store">Chi nhánh</label>
//                     <select
//                         id="store"
//                         value={selectedStore?.storeID || ''}
//                         onChange={handleStoreChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn chi nhánh --</option>
//                         {store?.map((s) => (
//                             <option key={s.storeID} value={s.storeID}>
//                                 {s.storeName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 3: Chọn Nhân Viên */}
//                 <div className={cx('formBlock')}>
//                     <label htmlFor="employee">Thợ</label>
//                     <select
//                         id="employee"
//                         value={selectedEmployeeID || ''}
//                         onChange={handleStylistChange}
//                         disabled={!storeID}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn thợ --</option>
//                         {(filteredEmployees && filteredEmployees.length > 0
//                             ? filteredEmployees
//                             : employees || []
//                         ).map((e) => (
//                             <option key={e.employeID} value={String(e.employeID)}>
//                                 {e.firstName} {e.lastName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
// {/* Khối 3: Chọn Loại Dịch Vụ */}
// <div className={cx('formBlock')}>
//     <label htmlFor="category">Loại dịch vụ</label>
//     <select
//     id="category"
//     value={selectedCategoryID || ''}
//     onChange={handleCategoryChange}
//     className={cx('inputField')}
// >
//     <option value="">-- Chọn loại dịch vụ --</option>
//     {serviceCategories?.map(cat => (
//         <option key={cat.serCateID} value={cat.serCateID}>
//             {cat.serCateName}
//         </option>
//     ))}
// </select>
// </div>

// {/* Khối 4: Chọn Dịch Vụ */}
// <div className={cx('formBlock')}>
//     <label htmlFor="service">Dịch vụ</label>
//     <select
//         id="service"
//         value={selectedService?.serID || ''}
//         onChange={handleServiceChange}
//         className={cx('inputField')}
//         disabled={!selectedCategoryID}
//     >
//         <option value="">-- Chọn dịch vụ --</option>
//         {filteredServices?.map(s => (
//             <option key={s.serID} value={s.serID}>
//                 {s.serName} - {s.serPrice ? `${s.serPrice}₫` : ''}
//             </option>
//         ))}
//     </select>
// </div>


//                 {/* Khối 5: Chọn Ngày */}
//                 <div className={cx('formBlock')}>
//                     <label htmlFor="date">Ngày</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={startDate}
//                         onChange={handleDateChange}
//                         min={moment().format('YYYY-MM-DD')}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 6: Chọn Giờ */}
//                 <div className={cx('formBlock')}>
//                     <label htmlFor="time">Giờ</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={startTime}
//                         onChange={handleTimeChange}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 7: Ghi chú */}
//                 <div className={cx('formBlock')}>
//                     <label htmlFor="note">Ghi chú</label>
//                     <textarea
//                         id="note"
//                         value={note}
//                         onChange={handleNoteChange}
//                         className={cx('inputField')}
//                         rows={3}
//                     ></textarea>
//                 </div>

//                 {/* Khối 8: Nút xác nhận */}
//                 <div className={cx('formBlock', 'formActions')}>
//                     <button onClick={handleSubmit} className={cx('submitButton')} type="button">
//                         Xác nhận đặt lịch
//                     </button>
//                 </div>
//             </form>
//         </section>
//     );
// }

// export default BookingForm;
///////////////////////////////////////////
// import React, { useEffect, useRef } from 'react';
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';

// const cx = classNames.bind(styles);

// function BookingForm({
//     customerItem,
//     store = [],
//     services = [],
//     employees = [],
//     filteredEmployees = [],
//     selectedEmployeeID,
//     storeID,
//     selectedStore,
//     selectedService,
//     startDate,
//     startTime,
//     note,
//     handleStoreChange,
//     handleStylistChange,
//     handleServiceChange,
//     handleDateChange,
//     handleTimeChange,
//     handleNoteChange,
//     handleSubmit,
//     serviceCategories = [],
//     selectedCategoryID,
//     handleCategoryChange,
//     filteredServices = [],
// }) {
//     const blocksRef = useRef([]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add(cx('fadeIn'));
//                     }
//                 });
//             },
//             { threshold: 0.2 }
//         );

//         blocksRef.current.forEach(block => {
//             if (block) observer.observe(block);
//         });

//         return () => {
//             blocksRef.current.forEach(block => {
//                 if (block) observer.unobserve(block);
//             });
//         };
//     }, []);

//     return (
//         <section className={cx('bookingFormWrapper')}>
//             <h2 className={cx('formTitle')}>Đặt lịch hẹn</h2>

//             <form className={cx('bookingForm')} onSubmit={(e) => e.preventDefault()}>
//                 {/* Khối 1: Tên khách hàng */}
//                 <div ref={el => blocksRef.current[0] = el} className={cx('formBlock')}>
//                     <label>Họ tên khách hàng</label>
//                     <span className={cx('readonly')}>
//                         {customerItem?.firstName || customerItem?.lastName
//                             ? `${customerItem.firstName || ''} ${customerItem.lastName || ''}`
//                             : 'Chưa có thông tin'}
//                     </span>
//                 </div>

//                 {/* Khối 2: Chọn Cửa Hàng */}
//                 <div ref={el => blocksRef.current[1] = el} className={cx('formBlock')}>
//                     <label htmlFor="store">Chi nhánh</label>
//                     <select
//                         id="store"
//                         value={selectedStore?.storeID || ''}
//                         onChange={handleStoreChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn chi nhánh --</option>
//                         {store?.map((s) => (
//                             <option key={s.storeID} value={s.storeID}>
//                                 {s.storeName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 3: Chọn Nhân Viên */}
//                 <div ref={el => blocksRef.current[2] = el} className={cx('formBlock')}>
//                     <label htmlFor="employee">Thợ</label>
//                     <select
//                         id="employee"
//                         value={selectedEmployeeID || ''}
//                         onChange={handleStylistChange}
//                         disabled={!storeID}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn thợ --</option>
//                         {(filteredEmployees && filteredEmployees.length > 0
//                             ? filteredEmployees
//                             : employees || []
//                         ).map((e) => (
//                             <option key={e.employeID} value={String(e.employeID)}>
//                                 {e.firstName} {e.lastName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 4: Chọn Loại Dịch Vụ */}
//                 <div ref={el => blocksRef.current[3] = el} className={cx('formBlock')}>
//                     <label htmlFor="category">Loại dịch vụ</label>
//                     <select
//                         id="category"
//                         value={selectedCategoryID || ''}
//                         onChange={handleCategoryChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn loại dịch vụ --</option>
//                         {serviceCategories?.map(cat => (
//                             <option key={cat.serCateID} value={cat.serCateID}>
//                                 {cat.serCateName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 5: Chọn Dịch Vụ */}
//                 <div ref={el => blocksRef.current[4] = el} className={cx('formBlock')}>
//                     <label htmlFor="service">Dịch vụ</label>
//                     <select
//                         id="service"
//                         value={selectedService?.serID || ''}
//                         onChange={handleServiceChange}
//                         className={cx('inputField')}
//                         disabled={!selectedCategoryID}
//                     >
//                         <option value="">-- Chọn dịch vụ --</option>
//                         {filteredServices?.map(s => (
//                             <option key={s.serID} value={s.serID}>
//                                 {s.serName} - {s.serPrice ? `${s.serPrice}₫` : ''}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 6: Chọn Ngày */}
//                 <div ref={el => blocksRef.current[5] = el} className={cx('formBlock')}>
//                     <label htmlFor="date">Ngày</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={startDate}
//                         onChange={handleDateChange}
//                         min={moment().format('YYYY-MM-DD')}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 7: Chọn Giờ */}
//                 <div ref={el => blocksRef.current[6] = el} className={cx('formBlock')}>
//                     <label htmlFor="time">Giờ</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={startTime}
//                         onChange={handleTimeChange}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 8: Ghi chú */}
//                 <div ref={el => blocksRef.current[7] = el} className={cx('formBlock')}>
//                     <label htmlFor="note">Ghi chú</label>
//                     <textarea
//                         id="note"
//                         value={note}
//                         onChange={handleNoteChange}
//                         className={cx('inputField', 'textareaField')}
//                         rows={3}
//                     ></textarea>
//                 </div>

//                 {/* Khối 9: Nút xác nhận */}
//                 <div ref={el => blocksRef.current[8] = el} className={cx('formBlock', 'formActions')}>
//                     <button onClick={handleSubmit} className={cx('submitButton')} type="button">
//                         Xác nhận đặt lịch
//                     </button>
//                 </div>
//             </form>
//         </section>
//     );
// }

// export default BookingForm;
// import React, { useEffect, useRef } from 'react';
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';

// const cx = classNames.bind(styles);

// function BookingForm({
//     customerItem,
//     store = [],
//     employees = [],
//     filteredEmployees = [],
//     selectedEmployeeID,
//     selectedStore,
//     selectedService,
//     startDate,
//     startTime,
//     note,
//     handleStoreChange,
//     handleStylistChange,
//     handleServiceChange,
//     handleDateChange,
//     handleTimeChange,
//     handleNoteChange,
//     handleSubmit,
//     serviceCategories = [],
//     selectedCategoryID,
//     handleCategoryChange,
//     filteredServices = [],
// }) {
//     const blocksRef = useRef([]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add(cx('fadeIn'));
//                     }
//                 });
//             },
//             { threshold: 0.2 }
//         );

//         blocksRef.current.forEach(block => {
//             if (block) observer.observe(block);
//         });

//         return () => {
//             blocksRef.current.forEach(block => {
//                 if (block) observer.unobserve(block);
//             });
//         };
//     }, []);

//     return (
//         <section className={cx('bookingFormWrapper')}>
//             <h2 className={cx('formTitle')}>Đặt lịch hẹn</h2>

//             <form className={cx('bookingForm')} onSubmit={(e) => e.preventDefault()}>
//                 {/* Khối 1: Tên khách hàng */}
//                 <div ref={el => blocksRef.current[0] = el} className={cx('formBlock')}>
//                     <label>Họ tên khách hàng</label>
//                     <span className={cx('readonly')}>
//                         {customerItem?.firstName || customerItem?.lastName
//                             ? `${customerItem.firstName || ''} ${customerItem.lastName || ''}`
//                             : 'Chưa có thông tin'}
//                     </span>
//                 </div>

//                 {/* Khối 2: Chọn Cửa Hàng */}
//                 <div ref={el => blocksRef.current[1] = el} className={cx('formBlock')}>
//                     <label htmlFor="store">Chi nhánh</label>
//                     <select
//                         id="store"
//                         value={selectedStore?.storeID || ''}
//                         onChange={handleStoreChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn chi nhánh --</option>
//                         {store?.map((s) => (
//                             <option key={s.storeID} value={s.storeID}>
//                                 {s.storeName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 3: Chọn Nhân Viên */}
//                 <div ref={el => blocksRef.current[2] = el} className={cx('formBlock')}>
//                     <label htmlFor="employee">Thợ</label>
//                     <select
//                         id="employee"
//                         value={selectedEmployeeID || ''}
//                         onChange={handleStylistChange}
//                         disabled={!selectedStore}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn thợ --</option>
//                         {(filteredEmployees && filteredEmployees.length > 0
//                             ? filteredEmployees
//                             : employees || []
//                         ).map((e) => (
//                             <option key={e.employeID} value={e.employeID}>
//                                 {e.firstName} {e.lastName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 4: Chọn Loại Dịch Vụ */}
//                 <div ref={el => blocksRef.current[3] = el} className={cx('formBlock')}>
//                     <label htmlFor="category">Loại dịch vụ</label>
//                     <select
//                         id="category"
//                         value={selectedCategoryID || ''}
//                         onChange={handleCategoryChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn loại dịch vụ --</option>
//                         {serviceCategories?.map(cat => (
//                             <option key={cat.serCateID} value={cat.serCateID}>
//                                 {cat.serCateName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 5: Chọn Dịch Vụ */}
//                 <div ref={el => blocksRef.current[4] = el} className={cx('formBlock')}>
//                     <label htmlFor="service">Dịch vụ</label>
//                     <select
//                         id="service"
//                         value={selectedService?.serID || ''}
//                         onChange={handleServiceChange}
//                         className={cx('inputField')}
//                         disabled={!selectedCategoryID}
//                     >
//                         <option value="">-- Chọn dịch vụ --</option>
//                         {filteredServices?.map(s => (
//                             <option key={s.serID} value={s.serID}>
//                                 {s.serName} - {s.serPrice ? `${s.serPrice}₫` : ''}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 6: Chọn Ngày */}
//                 <div ref={el => blocksRef.current[5] = el} className={cx('formBlock')}>
//                     <label htmlFor="date">Ngày</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={startDate}
//                         onChange={handleDateChange}
//                         min={moment().format('YYYY-MM-DD')}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 7: Chọn Giờ */}
//                 <div ref={el => blocksRef.current[6] = el} className={cx('formBlock')}>
//                     <label htmlFor="time">Giờ</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={startTime}
//                         onChange={handleTimeChange}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 8: Ghi chú */}
//                 <div ref={el => blocksRef.current[7] = el} className={cx('formBlock')}>
//                     <label htmlFor="note">Ghi chú</label>
//                     <textarea
//                         id="note"
//                         value={note}
//                         onChange={handleNoteChange}
//                         className={cx('inputField', 'textareaField')}
//                         rows={3}
//                     />
//                 </div>

//                 {/* Khối 9: Nút xác nhận */}
//                 <div ref={el => blocksRef.current[8] = el} className={cx('formBlock', 'formActions')}>
//                     <button onClick={handleSubmit} className={cx('submitButton')} type="button">
//                         Xác nhận đặt lịch
//                     </button>
//                 </div>
//             </form>
//         </section>
//     );
// }

// export default BookingForm;
// import React, { useEffect, useRef } from 'react';
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';

// const cx = classNames.bind(styles);

// function BookingForm({
//     customerItem,
//     cities = [],
//     selectedCityID,
//     handleCityChange,
//     store = [],
//     employees = [],
//     filteredEmployees = [],
//     selectedEmployeeID,
//     selectedStore,
//     selectedService,
//     startDate,
//     startTime,
//     note,
//     handleStoreChange,
//     handleStylistChange,
//     handleServiceChange,
//     handleDateChange,
//     handleTimeChange,
//     handleNoteChange,
//     handleSubmit,
//     serviceCategories = [],
//     selectedCategoryID,
//     handleCategoryChange,
//     filteredServices = [],
// }) {
//     const blocksRef = useRef([]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add(cx('fadeIn'));
//                     }
//                 });
//             },
//             { threshold: 0.2 }
//         );

//         blocksRef.current.forEach(block => {
//             if (block) observer.observe(block);
//         });

//         return () => {
//             blocksRef.current.forEach(block => {
//                 if (block) observer.unobserve(block);
//             });
//         };
//     }, []);

//     return (
//         <section className={cx('bookingFormWrapper')}>
//             <h2 className={cx('formTitle')}>Đặt lịch hẹn</h2>

//             <form className={cx('bookingForm')} onSubmit={(e) => e.preventDefault()}>
//                 {/* Khối 0: Chọn City */}
//                 <div ref={el => blocksRef.current[0] = el} className={cx('formBlock')}>
//                     <label htmlFor="city">Tỉnh/Thành phố</label>
//                     <select
//                         id="city"
//                         value={selectedCityID || ''}
//                         onChange={handleCityChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn Tỉnh/Thành phố --</option>
//                         {cities?.map(city => (
//                             <option key={city.countryID} value={city.countryID}>
//                                 {city.countryName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 1: Tên khách hàng */}
//                 <div ref={el => blocksRef.current[1] = el} className={cx('formBlock')}>
//                     <label>Họ tên khách hàng</label>
//                     <span className={cx('readonly')}>
//                         {customerItem?.firstName || customerItem?.lastName
//                             ? `${customerItem.firstName || ''} ${customerItem.lastName || ''}`
//                             : 'Chưa có thông tin'}
//                     </span>
//                 </div>

//                 {/* Khối 2: Chọn Cửa Hàng */}
//                 <div ref={el => blocksRef.current[2] = el} className={cx('formBlock')}>
//                     <label htmlFor="store">Chi nhánh</label>
//                     <select
//                         id="store"
//                         value={selectedStore?.storeID || ''}
//                         onChange={handleStoreChange}
//                         className={cx('inputField')}
//                         disabled={!selectedCityID}
//                     >
//                         <option value="">-- Chọn chi nhánh --</option>
//                         {store?.map(s => (
//                             <option key={s.storeID} value={s.storeID}>
//                                 {s.storeName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 3: Chọn Nhân Viên */}
//                 <div ref={el => blocksRef.current[3] = el} className={cx('formBlock')}>
//                     <label htmlFor="employee">Thợ</label>
//                     <select
//                         id="employee"
//                         value={selectedEmployeeID || ''}
//                         onChange={handleStylistChange}
//                         disabled={!selectedStore}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn thợ --</option>
//                         {filteredEmployees.length > 0 ? (
//                             filteredEmployees.map(e => (
//                                 <option key={e.employeID} value={e.employeID}>
//                                     {e.firstName} {e.lastName}
//                                 </option>
//                             ))
//                         ) : (
//                             <option value="">-- Không có thợ --</option>
//                         )}
//                     </select>
//                 </div>

//                 {/* Khối 4: Chọn Loại Dịch Vụ */}
//                 <div ref={el => blocksRef.current[4] = el} className={cx('formBlock')}>
//                     <label htmlFor="category">Loại dịch vụ</label>
//                     <select
//                         id="category"
//                         value={selectedCategoryID || ''}
//                         onChange={handleCategoryChange}
//                         className={cx('inputField')}
//                     >
//                         <option value="">-- Chọn loại dịch vụ --</option>
//                         {serviceCategories?.map(cat => (
//                             <option key={cat.serCateID} value={cat.serCateID}>
//                                 {cat.serCateName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 5: Chọn Dịch Vụ */}
//                 <div ref={el => blocksRef.current[5] = el} className={cx('formBlock')}>
//                     <label htmlFor="service">Dịch vụ</label>
//                     <select
//                         id="service"
//                         value={selectedService?.serID || ''}
//                         onChange={handleServiceChange}
//                         className={cx('inputField')}
//                         disabled={!selectedCategoryID}
//                     >
//                         <option value="">-- Chọn dịch vụ --</option>
//                         {filteredServices?.map(s => (
//                             <option key={s.serID} value={s.serID}>
//                                 {s.serName} - {s.serPrice ? `${s.serPrice}₫` : ''}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Khối 6: Chọn Ngày */}
//                 <div ref={el => blocksRef.current[6] = el} className={cx('formBlock')}>
//                     <label htmlFor="date">Ngày</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={startDate}
//                         onChange={handleDateChange}
//                         min={moment().format('YYYY-MM-DD')}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 7: Chọn Giờ */}
//                 <div ref={el => blocksRef.current[7] = el} className={cx('formBlock')}>
//                     <label htmlFor="time">Giờ</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={startTime}
//                         onChange={handleTimeChange}
//                         className={cx('inputField')}
//                     />
//                 </div>

//                 {/* Khối 8: Ghi chú */}
//                 <div ref={el => blocksRef.current[8] = el} className={cx('formBlock')}>
//                     <label htmlFor="note">Ghi chú</label>
//                     <textarea
//                         id="note"
//                         value={note}
//                         onChange={handleNoteChange}
//                         className={cx('inputField', 'textareaField')}
//                         rows={3}
//                     />
//                 </div>

//                 {/* Khối 9: Nút xác nhận */}
//                 <div ref={el => blocksRef.current[9] = el} className={cx('formBlock', 'formActions')}>
//                     <button onClick={handleSubmit} className={cx('submitButton')} type="button">
//                         Xác nhận đặt lịch
//                     </button>
//                 </div>
//             </form>
//         </section>
//     );
// }

// export default BookingForm;
// import React, { useRef, useEffect, useState } from 'react';
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';
// import * as addressServices from '~/services/addressServices';

// const cx = classNames.bind(styles);

// function BookingForm({
//     customerItem,
//     cities = [],
//     selectedCityID,
//     handleCityChange,
//     store = [],
//     employees = [],
//     filteredEmployees = [],
//     selectedEmployeeID,
//     selectedStore,
//     selectedService,
//     startDate,
//     startTime,
//     note,
//     handleStoreChange,
//     handleStylistChange,
//     handleServiceChange,
//     handleCategoryChange,
//     handleDateChange,
//     handleTimeChange,
//     handleNoteChange,
//     handleSubmit,
//     serviceCategories = [],
//     selectedCategoryID,
//     filteredServices = [],
// }) {
//     const blocksRef = useRef([]);
//     const [storeAddresses, setStoreAddresses] = useState({});

//     // Load addresses
//     useEffect(() => {
//         if (!store || store.length === 0) return;

//         const loadAddresses = async () => {
//             const newAddresses = { ...storeAddresses };
//             for (const s of store) {
//                 if (!newAddresses[s.storeID] && s.addressID) {
//                     try {
//                         const res = await addressServices.getAddressByAddressID(s.addressID);
//                         newAddresses[s.storeID] = res;
//                     } catch (err) {
//                         console.error('Lỗi lấy address:', err);
//                     }
//                 }
//             }
//             setStoreAddresses(newAddresses);
//         };

//         loadAddresses();
//     }, [store]);

//     const buildFullAddress = (storeItem) => {
//         if (!storeItem) return '';
//         const addr = storeAddresses[storeItem.storeID];
//         if (!addr) return 'Đang tải địa chỉ...';

//         const cityName = cities.find(c => c.countryID === addr.cityID)?.countryName || '';
//         return [addr.currentAddress, addr.subDistrict, addr.district, cityName]
//             .filter(Boolean)
//             .join(', ');
//     };

//     // Intersection Observer animation
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             entries => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) entry.target.classList.add(cx('fadeIn'));
//                 });
//             },
//             { threshold: 0.2 }
//         );

//         blocksRef.current.forEach(block => block && observer.observe(block));
//         return () => blocksRef.current.forEach(block => block && observer.unobserve(block));
//     }, []);

//     return (
//         <div className={cx('bookingWrapper')}>
//             {/* HEADER CHỌN THÀNH PHỐ */}
//             <div className={cx('cityHeader')}>
//                 <h2>Chọn Địa chỉ / Thành phố</h2>
//                 <select
//                     className={cx('citySelect')}
//                     value={selectedCityID || ''}
//                     onChange={handleCityChange}
//                 >
//                     <option value="">-- Chọn Tỉnh/Thành phố --</option>
//                     {cities.map(city => (
//                         <option key={city.countryID} value={city.countryID}>
//                             {city.countryName}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* DANH SÁCH CỬA HÀNG */}
//             {selectedCityID && store.length > 0 && (
//                 <div className={cx('storeListWrapper')}>
//                     {store.map(s => (
//                         <div key={s.storeID} className={cx('storeCard')}>
//                             <img
//                                 src={s.imageUrl || '/images/default-store.jpg'}
//                                 alt={s.storeName}
//                                 className={cx('storeImage')}
//                             />
//                             <div className={cx('storeInfo')}>
//                                 <h3>{s.storeName}</h3>
//                                 <p className={cx('address')}>{buildFullAddress(s)}</p>
//                                 <div className={cx('rating')}>
//                                     {Array(5).fill(0).map((_, i) => (
//                                         <span key={i} className={cx('star')}>★</span>
//                                     ))}
//                                 </div>
//                             </div>
//                             <button
//                                 className={cx('bookButton')}
//                                 value={s.storeID}
//                                 onClick={handleStoreChange}
//                             >
//                                 Đặt lịch ngay
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* FORM ĐẶT LỊCH */}
//             {selectedStore && (
//                 <section className={cx('bookingFormWrapper')}>
//                     <h2 className={cx('formTitle')}>
//                         Đặt lịch tại {store.find(x => x.storeID === selectedStore)?.storeName}
//                     </h2>

//                     <div ref={el => (blocksRef.current[0] = el)} className={cx('formBlock')}>
//                         <label>Loại dịch vụ</label>
//                         <select
//                             value={selectedCategoryID || ''}
//                             onChange={handleCategoryChange}
//                             className={cx('inputField')}
//                         >
//                             <option value="">-- Chọn loại dịch vụ --</option>
//                             {serviceCategories.map(cat => (
//                                 <option key={cat.serCateID} value={cat.serCateID}>
//                                     {cat.serCateName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div ref={el => (blocksRef.current[1] = el)} className={cx('formBlock')}>
//                         <label>Dịch vụ</label>
//                         <select
//                             value={selectedService?.serID || ''}
//                             onChange={handleServiceChange}
//                             className={cx('inputField')}
//                             disabled={!selectedCategoryID}
//                         >
//                             <option value="">-- Chọn dịch vụ --</option>
//                             {filteredServices.map(s => (
//                                 <option key={s.serID} value={s.serID}>
//                                     {s.serName} - {s.serPrice}₫
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div ref={el => (blocksRef.current[2] = el)} className={cx('formBlock')}>
//                         <label>Thợ</label>
//                         <select
//                             value={selectedEmployeeID || ''}
//                             onChange={handleStylistChange}
//                             className={cx('inputField')}
//                             disabled={!selectedStore}
//                         >
//                             <option value="">-- Chọn thợ --</option>
//                             {filteredEmployees.map(emp => (
//                                 <option key={emp.employeID} value={emp.employeID}>
//                                     {emp.firstName} {emp.lastName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div ref={el => (blocksRef.current[3] = el)} className={cx('formBlock')}>
//                         <label>Ngày</label>
//                         <input
//                             type="date"
//                             value={startDate}
//                             onChange={handleDateChange}
//                             min={moment().format('YYYY-MM-DD')}
//                             className={cx('inputField')}
//                         />
//                     </div>

//                     <div ref={el => (blocksRef.current[4] = el)} className={cx('formBlock')}>
//                         <label>Giờ</label>
//                         <input
//                             type="time"
//                             value={startTime}
//                             onChange={handleTimeChange}
//                             className={cx('inputField')}
//                         />
//                     </div>

//                     <div ref={el => (blocksRef.current[5] = el)} className={cx('formBlock')}>
//                         <label>Ghi chú</label>
//                         <textarea
//                             value={note}
//                             onChange={handleNoteChange}
//                             className={cx('inputField', 'textareaField')}
//                             rows={3}
//                         />
//                     </div>

//                     <div ref={el => (blocksRef.current[6] = el)} className={cx('formActions')}>
//                         <button onClick={handleSubmit} className={cx('submitButton')}>
//                             Xác nhận đặt lịch
//                         </button>
//                     </div>
//                 </section>
//             )}
//         </div>
//     );
// }

// export default BookingForm;
// import React, { useRef, useEffect, useState } from 'react';
// import classNames from 'classnames/bind';
// import styles from './BookingForm.module.scss';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import * as addressServices from '~/services/addressServices';
// import config from '~/config';

// const cx = classNames.bind(styles);

// function BookingForm({
//     customerItem,
//     cities = [],
//     selectedCityID,
//     handleCityChange,
//     store = [],
//     employees = [],
//     filteredEmployees = [],
//     selectedEmployeeID,
//     selectedStore,
//     selectedService,
//     startDate,
//     startTime,
//     note,
//     handleStoreChange,
//     handleStylistChange,
//     handleServiceChange,
//     handleCategoryChange,
//     handleDateChange,
//     handleTimeChange,
//     handleNoteChange,
//     handleSubmit,
//     serviceCategories = [],
//     selectedCategoryID,
//     filteredServices = [],
// }) {
//     const blocksRef = useRef([]);
//     const navigate = useNavigate();
//     const [storeAddresses, setStoreAddresses] = useState({});

//     // --- Load địa chỉ theo store ---
//     useEffect(() => {
//         if (!store || store.length === 0) return;

//         const loadAddresses = async () => {
//             const newAddresses = { ...storeAddresses };
//             for (const s of store) {
//                 if (!newAddresses[s.storeID] && s.addressID) {
//                     try {
//                         const res = await addressServices.getAddressByAddressID(s.addressID);
//                         newAddresses[s.storeID] = res;
//                     } catch (err) {
//                         console.error('Lỗi lấy address:', err);
//                     }
//                 }
//             }
//             setStoreAddresses(newAddresses);
//         };

//         loadAddresses();
//     }, [store]);

//     const buildFullAddress = (storeItem) => {
//         if (!storeItem) return '';
//         const addr = storeAddresses[storeItem.storeID];
//         if (!addr) return 'Đang tải địa chỉ...';

//         const cityName = cities.find(c => c.countryID === addr.cityID)?.countryName || '';
//         return [addr.currentAddress, addr.subDistrict, addr.district, cityName]
//             .filter(Boolean)
//             .join(', ');
//     };

//     // --- Điều hướng sang trang booking ---
//     const handleBookNow = (storeItem) => {
//         navigate(config.routes.BookingPage, {
//             state: { store: storeItem },
//         });
//     };

//     // Animation fadeIn
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             entries => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) entry.target.classList.add(cx('fadeIn'));
//                 });
//             },
//             { threshold: 0.2 }
//         );

//         blocksRef.current.forEach(block => block && observer.observe(block));
//         return () => blocksRef.current.forEach(block => block && observer.unobserve(block));
//     }, []);

//     // --- DANH SÁCH STORE HIỂN THỊ ---
//     const displayedStores = selectedCityID
//         ? store                            // Khi chọn thành phố → hiển thị store đã lọc
//         : store.filter(s => s.isHot === true); // Khi chưa chọn → hiển thị store HOT

//     return (
//         <div className={cx('bookingWrapper')}>

//             {/* --- HEADER CHỌN THÀNH PHỐ --- */}
//             <div className={cx('cityHeader')}>
//                 <h2>Chọn Địa chỉ / Thành phố</h2>
//                 <select
//                     className={cx('citySelect')}
//                     value={selectedCityID || ''}
//                     onChange={handleCityChange}
//                 >
//                     <option value="">-- Chọn Tỉnh/Thành phố --</option>
//                     {cities.map(city => (
//                         <option key={city.countryID} value={city.countryID}>
//                             {city.countryName}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* --- DANH SÁCH CỬA HÀNG HOT HOẶC THEO THÀNH PHỐ --- */}
//             <div className={cx('storeListWrapper')}>

//                 {/* Tiêu đề khi hiển thị Hot Store */}
//                 {!selectedCityID && (
//                     <h2 className={cx('hotTitle')}>🔥 Cửa hàng nổi bật</h2>
//                 )}

//                 {displayedStores.length > 0 ? (
//                     displayedStores.map(s => (
//                         <div key={s.storeID} className={cx('storeCard')}>
//                             <img
//                                 src={s.imageUrl || '/images/default-store.jpg'}
//                                 alt={s.storeName}
//                                 className={cx('storeImage')}
//                             />
//                             <div className={cx('storeInfo')}>
//                                 <h3>{s.storeName}</h3>
//                                 <p className={cx('address')}>{buildFullAddress(s)}</p>

//                                 <div className={cx('rating')}>
//                                     {Array(5).fill(0).map((_, i) => (
//                                         <span key={i} className={cx('star')}>★</span>
//                                     ))}
//                                 </div>
//                             </div>
//                             <button
//                                 className={cx('bookButton')}
//                                 onClick={() => handleBookNow(s)}
//                             >
//                                 Đặt lịch ngay
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className={cx('noStore')}>Không có cửa hàng nào.</p>
//                 )}
//             </div>

//             {/* --- FORM ĐẶT LỊCH --- */}
//             {selectedStore && (
//                 <section className={cx('bookingFormWrapper')}>
//                     <h2 className={cx('formTitle')}>
//                         Đặt lịch tại {store.find(x => x.storeID === selectedStore)?.storeName}
//                     </h2>

//                     {/* Loại dịch vụ */}
//                     <div ref={el => (blocksRef.current[0] = el)} className={cx('formBlock')}>
//                         <label>Loại dịch vụ</label>
//                         <select
//                             value={selectedCategoryID || ''}
//                             onChange={handleCategoryChange}
//                             className={cx('inputField')}
//                         >
//                             <option value="">-- Chọn loại dịch vụ --</option>
//                             {serviceCategories.map(cat => (
//                                 <option key={cat.serCateID} value={cat.serCateID}>
//                                     {cat.serCateName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Dịch vụ */}
//                     <div ref={el => (blocksRef.current[1] = el)} className={cx('formBlock')}>
//                         <label>Dịch vụ</label>
//                         <select
//                             value={selectedService?.serID || ''}
//                             onChange={handleServiceChange}
//                             className={cx('inputField')}
//                             disabled={!selectedCategoryID}
//                         >
//                             <option value="">-- Chọn dịch vụ --</option>
//                             {filteredServices.map(s => (
//                                 <option key={s.serID} value={s.serID}>
//                                     {s.serName} - {s.serPrice}₫
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Thợ */}
//                     <div ref={el => (blocksRef.current[2] = el)} className={cx('formBlock')}>
//                         <label>Thợ</label>
//                         <select
//                             value={selectedEmployeeID || ''}
//                             onChange={handleStylistChange}
//                             className={cx('inputField')}
//                             disabled={!selectedStore}
//                         >
//                             <option value="">-- Chọn thợ --</option>
//                             {filteredEmployees.map(emp => (
//                                 <option key={emp.employeID} value={emp.employeID}>
//                                     {emp.firstName} {emp.lastName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Ngày */}
//                     <div ref={el => (blocksRef.current[3] = el)} className={cx('formBlock')}>
//                         <label>Ngày</label>
//                         <input
//                             type="date"
//                             value={startDate}
//                             onChange={handleDateChange}
//                             min={moment().format('YYYY-MM-DD')}
//                             className={cx('inputField')}
//                         />
//                     </div>

//                     {/* Giờ */}
//                     <div ref={el => (blocksRef.current[4] = el)} className={cx('formBlock')}>
//                         <label>Giờ</label>
//                         <input
//                             type="time"
//                             value={startTime}
//                             onChange={handleTimeChange}
//                             className={cx('inputField')}
//                         />
//                     </div>

//                     {/* Ghi chú */}
//                     <div ref={el => (blocksRef.current[5] = el)} className={cx('formBlock')}>
//                         <label>Ghi chú</label>
//                         <textarea
//                             value={note}
//                             onChange={handleNoteChange}
//                             className={cx('inputField', 'textareaField')}
//                             rows={3}
//                         />
//                     </div>

//                     {/* Submit */}
//                     <div ref={el => (blocksRef.current[6] = el)} className={cx('formActions')}>
//                         <button onClick={handleSubmit} className={cx('submitButton')}>
//                             Xác nhận đặt lịch
//                         </button>
//                     </div>
//                 </section>
//             )}

//         </div>
//     );
// }

// export default BookingForm;
import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BookingForm.module.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import * as addressServices from '~/services/addressServices';
import config from '~/config';

const cx = classNames.bind(styles);

function BookingForm({
    customerItem,
    cities = [],
    selectedCityID,
    handleCityChange,
    store = [], // danh sách store đã lọc từ Book.js
    employees = [],
    filteredEmployees = [],
    selectedEmployeeID,
    selectedStore,
    selectedService,
    startDate,
    startTime,
    note,
    handleStoreChange,
    handleStylistChange,
    handleServiceChange,
    handleCategoryChange,
    handleDateChange,
    handleTimeChange,
    handleNoteChange,
    handleSubmit,
    serviceCategories = [],
    selectedCategoryID,
    filteredServices = [],
}) {
    const blocksRef = useRef([]);
    const navigate = useNavigate();
    const [storeAddresses, setStoreAddresses] = useState({});

    // --- Load địa chỉ theo store ---
    useEffect(() => {
        if (!store || store.length === 0) return;

        const loadAddresses = async () => {
            const newAddresses = { ...storeAddresses };
            for (const s of store) {
                if (!newAddresses[s.storeID] && s.addressID) {
                    try {
                        const res = await addressServices.getAddressByAddressID(s.addressID);
                        newAddresses[s.storeID] = res;
                    } catch (err) {
                        console.error('Lỗi lấy address:', err);
                    }
                }
            }
            setStoreAddresses(newAddresses);
        };

        loadAddresses();
    }, [store]);

    const buildFullAddress = (storeItem) => {
        if (!storeItem) return '';
        const addr = storeAddresses[storeItem.storeID];
        if (!addr) return 'Đang tải địa chỉ...';

        const cityName = cities.find(c => c.countryID === addr.cityID)?.countryName || '';
        return [addr.currentAddress, addr.subDistrict, addr.district, cityName]
            .filter(Boolean)
            .join(', ');
    };

    // --- Điều hướng sang trang booking ---
    const handleBookNow = (storeItem) => {
        navigate(config.routes.BookingPage, {
            state: { store: storeItem },
        });
    };

    // Animation fadeIn
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add(cx('fadeIn'));
                });
            },
            { threshold: 0.2 }
        );

        blocksRef.current.forEach(block => block && observer.observe(block));
        return () => blocksRef.current.forEach(block => block && observer.unobserve(block));
    }, []);

    // --- DANH SÁCH STORE HIỂN THỊ ---
    // Nếu chưa chọn thành phố → hiển thị tất cả store
    // Nếu đã chọn thành phố → hiển thị store theo thành phố (Book.js đã lọc)
    const displayedStores = store;

    return (
        <div className={cx('bookingWrapper')}>

            {/* --- HEADER CHỌN THÀNH PHỐ --- */}
            <div className={cx('cityHeader')}>
                <h2>Chọn Địa chỉ / Thành phố</h2>
                <select
                    className={cx('citySelect')}
                    value={selectedCityID || ''}
                    onChange={handleCityChange}
                >
                    <option value="">-- Chọn Tỉnh/Thành phố --</option>
                    {cities.map(city => (
                        <option key={city.countryID} value={city.countryID}>
                            {city.countryName}
                        </option>
                    ))}
                </select>
            </div>

            {/* --- DANH SÁCH CỬA HÀNG --- */}
            <div className={cx('storeListWrapper')}>
                {displayedStores.length > 0 ? (
                    displayedStores.map(s => (
                        <div key={s.storeID} className={cx('storeCard')}>
                            <img
                                src={s.imageUrl || '/images/default-store.jpg'}
                                alt={s.storeName}
                                className={cx('storeImage')}
                            />
                            <div className={cx('storeInfo')}>
                                <h3>{s.storeName}</h3>
                                <p className={cx('address')}>{buildFullAddress(s)}</p>

                                <div className={cx('rating')}>
                                    {Array(5).fill(0).map((_, i) => (
                                        <span key={i} className={cx('star')}>★</span>
                                    ))}
                                </div>
                            </div>
                            <button
                                className={cx('bookButton')}
                                onClick={() => handleBookNow(s)}
                            >
                                Đặt lịch ngay
                            </button>
                        </div>
                    ))
                ) : (
                    <p className={cx('noStore')}>Không có cửa hàng nào.</p>
                )}
            </div>

            {/* --- FORM ĐẶT LỊCH --- */}
            {selectedStore && (
                <section className={cx('bookingFormWrapper')}>
                    <h2 className={cx('formTitle')}>
                        Đặt lịch tại {selectedStore.storeName}
                    </h2>

                    {/* Loại dịch vụ */}
                    <div ref={el => (blocksRef.current[0] = el)} className={cx('formBlock')}>
                        <label>Loại dịch vụ</label>
                        <select
                            value={selectedCategoryID || ''}
                            onChange={handleCategoryChange}
                            className={cx('inputField')}
                        >
                            <option value="">-- Chọn loại dịch vụ --</option>
                            {serviceCategories.map(cat => (
                                <option key={cat.serCateID} value={cat.serCateID}>
                                    {cat.serCateName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dịch vụ */}
                    <div ref={el => (blocksRef.current[1] = el)} className={cx('formBlock')}>
                        <label>Dịch vụ</label>
                        <select
                            value={selectedService?.serID || ''}
                            onChange={handleServiceChange}
                            className={cx('inputField')}
                            disabled={!selectedCategoryID}
                        >
                            <option value="">-- Chọn dịch vụ --</option>
                            {filteredServices.map(s => (
                                <option key={s.serID} value={s.serID}>
                                    {s.serName} - {s.serPrice}₫
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Thợ */}
                    <div ref={el => (blocksRef.current[2] = el)} className={cx('formBlock')}>
                        <label>Thợ</label>
                        <select
                            value={selectedEmployeeID || ''}
                            onChange={handleStylistChange}
                            className={cx('inputField')}
                            disabled={!selectedStore}
                        >
                            <option value="">-- Chọn thợ --</option>
                            {filteredEmployees.map(emp => (
                                <option key={emp.employeID} value={emp.employeID}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ngày */}
                    <div ref={el => (blocksRef.current[3] = el)} className={cx('formBlock')}>
                        <label>Ngày</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleDateChange}
                            min={moment().format('YYYY-MM-DD')}
                            className={cx('inputField')}
                        />
                    </div>

                    {/* Giờ */}
                    <div ref={el => (blocksRef.current[4] = el)} className={cx('formBlock')}>
                        <label>Giờ</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={handleTimeChange}
                            className={cx('inputField')}
                        />
                    </div>

                    {/* Ghi chú */}
                    <div ref={el => (blocksRef.current[5] = el)} className={cx('formBlock')}>
                        <label>Ghi chú</label>
                        <textarea
                            value={note}
                            onChange={handleNoteChange}
                            className={cx('inputField', 'textareaField')}
                            rows={3}
                        />
                    </div>

                    {/* Submit */}
                    <div ref={el => (blocksRef.current[6] = el)} className={cx('formActions')}>
                        <button onClick={handleSubmit} className={cx('submitButton')}>
                            Xác nhận đặt lịch
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default BookingForm;
