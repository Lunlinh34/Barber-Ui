// import { useState, useEffect } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import * as addressServices from '~/services/addressServices';
// import * as workingHourServices from '~/services/workingHourServices';
// import * as storeServices from '~/services/storeServices';
// import * as warehouseServices from '~/services/warehouseServices';
// import * as storeRequestServices from '~/services/storeRequestServices';
// import styles from './RegisterStorePage.module.scss';

// // Modal component
// function Modal({ visible, onClose, children }) {
//   if (!visible) return null;
//   return (
//     <div style={{
//       position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//       background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
//     }}>
//       <div style={{ background: '#fff', padding: 20, borderRadius: 8, minWidth: 400 }}>
//         {children}
//         <button onClick={onClose} style={{ marginTop: 10 }}>Đóng</button>
//       </div>
//     </div>
//   );
// }

// function RegisterStorePage() {
//   const [userId, setUserId] = useState(null);
//   const [userPhone, setUserPhone] = useState('');

//   // Load user info từ token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserId(decoded?.userID || decoded?.id);
//         setUserPhone(decoded?.phone || '');
//       } catch (error) {
//         console.error('Token không hợp lệ', error);
//       }
//     }
//   }, []);

//   // Modal address
//   const [showAddressModal, setShowAddressModal] = useState(false);

//   // States
//   const [address, setAddress] = useState({
//     currentAddress: '',
//     subDistrict: '',
//     district: '',
//     cityID: '',
//     userID: null,
//   });
//   const [addressId, setAddressId] = useState(null);

//   const [workingHour, setWorkingHour] = useState({ startTime: '', endTime: '' });
//   const [workingHourId, setWorkingHourId] = useState(null);

//   const [store, setStore] = useState({ storeName: '', numberphone: '' });
//   const [storeId, setStoreId] = useState(null);

//   const [warehouse, setWarehouse] = useState({ warehouseName: '', totalAsset: 0, capacity: 0 });
//   const [warehouseId, setWarehouseId] = useState(null);

//   // Cập nhật userID và số điện thoại khi load
//   useEffect(() => {
//     setAddress(prev => ({ ...prev, userId  }));
//     setStore(prev => ({ ...prev, numberphone: userPhone }));
//   }, [userId, userPhone]);

//   const handleChange = (setter) => (e) => {
//     const { name, value } = e.target;
//     setter(prev => ({ ...prev, [name]: value }));
//   };

//   // Submit Address từ modal
//   const submitAddress = async () => {
//     if (!userId) return alert('Bạn chưa đăng nhập!');
//     try {
//       const res = await addressServices.createAddress(address);
//       if (res?.data) {
//         setAddressId(res.data.addressID);
//         setShowAddressModal(false);
//         alert('Địa chỉ lưu thành công!');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Lỗi khi lưu địa chỉ');
//     }
//   };

//   // Submit tổng hợp
//   const submitAll = async () => {
//     if (!userId) return alert('Bạn chưa đăng nhập!');
//     if (!addressId) return alert('Vui lòng nhập địa chỉ trước!');

//     try {
//       // 1️⃣ Tạo WorkingHour
//       const startTicks = new Date(`1970-01-01T${workingHour.startTime}:00`).getTime();
//       const endTicks = new Date(`1970-01-01T${workingHour.endTime}:00`).getTime();

//       const whRes = await workingHourServices.createWorkingHour({
//         startTime: { ticks: startTicks },
//         endTime: { ticks: endTicks },
//       });
//       if (!whRes?.data) throw new Error('Lỗi tạo WorkingHour');
//       setWorkingHourId(whRes.data.workingHourID);

//       // 2️⃣ Tạo Store
//       const storeRes = await storeServices.createStore({
//         storeName: store.storeName,
//         numberphone: store.numberphone,
//         workingHourID: whRes.data.workingHourID,
//         addressID: addressId,
//       });
//       if (!storeRes?.data) throw new Error('Lỗi tạo Store');
//       setStoreId(storeRes.data.storeID);

//       // 3️⃣ Tạo Warehouse
//       const whouseRes = await warehouseServices.createWarehouse({
//         warehouseName: warehouse.warehouseName,
//         totalAsset: parseFloat(warehouse.totalAsset),
//         capacity: parseInt(warehouse.capacity),
//         addressID: addressId,
//         storeID: storeRes.data.storeID,
//       });
//       if (!whouseRes?.data) throw new Error('Lỗi tạo Warehouse');
//       setWarehouseId(whouseRes.data.warehouseID);

//       // 4️⃣ Tạo StoreRequest
//       const srRes = await storeRequestServices.createStoreRequest({
//         WorkingHourID: whRes.data.workingHourID,
//         WarehouseID: whouseRes.data.warehouseID,
//         AddressID: addressId,
//         StoreID: storeRes.data.storeID,
//         Status: 'Pending',
//       });
//       if (!srRes?.data) throw new Error('Lỗi tạo StoreRequest');

//       alert('Đăng ký cửa hàng và kho thành công!');

//       // Reset form
//       setAddress({ currentAddress: '', subDistrict: '', district: '', cityID: '', userId  });
//       setAddressId(null);
//       setWorkingHour({ startTime: '', endTime: '' });
//       setWorkingHourId(null);
//       setStore({ storeName: '', numberphone: userPhone });
//       setStoreId(null);
//       setWarehouse({ warehouseName: '', totalAsset: 0, capacity: 0 });
//       setWarehouseId(null);

//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
//       <h2>Đăng ký cửa hàng</h2>

//       <button onClick={() => setShowAddressModal(true)}>Nhập địa chỉ cửa hàng</button>
//       {addressId && <p>Địa chỉ đã lưu: {address.currentAddress}, {address.district}</p>}

//       <Modal visible={showAddressModal} onClose={() => setShowAddressModal(false)}>
//         <h3>Nhập địa chỉ cửa hàng</h3>
//         <input name="currentAddress" placeholder="Địa chỉ hiện tại" value={address.currentAddress} onChange={handleChange(setAddress)} />
//         <input name="subDistrict" placeholder="Phường/Xã" value={address.subDistrict} onChange={handleChange(setAddress)} />
//         <input name="district" placeholder="Quận/Huyện" value={address.district} onChange={handleChange(setAddress)} />
//         <input name="cityID" type="number" placeholder="ID Thành phố" value={address.cityID} onChange={handleChange(setAddress)} />
//         <button onClick={submitAddress} style={{ marginTop: 10 }}>Lưu địa chỉ</button>
//       </Modal>

//       <fieldset style={{ marginTop: 20 }}>
//         <legend>Giờ làm việc</legend>
//         <input type="time" name="startTime" value={workingHour.startTime} onChange={handleChange(setWorkingHour)} />
//         <input type="time" name="endTime" value={workingHour.endTime} onChange={handleChange(setWorkingHour)} />
//       </fieldset>

//       <fieldset style={{ marginTop: 20 }}>
//         <legend>Cửa hàng</legend>
//         <input name="storeName" placeholder="Tên cửa hàng" value={store.storeName} onChange={handleChange(setStore)} />
//         <input name="numberphone" placeholder="Số điện thoại" value={store.numberphone} disabled />
//       </fieldset>

//       <fieldset style={{ marginTop: 20 }}>
//         <legend>Kho hàng</legend>
//         <input name="warehouseName" placeholder="Tên kho" value={warehouse.warehouseName} onChange={handleChange(setWarehouse)} />
//         <input name="totalAsset" type="number" placeholder="Tổng tài sản" value={warehouse.totalAsset} onChange={handleChange(setWarehouse)} />
//         <input name="capacity" type="number" placeholder="Sức chứa" value={warehouse.capacity} onChange={handleChange(setWarehouse)} />
//       </fieldset>

//       <button onClick={submitAll} style={{ marginTop: 20, padding: '10px 20px' }}>Submit Tổng hợp</button>
//     </div>
//   );
// }

// export default RegisterStorePage;
// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';
// import * as addressServices from '~/services/addressServices';
// import * as workingHourServices from '~/services/workingHourServices';
// import * as storeServices from '~/services/storeServices';
// import * as warehouseServices from '~/services/warehouseServices';
// import * as storeRequestServices from '~/services/storeRequestServices';
// import * as countryService from '~/services/ountryService';
// import * as cityService from '~/services/cityService';
// import * as customerServices from '~/services/customerService';
// import styles from './RegisterStorePage.module.scss';

// // 🔹 Modal component
// function Modal({ visible, onClose, title, children }) {
//   if (!visible) return null;
//   return (
//     <div
//       style={{
//         position: 'fixed',
//         inset: 0,
//         background: 'rgba(0,0,0,0.5)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           background: '#fff',
//           padding: 20,
//           borderRadius: 10,
//           width: 480,
//           boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//         }}
//       >
//         <h3>{title}</h3>
//         {children}
//         <div style={{ marginTop: 10, textAlign: 'right' }}>
//           <button onClick={onClose} style={{ padding: '6px 12px' }}>
//             Đóng
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RegisterStorePage() {
//   const [userId, setUserId] = useState(null);
//   const [phoneInput, setPhoneInput] = useState('');

//   // 🔹 Load user info từ token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserId(decoded?.userID || decoded?.id);
//       } catch {
//         toast.error('Token không hợp lệ!');
//       }
//     } else {
//       toast.warning('Vui lòng đăng nhập để tiếp tục!');
//     }
//   }, []);

//   // 🔹 Load số điện thoại từ customer
//   useEffect(() => {
//     if (!userId) return;
//     const loadPhone = async () => {
//       try {
//         const customers = await customerServices.getCustomer();
//         const customer = customers.find(c => c.userID === userId);
//         if (customer?.numberphone && customer.numberphone !== 'null') {
//           setPhoneInput(customer.numberphone);
//         }
//       } catch (err) {
//         console.error('Lỗi lấy số điện thoại customer:', err);
//       }
//     };
//     loadPhone();
//   }, [userId]);

//   // 🔹 Modal Address
//   const [showAddressModal, setShowAddressModal] = useState(false);

//   // 🔹 Address state
//   const [cities, setCities] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedCityId, setSelectedCityId] = useState('');
//   const [selectedDistrictId, setSelectedDistrictId] = useState('');
//   const [subDistrict, setSubDistrict] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');
//   const [createdAddressId, setCreatedAddressId] = useState(null);

//   // 🔹 Store, WorkingHour, Warehouse
//   const [store, setStore] = useState({ storeName: '' });
//   const [workingHour, setWorkingHour] = useState({ startTime: '', endTime: '' });
//   const [warehouse, setWarehouse] = useState({ warehouseName: '', totalAsset: 0, capacity: 0 });

//   // 🔹 Load danh sách Tỉnh/Thành
//   useEffect(() => {
//     const loadCities = async () => {
//       try {
//         const res = await countryService.getCountries();
//         setCities(Array.isArray(res) ? res : res.data || []);
//       } catch (err) {
//         console.error('Lỗi load Tỉnh/Thành:', err);
//       }
//     };
//     loadCities();
//   }, []);

//   // 🔹 Khi chọn Tỉnh → load Quận/Huyện
//   const handleCityChange = async (cityId) => {
//     setSelectedCityId(cityId);
//     setSelectedDistrictId('');
//     try {
//       const res = await cityService.getCitiesByCountry(cityId);
//       setDistricts(Array.isArray(res) ? res : res.data || []);
//     } catch (err) {
//       console.error('Lỗi load Quận/Huyện:', err);
//       setDistricts([]);
//     }
//   };

//   // 🔹 Lưu địa chỉ
//   const handleSaveAddress = async () => {
//     if (!selectedCityId || !selectedDistrictId || !subDistrict || !currentAddress) {
//       toast.warning('Vui lòng nhập đầy đủ thông tin địa chỉ!');
//       return;
//     }

//     try {
//       const districtObj = districts.find((d) => d.cityID === selectedDistrictId);
//       const payload = {
//         currentAddress,
//         subDistrict,
//         district: districtObj?.cityName || '',
//         cityID: selectedDistrictId,
//         userID: Number(userId),
//       };
//       const res = await addressServices.createAddress(payload);
//       if (res?.addressID) {
//         setCreatedAddressId(res.addressID);
//         toast.success('✅ Đã lưu địa chỉ thành công!');
//         setShowAddressModal(false);
//       } else toast.error('Không thể lưu địa chỉ!');
//     } catch (err) {
//       console.error('Lỗi lưu địa chỉ:', err);
//       toast.error('Lỗi khi lưu địa chỉ!');
//     }
//   };

//   // 🔹 Đăng ký cửa hàng
//   const handleSubmit = async () => {
//     if (!store.storeName.trim()) return toast.warning('Vui lòng nhập tên cửa hàng!');
//     if (!createdAddressId) return toast.warning('Vui lòng nhập địa chỉ trước!');
//     if (!workingHour.startTime || !workingHour.endTime) return toast.warning('Vui lòng nhập giờ làm việc!');
//     if (!phoneInput.trim()) return toast.warning('Vui lòng nhập số điện thoại!');
//     if (!warehouse.warehouseName.trim()) return toast.warning('Vui lòng nhập tên kho!');

//     try {
//       // 1️⃣ Tạo WorkingHour
//       const whRes = await workingHourServices.createWorkingHour(
//         workingHour.startTime,
//         workingHour.endTime
//       );
//       const workingHourID = whRes?.workingHourID;
//       if (!workingHourID) throw new Error('Không thể tạo giờ làm việc');

//       // 2️⃣ Tạo Store
//       const storePayload = {
//         storeID: 0,
//         storeName: store.storeName,
//         numberphone: phoneInput,
//         workingHourID,
//         addressID: createdAddressId,
//       };
//       const storeRes = await storeServices.createStore(storePayload);
//       const storeID = storeRes?.storeID;
//       if (!storeID) throw new Error('Không thể tạo cửa hàng');

//       // 3️⃣ Cập nhật Customer nếu số điện thoại thay đổi
//       try {
//         const customers = await customerServices.getCustomer();
//         const customer = customers.find(c => c.userID === userId);
//         if (customer && customer.numberphone !== phoneInput) {
//           await customerServices.updateCustomer(customer.customerID, {
//             ...customer,
//             numberphone: phoneInput,
//           });
//         }
//       } catch (err) {
//         console.error('Lỗi update số điện thoại Customer:', err);
//       }

//       // 4️⃣ Tạo Warehouse
//       const warehousePayload = {
//         warehouseName: warehouse.warehouseName,
//         totalAsset: parseFloat(warehouse.totalAsset),
//         capacity: parseInt(warehouse.capacity),
//         storeID,
//         addressID: createdAddressId,
//       };
//       const warehouseRes = await warehouseServices.createWarehouse(warehousePayload);
//       const warehouseID = warehouseRes?.warehouseID;
//       if (!warehouseID) throw new Error('Không thể tạo kho hàng');

//       // 5️⃣ Tạo StoreRequest (service tự lấy userID từ token)
//       const storeRequestPayload = {
//         WorkingHourID: workingHourID,
//         WarehouseID: warehouseID,
//         AddressID: createdAddressId,
//         StoreID: storeID,
//         Status: 'Pending',
//       };
//       await storeRequestServices.createStoreRequest(storeRequestPayload);

//       toast.success('🎉 Đăng ký cửa hàng thành công!');
//     } catch (err) {
//       console.error('❌ Lỗi đăng ký:', err);
//       toast.error('Không thể đăng ký cửa hàng!');
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <h2>Đăng ký cửa hàng</h2>

//       {/* Store Info */}
//       <div className={styles.section}>
//         <label>Tên cửa hàng:</label>
//         <input
//           type="text"
//           value={store.storeName}
//           onChange={(e) => setStore({ ...store, storeName: e.target.value })}
//           placeholder="Nhập tên cửa hàng"
//         />
//       </div>

//       {/* Phone */}
//       <div className={styles.section}>
//         <label>Số điện thoại:</label>
//         <input
//           type="text"
//           value={phoneInput}
//           onChange={(e) => setPhoneInput(e.target.value)}
//           placeholder="Nhập số điện thoại"
//         />
//       </div>

//       {/* Working Hours */}
//       <div className={styles.section}>
//         <label>Giờ mở cửa:</label>
//         <input
//           type="time"
//           value={workingHour.startTime}
//           onChange={(e) => setWorkingHour({ ...workingHour, startTime: e.target.value })}
//         />
//         <label>Giờ đóng cửa:</label>
//         <input
//           type="time"
//           value={workingHour.endTime}
//           onChange={(e) => setWorkingHour({ ...workingHour, endTime: e.target.value })}
//         />
//       </div>

//       {/* Address Modal Trigger */}
//       <div className={styles.section}>
//         <label>Địa chỉ cửa hàng:</label>
//         <button onClick={() => setShowAddressModal(true)}>+ Nhập địa chỉ</button>
//         {createdAddressId && <p style={{ color: 'green' }}>✅ Đã lưu địa chỉ</p>}
//       </div>

//       {/* Warehouse Info */}
//       <div className={styles.section}>
//         <label>Tên kho:</label>
//         <input
//           type="text"
//           value={warehouse.warehouseName}
//           onChange={(e) => setWarehouse({ ...warehouse, warehouseName: e.target.value })}
//           placeholder="Nhập tên kho"
//         />
//         <label>Tổng tài sản:</label>
//         <input
//           type="number"
//           value={warehouse.totalAsset}
//           onChange={(e) => setWarehouse({ ...warehouse, totalAsset: e.target.value })}
//         />
//         <label>Sức chứa:</label>
//         <input
//           type="number"
//           value={warehouse.capacity}
//           onChange={(e) => setWarehouse({ ...warehouse, capacity: e.target.value })}
//         />
//       </div>

//       <button onClick={handleSubmit} className={styles.submitBtn}>
//         Gửi đăng ký cửa hàng
//       </button>

//       {/* 🔹 Modal nhập địa chỉ */}
//       <Modal visible={showAddressModal} onClose={() => setShowAddressModal(false)} title="Thêm địa chỉ">
//         <div>
//           <label>Thành phố / Tỉnh</label>
//           <select value={selectedCityId} onChange={(e) => handleCityChange(Number(e.target.value))}>
//             <option value="">-- Chọn Thành phố / Tỉnh --</option>
//             {cities.map((ct) => (
//               <option key={ct.countryID} value={ct.countryID}>
//                 {ct.countryName}
//               </option>
//             ))}
//           </select>

//           <label>Quận / Huyện</label>
//           <select
//             value={selectedDistrictId}
//             onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
//             disabled={!districts.length}
//           >
//             <option value="">-- Chọn Quận / Huyện --</option>
//             {districts.map((d) => (
//               <option key={d.cityID} value={d.cityID}>
//                 {d.cityName}
//               </option>
//             ))}
//           </select>

//           <label>Phường / Xã</label>
//           <input
//             type="text"
//             placeholder="Nhập Phường / Xã"
//             value={subDistrict}
//             onChange={(e) => setSubDistrict(e.target.value)}
//           />

//           <label>Địa chỉ chi tiết</label>
//           <input
//             type="text"
//             placeholder="Nhập địa chỉ chi tiết"
//             value={currentAddress}
//             onChange={(e) => setCurrentAddress(e.target.value)}
//           />

//           <div style={{ marginTop: 10 }}>
//             <button onClick={handleSaveAddress}>Lưu địa chỉ</button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default RegisterStorePage;
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import * as addressServices from '~/services/addressServices';
import * as workingHourServices from '~/services/workingHourServices';
import * as storeServices from '~/services/storeServices';
import * as warehouseServices from '~/services/warehouseServices';
import * as storeRequestServices from '~/services/storeRequestServices';
import * as countryService from '~/services/ountryService';
import * as cityService from '~/services/cityService';
import * as customerServices from '~/services/customerService';
import styles from './RegisterStorePage.module.scss';
import BookingWarning from '~/components/common/BookingWarning';
// 🔹 Modal component
function Modal({ visible, onClose, title, children }) {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 20,
          borderRadius: 10,
          width: 480,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <h3>{title}</h3>
        {children}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <button onClick={onClose} style={{ padding: '6px 12px' }}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisterStorePage() {
  const [userId, setUserId] = useState(null);
  const [phoneInput, setPhoneInput] = useState('');
  const [showPersonalPage, setPersonalPage] = useState(false);

  // 🔹 Load user info từ token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded?.userID || decoded?.id);
                setPersonalPage(true);

      } catch {
        toast.error('Token không hợp lệ!');
                setPersonalPage(false);

      }
    } else {
      toast.warning('Vui lòng đăng nhập để tiếp tục!');
              setPersonalPage(false);

    }
  }, []);

  // 🔹 Load số điện thoại từ customer
  useEffect(() => {
    if (!userId) return;
    const loadPhone = async () => {
      try {
        const customers = await customerServices.getCustomer();
        const customer = customers.find(c => c.userID === userId);
        if (customer?.numberphone && customer.numberphone !== 'null') {
          setPhoneInput(customer.numberphone);
        }
      } catch (err) {
        console.error('Lỗi lấy số điện thoại customer:', err);
      }
    };
    loadPhone();
  }, [userId]);

  // 🔹 Modal Address
  const [showAddressModal, setShowAddressModal] = useState(false);

  // 🔹 Address state
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [createdAddressId, setCreatedAddressId] = useState(null);

  // 🔹 Store, WorkingHour, Warehouse
  const [store, setStore] = useState({ storeName: '', imageFile: null, imageUrl: '' });
  const [workingHour, setWorkingHour] = useState({ startTime: '', endTime: '' });
  const [warehouse, setWarehouse] = useState({ warehouseName: '', totalAsset: 0, capacity: 0 });

  // 🔹 Load danh sách Tỉnh/Thành
  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await countryService.getCountries();
        setCities(Array.isArray(res) ? res : res.data || []);
      } catch (err) {
        console.error('Lỗi load Tỉnh/Thành:', err);
      }
    };
    loadCities();
  }, []);

  // 🔹 Khi chọn Tỉnh → load Quận/Huyện
  const handleCityChange = async (cityId) => {
    setSelectedCityId(cityId);
    setSelectedDistrictId('');
    try {
      const res = await cityService.getCitiesByCountry(cityId);
      setDistricts(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      console.error('Lỗi load Quận/Huyện:', err);
      setDistricts([]);
    }
  };

  // 🔹 Lưu địa chỉ
  const handleSaveAddress = async () => {
    if (!selectedCityId || !selectedDistrictId || !subDistrict || !currentAddress) {
      toast.warning('Vui lòng nhập đầy đủ thông tin địa chỉ!');
      return;
    }

    try {
      const districtObj = districts.find((d) => d.cityID === selectedDistrictId);
      const payload = {
        currentAddress,
        subDistrict,
        district: districtObj?.cityName || '',
        cityID: selectedDistrictId,
        userID: Number(userId),
      };
      const res = await addressServices.createAddress(payload);
      if (res?.addressID) {
        setCreatedAddressId(res.addressID);
        toast.success('✅ Đã lưu địa chỉ thành công!');
        setShowAddressModal(false);
      } else toast.error('Không thể lưu địa chỉ!');
    } catch (err) {
      console.error('Lỗi lưu địa chỉ:', err);
      toast.error('Lỗi khi lưu địa chỉ!');
    }
  };

  // 🔹 Đăng ký cửa hàng
  const handleSubmit = async () => {
    if (!store.storeName.trim()) return toast.warning('Vui lòng nhập tên cửa hàng!');
    if (!createdAddressId) return toast.warning('Vui lòng nhập địa chỉ trước!');
    if (!workingHour.startTime || !workingHour.endTime) return toast.warning('Vui lòng nhập giờ làm việc!');
    if (!phoneInput.trim()) return toast.warning('Vui lòng nhập số điện thoại!');
    if (!warehouse.warehouseName.trim()) return toast.warning('Vui lòng nhập tên kho!');

    try {
      // 1️⃣ Tạo WorkingHour
      const whRes = await workingHourServices.createWorkingHour(
        workingHour.startTime,
        workingHour.endTime
      );
      const workingHourID = whRes?.workingHourID;
      if (!workingHourID) throw new Error('Không thể tạo giờ làm việc');

      // 2️⃣ Tạo Store (gửi cả imageUrl Base64 hoặc URL)
      const storePayload = {
        storeID: 0,
        storeName: store.storeName,
        numberphone: phoneInput,
        workingHourID,
        addressID: createdAddressId,
        imageUrl: store.imageUrl, // URL hoặc Base64
      };
      const storeRes = await storeServices.createStore(storePayload);
      const storeID = storeRes?.storeID;
      if (!storeID) throw new Error('Không thể tạo cửa hàng');

      // 3️⃣ Cập nhật Customer nếu số điện thoại thay đổi
      try {
        const customers = await customerServices.getCustomer();
        const customer = customers.find(c => c.userID === userId);
        if (customer && customer.numberphone !== phoneInput) {
          await customerServices.updateCustomer(customer.customerID, {
            ...customer,
            numberphone: phoneInput,
          });
        }
      } catch (err) {
        console.error('Lỗi update số điện thoại Customer:', err);
      }

      // 4️⃣ Tạo Warehouse
      const warehousePayload = {
        warehouseName: warehouse.warehouseName,
        totalAsset: parseFloat(warehouse.totalAsset),
        capacity: parseInt(warehouse.capacity),
        storeID,
        addressID: createdAddressId,
      };
      const warehouseRes = await warehouseServices.createWarehouse(warehousePayload);
      const warehouseID = warehouseRes?.warehouseID;
      if (!warehouseID) throw new Error('Không thể tạo kho hàng');

      // 5️⃣ Tạo StoreRequest
      const storeRequestPayload = {
        WorkingHourID: workingHourID,
        WarehouseID: warehouseID,
        AddressID: createdAddressId,
        StoreID: storeID,
        Status: 'Pending',
      };
      await storeRequestServices.createStoreRequest(storeRequestPayload);

      toast.success('🎉 Đăng ký cửa hàng thành công!');
    } catch (err) {
      console.error('❌ Lỗi đăng ký:', err);
      toast.error('Không thể đăng ký cửa hàng!');
    }
  };

  return (
     <>
    {!showPersonalPage ? (
        <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
      ) : (
    <div className={styles.wrapper}>
      <h2>Đăng ký cửa hàng</h2>

      {/* Store Info */}
      
  <div className={styles.formGrid}>
    {/* Cột trái */}
    <div>
      {/* Tên cửa hàng */}
      <div className={styles.section}>
        <label>Tên cửa hàng:</label>
        <input
          type="text"
          value={store.storeName}
          onChange={(e) => setStore({ ...store, storeName: e.target.value })}
          placeholder="Nhập tên cửa hàng"
        />
      </div>

      {/* Ảnh cửa hàng */}
      <div className={styles.section}>
        <label>Ảnh cửa hàng:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setStore({
                  ...store,
                  imageFile: file,
                  imageUrl: reader.result,
                });
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <input
          type="text"
          placeholder="Hoặc nhập URL ảnh"
          value={store.imageUrl}
          onChange={(e) => setStore({ ...store, imageUrl: e.target.value })}
        />
        {store.imageUrl && <img src={store.imageUrl} alt="Preview" className={styles.previewImg} />}
      </div>

      {/* Giờ làm việc */}
      <div className={styles.section}>
        <label>Giờ mở cửa:</label>
        <input type="time" value={workingHour.startTime} onChange={(e) => setWorkingHour({ ...workingHour, startTime: e.target.value })} />
        <label>Giờ đóng cửa:</label>
        <input type="time" value={workingHour.endTime} onChange={(e) => setWorkingHour({ ...workingHour, endTime: e.target.value })} />
      </div>
    </div>

    {/* Cột phải */}
    <div>
      {/* Số điện thoại */}
      <div className={styles.section}>
        <label>Số điện thoại:</label>
        <input type="text" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} placeholder="Nhập số điện thoại" />
      </div>

      {/* Địa chỉ */}
      <div className={styles.section}>
        <label>Địa chỉ cửa hàng:</label>
        <button onClick={() => setShowAddressModal(true)}>+ Nhập địa chỉ</button>
        {createdAddressId && <p>✅ Đã lưu địa chỉ</p>}
      </div>

      {/* Thông tin kho */}
      <div className={styles.section}>
        <label>Tên kho:</label>
        <input type="text" value={warehouse.warehouseName} onChange={(e) => setWarehouse({ ...warehouse, warehouseName: e.target.value })} placeholder="Nhập tên kho" />
        <label>Tổng tài sản:</label>
        <input type="number" value={warehouse.totalAsset} onChange={(e) => setWarehouse({ ...warehouse, totalAsset: e.target.value })} />
        <label>Sức chứa:</label>
        <input type="number" value={warehouse.capacity} onChange={(e) => setWarehouse({ ...warehouse, capacity: e.target.value })} />
      </div>
    </div>
  </div>

  <button className={styles.submitBtn} onClick={handleSubmit}>Gửi đăng ký cửa hàng</button>

      {/* 🔹 Modal nhập địa chỉ */}
      <Modal visible={showAddressModal} onClose={() => setShowAddressModal(false)} title="Thêm địa chỉ">
        <div>
          <label>Thành phố / Tỉnh</label>
          <select value={selectedCityId} onChange={(e) => handleCityChange(Number(e.target.value))}>
            <option value="">-- Chọn Thành phố / Tỉnh --</option>
            {cities.map((ct) => (
              <option key={ct.countryID} value={ct.countryID}>
                {ct.countryName}
              </option>
            ))}
          </select>

          <label>Quận / Huyện</label>
          <select
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
            disabled={!districts.length}
          >
            <option value="">-- Chọn Quận / Huyện --</option>
            {districts.map((d) => (
              <option key={d.cityID} value={d.cityID}>
                {d.cityName}
              </option>
            ))}
          </select>

          <label>Phường / Xã</label>
          <input
            type="text"
            placeholder="Nhập Phường / Xã"
            value={subDistrict}
            onChange={(e) => setSubDistrict(e.target.value)}
          />

          <label>Địa chỉ chi tiết</label>
          <input
            type="text"
            placeholder="Nhập địa chỉ chi tiết"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
          />

          <div style={{ marginTop: 10 }}>
            <button onClick={handleSaveAddress}>Lưu địa chỉ</button>
          </div>
        </div>
      </Modal>
    </div>
    )}
       </>
  );
}

export default RegisterStorePage;
