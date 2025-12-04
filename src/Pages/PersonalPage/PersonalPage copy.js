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
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import styles from './PersonalPage.module.scss';
import FormControl from '~/components/feature/FormControl';
import Button from '~/components/common/Button';
import BookingWarning from '~/components/common/BookingWarning';

import * as customerService from '~/services/customerService';
import * as employeeService from '~/services/employeeServices';
import * as storeService from '~/services/storeServices';
import * as countryService from '~/services/ountryService'; // ✅ sửa đúng tên file
import * as cityService from '~/services/cityService';
import * as addressService from '~/services/addressServices';

const cx = classNames.bind(styles);

function PersonalPage() {
  const [userId, setUserId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isBarber, setIsBarber] = useState(false);
  const [showPersonalPage, setPersonalPage] = useState(false);

  const [selectedDistrictID, setSelectedDistrictID] = useState('');

  // 🔹 Địa chỉ
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  // ✅ Kiểm tra token
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

  // ✅ Lấy dữ liệu user + danh sách tỉnh
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decoded = jwtDecode(token);
        const currentUserId = decoded?.userID;
        if (!currentUserId) return;
        setUserId(currentUserId);

        // 🔸 Lấy thông tin nhân viên
        const employees = await employeeService.getEmployee();
        const emp = employees?.find((e) => e.userID === currentUserId);
        if (emp) {
          setIsBarber(true);
          const store = await storeService.getStoreById(emp.storeID);
          setStoreName(store?.storeName || 'Chưa có thông tin cửa hàng');
        }

        // 🔸 Lấy thông tin khách hàng
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

        // 🔸 Lấy danh sách tỉnh/thành
        const cityList = await countryService.getCountries();
        if (Array.isArray(cityList)) setCities(cityList);
        else setCities(cityList.data || []);

        // 🔸 Nếu có cityID thì load quận/huyện
        if (customer?.cityID) {
          const districtList = await cityService.getCitiesByCountry(customer.cityID);
          if (Array.isArray(districtList)) setDistricts(districtList);
          else setDistricts(districtList.data || []);
        }
      } catch (err) {
        console.error('❌ Lỗi tải dữ liệu:', err);
        toast.error('Không thể tải thông tin người dùng!');
      }
    };

    fetchData();
  }, []);

  // ✅ Khi chọn Thành phố → load Quận/Huyện
  const handleCityChange = async (cityID) => {
    setSelectedCityId(cityID);
    setSelectedDistrict('');
    setSelectedDistrictID('');
    if (cityID) {
      try {
        const res = await cityService.getCitiesByCountry(cityID);
        if (Array.isArray(res)) setDistricts(res);
        else setDistricts(res.data || []);
      } catch (err) {
        console.error('Lỗi khi lấy quận/huyện:', err);
        setDistricts([]);
      }
    }
  };

  // ✅ Khi nhấn "Lưu"
const handleUpdateInfo = async () => {
  if (!selectedDistrictID || selectedDistrictID <= 0) {
    toast.warning('Vui lòng chọn quận/huyện hợp lệ!');
    return;
  }

  if (!firstName.trim() || !lastName.trim()) {
    toast.warning('Vui lòng nhập đầy đủ họ và tên!');
    return;
  }

  if (!selectedCityId || !selectedDistrict || !subDistrict || !currentAddress) {
    toast.warning('Vui lòng nhập đầy đủ thông tin địa chỉ!');
    return;
  }

  let customerIdToUse;

  // 1️⃣ Kiểm tra Customer hiện tại
  try {
    const customers = await customerService.getCustomer();
    const existingCustomer = customers?.find(c => c.userID === Number(userId));

    if (existingCustomer) {
      customerIdToUse = existingCustomer.customerID;
      console.log('✅ Customer hiện có:', existingCustomer);
    } else {
      toast.error('Người dùng chưa có bản ghi Customer. Vui lòng tạo Customer trước!');
      return; // hoặc có thể gọi hàm tạo Customer mới
    }
  } catch (err) {
    console.error('❌ Lỗi khi lấy Customer:', err.response || err);
    toast.error('Không thể kiểm tra thông tin Customer!');
    return;
  }

  // 2️⃣ Cập nhật Customer
  try {
    await customerService.updateCustomer(
      customerIdToUse,
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
    console.log('✅ Cập nhật Customer thành công');
  } catch (err) {
    console.error('❌ Lỗi cập nhật Customer:', err.response || err);
    toast.error('Không thể cập nhật Customer!');
    return;
  }

  // 3️⃣ Tạo Address mới
  let newAddress;
  try {
    const addressData = {
      currentAddress,
      subDistrict,
      district: selectedDistrict,
      cityID: Number(selectedDistrictID),
      userID: Number(userId),
    };
    console.log('📤 Dữ liệu gửi đi (Address):', addressData);

    newAddress = await addressService.createAddress(addressData);
    console.log('🚀 Kết quả createAddress:', newAddress);
  } catch (err) {
    console.error('❌ Lỗi tạo Address:', err.response || err);
    toast.error('Không thể tạo địa chỉ!');
    return;
  }

  // 4️⃣ Lấy addressID
  const addressID = newAddress?.addressID;
  if (!addressID) {
    toast.error('Không lấy được addressID từ API!');
    return;
  }
  console.log('🔹 addressID trước khi tạo CustomerAddress:', addressID);

  // 5️⃣ Tạo CustomerAddress
  try {
    console.log('📤 Gửi CustomerAddress payload:', { customerID: customerIdToUse, addressID });
    const resCustomerAddress = await customerService.createCustomerAddress(
      Number(customerIdToUse),
      Number(addressID)
    );
    console.log('🚀 Kết quả createCustomerAddress:', resCustomerAddress);
    toast.success('Cập nhật thông tin và địa chỉ thành công!');
  } catch (err) {
    console.error('❌ Lỗi tạo CustomerAddress:', err.response || err);
    toast.error('Không thể tạo CustomerAddress!');
  }
};




  return (
    <>
      {!showPersonalPage ? (
        <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
      ) : (
        <div className={cx('wrapper')}>
          <div className={cx('header')}>
            <h2>Hồ Sơ Của Tôi</h2>
            <h4>Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
          </div>

          <div className={cx('content')}>
            <div className={cx('form-info')}>
              <div className={cx('form-name')}>
                <FormControl value={firstName} labelTitle="Họ & Tên đệm" setFirstName={setFirstName} />
                <FormControl value={lastName} labelTitle="Tên" setLastName={setLastName} />
              </div>

              <div className={cx('form-email')}>
                <label>Email</label>
                <p>{email || 'Chưa có Email'}</p>
              </div>

              <div className={cx('form-email')}>
                <label>Số điện thoại</label>
                <p>{phone || 'Chưa có số điện thoại'}</p>
              </div>

              <div className={cx('form-date')}>
                <label htmlFor="date">Ngày sinh</label>
                <input type="date" id="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>

              {/* 🔹 Form địa chỉ */}
              <div className={cx('form-address')}>
                <label>Thành phố / Tỉnh</label>
                <select value={selectedCityId} onChange={(e) => handleCityChange(e.target.value)}>
                  <option value="">-- Chọn Thành phố / Tỉnh --</option>
                  {cities.map((ct) => (
                    <option key={ct.countryID} value={ct.countryID}>
                      {ct.countryName}
                    </option>
                  ))}
                </select>

                <label>Quận / Huyện</label>
                <select
                  value={selectedDistrictID}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedDistrictID(id);
                    const selectedObj = districts.find((d) => d.cityID === id);
                    setSelectedDistrict(selectedObj?.cityName || '');
                  }}
                  disabled={!districts.length}
                >
                  <option value="">-- Chọn Quận / Huyện --</option>
                  {districts.map((d) => (
                    <option key={d.cityID} value={d.cityID}>
                      {d.cityName}
                    </option>
                  ))}
                </select>

                <label>Xã / Phường</label>
                <input
                  type="text"
                  placeholder="Nhập Xã / Phường"
                  value={subDistrict}
                  onChange={(e) => setSubDistrict(e.target.value)}
                />

                <label>Địa chỉ hiện tại</label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ chi tiết"
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                />
              </div>

              {isBarber && (
                <div className={cx('form-extra')}>
                  <label>Chức vụ</label>
                  <p>
                    Thợ cắt tóc tại cửa hàng <strong>{storeName}</strong>
                  </p>
                </div>
              )}

              {customerId && (
                <div className={cx('form-save')}>
                  <Button lightBlue className={'btn-submit'} onClick={handleUpdateInfo}>
                    Lưu Thông Tin
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PersonalPage;
