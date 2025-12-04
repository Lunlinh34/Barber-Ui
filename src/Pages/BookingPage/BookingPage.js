// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// import * as addressServices from '~/services/addressServices';
// import * as employeeServices from '~/services/employeeServices';
// import * as serviceCategoryService from '~/services/serviceCategoryServices';
// import * as serviceServices from '~/services/serviceServices';
// import * as bookServices from '~/services/bookServices';

// import styles from './BookingForm.module.scss';
// const cx = classNames.bind(styles);

// const SafeImage = ({ src, alt, fallback, className }) => {
//   const [imgSrc, setImgSrc] = useState(src || fallback);
//   useEffect(() => setImgSrc(src || fallback), [src, fallback]);
//   const handleError = () => setImgSrc(fallback);
//   return <img src={imgSrc} alt={alt} onError={handleError} className={className} />;
// };

// function BookingPage() {
//   const location = useLocation();
//   const store = location.state?.store || null;

//   const [storeAddresses, setStoreAddresses] = useState({});
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
//   const [serviceCategories, setServiceCategories] = useState([]);
//   const [services, setServices] = useState([]);
//   const [activeCategoryID, setActiveCategoryID] = useState(null);
//   const [selectedService, setSelectedService] = useState(null);
//   const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
//   const [startTime, setStartTime] = useState('');
//   const [note, setNote] = useState('');

//   // Danh sách tiện ích / lợi ích (ví dụ)
//   const amenities = [
//     'Căn hộ',
//     'Bãi đỗ xe trong khuôn viên',
//     'WiFi miễn phí',
//     '10 Mbps',
//     '2 nhà hàng',
//     'Trung tâm Spa & chăm sóc sức khỏe',
//     'Xe đưa đón sân bay',
//     'Phòng gia đình',
//     'Dịch vụ phòng',
//     'Phòng không hút thuốc',
//     'Trung tâm thể dục',
//   ];

//   useEffect(() => {
//     if (!store) return;
//     const loadAddress = async () => {
//       try {
//         const res = await addressServices.getAddressByAddressID(store.addressID);
//         setStoreAddresses({ [store.storeID]: res });
//       } catch (err) {
//         console.error('Lỗi lấy address:', err);
//       }
//     };
//     loadAddress();
//   }, [store]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const res = await employeeServices.getEmployee();
//       setEmployees(res || []);
//     };
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (store) {
//       const filtered = employees.filter(emp => emp.storeID === store.storeID);
//       setFilteredEmployees(filtered);
//       setSelectedEmployeeID('');
//     }
//   }, [store, employees]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await serviceCategoryService.getServiceCategory();
//       setServiceCategories(res || []);
//     };
//     const fetchServices = async () => {
//       const res = await serviceServices.getService();
//       setServices(res || []);
//     };
//     fetchCategories();
//     fetchServices();
//   }, []);

//   const handleCategoryClick = id => {
//     setActiveCategoryID(id);
//     setSelectedService(null);
//   };
//   const handleServiceClick = s => setSelectedService(s);
//   const handleBackCategory = () => setActiveCategoryID(null);

//   const handleStylistChange = e => setSelectedEmployeeID(parseInt(e.target.value));
//   const handleDateChange = e => setStartDate(e.target.value);
//   const handleTimeChange = e => setStartTime(e.target.value);
//   const handleNoteChange = e => setNote(e.target.value);

//   const handleSubmit = async () => {
//   if (!store?.storeID || !selectedEmployeeID || !selectedService?.serID || !startDate || !startTime) {
//     toast.error('Vui lòng chọn đầy đủ thông tin.');
//     return;
//   }

//   try {
//     await bookServices.createBook(
//       startDate,
//       startTime + ':00',
//       note,
//       1, // customerID
//       store.storeID,
//       selectedEmployeeID,
//       selectedService.serID
//     );
//     toast.success('Đặt lịch thành công!');
//   } catch (err) {
//     // Kiểm tra lỗi Conflict từ backend
//     if (err.response?.status === 409) {
//       toast.error('Lịch đã bị trùng! Vui lòng chọn giờ khác.');
//     } else {
//       toast.error('Có lỗi khi đặt lịch.');
//     }
//     console.error(err);
//   }
// };


//   const buildFullAddress = () => {
//     if (!store) return '';
//     const addr = storeAddresses[store.storeID];
//     if (!addr) return 'Đang tải địa chỉ...';
//     return [addr.currentAddress, addr.subDistrict, addr.district, addr.cityName].filter(Boolean).join(', ');
//   };

//   if (!store) return <p>Không có dữ liệu cửa hàng. Vui lòng chọn cửa hàng trước.</p>;

//   // Lọc dịch vụ nếu có category active
//   const displayedServices = activeCategoryID
//     ? services.filter(s => s.serCateID === activeCategoryID)
//     : [];

//   return (
//     <div className={cx('bookingPageWrapper')}>
//       <div className={cx('bookingPageContainer')}>
//         {/* Sidebar */}
//         <div className={cx('sidebar')}>
//           <div className={cx('sidebarCard')}>
//             <SafeImage
//               src={store.imageUrl}
//               fallback="https://via.placeholder.com/150?text=Store"
//               alt={store.storeName || 'Store'}
//               className={cx('storeImage')}
//             />
//             <h3>{store.storeName}</h3>
//             <p>{buildFullAddress()}</p>
//             {store.phone && <p>📞 {store.phone}</p>}
//             {store.openHours && <p>🕒 {store.openHours}</p>}
//             {store.rating && (
//               <p className={cx('rating')}>
//                 {Array.from({ length: 5 }, (_, i) => i < store.rating ? '★' : '☆').join(' ')}
//               </p>
//             )}
//           </div>

//           {!activeCategoryID && (
//             <>
//               <h4 className={cx('serviceCardTitle')}>Các loại dịch vụ</h4>
//               <div className={cx('serviceCardsSidebar')}>
//                 {serviceCategories.map(cat => (
//                   <div
//                     key={cat.serCateID}
//                     className={cx('serviceCardSidebar')}
//                     onClick={() => handleCategoryClick(cat.serCateID)}
//                   >
//                     <SafeImage
//                       src={cat.imageUrl}
//                       fallback="https://via.placeholder.com/60?text=Service"
//                       alt={cat.serCateName || 'Service'}
//                       className={cx('serviceImage')}
//                     />
//                     <div className={cx('serviceInfo')}>
//                       <p>{cat.serCateName}</p>
//                       <p>{services.filter(s => s.serCateID === cat.serCateID).length} dịch vụ</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {activeCategoryID && (
//             <>
//               <button className={cx('backButton')} onClick={handleBackCategory}>← Quay lại</button>
//               <div className={cx('serviceCardsSidebar')}>
//                 {displayedServices.map(s => (
//                   <div
//                     key={s.serID}
//                     className={cx('serviceCardSidebar', { selected: selectedService?.serID === s.serID })}
//                     onClick={() => handleServiceClick(s)}
//                   >
//                     <SafeImage
//                       src={s.imageUrl}
//                       fallback="https://via.placeholder.com/60?text=Service"
//                       alt={s.serName || 'Service'}
//                       className={cx('serviceImage')}
//                     />
//                     <div className={cx('serviceInfo')}>
//                       <p>{s.serName}</p>
//                       <p>{s.serPrice}₫</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Booking Form */}
//         <div className={cx('bookingForm')}>
//           <h2>Đặt lịch tại: {store.storeName}</h2>

//           {/* --- Section tiện ích / lợi ích --- */}
//           <div className={cx('amenitiesWrapper')}>
//             <h4>Tiện ích & Lợi ích cửa hàng</h4>
//             <div className={cx('amenitiesList')}>
//               {amenities.map((item, index) => (
//                 <div key={index} className={cx('amenityItem')}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Form booking */}
//           <div className={cx('formBlock')}>
//             <label>Dịch vụ đã chọn</label>
//             <input
//               className={cx('inputField')}
//               value={selectedService ? selectedService.serName : ''}
//               readOnly
//               placeholder="Chọn dịch vụ từ sidebar"
//             />
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Thợ</label>
//             <select value={selectedEmployeeID || ''} onChange={handleStylistChange} className={cx('inputField')}>
//               <option value="">-- Chọn thợ --</option>
//               {filteredEmployees.map(emp => (
//                 <option key={emp.employeID} value={emp.employeID}>{emp.firstName} {emp.lastName}</option>
//               ))}
//             </select>
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Ngày</label>
//             <input type="date" value={startDate} min={moment().format('YYYY-MM-DD')} onChange={handleDateChange} className={cx('inputField')} />
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Giờ</label>
//             <input type="time" value={startTime} onChange={handleTimeChange} className={cx('inputField')} />
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Ghi chú</label>
//             <textarea value={note} onChange={handleNoteChange} className={cx('inputField', 'textareaField')} rows={3} />
//           </div>

//           <div className={cx('formActions')}>
//             <button onClick={handleSubmit} className={cx('submitButton')}>Xác nhận đặt lịch</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingPage;
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// import * as addressServices from '~/services/addressServices';
// import * as employeeServices from '~/services/employeeServices';
// import * as serviceCategoryService from '~/services/serviceCategoryServices';
// import * as serviceServices from '~/services/serviceServices';
// import * as bookServices from '~/services/bookServices';

// import styles from './BookingForm.module.scss';
// const cx = classNames.bind(styles);

// const SafeImage = ({ src, alt, fallback, className }) => {
//   const [imgSrc, setImgSrc] = useState(src || fallback);
//   useEffect(() => setImgSrc(src || fallback), [src, fallback]);
//   const handleError = () => setImgSrc(fallback);
//   return <img src={imgSrc} alt={alt} onError={handleError} className={className} />;
// };

// function BookingPage() {
//   const location = useLocation();
//   const store = location.state?.store || null;

//   const [storeAddresses, setStoreAddresses] = useState({});
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
//   const [serviceCategories, setServiceCategories] = useState([]);
//   const [services, setServices] = useState([]);
//   const [activeCategoryID, setActiveCategoryID] = useState(null);
//   const [selectedService, setSelectedService] = useState(null);
//   const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
//   const [startTime, setStartTime] = useState('');
//   const [note, setNote] = useState('');
//   const [customerID, setCustomerID] = useState(1); // tạm thời customerID cố định, có thể lấy từ context/auth

//   const amenities = [
//     'Căn hộ',
//     'Bãi đỗ xe trong khuôn viên',
//     'WiFi miễn phí',
//     '10 Mbps',
//     '2 nhà hàng',
//     'Trung tâm Spa & chăm sóc sức khỏe',
//     'Xe đưa đón sân bay',
//     'Phòng gia đình',
//     'Dịch vụ phòng',
//     'Phòng không hút thuốc',
//     'Trung tâm thể dục',
//   ];

//   // Load address cửa hàng
//   useEffect(() => {
//     if (!store) return;
//     const loadAddress = async () => {
//       try {
//         const res = await addressServices.getAddressByAddressID(store.addressID);
//         setStoreAddresses({ [store.storeID]: res });
//       } catch (err) {
//         console.error('Lỗi lấy address:', err);
//       }
//     };
//     loadAddress();
//   }, [store]);

//   // Load employee
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const res = await employeeServices.getEmployee();
//       setEmployees(res || []);
//     };
//     fetchEmployees();
//   }, []);

//   // Filter employee theo store
//   useEffect(() => {
//     if (store) {
//       const filtered = employees.filter(emp => emp.storeID === store.storeID);
//       setFilteredEmployees(filtered);
//       setSelectedEmployeeID('');
//     }
//   }, [store, employees]);

//   // Load service category & services
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await serviceCategoryService.getServiceCategory();
//       setServiceCategories(res || []);
//     };
//     const fetchServices = async () => {
//       const res = await serviceServices.getService();
//       setServices(res || []);
//     };
//     fetchCategories();
//     fetchServices();
//   }, []);

//   const handleCategoryClick = id => {
//     setActiveCategoryID(id);
//     setSelectedService(null);
//   };
//   const handleServiceClick = s => setSelectedService(s);
//   const handleBackCategory = () => setActiveCategoryID(null);
//   const handleStylistChange = e => setSelectedEmployeeID(parseInt(e.target.value));
//   const handleDateChange = e => setStartDate(e.target.value);
//   const handleTimeChange = e => setStartTime(e.target.value);
//   const handleNoteChange = e => setNote(e.target.value);

//  const handleSubmit = async () => {
//   if (!store?.storeID || !selectedEmployeeID || !selectedService?.serID || !startDate || !startTime || !customerID) {
//     toast.error('Vui lòng chọn đầy đủ thông tin.');
//     return;
//   }

//   const payload = {
//     startDate,
//     startTime: startTime + ':00',
//     note,
//     customerID,
//     storeID: store.storeID,
//     employeID: selectedEmployeeID,
//     serID: selectedService.serID,
//   };

//   try {
//     await bookServices.createBook(payload); // gửi đúng object duy nhất
//     toast.success('Đặt lịch thành công!');
//   } catch (err) {
//     if (err.response?.status === 409) {
//       toast.error('Lịch đã bị trùng! Vui lòng chọn giờ khác.');
//     } else {
//       toast.error('Có lỗi khi đặt lịch.');
//     }
//     console.error(err);
//   }
// };


//   const buildFullAddress = () => {
//     if (!store) return '';
//     const addr = storeAddresses[store.storeID];
//     if (!addr) return 'Đang tải địa chỉ...';
//     return [addr.currentAddress, addr.subDistrict, addr.district, addr.cityName].filter(Boolean).join(', ');
//   };

//   if (!store) return <p>Không có dữ liệu cửa hàng. Vui lòng chọn cửa hàng trước.</p>;

//   const displayedServices = activeCategoryID
//     ? services.filter(s => s.serCateID === activeCategoryID)
//     : [];

//   return (
//     <div className={cx('bookingPageWrapper')}>
//       <div className={cx('bookingPageContainer')}>
//         {/* Sidebar */}
//         <div className={cx('sidebar')}>
//           <div className={cx('sidebarCard')}>
//             <SafeImage
//               src={store.imageUrl}
//               fallback="https://via.placeholder.com/150?text=Store"
//               alt={store.storeName || 'Store'}
//               className={cx('storeImage')}
//             />
//             <h3>{store.storeName}</h3>
//             <p>{buildFullAddress()}</p>
//             {store.phone && <p>📞 {store.phone}</p>}
//             {store.openHours && <p>🕒 {store.openHours}</p>}
//             {store.rating && (
//               <p className={cx('rating')}>
//                 {Array.from({ length: 5 }, (_, i) => i < store.rating ? '★' : '☆').join(' ')}
//               </p>
//             )}
//           </div>

//           {!activeCategoryID && (
//             <>
//               <h4 className={cx('serviceCardTitle')}>Các loại dịch vụ</h4>
//               <div className={cx('serviceCardsSidebar')}>
//                 {serviceCategories.map(cat => (
//                   <div
//                     key={cat.serCateID}
//                     className={cx('serviceCardSidebar')}
//                     onClick={() => handleCategoryClick(cat.serCateID)}
//                   >
//                     <SafeImage
//                       src={cat.imageUrl}
//                       fallback="https://via.placeholder.com/60?text=Service"
//                       alt={cat.serCateName || 'Service'}
//                       className={cx('serviceImage')}
//                     />
//                     <div className={cx('serviceInfo')}>
//                       <p>{cat.serCateName}</p>
//                       <p>{services.filter(s => s.serCateID === cat.serCateID).length} dịch vụ</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {activeCategoryID && (
//             <>
//               <button className={cx('backButton')} onClick={handleBackCategory}>← Quay lại</button>
//               <div className={cx('serviceCardsSidebar')}>
//                 {displayedServices.map(s => (
//                   <div
//                     key={s.serID}
//                     className={cx('serviceCardSidebar', { selected: selectedService?.serID === s.serID })}
//                     onClick={() => handleServiceClick(s)}
//                   >
//                     <SafeImage
//                       src={s.imageUrl}
//                       fallback="https://via.placeholder.com/60?text=Service"
//                       alt={s.serName || 'Service'}
//                       className={cx('serviceImage')}
//                     />
//                     <div className={cx('serviceInfo')}>
//                       <p>{s.serName}</p>
//                       <p>{s.serPrice}₫</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Booking Form */}
//         <div className={cx('bookingForm')}>
//           <h2>Đặt lịch tại: {store.storeName}</h2>

//           {/* Amenities */}
//           <div className={cx('amenitiesWrapper')}>
//             <h4>Tiện ích & Lợi ích cửa hàng</h4>
//             <div className={cx('amenitiesList')}>
//               {amenities.map((item, index) => (
//                 <div key={index} className={cx('amenityItem')}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Form booking */}
//           <div className={cx('formBlock')}>
//             <label>Dịch vụ đã chọn</label>
//             <input
//               className={cx('inputField')}
//               value={selectedService ? selectedService.serName : ''}
//               readOnly
//               placeholder="Chọn dịch vụ từ sidebar"
//             />
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Thợ</label>
//             <select value={selectedEmployeeID || ''} onChange={handleStylistChange} className={cx('inputField')}>
//               <option value="">-- Chọn thợ --</option>
//               {filteredEmployees.map(emp => (
//                 <option key={emp.employeID} value={emp.employeID}>{emp.firstName} {emp.lastName}</option>
//               ))}
//             </select>
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Ngày</label>
//             <input type="date" value={startDate} min={moment().format('YYYY-MM-DD')} onChange={handleDateChange} className={cx('inputField')} />
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Giờ</label>
//             <input type="time" value={startTime} onChange={handleTimeChange} className={cx('inputField')} />
//           </div>

//           <div className={cx('formBlock')}>
//             <label>Ghi chú</label>
//             <textarea value={note} onChange={handleNoteChange} className={cx('inputField', 'textareaField')} rows={3} />
//           </div>

//           <div className={cx('formActions')}>
//             <button onClick={handleSubmit} className={cx('submitButton')}>Xác nhận đặt lịch</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingPage;
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import moment from 'moment';
import { toast } from 'react-toastify';

import * as addressServices from '~/services/addressServices';
import * as employeeServices from '~/services/employeeServices';
import * as serviceCategoryService from '~/services/serviceCategoryServices';
import * as serviceServices from '~/services/serviceServices';
import * as bookServices from '~/services/bookServices';
import { sendAutoEmail } from '~/utils/emailService';
import * as customerServices from '~/services/customerService';

import { AuthContext } from '~/contexts/AuthContext';
import styles from './BookingForm.module.scss';
const cx = classNames.bind(styles);

const SafeImage = ({ src, alt, fallback, className }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  useEffect(() => setImgSrc(src || fallback), [src, fallback]);
  const handleError = () => setImgSrc(fallback);
  return <img src={imgSrc} alt={alt} onError={handleError} className={className} />;
};

function BookingPage() {
  const location = useLocation();
  const store = location.state?.store || null;

  const { user, loading } = useContext(AuthContext); 
  const [customerID, setCustomerID] = useState(null);

  const [storeAddresses, setStoreAddresses] = useState({});
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [activeCategoryID, setActiveCategoryID] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState('');
  const [note, setNote] = useState('');

  const amenities = [
    'Căn hộ','Bãi đỗ xe trong khuôn viên','WiFi miễn phí','10 Mbps',
    '2 nhà hàng','Trung tâm Spa & chăm sóc sức khỏe','Xe đưa đón sân bay',
    'Phòng gia đình','Dịch vụ phòng','Phòng không hút thuốc','Trung tâm thể dục'
  ];

  // Lấy customerID khi user load xong
  useEffect(() => {
    if (!loading && user) setCustomerID(user.customerID);
  }, [user, loading]);

  // Load address cửa hàng
  useEffect(() => {
    if (!store) return;
    const loadAddress = async () => {
      try {
        const res = await addressServices.getAddressByAddressID(store.addressID);
        setStoreAddresses({ [store.storeID]: res });
      } catch (err) {
        console.error('Lỗi lấy address:', err);
      }
    };
    loadAddress();
  }, [store]);

  // Load employee
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await employeeServices.getEmployee();
      setEmployees(res || []);
    };
    fetchEmployees();
  }, []);

  // Filter employee theo store
  useEffect(() => {
    if (store) {
      const filtered = employees.filter(emp => emp.storeID === store.storeID);
      setFilteredEmployees(filtered);
      setSelectedEmployeeID('');
    }
  }, [store, employees]);

  // Load service category & services
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await serviceCategoryService.getServiceCategory();
      setServiceCategories(res || []);
    };
    const fetchServices = async () => {
      const res = await serviceServices.getService();
      setServices(res || []);
    };
    fetchCategories();
    fetchServices();
  }, []);

  const handleCategoryClick = id => { setActiveCategoryID(id); setSelectedService(null); };
  const handleServiceClick = s => setSelectedService(s);
  const handleBackCategory = () => setActiveCategoryID(null);
  const handleStylistChange = e => setSelectedEmployeeID(parseInt(e.target.value));
  const handleDateChange = e => setStartDate(e.target.value);
  const handleTimeChange = e => setStartTime(e.target.value);
  const handleNoteChange = e => setNote(e.target.value);
  const formatPrice = (price) => {
  if (!price) return '0 ₫';
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
};

 const handleSubmit = async () => {
  if (!store?.storeID || !selectedEmployeeID || !selectedService?.serID || 
      !startDate || !startTime || !customerID) {
    toast.error('Vui lòng chọn đầy đủ thông tin.');
    return;
  }

  const payload = {
    startDate,
    startTime: startTime + ':00',
    note,
    customerID,
    storeID: store.storeID,
    employeID: selectedEmployeeID,
    serID: selectedService.serID,
  };

  try {
    // 1️⃣ Tạo booking
    await bookServices.createBook(payload);

    // 2️⃣ Lấy thông tin customer
    const customer = await customerServices.getCustomerById(customerID);

    if (!customer?.email) {
      toast.warning('Không tìm thấy email khách hàng.');
      return;
    }

    // 3️⃣ Build dữ liệu email
    const emailData = {
      email: customer.email,
      customer_name: `${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
      date: startDate,
      time: startTime,
      store: `${store.storeName} - ${buildFullAddress()}`,
    };

    // 4️⃣ Gửi email
    await sendAutoEmail(emailData);
    console.log('Email Data:', emailData);

    toast.success('✅ Đặt lịch thành công & email đã gửi!');
  } catch (err) {
    if (err.response?.status === 409) {
      toast.error('⛔ Lịch đã bị trùng! Vui lòng chọn giờ khác.');
    } else {
      toast.error('❌ Có lỗi khi đặt lịch.');
    }
    console.error(err);
  }
};




  const buildFullAddress = () => {
    if (!store) return '';
    const addr = storeAddresses[store.storeID];
    if (!addr) return 'Đang tải địa chỉ...';
    return [addr.currentAddress, addr.subDistrict, addr.district, addr.cityName].filter(Boolean).join(', ');
  };

  if (!store) return <p>Không có dữ liệu cửa hàng. Vui lòng chọn cửa hàng trước.</p>;

  const displayedServices = activeCategoryID
    ? services.filter(s => s.serCateID === activeCategoryID)
    : [];

  return (
    <div className={cx('bookingPageWrapper')}>
      <div className={cx('bookingPageContainer')}>
        {/* Sidebar */}
        <div className={cx('sidebar')}>
          <div className={cx('sidebarCard')}>
            <SafeImage
              src={store.imageUrl}
              fallback="https://via.placeholder.com/150?text=Store"
              alt={store.storeName || 'Store'}
              className={cx('storeImage')}
            />
            <h3>{store.storeName}</h3>
            <p>{buildFullAddress()}</p>
            {store.phone && <p>📞 {store.phone}</p>}
            {store.openHours && <p>🕒 {store.openHours}</p>}
            {store.rating && (
              <p className={cx('rating')}>
                {Array.from({ length: 5 }, (_, i) => i < store.rating ? '★' : '☆').join(' ')}
              </p>
            )}
          </div>

          {!activeCategoryID && (
            <>
              <h4 className={cx('serviceCardTitle')}>Các loại dịch vụ</h4>
              <div className={cx('serviceCardsSidebar')}>
                {serviceCategories.map(cat => (
                  <div
                    key={cat.serCateID}
                    className={cx('serviceCardSidebar')}
                    onClick={() => handleCategoryClick(cat.serCateID)}
                  >
                    <SafeImage
                      src={cat.imageUrl}
                      fallback="https://via.placeholder.com/60?text=Service"
                      alt={cat.serCateName || 'Service'}
                      className={cx('serviceImage')}
                    />
                    <div className={cx('serviceInfo')}>
                      <p>{cat.serCateName}</p>
                      <p>{services.filter(s => s.serCateID === cat.serCateID).length} dịch vụ</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeCategoryID && (
            <>
              <button className={cx('backButton')} onClick={handleBackCategory}>← Quay lại</button>
              <div className={cx('serviceCardsSidebar')}>
                {displayedServices.map(s => (
                  <div
                    key={s.serID}
                    className={cx('serviceCardSidebar', { selected: selectedService?.serID === s.serID })}
                    onClick={() => handleServiceClick(s)}
                  >
                    <SafeImage
                      src={s.imageUrl}
                      fallback="https://via.placeholder.com/60?text=Service"
                      alt={s.serName || 'Service'}
                      className={cx('serviceImage')}
                    />
                    <div className={cx('serviceInfo')}>
                      <p>{s.serName}</p>
                    <p className={cx('servicePrice')}>
                      {formatPrice(s.serPrice)}
                    </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Booking Form */}
        <div className={cx('bookingForm')}>
          <h2>Đặt lịch tại: {store.storeName}</h2>
          {/* Amenities */}
          <div className={cx('amenitiesWrapper')}>
            <h4>Tiện ích & Lợi ích cửa hàng</h4>
            <div className={cx('amenitiesList')}>
              {amenities.map((item, index) => (
                <div key={index} className={cx('amenityItem')}>{item}</div>
              ))}
            </div>
          </div>

          {/* Form booking */}
          <div className={cx('formBlock')}>
            <label>Dịch vụ đã chọn</label>
            <input
              className={cx('inputField')}
              value={selectedService ? selectedService.serName : ''}
              readOnly
              placeholder="Chọn dịch vụ từ sidebar"
            />
          </div>

          <div className={cx('formBlock')}>
            <label>Thợ</label>
            <select value={selectedEmployeeID || ''} onChange={handleStylistChange} className={cx('inputField')}>
              <option value="">-- Chọn thợ --</option>
              {filteredEmployees.map(emp => (
                <option key={emp.employeID} value={emp.employeID}>{emp.firstName} {emp.lastName}</option>
              ))}
            </select>
          </div>

          <div className={cx('formBlock')}>
            <label>Ngày</label>
            <input type="date" value={startDate} min={moment().format('YYYY-MM-DD')} onChange={handleDateChange} className={cx('inputField')} />
          </div>

          <div className={cx('formBlock')}>
            <label>Giờ</label>
            <input type="time" value={startTime} onChange={handleTimeChange} className={cx('inputField')} />
          </div>

          <div className={cx('formBlock')}>
            <label>Ghi chú</label>
            <textarea value={note} onChange={handleNoteChange} className={cx('inputField', 'textareaField')} rows={3} />
          </div>

          <div className={cx('formActions')}>
            <button onClick={handleSubmit} className={cx('submitButton')}>Xác nhận đặt lịch</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
