// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import classNames from 'classnames/bind';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// import * as serviceServices from '~/services/serviceServices';
// import * as employeeServices from '~/services/employeeServices';
// import * as storeServices from '~/services/storeServices';
// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';
// import styles from './Book.module.scss';
// import BookingForm from '~/components/feature/BookingForm';
// import BookingWarning from '~/components/common/BookingWarning';

// const cx = classNames.bind(styles);
// const Book = () => {
//     const [currentUser, setCurrentUser] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [customerItem, setCustomerItem] = useState('');
//     const [store, setStore] = useState([]);
//     const [employee, setEmployee] = useState('');
//     const [employees, setEmployees] = useState([]);
//     const [services, setServices] = useState([]);
//     const [startDate, setStartDate] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [note, setNote] = useState('');
//     const [serID, setSerID] = useState('');
//     const [selectedService, setSelectedService] = useState(null);
//     const [storeID, setStoreID] = useState('');
//     const [selectedStore, setSelectedStore] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             try {
//                 setCurrentUser(true);
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//             } catch (error) {
//                 setCurrentUser(false);
//                 console.error('Bạn chưa đặng nhập:', error);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const fetchApi = async () => {
//             try {
//                 const response = await serviceServices.getService();
//                 if (response) {
//                     setServices(response);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         const fetchEmployees = async () => {
//             try {
//                 const response = await employeeServices.getEmployee();
//                 if (response) {
//                     setEmployees(response);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         const fetchBookedTimes = async () => {
//             try {
//                 const response = await bookServices.getBook();
//                 if (response) {
//                     const startDate = response.map((Booking) => Booking.startDate);

//                     setStartDate(startDate);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         const fetchStore = async () => {
//             try {
//                 const response = await storeServices.getStore();
//                 if (response) {
//                     setStore(response);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchApi();
//         fetchEmployees();
//         fetchBookedTimes();
//         fetchStore();
//     }, []);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await customerService.getCustomer();
//                 const customer = response.find((item) => item?.userID === userID);
//                 if (customer) {
//                     setCustomerItem(customer);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUser();
//     }, [userID]);

//     const handleStylistChange = (event) => {
//         const selectedStylistId = event.target.value;
//         const selectedStylist = employees.find((employee) => employee?.employeeID === parseInt(selectedStylistId));
//         setEmployee(selectedStylist);
//     };

//     const handleStoreChange = (event) => {
//         const selectedStoreId = event.target.value;
//         const selectedStore = store.find((store) => store.storeID === parseInt(selectedStoreId));
//         setStoreID(selectedStoreId);
//         setSelectedStore(selectedStore);
//     };
//     const handleServiceChange = (event) => {
//         const selectedServiceId = event.target.value;
//         const selectedService = services.find((service) => service.serID === parseInt(selectedServiceId));
//         setSerID(selectedServiceId);
//         setSelectedService(selectedService);
//     };

//     const handleDateChange = (event) => {
//         const selectedDate = event.target.value;
//         const check = isDateValid(selectedDate);
//         if (!check) {
//             setStartDate('');
//             toast.error('Thời gian không hợp lệ. Vui lòng chọn lại.');
//         } else {
//             setStartDate(selectedDate);
//         }
//     };

//     const handleTimeChange = (event) => {
//         setStartTime(event.target.value);
//     };

//     const handleNoteChange = (event) => {
//         setNote(event.target.value);
//     };

//     const isDateValid = (selectedDate) => {
//         const currentDate = moment().startOf('day');
//         const selected = moment(selectedDate, 'YYYY-MM-DD').startOf('day');
//         return selected.isAfter(currentDate);
//     };

//     // const handleSubmit = async (event) => {
//     //     event.preventDefault();

//     //     const employeeID = employee?.employeeID;
//     //     const serID = selectedService?.serID;
//     //     const customerID = customerItem?.customerID;

//     //     if (customerID) {
//     //         const startTimeNew = startTime + ':00';
//     //         const booking = await bookServices.createBook(startDate, startTimeNew, note, customerID, storeID);
//     //         if (booking) {
//     //             const bookingService = await bookServices.createBookService(booking?.bookingID, serID, employeeID);
//     //             if (bookingService) {
//     //                 toast.success('Đặt lịch thành công!');
//     //             }
//     //             return;
//     //         } else {
//     //             toast.error('Đặt lịch thất bại vui lòng thử lại!');
//     //         }
//     //     }

//     //     setStartDate('');
//     //     setStartTime('');
//     //     setNote('');
//     // };
//     const handleSubmit = async (event) => {
//     event.preventDefault();
//         console.log({ employee, selectedService, storeID, customerItem });

//     const employeeID = employee?.employeeID;
//     const serID = selectedService?.serID;
//     const customerID = customerItem?.customerID;

//     if (!employeeID || !serID || !customerID || !storeID) {
//         toast.error('Vui lòng chọn đầy đủ nhân viên, dịch vụ, cửa hàng và khách hàng!');
//         return;
//     }

//     const startTimeNew = startTime + ':00';
//     try {
//         const booking = await bookServices.createBook(startDate, startTimeNew, note, customerID, storeID);
//         if (booking) {
//             const bookingService = await bookServices.createBookService(booking?.bookingID, serID, employeeID);
//             if (bookingService) {
//                 toast.success('Đặt lịch thành công!');
//             } else {
//                 toast.error('Tạo dịch vụ cho booking thất bại!');
//             }
//         } else {
//             toast.error('Đặt lịch thất bại vui lòng thử lại!');
//         }
//     } catch (error) {
//         console.error(error);
//         toast.error('Có lỗi xảy ra khi đặt lịch!');
//     }

//     setStartDate('');
//     setStartTime('');
//     setNote('');
// };
//     return (
//         <div className={cx('wrapper')}>
//             {currentUser ? (
//                 <BookingForm
//                     customerItem={customerItem}
//                     selectedStore={selectedStore}
//                     store={store}
//                     employee={employee}
//                     employees={employees}
//                     selectedService={selectedService}
//                     services={services}
//                     startDate={startDate}
//                     startTime={startTime}
//                     note={note}
//                     storeID={storeID}
//                     handleStoreChange={handleStoreChange}
//                     handleStylistChange={handleStylistChange}
//                     handleServiceChange={handleServiceChange}
//                     handleDateChange={handleDateChange}
//                     handleTimeChange={handleTimeChange}
//                     handleNoteChange={handleNoteChange}
//                     handleSubmit={handleSubmit}
//                 />
//             ) : (
//                 <BookingWarning title="Vui lòng đăng nhập trước khi đặt lịch" />
//             )}
//         </div>
//     );
// };

// export default Book;
// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import classNames from 'classnames/bind';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// import * as serviceServices from '~/services/serviceServices';
// import * as employeeServices from '~/services/employeeServices';
// import * as storeServices from '~/services/storeServices';
// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';
// import styles from './Book.module.scss';
// import BookingForm from '~/components/feature/BookingForm';
// import BookingWarning from '~/components/common/BookingWarning';
// import * as serviceCategoryService  from '~/services/serviceCategoryServices'; // bây giờ đã có getServiceCategory

// const cx = classNames.bind(styles);

// const Book = () => {
//     const [currentUser, setCurrentUser] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [customerItem, setCustomerItem] = useState(null);
//     const [store, setStore] = useState([]);
//     const [employee, setEmployee] = useState(null);
//     const [employees, setEmployees] = useState([]);
//     const [services, setServices] = useState([]);
//     const [startDate, setStartDate] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [note, setNote] = useState('');
//     const [selectedService, setSelectedService] = useState(null);
//     const [storeID, setStoreID] = useState(null);
//     const [selectedStore, setSelectedStore] = useState(null);
//     const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
//     const [serviceCategories, setServiceCategories] = useState([]); // Loại dịch vụ
// const [selectedCategoryID, setSelectedCategoryID] = useState(null); // Loại dịch vụ chọn
// const [filteredServices, setFilteredServices] = useState([]); // Dịch vụ tương ứng loại

//     // Kiểm tra user login
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 setCurrentUser(true);
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//             } catch (error) {
//                 setCurrentUser(false);
//                 console.error('Bạn chưa đăng nhập:', error);
//             }
//         }
//     }, []);
//     //Gọi API ServiceCategory khi load form
//     useEffect(() => {
//     const fetchServiceCategories = async () => {
//         try {
//             const res = await serviceCategoryService.getServiceCategory();
//             if(res) setServiceCategories(res);
//         } catch(err) {
//             console.error(err);
//         }
//     };
//     fetchServiceCategories();
// }, []);

//     // Load dữ liệu dịch vụ, nhân viên, cửa hàng
//     useEffect(() => {
//         const fetchApi = async () => {
//             try {
//                 const res = await serviceServices.getService();
//                 if (res) setServices(res);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         const fetchEmployees = async () => {
//             try {
//                 const res = await employeeServices.getEmployee();
//                             console.log('employees:', res); // 👈 thêm dòng này

//                 if (res) setEmployees(res);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         const fetchStore = async () => {
//             try {
//                 const res = await storeServices.getStore();
//                 if (res) setStore(res);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchApi();
//         fetchEmployees();
//         fetchStore();
//     }, []);

//     // Load thông tin khách hàng
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await customerService.getCustomer();
//                 const customer = res.find((item) => item?.userID === userID);
//                 if (customer) setCustomerItem(customer);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         if (userID) fetchUser();
//     }, [userID]);

//     // Change handlers
//     const handleStoreChange = (event) => {
//         const selectedStoreId = parseInt(event.target.value);
//         setStoreID(selectedStoreId);
//         setSelectedStore(store.find(s => s.storeID === selectedStoreId) || null);
//         setEmployee(null); // reset thợ khi đổi chi nhánh
//     };
//     //Xử lý khi khách chọn Loại Dịch vụ:
//     const handleCategoryChange = (event) => {
//     const categoryId = parseInt(event.target.value);
//     setSelectedCategoryID(categoryId);
//     const servicesByCategory = services.filter(s => s.serCateID === categoryId); // dùng serCateID
//     setFilteredServices(servicesByCategory);
//     setSelectedService(null);
// };


//     const handleServiceChange = (event) => {
//         const selectedId = parseInt(event.target.value);
//         const service = services.find((s) => s.serID === selectedId);
//         setSelectedService(service || null);
//     };

//         const handleStylistChange = (event) => {
//             const selectedId = parseInt(event.target.value, 10);
//             setSelectedEmployeeID(selectedId); // ✅ lưu lại ID được chọn
//             const emp = employees.find((e) => e.employeID === selectedId);
//             setEmployee(emp || null);
//         };


        
//     const handleDateChange = (event) => {
//         const selected = event.target.value;
//         const current = moment().startOf('day');
//         const sel = moment(selected, 'YYYY-MM-DD').startOf('day');
//         if (sel.isAfter(current)) setStartDate(selected);
//         else {
//             setStartDate('');
//             toast.error('Thời gian không hợp lệ. Vui lòng chọn lại.');
//         }
//     };

//     const handleTimeChange = (event) => setStartTime(event.target.value);
//     const handleNoteChange = (event) => setNote(event.target.value);

//     // Submit booking
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(employee.employeID);
//         if (!customerItem?.customerID || !storeID || !employee?.employeID  || !selectedService?.serID) {
//             toast.error('Vui lòng chọn đầy đủ nhân viên, dịch vụ, cửa hàng và khách hàng!');
//             return;
//         }

//         const startTimeFull = startTime + ':00';
//         try {
//             const booking = await bookServices.createBook(
//                 startDate,
//                 startTimeFull,
//                 note,
//                 customerItem.customerID,
//                 storeID,
//             parseInt(selectedEmployeeID), // ✅ Dùng selectedEmployeeID
//                 selectedService.serID // đảm bảo không null

//             );
//             if(booking ) toast.success('Đặt lịch thành công!');
//             // if (booking) {
//             //     const bookingService = await bookServices.createBookService(
//             //         booking.bookingID,
//             //         selectedService.serID,
//             //         employee.employeID 
//             //     );
//                 // if (bookingService) toast.success('Đặt lịch thành công!');
//                 // else toast.error('Tạo dịch vụ cho booking thất bại!');
//             // } else {
//             //     toast.error('Đặt lịch thất bại, vui lòng thử lại!');
//             // }
//         } catch (err) {
//             console.error(err);
//             toast.error('Có lỗi xảy ra khi đặt lịch!');
//         }

//         // Reset form
//         setStartDate('');
//         setStartTime('');
//         setNote('');
//         setEmployee(null);
//         setSelectedService(null);
//         setStoreID(null);
//         setSelectedStore(null);
//     };

//     return (
//         <div className={cx('wrapper')}>
//             {currentUser ? (
//                 <BookingForm
//                     customerItem={customerItem}
//                     selectedStore={selectedStore}
//                     store={store}
//                     employee={employee}
//                     employees={employees}
//                     selectedService={selectedService}
//                     services={services}
//                     startDate={startDate}
//                     startTime={startTime}
//                     note={note}
//                     storeID={storeID}
//                     selectedEmployeeID={selectedEmployeeID}              // ✅ thêm
//                     setSelectedEmployeeID={setSelectedEmployeeID}       
//                     handleStoreChange={handleStoreChange}
//                     handleStylistChange={handleStylistChange}
//                     handleServiceChange={handleServiceChange}
//                     handleDateChange={handleDateChange}
//                     handleTimeChange={handleTimeChange}
//                     handleNoteChange={handleNoteChange}
//                     handleSubmit={handleSubmit}
//                         serviceCategories={serviceCategories}
//     selectedCategoryID={selectedCategoryID}
//     handleCategoryChange={handleCategoryChange}
//     filteredServices={filteredServices}
//                 />
//             ) : (
//                 <BookingWarning title="Vui lòng đăng nhập trước khi đặt lịch" />
//             )}
//         </div>
//     );
// };

// export default Book;
////
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import moment from 'moment';
// import {jwtDecode} from 'jwt-decode';

// import * as serviceServices from '~/services/serviceServices';
// import * as serviceCategoryService from '~/services/serviceCategoryServices';
// import * as storeServices from '~/services/storeServices';
// import * as employeeServices from '~/services/employeeServices';
// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';

// import BookingForm from '~/components/feature/BookingForm';
// import BookingWarning from '~/components/common/BookingWarning';
// import styles from './Book.module.scss';

// const Book = () => {
//     const location = useLocation(); // lắng nghe URL thay đổi
//     const query = new URLSearchParams(location.search);
//     const serCateIDFromURL = query.get('serCateID');

//     const [currentUser, setCurrentUser] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [customerItem, setCustomerItem] = useState(null);
//     const [store, setStore] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [services, setServices] = useState([]);
//     const [serviceCategories, setServiceCategories] = useState([]);
//     const [selectedCategoryID, setSelectedCategoryID] = useState(
//         serCateIDFromURL ? parseInt(serCateIDFromURL) : null
//     );
//     const [filteredServices, setFilteredServices] = useState([]);
//     const [selectedService, setSelectedService] = useState(null);
//     const [selectedStore, setSelectedStore] = useState(null);
//     const [storeID, setStoreID] = useState(null);
//     const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [note, setNote] = useState('');
//     const [filteredEmployees, setFilteredEmployees] = useState([]);

//     // Cập nhật selectedCategoryID khi URL thay đổi
//     useEffect(() => {
//         if (serCateIDFromURL) {
//             setSelectedCategoryID(parseInt(serCateIDFromURL));
//             setSelectedService(null);
//         }
//     }, [serCateIDFromURL]);

//     // Check user login
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 setCurrentUser(true);
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//             } catch {
//                 setCurrentUser(false);
//             }
//         }
//     }, []);

//     // Load service categories & services
//     useEffect(() => {
//         const fetchCategories = async () => {
//             const res = await serviceCategoryService.getServiceCategory();
//             if (res) setServiceCategories(res);
//         };
//         const fetchServices = async () => {
//             const res = await serviceServices.getService();
//             if (res) setServices(res);
//         };
//         fetchCategories();
//         fetchServices();
//     }, []);

//     // Filter services by selectedCategoryID
//     useEffect(() => {
//         if (selectedCategoryID) {
//             const filtered = services.filter(s => s.serCateID === selectedCategoryID);
//             setFilteredServices(filtered);
//         } else {
//             setFilteredServices([]);
//         }
//     }, [selectedCategoryID, services]);

//     // Load stores and employees
//     useEffect(() => {
//         const fetchStores = async () => {
//             const res = await storeServices.getStore();
//             if (res) setStore(res);
//         };
//         const fetchEmployees = async () => {
//             const res = await employeeServices.getEmployee();
//             if (res) setEmployees(res);
//         };
//         fetchStores();
//         fetchEmployees();
//     }, []);

//     // Load customer info
//     useEffect(() => {
//         const fetchCustomer = async () => {
//             const res = await customerService.getCustomer();
//             const customer = res.find(item => item.userID === userID);
//             if (customer) setCustomerItem(customer);
//         };
//         if (userID) fetchCustomer();
//     }, [userID]);

//     // Handlers
//     const handleSelectService = service => setSelectedService(service);
//     const handleStoreChange = e => {
//         const id = parseInt(e.target.value);
//         setStoreID(id);
//         setSelectedStore(store.find(s => s.storeID === id) || null);
//         setSelectedEmployeeID('');

//         // Lọc employee theo storeID
//     const filtered = employees.filter(emp => emp.storeID === id);
//     setFilteredEmployees(filtered);
//     };
//     const handleStylistChange = e => setSelectedEmployeeID(parseInt(e.target.value));
//     const handleCategoryChange = e => {
//         const id = parseInt(e.target.value);
//         setSelectedCategoryID(id);
//         setSelectedService(null);
//     };
//     const handleDateChange = e => {
//         const sel = moment(e.target.value, 'YYYY-MM-DD');
//         const today = moment().startOf('day');
//         if (sel.isAfter(today)) setStartDate(e.target.value);
//         else toast.error('Ngày không hợp lệ');
//     };
//     const handleTimeChange = e => setStartTime(e.target.value);
//     const handleNoteChange = e => setNote(e.target.value);
    
//     const handleSubmit = async () => {
//         if (!customerItem?.customerID || !storeID || !selectedEmployeeID || !selectedService?.serID) {
//             toast.error('Vui lòng chọn đầy đủ thông tin.');
//             return;
//         }
//         try {
//             await bookServices.createBook(
//                 startDate,
//                 startTime + ':00',
//                 note,
//                 customerItem.customerID,
//                 storeID,
//                 selectedEmployeeID,
//                 selectedService.serID
//             );
//             toast.success('Đặt lịch thành công!');
//         } catch {
//             toast.error('Có lỗi khi đặt lịch.');
//         }
//     };

//     return (
//         <div className={styles.wrapper}>
//             {currentUser ? (
//                 <>
//                     {/* Service items */}
//                     {/* {selectedCategoryID && filteredServices.length > 0 && (
//                         <div className={styles.serviceItemsWrapper}>
//                             {filteredServices.map(s => (
//                                 <div
//                                     key={s.serID}
//                                     className={`${styles.serviceItem} ${selectedService?.serID === s.serID ? styles.selected : ''}`}
//                                     onClick={() => handleSelectService(s)}
//                                 >
//                                     {s.imageUrl && <img src={s.imageUrl} alt={s.serName} />}
//                                     <div className={styles.serviceName}>{s.serName}</div>
//                                     {s.serPrice && <div className={styles.servicePrice}>{s.serPrice}₫</div>}
//                                 </div>
//                             ))}
//                         </div>
//                     )} */}
//                     {selectedCategoryID && (
//   <div className={styles.serviceItemsWrapper}>
//     {filteredServices.length > 0 ? (
//       filteredServices.map(s => (
//         <div
//           key={s.serID}
//           className={`${styles.serviceItem} ${selectedService?.serID === s.serID ? styles.selected : ''}`}
//           onClick={() => handleSelectService(s)}
//         >
//           {s.imageUrl && <img src={s.imageUrl} alt={s.serName} />}
//           <div className={styles.serviceName}>{s.serName}</div>
//           {s.serPrice && <div className={styles.servicePrice}>{s.serPrice}₫</div>}
//         </div>
//       ))
//     ) : (
//       <div className={styles.noServiceMessage}>Dịch vụ đang bảo trì</div>
//     )}
//   </div>
// )}
    

//                     {/* Booking form */}
//                     <div className={styles.bookingFormWrapper}>
//                         <BookingForm
//                             customerItem={customerItem}
//                             store={store}
//                             employees={/*employees*/filteredEmployees}
//                             selectedEmployeeID={selectedEmployeeID}
//                             selectedStore={selectedStore}
//                             selectedService={selectedService}
//                             startDate={startDate}
//                             startTime={startTime}
//                             note={note}
//                             handleStoreChange={handleStoreChange}
//                             handleStylistChange={handleStylistChange}
//                             handleDateChange={handleDateChange}
//                             handleTimeChange={handleTimeChange}
//                             handleNoteChange={handleNoteChange}
//                             handleSubmit={handleSubmit}
//                             serviceCategories={serviceCategories}
//                             selectedCategoryID={selectedCategoryID}
//                             handleCategoryChange={handleCategoryChange}
//                             filteredServices={filteredServices}
//                             handleSelectService={handleSelectService}
//                         />
//                     </div>
//                 </>
//             ) : (
//                 <BookingWarning title="Vui lòng đăng nhập trước khi đặt lịch" />
//             )}
//         </div>
//     );
// };

// export default Book;
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import moment from 'moment';
// import { jwtDecode } from 'jwt-decode';

// import * as serviceServices from '~/services/serviceServices';
// import * as serviceCategoryService from '~/services/serviceCategoryServices';
// import * as storeServices from '~/services/storeServices';
// import * as employeeServices from '~/services/employeeServices';
// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';

// import BookingForm from '~/components/feature/BookingForm';
// import BookingWarning from '~/components/common/BookingWarning';
// import HairAnalyzer from '~/components/feature/HairAnalyzer/HairAnalyzer'; // HairAnalyzer
// import styles from './Book.module.scss';

// const Book = () => {
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const serCateIDFromURL = query.get('serCateID');

//     const [currentUser, setCurrentUser] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [customerItem, setCustomerItem] = useState(null);
//     const [store, setStore] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [services, setServices] = useState([]);
//     const [serviceCategories, setServiceCategories] = useState([]);
//     const [selectedCategoryID, setSelectedCategoryID] = useState(
//         serCateIDFromURL ? parseInt(serCateIDFromURL) : null
//     );
//     const [filteredServices, setFilteredServices] = useState([]);
//     const [selectedService, setSelectedService] = useState(null);
//     const [selectedStore, setSelectedStore] = useState(null);
//     const [storeID, setStoreID] = useState(null);
//     const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [note, setNote] = useState('');
//     const [filteredEmployees, setFilteredEmployees] = useState([]);

//     const [isHairModalOpen, setIsHairModalOpen] = useState(false); // modal state

//     useEffect(() => {
//         if (serCateIDFromURL) {
//             setSelectedCategoryID(parseInt(serCateIDFromURL));
//             setSelectedService(null);
//         }
//     }, [serCateIDFromURL]);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 setCurrentUser(true);
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//             } catch {
//                 setCurrentUser(false);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             const res = await serviceCategoryService.getServiceCategory();
//             if (res) setServiceCategories(res);
//         };
//         const fetchServices = async () => {
//             const res = await serviceServices.getService();
//             if (res) setServices(res);
//         };
//         fetchCategories();
//         fetchServices();
//     }, []);

//     useEffect(() => {
//         if (selectedCategoryID) {
//             const filtered = services.filter(s => s.serCateID === selectedCategoryID);
//             setFilteredServices(filtered);
//         } else {
//             setFilteredServices([]);
//         }
//     }, [selectedCategoryID, services]);

//     useEffect(() => {
//         const fetchStores = async () => {
//             const res = await storeServices.getStore();
//             if (res) setStore(res);
//         };
//         const fetchEmployees = async () => {
//             const res = await employeeServices.getEmployee();
//             if (res) setEmployees(res);
//         };
//         fetchStores();
//         fetchEmployees();
//     }, []);

//     useEffect(() => {
//         const fetchCustomer = async () => {
//             const res = await customerService.getCustomer();
//             const customer = res.find(item => item.userID === userID);
//             if (customer) setCustomerItem(customer);
//         };
//         if (userID) fetchCustomer();
//     }, [userID]);

//     // Handlers
//     const handleSelectService = service => setSelectedService(service);
//     const handleStoreChange = e => {
//         const id = parseInt(e.target.value);
//         setStoreID(id);
//         setSelectedStore(store.find(s => s.storeID === id) || null);
//         setSelectedEmployeeID('');
//         const filtered = employees.filter(emp => emp.storeID === id);
//         setFilteredEmployees(filtered);
//     };
//     const handleStylistChange = e => setSelectedEmployeeID(parseInt(e.target.value));
//     const handleCategoryChange = e => {
//         const id = parseInt(e.target.value);
//         setSelectedCategoryID(id);
//         setSelectedService(null);
//     };
//     const handleDateChange = e => {
//         const sel = moment(e.target.value, 'YYYY-MM-DD');
//         const today = moment().startOf('day');
//         if (sel.isAfter(today)) setStartDate(e.target.value);
//         else toast.error('Ngày không hợp lệ');
//     };
//     const handleTimeChange = e => setStartTime(e.target.value);
//     const handleNoteChange = e => setNote(e.target.value);

//     const handleSubmit = async () => {
//         if (!customerItem?.customerID || !storeID || !selectedEmployeeID || !selectedService?.serID) {
//             toast.error('Vui lòng chọn đầy đủ thông tin.');
//             return;
//         }
//         try {
//             await bookServices.createBook(
//                 startDate,
//                 startTime + ':00',
//                 note,
//                 customerItem.customerID,
//                 storeID,
//                 selectedEmployeeID,
//                 selectedService.serID
//             );
//             toast.success('Đặt lịch thành công!');
//         } catch {
//             toast.error('Có lỗi khi đặt lịch.');
//         }
//     };

//     return (
//         <div className={styles.wrapper}>
//             {currentUser ? (
//                 <>
                  

//                     {/* Modal */}
//                     {isHairModalOpen && (
//                         <div className={styles.modalOverlay}>
//                             <div className={styles.modalContent}>
//                                 <button
//                                     className={styles.modalClose}
//                                     onClick={() => setIsHairModalOpen(false)}
//                                 >
//                                     ❌
//                                 </button>
//                                 <HairAnalyzer />
//                             </div>
//                         </div>
//                     )}

//                     {/* Service items */}
//                     {selectedCategoryID && (
//                         <div className={styles.serviceItemsWrapper}>
//                             {filteredServices.length > 0 ? (
//                                 filteredServices.map(s => (
//                                     <div
//                                         key={s.serID}
//                                         className={`${styles.serviceItem} ${selectedService?.serID === s.serID ? styles.selected : ''}`}
//                                         onClick={() => handleSelectService(s)}
//                                     >
//                                         {s.imageUrl && <img src={s.imageUrl} alt={s.serName} />}
//                                         <div className={styles.serviceName}>{s.serName}</div>
//                                         {s.serPrice && <div className={styles.servicePrice}>{s.serPrice}₫</div>}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className={styles.noServiceMessage}>Dịch vụ đang bảo trì</div>
//                             )}
//                         </div>
//                     )}

//                     {/* Booking form */}
//                     <div className={styles.bookingFormWrapper}>
//                         <BookingForm
//                             customerItem={customerItem}
//                             store={store}
//                             employees={filteredEmployees}
//                             selectedEmployeeID={selectedEmployeeID}
//                             selectedStore={selectedStore}
//                             selectedService={selectedService}
//                             startDate={startDate}
//                             startTime={startTime}
//                             note={note}
//                             handleStoreChange={handleStoreChange}
//                             handleStylistChange={handleStylistChange}
//                             handleDateChange={handleDateChange}
//                             handleTimeChange={handleTimeChange}
//                             handleNoteChange={handleNoteChange}
//                             handleSubmit={handleSubmit}
//                             serviceCategories={serviceCategories}
//                             selectedCategoryID={selectedCategoryID}
//                             handleCategoryChange={handleCategoryChange}
//                             filteredServices={filteredServices}
//                             handleSelectService={handleSelectService}
//                         />
//                     </div>
//                 </>
//             ) : (
//                 <BookingWarning title="Vui lòng đăng nhập trước khi đặt lịch" />
//             )}
//         </div>
//     );
// };

// export default Book;
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import moment from 'moment';
// import {jwtDecode} from 'jwt-decode';

// import * as serviceServices from '~/services/serviceServices';
// import * as serviceCategoryService from '~/services/serviceCategoryServices';
// import * as storeServices from '~/services/storeServices';
// import * as employeeServices from '~/services/employeeServices';
// import * as bookServices from '~/services/bookServices';
// import * as customerService from '~/services/customerService';
// import * as countryService from '~/services/ountryService';
// import * as addressService from '~/services/addressServices';

// import BookingForm from '~/components/feature/BookingForm';
// import BookingWarning from '~/components/common/BookingWarning';
// import HairAnalyzer from '~/components/feature/HairAnalyzer/HairAnalyzer';
// import styles from './Book.module.scss';

// const Book = () => {
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const serCateIDFromURL = query.get('serCateID');

//     const [currentUser, setCurrentUser] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [customerItem, setCustomerItem] = useState(null);

//     const [stores, setStores] = useState([]);
//     const [filteredStores, setFilteredStores] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [filteredEmployees, setFilteredEmployees] = useState([]);
//     const [services, setServices] = useState([]);
//     const [serviceCategories, setServiceCategories] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [selectedCityID, setSelectedCityID] = useState(null);

//     const [selectedCategoryID, setSelectedCategoryID] = useState(
//         serCateIDFromURL ? parseInt(serCateIDFromURL) : null
//     );
//     const [filteredServices, setFilteredServices] = useState([]);
//     const [selectedService, setSelectedService] = useState(null);
//     const [selectedStore, setSelectedStore] = useState(null);
//     const [storeID, setStoreID] = useState(null);
//     const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [note, setNote] = useState('');
//     const [isHairModalOpen, setIsHairModalOpen] = useState(false);

//     // --- Fetch dữ liệu ---
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 setCurrentUser(true);
//                 const decoded = jwtDecode(token);
//                 setUserID(decoded?.userID);
//             } catch {
//                 setCurrentUser(false);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             const res = await serviceCategoryService.getServiceCategory();
//             if (res) setServiceCategories(res);
//         };
//         const fetchServices = async () => {
//             const res = await serviceServices.getService();
//             if (res) setServices(res);
//         };
//         const fetchCities = async () => {
//             const res = await countryService.getCountries();
//             if (res) setCities(res);
//         };
//         fetchCategories();
//         fetchServices();
//         fetchCities();
//     }, []);

//     useEffect(() => {
//         if (selectedCategoryID) {
//             const filtered = services.filter(s => s.serCateID === selectedCategoryID);
//             setFilteredServices(filtered);
//         } else {
//             setFilteredServices([]);
//         }
//     }, [selectedCategoryID, services]);

//     useEffect(() => {
//         const fetchStoresAndEmployees = async () => {
//             const storesRes = await storeServices.getStore();
//             if (storesRes) {
//                 const storesWithAddress = await Promise.all(
//                     storesRes.map(async s => {
//                         const address = await addressService.getAddressById(s.addressID);
//                         return { ...s, address };
//                     })
//                 );
//                 setStores(storesWithAddress);
//             }

//             const employeesRes = await employeeServices.getEmployee();
//             if (employeesRes) setEmployees(employeesRes);
//         };
//         fetchStoresAndEmployees();
//     }, []);

//     useEffect(() => {
//         const fetchCustomer = async () => {
//             const res = await customerService.getCustomer();
//             const customer = res.find(item => item.userID === userID);
//             if (customer) setCustomerItem(customer);
//         };
//         if (userID) fetchCustomer();
//     }, [userID]);

//     // --- Handlers ---
//     const handleSelectService = service => setSelectedService(service);

//     const handleCityChange = e => {
//         const cityID = parseInt(e.target.value);
//         setSelectedCityID(cityID);

//         const filtered = stores.filter(s => s.address?.cityID === cityID);
//         setFilteredStores(filtered);

//         setSelectedStore(null);
//         setStoreID(null);
//         setFilteredEmployees([]);
//         setSelectedEmployeeID('');
//     };

//     const handleStoreChange = e => {
//         const id = parseInt(e.target.value);
//         setStoreID(id);
//         const store = filteredStores.find(s => s.storeID === id);
//         setSelectedStore(store || null);

//         const filtered = employees.filter(emp => emp.storeID === id);
//         setFilteredEmployees(filtered);
//         setSelectedEmployeeID('');
//     };

//     const handleStylistChange = e => setSelectedEmployeeID(parseInt(e.target.value));
//     const handleCategoryChange = e => {
//         const id = parseInt(e.target.value);
//         setSelectedCategoryID(id);
//         setSelectedService(null);
//     };
//     const handleDateChange = e => {
//         const sel = moment(e.target.value, 'YYYY-MM-DD');
//         const today = moment().startOf('day');
//         if (sel.isAfter(today)) setStartDate(e.target.value);
//         else toast.error('Ngày không hợp lệ');
//     };
//     const handleTimeChange = e => setStartTime(e.target.value);
//     const handleNoteChange = e => setNote(e.target.value);

//     const handleSubmit = async () => {
//         if (!customerItem?.customerID || !storeID || !selectedEmployeeID || !selectedService?.serID) {
//             toast.error('Vui lòng chọn đầy đủ thông tin.');
//             return;
//         }
//         try {
//             await bookServices.createBook(
//                 startDate,
//                 startTime + ':00',
//                 note,
//                 customerItem.customerID,
//                 storeID,
//                 selectedEmployeeID,
//                 selectedService.serID
//             );
//             toast.success('Đặt lịch thành công!');
//         } catch {
//             toast.error('Có lỗi khi đặt lịch.');
//         }
//     };

//     return (
//         <div className={styles.wrapper}>
//             {currentUser ? (
//                 <>
//                     {isHairModalOpen && (
//                         <div className={styles.modalOverlay}>
//                             <div className={styles.modalContent}>
//                                 <button
//                                     className={styles.modalClose}
//                                     onClick={() => setIsHairModalOpen(false)}
//                                 >
//                                     ❌
//                                 </button>
//                                 <HairAnalyzer />
//                             </div>
//                         </div>
//                     )}

//                     {/* Service items */}
//                     {selectedCategoryID && (
//                         <div className={styles.serviceItemsWrapper}>
//                             {filteredServices.length > 0 ? (
//                                 filteredServices.map(s => (
//                                     <div
//                                         key={s.serID}
//                                         className={`${styles.serviceItem} ${selectedService?.serID === s.serID ? styles.selected : ''}`}
//                                         onClick={() => handleSelectService(s)}
//                                     >
//                                         {s.imageUrl && <img src={s.imageUrl} alt={s.serName} />}
//                                         <div className={styles.serviceName}>{s.serName}</div>
//                                         {s.serPrice && <div className={styles.servicePrice}>{s.serPrice}₫</div>}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className={styles.noServiceMessage}>Dịch vụ đang bảo trì</div>
//                             )}
//                         </div>
//                     )}

//                     {/* Booking form */}
//                     <div className={styles.bookingFormWrapper}>
//                         <BookingForm
//                             customerItem={customerItem}
//                             cities={cities}
//                             selectedCityID={selectedCityID}
//                             handleCityChange={handleCityChange}
//                             store={filteredStores}
//                             employees={employees}
//                             filteredEmployees={filteredEmployees}
//                             selectedEmployeeID={selectedEmployeeID}
//                             selectedStore={selectedStore}
//                             selectedService={selectedService}
//                             startDate={startDate}
//                             startTime={startTime}
//                             note={note}
//                             handleStoreChange={handleStoreChange}
//                             handleStylistChange={handleStylistChange}
//                             handleCategoryChange={handleCategoryChange}
//                             handleServiceChange={handleSelectService}
//                             handleDateChange={handleDateChange}
//                             handleTimeChange={handleTimeChange}
//                             handleNoteChange={handleNoteChange}
//                             handleSubmit={handleSubmit}
//                             serviceCategories={serviceCategories}
//                             selectedCategoryID={selectedCategoryID}
//                             filteredServices={filteredServices}
//                         />
//                     </div>
//                 </>
//             ) : (
//                 <BookingWarning title="Vui lòng đăng nhập trước khi đặt lịch" />
//             )}
//         </div>
//     );
// };

// export default Book;
// --- Book.js ---
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import {jwtDecode} from 'jwt-decode';

import * as serviceServices from '~/services/serviceServices';
import * as serviceCategoryService from '~/services/serviceCategoryServices';
import * as storeServices from '~/services/storeServices';
import * as employeeServices from '~/services/employeeServices';
import * as bookServices from '~/services/bookServices';
import * as customerService from '~/services/customerService';
import * as countryService from '~/services/ountryService';
import * as addressService from '~/services/addressServices';

import BookingForm from '~/components/feature/BookingForm';
import BookingWarning from '~/components/common/BookingWarning';
import HairAnalyzer from '~/components/feature/HairAnalyzer/HairAnalyzer';
import styles from './Book.module.scss';

const Book = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const serCateIDFromURL = query.get('serCateID');

  const [currentUser, setCurrentUser] = useState(false);
  const [userID, setUserID] = useState(null);
  const [customerItem, setCustomerItem] = useState(null);

  const [stores, setStores] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityID, setSelectedCityID] = useState(null);

  const [selectedCategoryID, setSelectedCategoryID] = useState(
    serCateIDFromURL ? parseInt(serCateIDFromURL) : null
  );
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeID, setStoreID] = useState(null);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [note, setNote] = useState('');
  const [isHairModalOpen, setIsHairModalOpen] = useState(false);

  // --- Xác thực user ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserID(decoded?.userID);
        setCurrentUser(true);
      } catch {
        setCurrentUser(false);
      }
    }
  }, []);

  // --- Load dữ liệu cơ bản ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, servicesRes, citiesRes] = await Promise.all([
          serviceCategoryService.getServiceCategory(),
          serviceServices.getService(),
          countryService.getCountries()
        ]);
        if (categoriesRes) setServiceCategories(categoriesRes);
        if (servicesRes) setServices(servicesRes);
        if (citiesRes) setCities(citiesRes);

        // Load store + địa chỉ
        const storesRes = await storeServices.getStore();
        if (storesRes) {
          const storesWithAddress = await Promise.all(
            storesRes.map(async s => {
              const address = await addressService.getAddressById(s.addressID);
              return { ...s, address };
            })
          );
          setStores(storesWithAddress);
        }

        // Load employee
        const employeesRes = await employeeServices.getEmployee();
        if (employeesRes) setEmployees(employeesRes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // --- Lọc dịch vụ theo category ---
  useEffect(() => {
    if (selectedCategoryID) {
      const filtered = services.filter(s => s.serCateID === selectedCategoryID);
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  }, [selectedCategoryID, services]);

  // --- Lấy thông tin customer ---
  useEffect(() => {
    if (!userID) return;
    const fetchCustomer = async () => {
      try {
        const res = await customerService.getCustomer();
        const customer = res.find(item => item.userID === userID);
        if (customer) setCustomerItem(customer);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCustomer();
  }, [userID]);

  // --- Handlers ---
  const handleSelectService = service => setSelectedService(service);

  const handleCityChange = e => {
    const cityID = parseInt(e.target.value);
    setSelectedCityID(cityID || null);
    setSelectedStore(null);
    setStoreID(null);
    setFilteredEmployees([]);
    setSelectedEmployeeID('');
  };

  const handleStoreChange = e => {
    const id = parseInt(e.target.value);
    setStoreID(id);
    const store = displayedStores.find(s => s.storeID === id);
    setSelectedStore(store || null);

    const filtered = employees.filter(emp => emp.storeID === id);
    setFilteredEmployees(filtered);
    setSelectedEmployeeID('');
  };

  const handleStylistChange = e => setSelectedEmployeeID(parseInt(e.target.value));
  const handleCategoryChange = e => {
    const id = parseInt(e.target.value);
    setSelectedCategoryID(id);
    setSelectedService(null);
  };
  const handleDateChange = e => {
    const sel = moment(e.target.value, 'YYYY-MM-DD');
    const today = moment().startOf('day');
    if (sel.isAfter(today)) setStartDate(e.target.value);
    else toast.error('Ngày không hợp lệ');
  };
  const handleTimeChange = e => setStartTime(e.target.value);
  const handleNoteChange = e => setNote(e.target.value);

 const handleSubmit = async () => {
  if (!customerItem?.customerID || !storeID || !selectedEmployeeID || !selectedService?.serID || !startDate || !startTime) {
    toast.error('Vui lòng chọn đầy đủ thông tin.');
    return;
  }

  try {
    // Gọi API đặt lịch
    await bookServices.createBook(
      startDate,
      startTime + ':00',
      note,
      customerItem.customerID,
      storeID,
      selectedEmployeeID,
      selectedService.serID
    );
    toast.success('Đặt lịch thành công!');
  } catch (err) {
    if (err?.response?.status === 409) {
      // Backend trả về Conflict khi lịch trùng
      toast.error('Lịch hẹn đã trùng với một booking khác. Vui lòng chọn giờ khác.');
    } else {
      toast.error('Có lỗi khi đặt lịch.');
    }
  }
};


  // --- Hiển thị store theo city ---
  const displayedStores = selectedCityID
    ? stores.filter(s => s.address?.cityID === selectedCityID) // Chọn city → lọc theo city
    : stores; // Chưa chọn city → tất cả store

  return (
    <div className={styles.wrapper}>
      {currentUser ? (
        <>
          {isHairModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <button
                  className={styles.modalClose}
                  onClick={() => setIsHairModalOpen(false)}
                >
                  ❌
                </button>
                <HairAnalyzer />
              </div>
            </div>
          )}

          {/* Booking form */}
          <BookingForm
            customerItem={customerItem}
            cities={cities}
            selectedCityID={selectedCityID}
            handleCityChange={handleCityChange}
            store={displayedStores}
            employees={employees}
            filteredEmployees={filteredEmployees}
            selectedEmployeeID={selectedEmployeeID}
            selectedStore={selectedStore}
            selectedService={selectedService}
            startDate={startDate}
            startTime={startTime}
            note={note}
            handleStoreChange={handleStoreChange}
            handleStylistChange={handleStylistChange}
            handleCategoryChange={handleCategoryChange}
            handleServiceChange={handleSelectService}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            handleNoteChange={handleNoteChange}
            handleSubmit={handleSubmit}
            serviceCategories={serviceCategories}
            selectedCategoryID={selectedCategoryID}
            filteredServices={filteredServices}
          />
        </>
      ) : (
        <BookingWarning title="Vui lòng đăng nhập trước khi đặt lịch" />
      )}
    </div>
  );
};

export default Book;
