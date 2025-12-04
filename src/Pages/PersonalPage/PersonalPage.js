// import classNames from 'classnames/bind';
// import { useEffect, useState, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { jwtDecode } from 'jwt-decode';

// import styles from './PersonalPage.module.scss';
// import FormControl from '~/components/feature/FormControl';

// import Button from '~/components/common/Button';
// import Image from '~/components/common/Image';
// import BookingWarning from '~/components/common/BookingWarning';

// import * as customerService from '~/services/customerService';
// import * as userService from '~/services/userServices';
// import { bool } from 'prop-types';

// const cx = classNames.bind(styles);

// function PersonalPage() {
//     const location = useLocation();
//     const { state } = location?.state;

//     const [userId, setUserId] = useState('');
//     const [customerId, setCustomerId] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [avatarCurrent, setAvatarCurrent] = useState(null);
//     const [avatarNew, setAvatarNew] = useState();
//     const [showInputEmail, setShowInputEmail] = useState(false);
//     const [showInputSDT, setShowInputSDT] = useState(false);
//     const [showPersonalPage, setPersonalPage] = useState(false);

//     const [dateOfBirth, setDateOfBirth] = useState('');

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             try {
//                 setPersonalPage(true);
//                 const decoded = jwtDecode(token);

//                 if (decoded?.userID) {
//                     const fetchApi = async () => {
//                         const customers = await customerService.getCustomer();
//                         if (customers) {
//                             const customer = customers.find((customer) => customer?.userID === decoded?.userID);
//                             if (customer) {
//                                 setUserId(customer?.userID);
//                                 setCustomerId(customer?.customerID);
//                                 setFirstName(customer?.firstName);
//                                 setLastName(customer?.lastName);
//                                 setEmail(customer?.email);
//                                 setPhone(customer?.numberphone);
//                                 setAvatarCurrent(customer?.picture);
//                                 setDateOfBirth(customer?.dateOfBirth.slice(0, 10));
//                             }
//                         }
//                     };

//                     fetchApi();
//                 }
//             } catch (error) {
//                 setPersonalPage(false);
//                 toast.error('Bạn chưa đăng nhập!');
//             }
//         }
//     }, []);

//     // useEffect(() => {
//     //     return () => {
//     //         avatarNew && URL.revokeObjectURL(avatarNew.preview);
//     //     };
//     // }, [avatarNew]);

//     // const handlePreviewAvatar = (e) => {
//     //     const file = e.target.files[0];

//     //     file.preview = URL.createObjectURL(file);
//     //     setAvatarNew(file);
//     // };

//     const handleDateChange = (event) => {
//         const selectedDate = event.target.value;
//         if (!selectedDate) {
//             setDateOfBirth('');
//         } else {
//             setDateOfBirth(selectedDate);
//         }
//     };

//     const handleUpdateInfo = async () => {
//         try {
//             const result = await customerService.updateCustomer(
//                 customerId,
//                 firstName,
//                 lastName,
//                 undefined,
//                 email,
//                 phone,
//                 dateOfBirth,
//                 userId,
//             );
//             if (result) {
//                 toast.success('Cập nhật thành công');
//             } else {
//                 toast.success('Cập nhật thất bại');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             {showPersonalPage == null ? (
//                 <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
//             ) : (
//                 <div className={cx('wrapper')}>
//                     <div className={cx('header')}>
//                         <h2>Hồ Sơ Của Tôi</h2>
//                         <h4>Quản lý thông tin hồ sơ để bảo mât tài khoản</h4>
//                     </div>
//                     <div className={cx('content')}>
//                         <div className={cx('form-info')}>
//                             <div className={cx('form-name')}>
//                                 <FormControl
//                                     value={firstName}
//                                     labelTitle="Họ & Tên đệm"
//                                     placeholder="Họ & Tên đệm"
//                                     name="firstName"
//                                     type="text"
//                                     labelComeback
//                                     personal
//                                     otherLabel
//                                     setFirstName={setFirstName}
//                                 />
//                                 <FormControl
//                                     value={lastName}
//                                     labelTitle="Tên"
//                                     placeholder="Tên"
//                                     name="lastName"
//                                     type="text"
//                                     labelComeback
//                                     personal
//                                     setLastName={setLastName}
//                                 />
//                             </div>
//                             <div className={cx('form-email')}>
//                                 {showInputEmail ? (
//                                     <FormControl
//                                         value={email}
//                                         labelTitle="Email"
//                                         placeholder="Email muốn thay đổi....."
//                                         name="email"
//                                         type="text"
//                                         labelComeback
//                                         personal
//                                         otherLabel
//                                         setEmail={setEmail}
//                                     />
//                                 ) : (
//                                     <>
//                                         <label className={cx('text-center')}>Email</label>
//                                         <p
//                                             className={cx('text-center', {
//                                                 'margin-label': true,
//                                             })}
//                                         >
//                                             {email === 'null' || phone === '' ? 'Chưa có Email!' : email}
//                                         </p>
//                                     </>
//                                 )}
//                                 <button
//                                     className={cx('change-info')}
//                                     onClick={() => setShowInputEmail(!showInputEmail)}
//                                 >
//                                     Thay đổi
//                                 </button>
//                             </div>

//                             <div className={cx('form-email')}>
//                                 {showInputSDT ? (
//                                     <FormControl
//                                         value={phone}
//                                         labelTitle="Số điện thoai"
//                                         placeholder="Số điện thoại"
//                                         name="phone"
//                                         type="text"
//                                         labelComeback
//                                         personal
//                                         otherLabel
//                                         setPhone={setPhone}
//                                     />
//                                 ) : (
//                                     <>
//                                         <label className={cx('text-center')}>SDT</label>
//                                         <p
//                                             className={cx('text-center', {
//                                                 'margin-label': true,
//                                             })}
//                                         >
//                                             {phone === 'null' || phone === '' ? 'Chưa có SDT!' : phone}
//                                         </p>
//                                     </>
//                                 )}
//                                 <button className={cx('change-info')} onClick={() => setShowInputSDT(!showInputSDT)}>
//                                     Thay đổi
//                                 </button>
//                             </div>

//                             <div className={cx('form-date')}>
//                                 <label htmlFor="date" className={cx('text-center')}>
//                                     Ngày Sinh
//                                 </label>
//                                 <input
//                                     type="date"
//                                     id="date"
//                                     value={dateOfBirth}
//                                     onChange={handleDateChange}
//                                     className={cx('inputField')}
//                                 />
//                             </div>

//                             <div className={cx('form-save')}>
//                                 <Button lightBlue className={'btn-submit'} onClick={handleUpdateInfo}>
//                                     Lưu Thông Tin
//                                 </Button>
//                             </div>
//                         </div>
//                         {/* <div className={cx('form-images')}>
//                             <div className={cx('avatar-images')}>
//                                 <>
//                                     {avatarNew ? (
//                                         <Image src={avatarNew.preview} alt="avatar" className={cx('images')} />
//                                     ) : (
//                                         <Image src={avatarCurrent.preview} alt="avatar" className={cx('images')} />
//                                     )}
//                                 </>
//                             </div>
//                             <input
//                                 type="file"
//                                 id="file-input"
//                                 className={cx('input-avatar')}
//                                 onChange={handlePreviewAvatar}
//                             />
//                             <div className={cx('file-avatar')}>
//                                 <label htmlFor="file-input" className={cx('file-avatar-input')}>
//                                     Chọn Ảnh
//                                 </label>
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default PersonalPage;
////*************************************************************** */
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';

// import styles from './PersonalPage.module.scss';
// import FormControl from '~/components/feature/FormControl';
// import Button from '~/components/common/Button';
// import BookingWarning from '~/components/common/BookingWarning';
// import * as customerService from '~/services/customerService';
// import * as employeeService from '~/services/employeeServices';
// import * as storeService from '~/services/storeServices';
// import * as addressService from '~/services/addressServices';
// import * as customerAddressService from '~/services/customerAddressServices';

// const cx = classNames.bind(styles);

// function PersonalPage() {
//     const [userId, setUserId] = useState('');
//     const [customerId, setCustomerId] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [dateOfBirth, setDateOfBirth] = useState('');
//     const [storeName, setStoreName] = useState('');
//     const [isBarber, setIsBarber] = useState(false);
//     const [showPersonalPage, setPersonalPage] = useState(false);
//     const [addresses, setAddresses] = useState([]);
//     const [selectedAddressId, setSelectedAddressId] = useState('');

//     // 🔹 Kiểm tra đăng nhập
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 jwtDecode(token);
//                 setPersonalPage(true);
//             } catch (error) {
//                 console.error('Token không hợp lệ:', error);
//                 toast.error('Token không hợp lệ hoặc đã hết hạn!');
//                 setPersonalPage(false);
//             }
//         } else {
//             toast.warning('Vui lòng đăng nhập để xem thông tin cá nhân!');
//             setPersonalPage(false);
//         }
//     }, []);

//     // 🔹 Lấy dữ liệu user, employee, customer, store
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) return;

//                 const decodedToken = jwtDecode(token);
//                 if (!decodedToken?.userID) return;

//                 const currentUserId = decodedToken.userID;
//                 setUserId(currentUserId);

//                 const allEmployees = await employeeService.getEmployee();
//                 const employee = allEmployees?.find((emp) => emp.userID === currentUserId);

//                 if (employee) {
//                     setIsBarber(true);
//                     const store = await storeService.getStoreById(employee.storeID);
//                     setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');
//                 } else {
//                     setIsBarber(false);
//                     setStoreName('');
//                 }

//                 const customers = await customerService.getCustomer();
//                 const customer = customers?.find((c) => c?.userID === currentUserId);
//                 if (customer) {
//                     setCustomerId(customer.customerID);
//                     setFirstName(customer.firstName);
//                     setLastName(customer.lastName);
//                     setEmail(customer.email);
//                     setPhone(customer.numberphone);
//                     setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
//                 }

//                 const addressList = await addressService.getAddress();
//                 setAddresses(addressList);
//             } catch (error) {
//                 console.error('Lỗi khi tải dữ liệu người dùng:', error);
//                 toast.error('Không thể tải dữ liệu người dùng!');
//             }
//         };

//         fetchUserData();
//     }, []);

//     // 🔹 Hàm cập nhật thông tin cá nhân
//     // 🔹 Hàm cập nhật thông tin cá nhân
// const handleUpdateInfo = async () => {
//     try {
//         // Kiểm tra dữ liệu cơ bản
//         if (!firstName.trim() || !lastName.trim()) {
//             toast.warning('Vui lòng nhập đầy đủ họ và tên!');
//             return;
//         }

//         // 🔸 Nếu có chọn địa chỉ thì kiểm tra tồn tại trước
//         if (selectedAddressId) {
//             const validAddress = addresses.some(
//                 (addr) => addr.addressID === Number(selectedAddressId)
//             );

//             if (!validAddress) {
//                 toast.error('Địa chỉ đã chọn không tồn tại trong hệ thống!');
//                 return;
//             }
//         }

//         // 🔹 In ra thông tin trước khi gửi API cập nhật
//         console.log('📦 Dữ liệu chuẩn bị gửi lên API updateCustomer:', {
//             customerId,
//             firstName,
//             lastName,
//             email,
//             phone,
//             dateOfBirth,
//             userId,
//         });

//         // 🔸 Cập nhật thông tin khách hàng
//         const result = await customerService.updateCustomer(
//             customerId,
//             firstName,
//             lastName,
//             undefined,
//             email,
//             phone,
//             dateOfBirth,
//             userId
//         );

//         if (!result) {
//             toast.error('Cập nhật thất bại!');
//             return;
//         }

//         // 🔸 Nếu có địa chỉ hợp lệ thì lưu liên kết CustomerAddress
//         if (selectedAddressId) {
//             // 👀 Hiển thị dữ liệu gửi đến API tạo CustomerAddress
//             console.log('📦 Dữ liệu chuẩn bị gửi lên API createCustomerAddress:', {
//                 customerID: customerId,
//                 addressID: Number(selectedAddressId),
//             });

//             toast.info(`Đang lưu địa chỉ (customerID=${customerId}, addressID=${selectedAddressId})...`);

//             try {
//                 const res = await customerAddressService.createCustomerAddress(
//                     customerId,
//                     selectedAddressId
//                 );

//                 if (res) {
//                     toast.success('Cập nhật thông tin và lưu địa chỉ thành công!');
//                 } else {
//                     toast.warning('Thông tin đã được cập nhật nhưng không thể lưu địa chỉ.');
//                 }
//             } catch (err) {
//                 console.error('❌ Lỗi khi lưu địa chỉ:', err);
//                 toast.warning(
//                     'Cập nhật thành công, nhưng lưu địa chỉ thất bại. Vui lòng thử lại!'
//                 );
//             }
//         } else {
//             toast.success('Cập nhật thông tin cá nhân thành công!');
//         }
//     } catch (error) {
//         console.error('❌ Lỗi khi cập nhật thông tin:', error);
//         toast.error('Đã xảy ra lỗi trong quá trình lưu thông tin!');
//     }
// };

//     const handleDateChange = (event) => {
//         setDateOfBirth(event.target.value || '');
//     };

//     return (
//         <>
//             {!showPersonalPage ? (
//                 <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
//             ) : (
//                 <div className={cx('wrapper')}>
//                     <div className={cx('header')}>
//                         <h2>Hồ Sơ Của Tôi</h2>
//                         <h4>Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
//                     </div>

//                     <div className={cx('content')}>
//                         <div className={cx('form-info')}>
//                             <div className={cx('form-name')}>
//                                 <FormControl
//                                     value={firstName}
//                                     labelTitle="Họ & Tên đệm"
//                                     setFirstName={setFirstName}
//                                 />
//                                 <FormControl
//                                     value={lastName}
//                                     labelTitle="Tên"
//                                     setLastName={setLastName}
//                                 />
//                             </div>

//                             <div className={cx('form-email')}>
//                                 <label>Email</label>
//                                 <p>{email || 'Chưa có Email'}</p>
//                             </div>

//                             <div className={cx('form-email')}>
//                                 <label>Số điện thoại</label>
//                                 <p>{phone || 'Chưa có số điện thoại'}</p>
//                             </div>

//                             <div className={cx('form-date')}>
//                                 <label htmlFor="date">Ngày sinh</label>
//                                 <input
//                                     type="date"
//                                     id="date"
//                                     value={dateOfBirth}
//                                     onChange={handleDateChange}
//                                 />
//                             </div>

//                             {/* 🔹 Chọn địa chỉ
//                             <div className={cx('form-address')}>
//                                 <label>Địa chỉ</label>
//                                 <select
//                                     value={selectedAddressId}
//                                     onChange={(e) => setSelectedAddressId(e.target.value)}
//                                 >
//                                     <option value="">-- Chọn địa chỉ --</option>
//                                     {addresses.map((addr) => (
//                                         <option key={addr.addressID} value={addr.addressID}>
//                                             {`${addr.currentAddress}, ${addr.subDistrict}, ${addr.district}`}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div> */}

//                             {isBarber && (
//                                 <div className={cx('form-extra')}>
//                                     <label>Chức vụ</label>
//                                     <p>
//                                         Thợ cắt tóc tại cửa hàng{' '}
//                                         <strong>{storeName || 'Chưa có thông tin cửa hàng'}</strong>
//                                     </p>
//                                 </div>
//                             )}

//                             {customerId && (
//                                 <div className={cx('form-save')}>
//                                     <Button
//                                         lightBlue
//                                         className={'btn-submit'}
//                                         onClick={handleUpdateInfo}
//                                     >
//                                         Lưu Thông Tin
//                                     </Button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default PersonalPage;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';
// import SideSidebarProfile from "../../components/common/SidebarProfile/sideSidebarProfile";
// import styles from './PersonalPage.module.scss';
// import FormControl from '~/components/feature/FormControl';
// import Button from '~/components/common/Button';
// import BookingWarning from '~/components/common/BookingWarning';

// import * as customerService from '~/services/customerService';
// import * as employeeService from '~/services/employeeServices';
// import * as storeService from '~/services/storeServices';
// import * as countryService from '~/services/ountryService'; // ✅ sửa đúng tên file
// import * as cityService from '~/services/cityService';
// import * as addressService from '~/services/addressServices';

// const cx = classNames.bind(styles);

// function PersonalPage() {
//   const [userId, setUserId] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [storeName, setStoreName] = useState('');
//   const [isBarber, setIsBarber] = useState(false);
//   const [showPersonalPage, setPersonalPage] = useState(false);
// const [selectedDistrictID, setSelectedDistrictID] = useState('');

//   // 🔹 Địa chỉ
//   const [cities, setCities] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedCityId, setSelectedCityId] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [subDistrict, setSubDistrict] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');

//   // ✅ Kiểm tra token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         jwtDecode(token);
//         setPersonalPage(true);
//       } catch {
//         toast.error('Token không hợp lệ hoặc đã hết hạn!');
//         setPersonalPage(false);
//       }
//     } else {
//       toast.warning('Vui lòng đăng nhập để xem thông tin cá nhân!');
//       setPersonalPage(false);
//     }
//   }, []);

//   // ✅ Lấy dữ liệu user + danh sách tỉnh
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const currentUserId = decoded?.userID;
//         if (!currentUserId) return;
//         setUserId(currentUserId);

//         // 🔸 Lấy thông tin nhân viên
//         const employees = await employeeService.getEmployee();
//         const emp = employees?.find((e) => e.userID === currentUserId);
//         if (emp) {
//           setIsBarber(true);
//           const store = await storeService.getStoreById(emp.storeID);
//           setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');
//         }

//         // 🔸 Lấy thông tin khách hàng
//         const customers = await customerService.getCustomer();
//         const customer = customers?.find((c) => c.userID === currentUserId);
//         if (customer) {
//           setCustomerId(customer.customerID);
//           setFirstName(customer.firstName);
//           setLastName(customer.lastName);
//           setEmail(customer.email);
//           setPhone(customer.numberphone);
//           setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
//           setSelectedCityId(customer.cityID || '');
//         }

//         // 🔸 Lấy danh sách tỉnh/thành
//         const cityList = await countryService.getCountries();
//         if (Array.isArray(cityList)) setCities(cityList);
//         else setCities(cityList.data || []);

//         // 🔸 Nếu có cityID thì load quận/huyện
//         if (customer?.cityID) {
//           const districtList = await cityService.getCitiesByCountry(customer.cityID);
//           if (Array.isArray(districtList)) setDistricts(districtList);
//           else setDistricts(districtList.data || []);
//         }
//       } catch (err) {
//         console.error('❌ Lỗi tải dữ liệu:', err);
//         toast.error('Không thể tải thông tin người dùng!');
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ Khi chọn Thành phố → load Quận/Huyện
//   const handleCityChange = async (cityID) => {
//     setSelectedCityId(cityID);
//     setSelectedDistrict('');
//     if (cityID) {
//       try {
//         const res = await cityService.getCitiesByCountry(cityID);
//         if (Array.isArray(res)) setDistricts(res);
//         else setDistricts(res.data || []);
//       } catch (err) {
//         console.error('Lỗi khi lấy quận/huyện:', err);
//         setDistricts([]);
//       }
//     }
//   };

//   // ✅ Khi nhấn "Lưu"
//   const handleUpdateInfo = async () => {
//     if (!selectedDistrictID || selectedDistrictID <= 0) {
//   toast.warning('Vui lòng chọn quận/huyện hợp lệ!');
//   return;
// }
//     try {
//       if (!firstName.trim() || !lastName.trim()) {
//         toast.warning('Vui lòng nhập đầy đủ họ và tên!');
//         return;
//       }
//       if (!selectedCityId || !selectedDistrict || !subDistrict || !currentAddress) {
//         toast.warning('Vui lòng nhập đầy đủ thông tin địa chỉ!');
//         return;
//       }
//       console.log(selectedDistrictID);
//       // 🔸 Cập nhật thông tin khách hàng
//       await customerService.updateCustomer(
//         customerId,
//         firstName,
//         lastName,
//         undefined,
//         email,
//         phone,
//         dateOfBirth,
//         userId,
//         undefined,
//         selectedCityId
//       );

//       // 🔸 Tạo địa chỉ mới
//       const addressData = {
     
//         currentAddress: currentAddress,
//         subDistrict: subDistrict,
//         district: selectedDistrict,
//         cityID: Number(selectedDistrictID),
//         userID: Number(userId), // ✅ gửi thêm userID lên backend
//       };

//       console.log('📤 Dữ liệu gửi đi:', addressData);
//       const res = await addressService.createAddress(addressData);
//       if (res) toast.success('Cập nhật thông tin và địa chỉ thành công!');
//       else toast.error('Không thể lưu địa chỉ!');
//     } catch (err) {
//       console.error('❌ Lỗi khi cập nhật thông tin:', err);
//       toast.error('Không thể cập nhật thông tin!');
//     }
//   };

// //   return (
// //     <>
// //       {!showPersonalPage ? (
// //         <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
// //       ) : (
// //         <div className={cx('wrapper')}>
// //   <div className={cx('header')}>
// //     <h2>Hồ Sơ Của Tôi</h2>
// //     <h4>Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
// //   </div>

// //   <div className={cx('content')}>
// //     <div className={cx('form-info')}>
// //       {/* 🔹 Họ và tên */}
// //       <div className={cx('form-name')}>
// //         <div className={cx('form-group')}
// //         style={{width: '400px'}}>
// //           <label>Họ & Tên đệm</label>
// //           <input
// //             type="text"
// //             value={firstName || ''}
// //             onChange={(e) => setFirstName(e.target.value)}
// //             placeholder="Nhập họ và tên đệm"
// //           />
// //         </div>

// //         <div className={cx('form-group')}
// //         style={{marginLeft : '50px', width:'400px'}}>

// //           <label>Tên</label>
// //           <input
// //             type="text"
// //             value={lastName || ''}
// //             onChange={(e) => setLastName(e.target.value)}
// //             placeholder="Nhập tên"
// //           />
// //         </div>
// //       </div>

// //       {/* 🔹 Email */}
// //       <div className={cx('form-email')}>
// //         <label>Email</label>
// //         <p>{email || 'Chưa có Email'}</p>
// //       </div>

// //       {/* 🔹 Số điện thoại */}
// //       <div className={cx('form-phone')} >
// //         <label htmlFor="phone">Số điện thoại</label>
// //         <input
// //           type="text"
// //           id="phone"
// //           placeholder="Nhập số điện thoại"
// //           value={phone || ''}
// //           onChange={(e) => setPhone(e.target.value)}
// //         />
// //       </div>

// //       {/* 🔹 Ngày sinh */}
// //       <div className={cx('form-date')}>
// //         <label htmlFor="date">Ngày sinh</label>
// //         <input
// //           type="date"
// //           id="date"
// //           value={dateOfBirth || ''}
// //           onChange={(e) => setDateOfBirth(e.target.value)}
// //         />
// //       </div>

// //       {/* 🔹 Địa chỉ */}
// //       <div className={cx('form-address')}>
// //         <label>Thành phố / Tỉnh</label>
// //         <select
// //           value={selectedCityId || ''}
// //           onChange={(e) => handleCityChange(Number(e.target.value))}
// //         >
// //           <option value="">-- Chọn Thành phố / Tỉnh --</option>
// //           {cities.map((ct) => (
// //             <option key={ct.countryID} value={ct.countryID}>
// //               {ct.countryName}
// //             </option>
// //           ))}
// //         </select>

// //         <label>Quận / Huyện</label>
// //         <select
// //           value={selectedDistrictID || ''}
// //           onChange={(e) => {
// //             const id = Number(e.target.value);
// //             if (id > 0) {
// //               setSelectedDistrictID(id);
// //               const selectedObj = districts.find((d) => d.cityID === id);
// //               setSelectedDistrict(selectedObj?.cityName || '');
// //             }
// //           }}
// //           disabled={!districts.length}
// //         >
// //           <option value="">-- Chọn Quận / Huyện --</option>
// //           {districts.map((d) => (
// //             <option key={d.cityID} value={d.cityID}>
// //               {d.cityName}
// //             </option>
// //           ))}
// //         </select>

// //         <label>Xã / Phường</label>
// //         <input
// //           type="text"
// //           placeholder="Nhập Xã / Phường"
// //           value={subDistrict || ''}
// //           onChange={(e) => setSubDistrict(e.target.value)}
// //         />

// //         <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
// //         <label style={{ color: 'black', marginBottom: '10px',    display: 'contents'}}>Địa chỉ hiện tại</label>
// //         <input
// //           type="text"
// //           placeholder="Nhập địa chỉ chi tiết"
// //           value={currentAddress || ''}
// //           onChange={(e) => setCurrentAddress(e.target.value)}
// //           style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #ccc',height :' 45px' }}
// //         />
// //       </div>
// //       </div>

// //       {/* 🔹 Nếu là barber */}
// //       {isBarber && (
// //         <div className={cx('form-extra')}>
// //           <label>Chức vụ</label>
// //           <p>
// //             Thợ cắt tóc tại cửa hàng <strong>{storeName}</strong>
// //           </p>
// //         </div>
// //       )}

// //       {/* 🔹 Nút lưu */}
// //       {customerId && (
// //         <div className={cx('form-save')}>
// //           <Button lightBlue className={'btn-submit'} onClick={handleUpdateInfo}>
// //             Lưu Thông Tin
// //           </Button>
// //         </div>
// //       )}
// //     </div>
// //   </div>
// // </div>

// //       )}
// //     </>
// //   );
// return (
//     <>
//       {!showPersonalPage ? (
//         <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
//       ) : (
//         <div className={cx('personal-container')} style={{paddingLeft : '10px'}}>
//           {/* 🔹 Sidebar bên trái */}
         

//           {/* 🔹 Nội dung hồ sơ bên phải */}
//           <div className={cx('wrapper')}>
//             <div className={cx('header')}>
//               <h2>Hồ Sơ Của Tôi</h2>
//               <h4>Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
//             </div>

//             <div className={cx('content')}>
//               <div className={cx('form-info')}>
//                 {/* 🔹 Họ và tên */}
//                 <div className={cx('form-name')}>
//                   <div className={cx('form-group')} style={{ width: '400px' }}>
//                     <label>Họ & Tên đệm</label>
//                     <input
//                       type="text"
//                       value={firstName || ''}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       placeholder="Nhập họ và tên đệm"
//                     />
//                   </div>

//                   <div
//                     className={cx('form-group')}
//                     style={{ marginLeft: '50px', width: '400px' }}
//                   >
//                     <label>Tên</label>
//                     <input
//                       type="text"
//                       value={lastName || ''}
//                       onChange={(e) => setLastName(e.target.value)}
//                       placeholder="Nhập tên"
//                     />
//                   </div>
//                 </div>

//                 {/* 🔹 Email */}
//                 <div className={cx('form-email')}>
//                   <label>Email</label>
//                   <p>{email || 'Chưa có Email'}</p>
//                 </div>

//                 {/* 🔹 Số điện thoại */}
//                 <div className={cx('form-phone')}>
//                   <label htmlFor="phone">Số điện thoại</label>
//                   <input
//                     type="text"
//                     id="phone"
//                     placeholder="Nhập số điện thoại"
//                     value={phone || ''}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>

//                 {/* 🔹 Ngày sinh */}
//                 <div className={cx('form-date')}>
//                   <label htmlFor="date">Ngày sinh</label>
//                   <input
//                     type="date"
//                     id="date"
//                     value={dateOfBirth || ''}
//                     onChange={(e) => setDateOfBirth(e.target.value)}
//                   />
//                 </div>

//                 {/* 🔹 Địa chỉ */}
//                 <div className={cx('form-address')}>
//                   <label>Thành phố / Tỉnh</label>
//                   <select
//                     value={selectedCityId || ''}
//                     onChange={(e) => handleCityChange(Number(e.target.value))}
//                   >
//                     <option value="">-- Chọn Thành phố / Tỉnh --</option>
//                     {cities.map((ct) => (
//                       <option key={ct.countryID} value={ct.countryID}>
//                         {ct.countryName}
//                       </option>
//                     ))}
//                   </select>

//                   <label>Quận / Huyện</label>
//                   <select
//                     value={selectedDistrictID || ''}
//                     onChange={(e) => {
//                       const id = Number(e.target.value);
//                       if (id > 0) {
//                         setSelectedDistrictID(id);
//                         const selectedObj = districts.find(
//                           (d) => d.cityID === id
//                         );
//                         setSelectedDistrict(selectedObj?.cityName || '');
//                       }
//                     }}
//                     disabled={!districts.length}
//                   >
//                     <option value="">-- Chọn Quận / Huyện --</option>
//                     {districts.map((d) => (
//                       <option key={d.cityID} value={d.cityID}>
//                         {d.cityName}
//                       </option>
//                     ))}
//                   </select>

//                   <label>Xã / Phường</label>
//                   <input
//                     type="text"
//                     placeholder="Nhập Xã / Phường"
//                     value={subDistrict || ''}
//                     onChange={(e) => setSubDistrict(e.target.value)}
//                   />

//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       marginBottom: '16px',
//                     }}
//                   >
//                     <label
//                       style={{
//                         color: 'black',
//                         marginBottom: '10px',
//                         display: 'contents',
//                       }}
//                     >
//                       Địa chỉ hiện tại
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Nhập địa chỉ chi tiết"
//                       value={currentAddress || ''}
//                       onChange={(e) => setCurrentAddress(e.target.value)}
//                       style={{
//                         padding: '8px 10px',
//                         borderRadius: '6px',
//                         border: '1px solid #ccc',
//                         height: '45px',
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* 🔹 Nếu là barber */}
//                 {isBarber && (
//                   <div className={cx('form-extra')}>
//                     <label>Chức vụ</label>
//                     <p>
//                       Thợ cắt tóc tại cửa hàng <strong>{storeName}</strong>
//                     </p>
//                   </div>
//                 )}

//                 {/* 🔹 Nút lưu */}
//                 {customerId && (
//                   <div className={cx('form-save')}>
//                     <Button
//                       lightBlue
//                       className={'btn-submit'}
//                       onClick={handleUpdateInfo}
//                     >
//                       Lưu Thông Tin
//                     </Button>
//                   </div>  
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default PersonalPage;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';
// import SideSidebarProfile from "../../components/common/SidebarProfile/sideSidebarProfile";
// import styles from './PersonalPage.module.scss';
// import Button from '~/components/common/Button';
// import BookingWarning from '~/components/common/BookingWarning';

// import * as customerService from '~/services/customerService';
// import * as employeeService from '~/services/employeeServices';
// import * as storeService from '~/services/storeServices';
// import * as countryService from '~/services/ountryService';
// import * as cityService from '~/services/cityService';
// import * as addressService from '~/services/addressServices';

// const cx = classNames.bind(styles);

// function PersonalPage() {
//   const [userId, setUserId] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [storeName, setStoreName] = useState('');
//   const [isBarber, setIsBarber] = useState(false);
//   const [showPersonalPage, setPersonalPage] = useState(false);
//   const [selectedDistrictID, setSelectedDistrictID] = useState('');

//   // Địa chỉ
//   const [cities, setCities] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedCityId, setSelectedCityId] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [subDistrict, setSubDistrict] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');

//   // Kiểm tra token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         jwtDecode(token);
//         setPersonalPage(true);
//       } catch {
//         toast.error('Token không hợp lệ hoặc đã hết hạn!');
//         setPersonalPage(false);
//       }
//     } else {
//       toast.warning('Vui lòng đăng nhập để xem thông tin cá nhân!');
//       setPersonalPage(false);
//     }
//   }, []);

//   // Lấy dữ liệu user + danh sách tỉnh
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const currentUserId = decoded?.userID;
//         if (!currentUserId) return;
//         setUserId(currentUserId);

//         // Nhân viên
//         const employees = await employeeService.getEmployee();
//         const emp = employees?.find((e) => e.userID === currentUserId);
//         if (emp) {
//           setIsBarber(true);
//           const store = await storeService.getStoreById(emp.storeID);
//           setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');
//         }

//         // Khách hàng
//         const customers = await customerService.getCustomer();
//         const customer = customers?.find((c) => c.userID === currentUserId);
//         if (customer) {
//           setCustomerId(customer.customerID);
//           setFirstName(customer.firstName);
//           setLastName(customer.lastName);
//           setEmail(customer.email);
//           setPhone(customer.numberphone);
//           setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
//           setSelectedCityId(customer.cityID || '');
//         }

//         // Tỉnh/thành
//         const cityList = await countryService.getCountries();
//         if (Array.isArray(cityList)) setCities(cityList);
//         else setCities(cityList.data || []);

//         // Quận/huyện
//         if (customer?.cityID) {
//           const districtList = await cityService.getCitiesByCountry(customer.cityID);
//           if (Array.isArray(districtList)) setDistricts(districtList);
//           else setDistricts(districtList.data || []);
//         }
//       } catch (err) {
//         console.error('❌ Lỗi tải dữ liệu:', err);
//         toast.error('Không thể tải thông tin người dùng!');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCityChange = async (cityID) => {
//     setSelectedCityId(cityID);
//     setSelectedDistrict('');
//     if (cityID) {
//       try {
//         const res = await cityService.getCitiesByCountry(cityID);
//         if (Array.isArray(res)) setDistricts(res);
//         else setDistricts(res.data || []);
//       } catch (err) {
//         console.error('Lỗi khi lấy quận/huyện:', err);
//         setDistricts([]);
//       }
//     }
//   };

//   const handleUpdateInfo = async () => {
//     if (!selectedDistrictID || selectedDistrictID <= 0) {
//       toast.warning('Vui lòng chọn quận/huyện hợp lệ!');
//       return;
//     }
//     try {
//       if (!firstName.trim() || !lastName.trim()) {
//         toast.warning('Vui lòng nhập đầy đủ họ và tên!');
//         return;
//       }
//       if (!selectedCityId || !selectedDistrict || !subDistrict || !currentAddress) {
//         toast.warning('Vui lòng nhập đầy đủ thông tin địa chỉ!');
//         return;
//       }

//       await customerService.updateCustomer(
//         customerId,
//         firstName,
//         lastName,
//         undefined,
//         email,
//         phone,
//         dateOfBirth,
//         userId,
//         undefined,
//         selectedCityId
//       );

//       const addressData = {
//         currentAddress,
//         subDistrict,
//         district: selectedDistrict,
//         cityID: Number(selectedDistrictID),
//         userID: Number(userId),
//       };

//       const res = await addressService.createAddress(addressData);
//       if (res) toast.success('Cập nhật thông tin và địa chỉ thành công!');
//       else toast.error('Không thể lưu địa chỉ!');
//     } catch (err) {
//       console.error('❌ Lỗi khi cập nhật thông tin:', err);
//       toast.error('Không thể cập nhật thông tin!');
//     }
//   };

//   return (
//     <>
//       {!showPersonalPage ? (
//         <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
//       ) : (
//         <div className={cx('personal-container')}>
//           {/* Sidebar bên trái */}

//           {/* Nội dung hồ sơ */}
//           <div className={cx('wrapper')}>
//             <div className={cx('header')}>
//               <h2>Hồ Sơ Của Tôi</h2>
//               <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
//             </div>

//             <div className={cx('content')}>
//               {/* Section: Thông tin cá nhân */}
//               <div className={cx('section')}>
//                 <h3>Thông tin cá nhân</h3>
//                 <div className={cx('form-row')}>
//                   <div className={cx('form-group')}>
//                     <label>Họ & Tên đệm</label>
//                     <input
//                       type="text"
//                       value={firstName || ''}
//                       onChange={(e) => setFirstName(e.target.value)}
//                     />
//                   </div>
//                   <div className={cx('form-group')}>
//                     <label>Tên</label>
//                     <input
//                       type="text"
//                       value={lastName || ''}
//                       onChange={(e) => setLastName(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Email</label>
//                   <p>{email || 'Chưa có Email'}</p>
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Số điện thoại</label>
//                   <input
//                     type="text"
//                     value={phone || ''}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Ngày sinh</label>
//                   <input
//                     type="date"
//                     value={dateOfBirth || ''}
//                     onChange={(e) => setDateOfBirth(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Section: Địa chỉ */}
//               <div className={cx('section')}>
//                 <h3>Địa chỉ</h3>
//                 <div className={cx('form-group')}>
//                   <label>Thành phố / Tỉnh</label>
//                   <select
//                     value={selectedCityId || ''}
//                     onChange={(e) => handleCityChange(Number(e.target.value))}
//                   >
//                     <option value="">-- Chọn Thành phố / Tỉnh --</option>
//                     {cities.map((ct) => (
//                       <option key={ct.countryID} value={ct.countryID}>
//                         {ct.countryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Quận / Huyện</label>
//                   <select
//                     value={selectedDistrictID || ''}
//                     onChange={(e) => {
//                       const id = Number(e.target.value);
//                       if (id > 0) {
//                         setSelectedDistrictID(id);
//                         const selectedObj = districts.find((d) => d.cityID === id);
//                         setSelectedDistrict(selectedObj?.cityName || '');
//                       }
//                     }}
//                     disabled={!districts.length}
//                   >
//                     <option value="">-- Chọn Quận / Huyện --</option>
//                     {districts.map((d) => (
//                       <option key={d.cityID} value={d.cityID}>
//                         {d.cityName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Xã / Phường</label>
//                   <input
//                     type="text"
//                     value={subDistrict || ''}
//                     onChange={(e) => setSubDistrict(e.target.value)}
//                   />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Địa chỉ hiện tại</label>
//                   <input
//                     type="text"
//                     value={currentAddress || ''}
//                     onChange={(e) => setCurrentAddress(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Section: Barber */}
//               {isBarber && (
//                 <div className={cx('section')}>
//                   <h3>Thông tin thợ</h3>
//                   <p>
//                     Thợ cắt tóc tại cửa hàng <strong>{storeName}</strong>
//                   </p>
//                 </div>
//               )}

//               {/* Button lưu */}
//               {customerId && (
//                 <div className={cx('form-save')}>
//                   <Button lightBlue onClick={handleUpdateInfo}>
//                     Lưu Thông Tin
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default PersonalPage;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import { toast } from 'react-toastify';
// import SideSidebarProfile from '~/components/common/SidebarProfile/sideSidebarProfile';
// import styles from './PersonalPage.module.scss';
// import Button from '~/components/common/Button';
// import BookingWarning from '~/components/common/BookingWarning';

// import * as customerService from '~/services/customerService';
// import * as employeeService from '~/services/employeeServices';
// import * as storeService from '~/services/storeServices';
// import * as countryService from '~/services/ountryService';
// import * as cityService from '~/services/cityService';
// import * as addressService from '~/services/addressServices';
// import { updateUser } from '~/services/userServices'; // dùng hàm updateUser

// const cx = classNames.bind(styles);

// function PersonalPage() {
//   const [userId, setUserId] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [storeName, setStoreName] = useState('');
//   const [isBarber, setIsBarber] = useState(false);
//   const [showPersonalPage, setPersonalPage] = useState(false);
//   const [selectedDistrictID, setSelectedDistrictID] = useState('');

//   // Địa chỉ
//   const [cities, setCities] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedCityId, setSelectedCityId] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [subDistrict, setSubDistrict] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');

//   // Đổi mật khẩu
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // Kiểm tra token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         jwtDecode(token);
//         setPersonalPage(true);
//       } catch {
//         toast.error('Token không hợp lệ hoặc đã hết hạn!');
//         setPersonalPage(false);
//       }
//     } else {
//       toast.warning('Vui lòng đăng nhập để xem thông tin cá nhân!');
//       setPersonalPage(false);
//     }
//   }, []);

//   // Lấy dữ liệu user + danh sách tỉnh
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const currentUserId = decoded?.userID;
//         if (!currentUserId) return;
//         setUserId(currentUserId);

//         // Nhân viên
//         const employees = await employeeService.getEmployee();
//         const emp = employees?.find((e) => e.userID === currentUserId);
//         if (emp) {
//           setIsBarber(true);
//           const store = await storeService.getStoreById(emp.storeID);
//           setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');
//         }

//         // Khách hàng
//         const customers = await customerService.getCustomer();
//         const customer = customers?.find((c) => c.userID === currentUserId);
//         if (customer) {
//           setCustomerId(customer.customerID);
//           setFirstName(customer.firstName);
//           setLastName(customer.lastName);
//           setEmail(customer.email);
//           setPhone(customer.numberphone);
//           setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
//           setSelectedCityId(customer.cityID || '');
//         }

//         // Tỉnh/thành
//         const cityList = await countryService.getCountries();
//         if (Array.isArray(cityList)) setCities(cityList);
//         else setCities(cityList.data || []);

//         // Quận/huyện
//         if (customer?.cityID) {
//           const districtList = await cityService.getCitiesByCountry(customer.cityID);
//           if (Array.isArray(districtList)) setDistricts(districtList);
//           else setDistricts(districtList.data || []);
//         }
//       } catch (err) {
//         console.error('❌ Lỗi tải dữ liệu:', err);
//         toast.error('Không thể tải thông tin người dùng!');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCityChange = async (cityID) => {
//     setSelectedCityId(cityID);
//     setSelectedDistrict('');
//     if (cityID) {
//       try {
//         const res = await cityService.getCitiesByCountry(cityID);
//         if (Array.isArray(res)) setDistricts(res);
//         else setDistricts(res.data || []);
//       } catch (err) {
//         console.error('Lỗi khi lấy quận/huyện:', err);
//         setDistricts([]);
//       }
//     }
//   };

//   const handleUpdateInfo = async () => {
//     if (!selectedDistrictID || selectedDistrictID <= 0) {
//       toast.warning('Vui lòng chọn quận/huyện hợp lệ!');
//       return;
//     }
//     try {
//       if (!firstName.trim() || !lastName.trim()) {
//         toast.warning('Vui lòng nhập đầy đủ họ và tên!');
//         return;
//       }
//       if (!selectedCityId || !selectedDistrict || !subDistrict || !currentAddress) {
//         toast.warning('Vui lòng nhập đầy đủ thông tin địa chỉ!');
//         return;
//       }

//       await customerService.updateCustomer(
//         customerId,
//         firstName,
//         lastName,
//         undefined,
//         email,
//         phone,
//         dateOfBirth,
//         userId,
//         undefined,
//         selectedCityId
//       );

//       const addressData = {
//         currentAddress,
//         subDistrict,
//         district: selectedDistrict,
//         cityID: Number(selectedDistrictID),
//         userID: Number(userId),
//       };

//       const res = await addressService.createAddress(addressData);
//       if (res) toast.success('Cập nhật thông tin và địa chỉ thành công!');
//       else toast.error('Không thể lưu địa chỉ!');
//     } catch (err) {
//       console.error('❌ Lỗi khi cập nhật thông tin:', err);
//       toast.error('Không thể cập nhật thông tin!');
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.warning('Vui lòng nhập đầy đủ thông tin!');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       toast.warning('Mật khẩu mới và xác nhận mật khẩu không khớp!');
//       return;
//     }

//     try {
//       const res = await updateUser(userId, undefined, newPassword, undefined);
//       if (res) {
//         toast.success('Đổi mật khẩu thành công!');
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         toast.error('Không thể đổi mật khẩu!');
//       }
//     } catch (err) {
//       console.error('❌ Lỗi đổi mật khẩu:', err);
//       toast.error('Không thể đổi mật khẩu!');
//     }
//   };

//   return (
//     <>
//       {!showPersonalPage ? (
//         <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
//       ) : (
//         <div className={cx('personal-container')}>
//           {/* Sidebar bên trái */}

//           {/* Nội dung hồ sơ */}
//           <div className={cx('wrapper')}>
//             <div className={cx('header')}>
//               <h2>Hồ Sơ Của Tôi</h2>
//               <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
//             </div>

//             <div className={cx('content')}>
//               {/* Section: Thông tin cá nhân */}
//               <div className={cx('section')}>
//                 <h3>Thông tin cá nhân</h3>
//                 <div className={cx('form-row')}>
//                   <div className={cx('form-group')}>
//                     <label>Họ & Tên đệm</label>
//                     <input
//                       type="text"
//                       value={firstName || ''}
//                       onChange={(e) => setFirstName(e.target.value)}
//                     />
//                   </div>
//                   <div className={cx('form-group')}>
//                     <label>Tên</label>
//                     <input
//                       type="text"
//                       value={lastName || ''}
//                       onChange={(e) => setLastName(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Email</label>
//                   <p>{email || 'Chưa có Email'}</p>
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Số điện thoại</label>
//                   <input
//                     type="text"
//                     value={phone || ''}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Ngày sinh</label>
//                   <input
//                     type="date"
//                     value={dateOfBirth || ''}
//                     onChange={(e) => setDateOfBirth(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Section: Địa chỉ */}
//               <div className={cx('section')}>
//                 <h3>Địa chỉ</h3>
//                 <div className={cx('form-group')}>
//                   <label>Thành phố / Tỉnh</label>
//                   <select
//                     value={selectedCityId || ''}
//                     onChange={(e) => handleCityChange(Number(e.target.value))}
//                   >
//                     <option value="">-- Chọn Thành phố / Tỉnh --</option>
//                     {cities.map((ct) => (
//                       <option key={ct.countryID} value={ct.countryID}>
//                         {ct.countryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Quận / Huyện</label>
//                   <select
//                     value={selectedDistrictID || ''}
//                     onChange={(e) => {
//                       const id = Number(e.target.value);
//                       if (id > 0) {
//                         setSelectedDistrictID(id);
//                         const selectedObj = districts.find((d) => d.cityID === id);
//                         setSelectedDistrict(selectedObj?.cityName || '');
//                       }
//                     }}
//                     disabled={!districts.length}
//                   >
//                     <option value="">-- Chọn Quận / Huyện --</option>
//                     {districts.map((d) => (
//                       <option key={d.cityID} value={d.cityID}>
//                         {d.cityName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Xã / Phường</label>
//                   <input
//                     type="text"
//                     value={subDistrict || ''}
//                     onChange={(e) => setSubDistrict(e.target.value)}
//                   />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Địa chỉ hiện tại</label>
//                   <input
//                     type="text"
//                     value={currentAddress || ''}
//                     onChange={(e) => setCurrentAddress(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Section: Barber */}
//               {isBarber && (
//                 <div className={cx('section')}>
//                   <h3>Thông tin thợ</h3>
//                   <p>
//                     Thợ cắt tóc tại cửa hàng <strong>{storeName}</strong>
//                   </p>
//                 </div>
//               )}

//               {/* Section: Đổi mật khẩu */}
//               <div className={cx('section')}>
//                 <h3>Đổi mật khẩu</h3>
//                 <div className={cx('form-group')}>
//                   <label>Mật khẩu hiện tại</label>
//                   <input
//                     type="password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                     placeholder="Nhập mật khẩu hiện tại"
//                   />
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Mật khẩu mới</label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="Nhập mật khẩu mới"
//                   />
//                 </div>
//                 <div className={cx('form-group')}>
//                   <label>Xác nhận mật khẩu mới</label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Nhập lại mật khẩu mới"
//                   />
//                 </div>
//                 <div className={cx('form-save')}>
//                   <Button lightBlue onClick={handleChangePassword}>
//                     Cập nhật mật khẩu
//                   </Button>
//                 </div>
//               </div>

//               {/* Button lưu thông tin cá nhân */}
//               {customerId && (
//                 <div className={cx('form-save')}>
//                   <Button lightBlue onClick={handleUpdateInfo}>
//                     Lưu Thông Tin
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default PersonalPage;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';
// import SideSidebarProfile from '~/components/common/SidebarProfile/sideSidebarProfile';
// import styles from './PersonalPage.module.scss';
// import Button from '~/components/common/Button';
// import BookingWarning from '~/components/common/BookingWarning';

// import * as customerService from '~/services/customerService';
// import * as employeeService from '~/services/employeeServices';
// import * as storeService from '~/services/storeServices';
// import * as countryService from '~/services/ountryService';
// import * as cityService from '~/services/cityService';
// import * as addressService from '~/services/addressServices';
// import * as bookingServices from '~/services/bookServices';
// import { updateUser } from '~/services/userServices';

// const cx = classNames.bind(styles);

// function PersonalPage() {
//   const [userId, setUserId] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [employeeId, setEmployeeId] = useState('');             // ⭐ THÊM
//   const [employeeBookings, setEmployeeBookings] = useState([]); // ⭐ THÊM

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [storeName, setStoreName] = useState('');
//   const [isBarber, setIsBarber] = useState(false);
//   const [showPersonalPage, setPersonalPage] = useState(false);
//   const [selectedDistrictID, setSelectedDistrictID] = useState('');

//   const [cities, setCities] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedCityId, setSelectedCityId] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [subDistrict, setSubDistrict] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');

//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // Kiểm tra token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         jwtDecode(token);
//         setPersonalPage(true);
//       } catch {
//         toast.error('Token không hợp lệ hoặc đã hết hạn!');
//         setPersonalPage(false);
//       }
//     } else {
//       toast.warning('Vui lòng đăng nhập để xem thông tin cá nhân!');
//       setPersonalPage(false);
//     }
//   }, []);

//   // Lấy dữ liệu user
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const currentUserId = decoded?.userID;
//         if (!currentUserId) return;
//         setUserId(currentUserId);

//         // Nhân viên
//         const employees = await employeeService.getEmployee();
//         const emp = employees?.find((e) => e.userID === currentUserId);
//         if (emp) {
//           setIsBarber(true);
//           setEmployeeId(emp.employeeID); // ⭐ LẤY EMPLOYEE ID

//           const store = await storeService.getStoreById(emp.storeID);
//           setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');
//         }

//         // Khách hàng
//         const customers = await customerService.getCustomer();
//         const customer = customers?.find((c) => c.userID === currentUserId);
//         if (customer) {
//           setCustomerId(customer.customerID);
//           setFirstName(customer.firstName);
//           setLastName(customer.lastName);
//           setEmail(customer.email);
//           setPhone(customer.numberphone);
//           setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
//           setSelectedCityId(customer.cityID || '');
//         }

//         // Load tỉnh
//         const cityList = await countryService.getCountries();
//         setCities(Array.isArray(cityList) ? cityList : cityList.data);

//         // Load quận
//         if (customer?.cityID) {
//           const districtList = await cityService.getCitiesByCountry(customer.cityID);
//           setDistricts(Array.isArray(districtList) ? districtList : districtList.data);
//         }
//       } catch (err) {
//         console.error('❌ Lỗi tải dữ liệu:', err);
//         toast.error('Không thể tải thông tin người dùng!');
//       }
//     };
//     fetchData();
//   }, []);

//   // ⭐⭐ LẤY BOOKING CỦA EMPLOYEE
//   useEffect(() => {
//     const fetchBookings = async () => {
//     if (!employeeId) return;

//     try {
//       const res = await bookingServices.getBook();
//       const allBookings = res?.data || [];

//       console.log("🔥 TẤT CẢ BOOKING:", allBookings);
//       console.log("🔥 employeeId của thợ:", employeeId);

//       const filtered = allBookings.filter(bk =>
//         bk.employeID === employeeId ||  // backend hiện tại
//         bk.employeeId === employeeId || // nếu backend chỉnh đúng chuẩn
//         bk.employeeID === employeeId
//       );

//       console.log("🔥 BOOKING SAU KHI LỌC:", filtered);
//       setEmployeeBookings(filtered);
//     } catch (err) {
//       console.error("❌ Lỗi load booking:", err);
//     }
//   };  

//     fetchBookings();
//   }, [employeeId]);

//   const handleCityChange = async (cityID) => {
//     setSelectedCityId(cityID);
//     setSelectedDistrict('');
//     if (cityID) {
//       try {
//         const res = await cityService.getCitiesByCountry(cityID);
//         setDistricts(Array.isArray(res) ? res : res.data);
//       } catch {
//         setDistricts([]);
//       }
//     }
//   };

//   const handleUpdateInfo = async () => {
//     if (!selectedDistrictID || selectedDistrictID <= 0) {
//       toast.warning('Vui lòng chọn quận/huyện hợp lệ!');
//       return;
//     }

//     try {
//       await customerService.updateCustomer(
//         customerId,
//         firstName,
//         lastName,
//         undefined,
//         email,
//         phone,
//         dateOfBirth,
//         userId,
//         undefined,
//         selectedCityId
//       );

//       const addressData = {
//         currentAddress,
//         subDistrict,
//         district: selectedDistrict,
//         cityID: Number(selectedDistrictID),
//         userID: Number(userId),
//       };

//       const res = await addressService.createAddress(addressData);
//       if (res) toast.success('Cập nhật thông tin thành công!');
//     } catch {
//       toast.error('Không thể cập nhật thông tin!');
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword)
//       return toast.warning('Vui lòng nhập đầy đủ!');

//     if (newPassword !== confirmPassword)
//       return toast.warning('Mật khẩu xác nhận không khớp!');

//     try {
//       const res = await updateUser(userId, undefined, newPassword, undefined);
//       if (res) toast.success('Đổi mật khẩu thành công!');
//     } catch {
//       toast.error('Không thể đổi mật khẩu!');
//     }
//   };

//   return (
//     <>
//       {!showPersonalPage ? (
//         <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
//       ) : (
//         <div className={cx('personal-container')}>
//           <div className={cx('wrapper')}>
//             <div className={cx('header')}>
//               <h2>Hồ Sơ Của Tôi</h2>
//               <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
//             </div>

//             <div className={cx('content')}>
//               {/* THÔNG TIN NHÂN VIÊN */}
//               {isBarber && (
//                 <div className={cx('section')}>
//                   <h3>Thông tin thợ</h3>
//                   <p>
//                     Thợ tại cửa hàng <strong>{storeName}</strong>
//                   </p>

//                   <h4 style={{ marginTop: '15px' }}>Danh sách lịch hẹn:</h4>

//                   {employeeBookings.length === 0 ? (
//                     <p>Không có booking nào.</p>
//                   ) : (
//                     <ul className={cx('booking-list')}>
//                       {employeeBookings.map((bk) => (
//                         <li key={bk.bookingID}>
//                           <strong>Mã:</strong> {bk.bookingID} —{' '}
//                           <strong>Ngày:</strong> {bk.date} —{' '}
//                           <strong>Giờ:</strong> {bk.time}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}

//               {/* Thông tin cá nhân */}
//               <div className={cx('section')}>
//                 <h3>Thông tin cá nhân</h3>
//                 <div className={cx('form-row')}>
//                   <div className={cx('form-group')}>
//                     <label>Họ & Tên đệm</label>
//                     <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                   </div>

//                   <div className={cx('form-group')}>
//                     <label>Tên</label>
//                     <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                   </div>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Email</label>
//                   <p>{email}</p>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Số điện thoại</label>
//                   <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Ngày sinh</label>
//                   <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//                 </div>
//               </div>

//               {/* Địa chỉ */}
//               <div className={cx('section')}>
//                 <h3>Địa chỉ</h3>

//                 <div className={cx('form-group')}>
//                   <label>Thành phố / Tỉnh</label>
//                   <select value={selectedCityId} onChange={(e) => handleCityChange(Number(e.target.value))}>
//                     <option value="">-- Chọn Thành phố / Tỉnh --</option>
//                     {cities.map((ct) => (
//                       <option key={ct.countryID} value={ct.countryID}>
//                         {ct.countryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Quận / Huyện</label>
//                   <select
//                     value={selectedDistrictID}
//                     onChange={(e) => {
//                       const id = Number(e.target.value);
//                       setSelectedDistrictID(id);
//                       const dist = districts.find((d) => d.cityID === id);
//                       setSelectedDistrict(dist?.cityName || '');
//                     }}
//                   >
//                     <option value="">-- Chọn Quận / Huyện --</option>
//                     {districts.map((d) => (
//                       <option key={d.cityID} value={d.cityID}>
//                         {d.cityName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Xã / Phường</label>
//                   <input type="text" value={subDistrict} onChange={(e) => setSubDistrict(e.target.value)} />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Địa chỉ hiện tại</label>
//                   <input type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
//                 </div>
//               </div>

//               {/* Đổi mật khẩu */}
//               <div className={cx('section')}>
//                 <h3>Đổi mật khẩu</h3>

//                 <div className={cx('form-group')}>
//                   <label>Mật khẩu hiện tại</label>
//                   <input
//                     type="password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Mật khẩu mới</label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Xác nhận mật khẩu mới</label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className={cx('form-save')}>
//                   <Button lightBlue onClick={handleChangePassword}>
//                     Cập nhật mật khẩu
//                   </Button>
//                 </div>
//               </div>

//               {/* Nút lưu */}
//               {customerId && (
//                 <div className={cx('form-save')}>
//                   <Button lightBlue onClick={handleUpdateInfo}>
//                     Lưu Thông Tin
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default PersonalPage;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';
// import SideSidebarProfile from '~/components/common/SidebarProfile/sideSidebarProfile';
// import styles from './PersonalPage.module.scss';
// import Button from '~/components/common/Button';
// import BookingWarning from '~/components/common/BookingWarning';

// import * as customerService from '~/services/customerService';
// import * as employeeService from '~/services/employeeServices';
// import * as storeService from '~/services/storeServices';
// import * as countryService from '~/services/ountryService';
// import * as cityService from '~/services/cityService';
// import * as addressService from '~/services/addressServices';
// import * as bookingServices from '~/services/bookServices';
// import { updateUser } from '~/services/userServices';

// const cx = classNames.bind(styles);

// function PersonalPage() {
//   const [userId, setUserId] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [employeeBookings, setEmployeeBookings] = useState([]);

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [storeName, setStoreName] = useState('');
//   const [isBarber, setIsBarber] = useState(false);
//   const [showPersonalPage, setPersonalPage] = useState(false);
//   const [selectedDistrictID, setSelectedDistrictID] = useState('');

//   const [cities, setCities] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedCityId, setSelectedCityId] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [subDistrict, setSubDistrict] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');

//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // Kiểm tra token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         jwtDecode(token);
//         setPersonalPage(true);
//       } catch {
//         toast.error('Token không hợp lệ hoặc đã hết hạn!');
//         setPersonalPage(false);
//       }
//     } else {
//       toast.warning('Vui lòng đăng nhập để xem thông tin cá nhân!');
//       setPersonalPage(false);
//     }
//   }, []);

//   // Lấy dữ liệu user + tỉnh/quận
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const currentUserId = decoded?.userID;
//         if (!currentUserId) return;
//         setUserId(currentUserId);

//         // Nhân viên
//         const employees = await employeeService.getEmployee();
//         const emp = employees?.find((e) => e.userID === currentUserId);
//         if (emp) {
//           setIsBarber(true);
//           setEmployeeId(emp.employeeID); // Lấy employeeID

//           const store = await storeService.getStoreById(emp.storeID);
//           setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');
//         }

//         // Khách hàng
//         const customers = await customerService.getCustomer();
//         const customer = customers?.find((c) => c.userID === currentUserId);
//         if (customer) {
//           setCustomerId(customer.customerID);
//           setFirstName(customer.firstName);
//           setLastName(customer.lastName);
//           setEmail(customer.email);
//           setPhone(customer.numberphone);
//           setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
//           setSelectedCityId(customer.cityID || '');
//         }

//         // Tỉnh/thành
//         const cityList = await countryService.getCountries();
//         setCities(Array.isArray(cityList) ? cityList : cityList.data);

//         // Quận/huyện
//         if (customer?.cityID) {
//           const districtList = await cityService.getCitiesByCountry(customer.cityID);
//           setDistricts(Array.isArray(districtList) ? districtList : districtList.data);
//         }
//       } catch (err) {
//         console.error('❌ Lỗi tải dữ liệu:', err);
//         toast.error('Không thể tải thông tin người dùng!');
//       }
//     };
//     fetchData();
//   }, []);

//   // Lấy booking của employee
//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!employeeId) return;

//       try {
//         console.log("🔥 Gọi API booking với employeeId:", employeeId);
//         const res = await bookingServices.getBook(); // đảm bảo tên đúng
//         const allBookings = res?.data || res || [];
//         const filtered = allBookings.filter(
//           (bk) =>
//             bk.employeID === employeeId ||
//             bk.employeeID === employeeId ||
//             bk.employeeId === employeeId
//         );
//         setEmployeeBookings(filtered);
//         console.log("🔥 Booking sau khi lọc:", filtered);
//       } catch (err) {
//         console.error('❌ Lỗi load booking:', err);
//       }
//     };

//     fetchBookings();
//   }, [employeeId]);

//   const handleCityChange = async (cityID) => {
//     setSelectedCityId(cityID);
//     setSelectedDistrict('');
//     if (cityID) {
//       try {
//         const res = await cityService.getCitiesByCountry(cityID);
//         setDistricts(Array.isArray(res) ? res : res.data);
//       } catch {
//         setDistricts([]);
//       }
//     }
//   };

//   const handleUpdateInfo = async () => {
//     if (!selectedDistrictID || selectedDistrictID <= 0) {
//       toast.warning('Vui lòng chọn quận/huyện hợp lệ!');
//       return;
//     }

//     try {
//       await customerService.updateCustomer(
//         customerId,
//         firstName,
//         lastName,
//         undefined,
//         email,
//         phone,
//         dateOfBirth,
//         userId,
//         undefined,
//         selectedCityId
//       );

//       const addressData = {
//         currentAddress,
//         subDistrict,
//         district: selectedDistrict,
//         cityID: Number(selectedDistrictID),
//         userID: Number(userId),
//       };

//       const res = await addressService.createAddress(addressData);
//       if (res) toast.success('Cập nhật thông tin thành công!');
//     } catch {
//       toast.error('Không thể cập nhật thông tin!');
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword)
//       return toast.warning('Vui lòng nhập đầy đủ!');

//     if (newPassword !== confirmPassword)
//       return toast.warning('Mật khẩu xác nhận không khớp!');

//     try {
//       const res = await updateUser(userId, undefined, newPassword, undefined);
//       if (res) toast.success('Đổi mật khẩu thành công!');
//     } catch {
//       toast.error('Không thể đổi mật khẩu!');
//     }
//   };

//   return (
//     <>
//       {!showPersonalPage ? (
//         <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
//       ) : (
//         <div className={cx('personal-container')}>
//           <div className={cx('wrapper')}>
//             <div className={cx('header')}>
//               <h2>Hồ Sơ Của Tôi</h2>
//               <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
//             </div>

//             <div className={cx('content')}>
//               {/* THÔNG TIN NHÂN VIÊN */}
//               {isBarber && (
//                 <div className={cx('section')}>
//                   <h3>Thông tin thợ</h3>
//                   <p>
//                     Thợ tại cửa hàng <strong>{storeName}</strong>
//                   </p>

//                   <h4 style={{ marginTop: '15px' }}>Danh sách lịch hẹn:</h4>

//                   {employeeBookings.length === 0 ? (
//                     <p>Không có booking nào.</p>
//                   ) : (
//                     <ul className={cx('booking-list')}>
//                       {employeeBookings.map((bk) => (
//                         <li key={bk.bookingID}>
//                           <strong>Mã:</strong> {bk.bookingID} —{' '}
//                           <strong>Ngày:</strong> {bk.startDate || bk.date} —{' '}
//                           <strong>Giờ:</strong> {bk.startTime || bk.time}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}

//               {/* Thông tin cá nhân */}
//               <div className={cx('section')}>
//                 <h3>Thông tin cá nhân</h3>
//                 <div className={cx('form-row')}>
//                   <div className={cx('form-group')}>
//                     <label>Họ & Tên đệm</label>
//                     <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                   </div>

//                   <div className={cx('form-group')}>
//                     <label>Tên</label>
//                     <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                   </div>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Email</label>
//                   <p>{email}</p>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Số điện thoại</label>
//                   <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Ngày sinh</label>
//                   <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//                 </div>
//               </div>

//               {/* Địa chỉ */}
//               <div className={cx('section')}>
//                 <h3>Địa chỉ</h3>

//                 <div className={cx('form-group')}>
//                   <label>Thành phố / Tỉnh</label>
//                   <select value={selectedCityId} onChange={(e) => handleCityChange(Number(e.target.value))}>
//                     <option value="">-- Chọn Thành phố / Tỉnh --</option>
//                     {cities.map((ct) => (
//                       <option key={ct.countryID} value={ct.countryID}>
//                         {ct.countryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Quận / Huyện</label>
//                   <select
//                     value={selectedDistrictID}
//                     onChange={(e) => {
//                       const id = Number(e.target.value);
//                       setSelectedDistrictID(id);
//                       const dist = districts.find((d) => d.cityID === id);
//                       setSelectedDistrict(dist?.cityName || '');
//                     }}
//                   >
//                     <option value="">-- Chọn Quận / Huyện --</option>
//                     {districts.map((d) => (
//                       <option key={d.cityID} value={d.cityID}>
//                         {d.cityName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Xã / Phường</label>
//                   <input type="text" value={subDistrict} onChange={(e) => setSubDistrict(e.target.value)} />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Địa chỉ hiện tại</label>
//                   <input type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
//                 </div>
//               </div>

//               {/* Đổi mật khẩu */}
//               <div className={cx('section')}>
//                 <h3>Đổi mật khẩu</h3>

//                 <div className={cx('form-group')}>
//                   <label>Mật khẩu hiện tại</label>
//                   <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Mật khẩu mới</label>
//                   <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//                 </div>

//                 <div className={cx('form-group')}>
//                   <label>Xác nhận mật khẩu mới</label>
//                   <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//                 </div>

//                 <div className={cx('form-save')}>
//                   <Button lightBlue onClick={handleChangePassword}>Cập nhật mật khẩu</Button>
//                 </div>
//               </div>

//               {/* Nút lưu thông tin cá nhân */}
//               {customerId && (
//                 <div className={cx('form-save')}>
//                   <Button lightBlue onClick={handleUpdateInfo}>Lưu Thông Tin</Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default PersonalPage;
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import SideSidebarProfile from '~/components/common/SidebarProfile/sideSidebarProfile';
import styles from './PersonalPage.module.scss';
import Button from '~/components/common/Button';
import BookingWarning from '~/components/common/BookingWarning';

import * as customerService from '~/services/customerService';
import * as employeeService from '~/services/employeeServices';
import * as storeService from '~/services/storeServices';
import * as countryService from '~/services/ountryService';
import * as cityService from '~/services/cityService';
import * as addressService from '~/services/addressServices';
import * as bookingServices from '~/services/bookServices';
import { updateUser } from '~/services/userServices';
import * as serviceService from '~/services/serviceServices';

const cx = classNames.bind(styles);

function PersonalPage() {
  const [userId, setUserId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeBookings, setEmployeeBookings] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isBarber, setIsBarber] = useState(false);
  const [showPersonalPage, setPersonalPage] = useState(false);
  const [selectedDistrictID, setSelectedDistrictID] = useState('');

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleOpenBookingModal = () => setShowBookingModal(true);
  const handleCloseBookingModal = () => setShowBookingModal(false);

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwtDecode(token);
        setPersonalPage(true);
      } catch {
        toast.error('Token không hợp lệ hoặc đã hết hạn!');
        setPersonalPage(false);
      }
    } else {
      toast.warning('Vui lòng đăng nhập để xem thông tin cá nhân!');
      setPersonalPage(false);
    }
  }, []);
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decoded = jwtDecode(token);
      const currentUserId = decoded?.userID;
      if (!currentUserId) return;
      setUserId(currentUserId);

      // --- NHÂN VIÊN ---
      const employees = await employeeService.getEmployee();
      const emp = employees?.find((e) => e.userID === currentUserId);

      if (emp) {
        setIsBarber(true);
        setEmployeeId(emp.employeeID);

        // Lấy thông tin cửa hàng
        const store = await storeService.getStoreById(emp.storeID);
        setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');

        // Lấy tất cả booking
        const res = await bookingServices.getBook();
        const allBookings = res?.data || res || [];

        // Lọc booking của nhân viên
        const filteredByEmployee = allBookings.filter(
          (bk) =>
            bk.employeID === emp.employeeID ||
            bk.employeeID === emp.employeeID ||
            bk.employeeId === emp.employeeID
        );

        // Lọc chỉ booking tương lai
        const today = new Date();
        const futureBookings = filteredByEmployee.filter((bk) => {
          const bookingDate = new Date(bk.startDate || bk.date);
          return bookingDate >= today;
        });

        // Map từng booking với tên dịch vụ
        const bookingsWithService = await Promise.all(
          futureBookings.map(async (bk) => {
            const serviceId = bk.serviceID || bk.serID;
            let serviceName = '-';
            if (serviceId) {
              try {
                const service = await serviceService.getServiceById(serviceId);
                serviceName = service?.serName  || '-';
              } catch (err) {
                console.warn('Không lấy được service', serviceId, err);
              }
            }
            return { ...bk, serviceName };
          })
        );

        setEmployeeBookings(bookingsWithService);
      }

      // --- KHÁCH HÀNG ---
      const customers = await customerService.getCustomer();
      const customer = customers?.find((c) => c.userID === currentUserId);

      if (customer) {
        setCustomerId(customer.customerID);
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setEmail(customer.email);
        setPhone(customer.numberphone);
        setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
        setSelectedCityId(customer.cityID || '');
      }

      // --- TỈNH/THÀNH ---
      const cityList = await countryService.getCountries();
      setCities(Array.isArray(cityList) ? cityList : cityList.data);

      // --- QUẬN/HUYỆN ---
      if (customer?.cityID) {
        const districtList = await cityService.getCitiesByCountry(customer.cityID);
        setDistricts(Array.isArray(districtList) ? districtList : districtList.data);
      }
    } catch (err) {
      console.error('❌ Lỗi tải dữ liệu:', err);
      toast.error('Không thể tải thông tin người dùng!');
    }
  };

  fetchData();
}, []);

  // // Lấy dữ liệu user + tỉnh/quận + booking
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) return;

  //       const decoded = jwtDecode(token);
  //       const currentUserId = decoded?.userID;
  //       if (!currentUserId) return;
  //       setUserId(currentUserId);

  //       // Nhân viên
  //       const employees = await employeeService.getEmployee();
  //       const emp = employees?.find((e) => e.userID === currentUserId);
  //       if (emp) {
  //         setIsBarber(true);
  //         setEmployeeId(emp.employeeID);

  //         const store = await storeService.getStoreById(emp.storeID);
  //         setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');

  //         // Lấy booking của employee
  //         // Lấy booking của employee
  //         const res = await bookingServices.getBook();
  //         const allBookings = res?.data || res || [];

  //         // Lọc booking của employee
  //         const filteredByEmployee = allBookings.filter(
  //           (bk) =>
  //             bk.employeID === emp.employeeID ||
  //             bk.employeeID === emp.employeeID ||
  //             bk.employeeId === emp.employeeID
  //         );

  //         // Lọc chỉ các booking sau ngày hiện tại
  //         const today = new Date();
  //         const futureBookings = filteredByEmployee.filter((bk) => {
  //           const bookingDate = new Date(bk.startDate || bk.date);
  //           return bookingDate >= today;
  //         });

  //         setEmployeeBookings(futureBookings);
  //       }

  //       // Khách hàng
  //       const customers = await customerService.getCustomer();
  //       const customer = customers?.find((c) => c.userID === currentUserId);
  //       if (customer) {
  //         setCustomerId(customer.customerID);
  //         setFirstName(customer.firstName);
  //         setLastName(customer.lastName);
  //         setEmail(customer.email);
  //         setPhone(customer.numberphone);
  //         setDateOfBirth(customer.dateOfBirth?.slice(0, 10));
  //         setSelectedCityId(customer.cityID || '');
  //       }

  //       // Tỉnh/thành
  //       const cityList = await countryService.getCountries();
  //       setCities(Array.isArray(cityList) ? cityList : cityList.data);

  //       // Quận/huyện
  //       if (customer?.cityID) {
  //         const districtList = await cityService.getCitiesByCountry(customer.cityID);
  //         setDistricts(Array.isArray(districtList) ? districtList : districtList.data);
  //       }
  //     } catch (err) {
  //       console.error('❌ Lỗi tải dữ liệu:', err);
  //       toast.error('Không thể tải thông tin người dùng!');
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleCityChange = async (cityID) => {
    setSelectedCityId(cityID);
    setSelectedDistrict('');
    if (cityID) {
      try {
        const res = await cityService.getCitiesByCountry(cityID);
        setDistricts(Array.isArray(res) ? res : res.data);
      } catch {
        setDistricts([]);
      }
    }
  };

  const handleUpdateInfo = async () => {
    if (!selectedDistrictID || selectedDistrictID <= 0) {
      toast.warning('Vui lòng chọn quận/huyện hợp lệ!');
      return;
    }

    try {
      await customerService.updateCustomer(
        customerId,
        firstName,
        lastName,
        undefined,
        email,
        phone,
        dateOfBirth,
        userId,
        undefined,
        selectedCityId
      );

      const addressData = {
        currentAddress,
        subDistrict,
        district: selectedDistrict,
        cityID: Number(selectedDistrictID),
        userID: Number(userId),
      };

      const res = await addressService.createAddress(addressData);
      if (res) toast.success('Cập nhật thông tin thành công!');
    } catch {
      toast.error('Không thể cập nhật thông tin!');
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return toast.warning('Vui lòng nhập đầy đủ!');

    if (newPassword !== confirmPassword)
      return toast.warning('Mật khẩu xác nhận không khớp!');

    try {
      const res = await updateUser(userId, undefined, newPassword, undefined);
      if (res) toast.success('Đổi mật khẩu thành công!');
    } catch {
      toast.error('Không thể đổi mật khẩu!');
    }
  };

  return (
    <>
      {!showPersonalPage ? (
        <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
      ) : (
        <div className={cx('personal-container')}>
          <div className={cx('wrapper')}>
            <div className={cx('header')}>
              <h2>Hồ Sơ Của Tôi</h2>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>

            <div className={cx('content')}>
              {/* THÔNG TIN NHÂN VIÊN */}
              {isBarber && (
                <div className={cx('section')}>
                  <h3>Thông tin thợ</h3>
                  <p>Thợ tại cửa hàng <strong>{storeName}</strong></p>

                  <div style={{ marginTop: '10px' }}>
                    <Button lightBlue onClick={handleOpenBookingModal}>
                      Xem lịch hẹn
                    </Button>
                  </div>
                </div>
              )}

              {/* Thông tin cá nhân */}
              <div className={cx('section')}>
                <h3>Thông tin cá nhân</h3>
                <div className={cx('form-row')}>
                  <div className={cx('form-group')}>
                    <label>Họ & Tên đệm</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>

                  <div className={cx('form-group')}>
                    <label>Tên</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className={cx('form-group')}>
                  <label>Email</label>
                  <p>{email}</p>
                </div>

                <div className={cx('form-group')}>
                  <label>Số điện thoại</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className={cx('form-group')}>
                  <label>Ngày sinh</label>
                  <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
              </div>

              {/* Địa chỉ */}
              <div className={cx('section')}>
                <h3>Địa chỉ</h3>

                <div className={cx('form-group')}>
                  <label>Thành phố / Tỉnh</label>
                  <select value={selectedCityId} onChange={(e) => handleCityChange(Number(e.target.value))}>
                    <option value="">-- Chọn Thành phố / Tỉnh --</option>
                    {cities.map((ct) => (
                      <option key={ct.countryID} value={ct.countryID}>
                        {ct.countryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={cx('form-group')}>
                  <label>Quận / Huyện</label>
                  <select
                    value={selectedDistrictID}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      setSelectedDistrictID(id);
                      const dist = districts.find((d) => d.cityID === id);
                      setSelectedDistrict(dist?.cityName || '');
                    }}
                  >
                    <option value="">-- Chọn Quận / Huyện --</option>
                    {districts.map((d) => (
                      <option key={d.cityID} value={d.cityID}>
                        {d.cityName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={cx('form-group')}>
                  <label>Xã / Phường</label>
                  <input type="text" value={subDistrict} onChange={(e) => setSubDistrict(e.target.value)} />
                </div>

                <div className={cx('form-group')}>
                  <label>Địa chỉ hiện tại</label>
                  <input type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
                </div>
                {/* Nút lưu thông tin cá nhân */}
              {customerId && (
                <div className={cx('form-save')}>
                  <Button lightBlue onClick={handleUpdateInfo}>Lưu Thông Tin</Button>
                </div>
              )}
              </div>

              {/* Đổi mật khẩu */}
              <div className={cx('section')}>
                <h3>Đổi mật khẩu</h3>

                <div className={cx('form-group')}>
                  <label>Mật khẩu hiện tại</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>

                <div className={cx('form-group')}>
                  <label>Mật khẩu mới</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <div className={cx('form-group')}>
                  <label>Xác nhận mật khẩu mới</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div className={cx('form-save')}>
                  <Button lightBlue onClick={handleChangePassword}>Cập nhật mật khẩu</Button>
                </div>
              </div>

              {/* Nút lưu thông tin cá nhân
              {customerId && (
                <div className={cx('form-save')}>
                  <Button lightBlue onClick={handleUpdateInfo}>Lưu Thông Tin</Button>
                </div>
              )} */}
            </div>
          </div>

          {/* Modal Booking */}
          {/* Modal Booking */}
          <Modal show={showBookingModal} onHide={handleCloseBookingModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Lịch Làm Việc Của Bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {employeeBookings.length === 0 ? (
                <p className={cx('no-booking')}>Không có lịch làm việc nào trong tương lai.</p>
              ) : (
                <div className={cx('booking-table-wrapper')}>
                  <table className={cx('booking-table')}>
                    <thead>
                      <tr>
                        <th>Mã Booking</th>
                        <th>Ngày</th>
                        <th>Giờ</th>
                        <th>Khách hàng</th>
                        <th>Dịch vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeBookings.map((bk) => (
                        <tr key={bk.bookingID}>
                          <td>{bk.bookingID}</td>
                          <td>{bk.startDate || bk.date}</td>
                          <td>{bk.startTime || bk.time}</td>
                          <td>{bk.customerName || bk.customerID || '-'}</td>
                          <td>{bk.serviceName || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button lightBlue onClick={handleCloseBookingModal}>Đóng</Button>
            </Modal.Footer>
          </Modal>

        </div>
      )}
    </>
  );
}

export default PersonalPage;
  