// // // AdminBookingPage.js
// // import React, { useEffect, useState } from 'react';
// // import { toast } from 'react-toastify';
// // import CustomTable from '~/components/common/CustomTable/CustomTable';
// // import * as storeRequestServices from '~/services/storeRequestServices';
// // import * as bookingServices from '~/services/bookServices';
// // import {jwtDecode} from 'jwt-decode';

// // function AdminBookingPage() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [userRole, setUserRole] = useState(null);
// //   const [userID, setUserID] = useState(null);
// //   const [storeIDs, setStoreIDs] = useState([]);

// //   const token = localStorage.getItem('token');

// //   // 🔹 Lấy userID và role từ token
// //   useEffect(() => {
// //     if (!token) {
// //       console.log('Chưa có token trong localStorage');
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       const decoded = jwtDecode(token);
// //       setUserRole(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
// //       setUserID(decoded.userID);
// //     } catch (err) {
// //       console.error('Token không hợp lệ:', err);
// //     }
// //   }, [token]);

// //   // 🔹 Lấy tất cả storeID của user
// //   const fetchStoreIDs = async () => {
// //     if (!userID) return;
// //     try {
// //       const storeRequests = await storeRequestServices.getAllStoreRequests();
// //       // Lọc các storeRequest của user này
// //       const myStoreIDs = storeRequests
// //         .filter(sr => Number(sr.userID) === Number(userID))
// //         .map(sr => sr.storeID);
// //       setStoreIDs(myStoreIDs);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('Không thể lấy thông tin cửa hàng!');
// //     }
// //   };

// //   // 🔹 Lấy tất cả booking và lọc theo storeID
// //   const fetchBookings = async () => {
// //     if (storeIDs.length === 0) {
// //       setBookings([]);
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const allBookings = await bookingServices.getBook();
// //       const myBookings = allBookings.filter(b => storeIDs.includes(Number(b.storeID)));
// //       setBookings(myBookings);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('Không thể tải lịch booking!');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 🔹 Khi userID thay đổi -> lấy storeIDs
// //   useEffect(() => {
// //     if (userID) fetchStoreIDs();
// //   }, [userID]);

// //   // 🔹 Khi storeIDs thay đổi -> lấy bookings
// //   useEffect(() => {
// //     if (storeIDs.length > 0) fetchBookings();
// //     else setBookings([]); // không có store -> mảng rỗng
// //   }, [storeIDs]);

// //   if (loading) return <div style={{ padding: 20 }}>Đang tải...</div>;
// //   if (userRole !== '3')
// //     return <div style={{ padding: 20 }}>❌ Bạn không có quyền truy cập trang này</div>;

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h2>📋 Lịch booking cửa hàng của bạn</h2>
// //       {bookings.length === 0 ? (
// //         <p>Không có booking nào.</p>
// //       ) : (
// //         <CustomTable
// //           headers={['ID Booking', 'Ngày', 'Giờ', 'Ghi chú', 'CustomerID', 'ServiceID', 'EmployeeID']}
// //           data={bookings.map(b => ({
// //             ID: b.bookingID,
// //             Ngay: b.startDate,
// //             Gio: b.startTime,
// //             GhiChu: b.note || '-',
// //             CustomerID: b.customerID,
// //             ServiceID: b.serID,
// //             EmployeeID: b.employeID
// //           }))}
// //           loading={loading}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default AdminBookingPage;
// // AdminBookingPage.js
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import CustomTable from '~/components/common/CustomTable/CustomTable';
// import { jwtDecode } from 'jwt-decode';

// import * as storeRequestServices from '~/services/storeRequestServices';
// import * as bookingServices from '~/services/bookServices';
// import * as customerServices from '~/services/customerService';
// import * as employeeServices from '~/services/employeeServices';
// import * as serviceServices from '~/services/serviceServices';
// import * as userServices from '~/services/userServices';
// import * as addressServices from '~/services/addressServices';
// import * as productServices from '~/services/productServices';
// import * as producerServices from '~/services/producerServices';
// import * as categoryServices from '~/services/categoryProductServices';
// import * as warehouseServices from '~/services/warehouseServices';
// import * as productOrderServices from '~/services/productOrderServices';
// import * as orderServices from '~/services/orderServices';

// import styles from './AdminBookingPage.module.scss';
// import BookingNotificationButton from '~/components/feature/NotificationButton/NotificationButton';

// function AdminBookingPage() {
//   // === Booking + user ===
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState(null);
//   const [userID, setUserID] = useState(null);
//   const [storeIDs, setStoreIDs] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [services, setServices] = useState([]);

//   // === Order + Product ===
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [warehouses, setWarehouses] = useState([]);

//   // === Thêm nhân viên ===
//   const [username, setUsername] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressID, setSelectedAddressID] = useState(0);
//   const [addingEmployee, setAddingEmployee] = useState(false);

//   // === Thêm sản phẩm ===
//   const [proName, setProName] = useState('');
//   const [proImage, setProImage] = useState('');
//   const [price, setPrice] = useState(0);
//   const [quantity, setQuantity] = useState(0);
//   const [proDescription, setProDescription] = useState('');
//   const [producerID, setProducerID] = useState(0);
//   const [warehouseID, setWarehouseID] = useState(0);
//   const [cateID, setCateID] = useState(0);
//   const [producers, setProducers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [addingProduct, setAddingProduct] = useState(false);

//   const token = localStorage.getItem('token');

//   // === Lấy role + userID từ token ===
//   useEffect(() => {
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const decoded = jwtDecode(token);
//       setUserRole(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
//       setUserID(decoded.userID);
//     } catch (err) {
//       console.error('Token không hợp lệ:', err);
//     }
//   }, [token]);

//   // === Lấy storeID của admin ===
//   const fetchStoreIDs = async () => {
//     if (!userID) return;
//     try {
//       const storeRequests = await storeRequestServices.getAllStoreRequests();
//       const myStoreIDs = storeRequests
//         .filter(sr => Number(sr.userID) === Number(userID))
//         .map(sr => sr.storeID);
//       setStoreIDs(myStoreIDs);
//     } catch (err) {
//       console.error(err);
//       toast.error('Không thể lấy thông tin cửa hàng!');
//     }
//   };

//   // === Lấy dữ liệu hỗ trợ ===
//   const fetchSupportData = async () => {
//     try {
//       const [allCustomers, allEmployees, allServices, allProducers, allCategories] = await Promise.all([
//         customerServices.getCustomer(),
//         employeeServices.getEmployee(),
//         serviceServices.getService(),
//         producerServices.getProducer(),
//         categoryServices.getCategory(),
//       ]);
//       setCustomers(allCustomers || []);
//       setEmployees(allEmployees || []);
//       setServices(allServices || []);
//       setProducers(allProducers || []);
//       setCategories(allCategories || []);
//     } catch (err) {
//       console.error(err);
//       toast.error('Không thể tải dữ liệu hỗ trợ!');
//     }
//   };

//   // === Lấy warehouse theo storeID ===
//   const fetchWarehouses = async () => {
//     if (storeIDs.length === 0) return;
//     try {
//       const allWarehouses = await warehouseServices.getWarehouse();
//       const filtered = allWarehouses.filter(w => storeIDs.includes(Number(w.storeID)));
//       setWarehouses(filtered);
//     } catch (err) {
//       console.error(err);
//       toast.error('Không thể tải danh sách kho!');
//     }
//   };

//   // === Lấy product theo warehouseID ===
//   const fetchProducts = async () => {
//     if (warehouses.length === 0) return;
//     try {
//       const allProducts = await productServices.getProduct();
//       const warehouseIDs = warehouses.map(w => w.warehouseID);
//       const filtered = allProducts.filter(p => warehouseIDs.includes(Number(p.warehouseID)));
//       setProducts(filtered);
//     } catch (err) {
//       console.error(err);
//       toast.error("Không thể tải sản phẩm của kho!");
//     }
//   };

//   // === Lấy bookings ===
//   const fetchBookings = async () => {
//     if (storeIDs.length === 0) {
//       setBookings([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       const allBookings = await bookingServices.getBook();
//       const myBookings = allBookings.filter(b => storeIDs.includes(Number(b.storeID)));
//       setBookings(myBookings);
//     } catch (err) {
//       console.error(err);
//       toast.error('Không thể tải lịch booking!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // === Lấy Orders và ProductOrders ===
//   const fetchOrders = async () => {
//     if (products.length === 0) return;
//     setLoadingOrders(true);
//     try {
//       const [allProductOrders, allOrders] = await Promise.all([
//         productOrderServices.getProductOrder(),
//         orderServices.getOrder(),
//       ]);

//       // Lọc ProductOrder theo productID
//       const productIDs = products.map(p => p.proID);
//       const filteredProductOrders = allProductOrders.filter(po => productIDs.includes(po.proID));

//       // Nhóm theo orderID + tính tổng tiền
//       const orderMap = {};
//       filteredProductOrders.forEach(po => {
//         const product = products.find(p => p.proID === po.proID);
//         const amount = product ? product.price * po.proOrderQuantity : 0;

//         if (!orderMap[po.orderID]) {
//           orderMap[po.orderID] = { total: 0, items: [] };
//         }
//         orderMap[po.orderID].total += amount;
//         orderMap[po.orderID].items.push(po);
//       });

//       // Tạo data hiển thị cho bảng Order
//       const orderData = allOrders
//         .filter(o => orderMap[o.orderID])
//         .map(o => ({
//           ID: o.orderID,
//           Ngay: o.createDate,
//           KhachHang: customers.find(c => c.customerID === o.customerID)
//             ? `${customers.find(c => c.customerID === o.customerID).firstName} ${customers.find(c => c.customerID === o.customerID).lastName}`
//             : `#${o.customerID}`,
//           TongTien: orderMap[o.orderID].total,
//           TrangThai: o.status || '-',
//         }));

//       setFilteredOrders(orderData);
//     } catch (err) {
//       console.error(err);
//       toast.error('Không thể tải order!');
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   // --- useEffect tổng hợp ---
//   useEffect(() => {
//     if (userID) {
//       fetchStoreIDs();
//       fetchSupportData();
//     }
//   }, [userID]);

//   useEffect(() => {
//     if (storeIDs.length > 0) {
//       fetchBookings();
//       fetchWarehouses();
//     }
//   }, [storeIDs]);

//   useEffect(() => {
//     if (warehouses.length > 0) {
//       fetchProducts();
//     }
//   }, [warehouses]);

//   useEffect(() => {
//     if (products.length > 0 && customers.length > 0) {
//       fetchOrders();
//     }
//   }, [products, customers]);

//   // === Map ID → tên ===
//   const getCustomerName = id => {
//     const c = customers.find(c => c.customerID === id);
//     return c ? `${c.firstName || ''} ${c.lastName || ''}`.trim() : `#${id}`;
//   };
//   const getEmployeeName = id => {
//     const e = employees.find(e => e.employeID === id);
//     return e ? `${e.firstName || ''} ${e.lastName || ''}`.trim() : `#${id}`;
//   };
//   const getServiceName = id => {
//     const s = services.find(s => s.serID === id);
//     return s ? s.serName || s.serviceName : `#${id}`;
//   };

//   // === Kiểm tra username để lấy customer + address ===
//   const handleCheckUsername = async () => {
//     if (!username) {
//       toast.error('Vui lòng nhập username');
//       return;
//     }
//     try {
//       const allUsers = await userServices.getUser();
//       const user = allUsers.find(u => u.userName.toLowerCase() === username.toLowerCase());
//       if (!user) {
//         toast.error('Không tìm thấy user');
//         return;
//       }
//       const allCustomers = await customerServices.getCustomer();
//       const cust = allCustomers.find(c => c.userID === user.userID);
//       if (!cust) {
//         toast.error('User này chưa có thông tin customer');
//         return;
//       }
//       setSelectedCustomer(cust);
//       const allAddresses = await addressServices.getAddress();
//       const userAddresses = allAddresses.filter(a => a.userID === user.userID);
//       setAddresses(userAddresses);
//       if (userAddresses.length === 1) setSelectedAddressID(userAddresses[0].addressID);
//       toast.success('Tìm thấy user và thông tin customer');
//     } catch (err) {
//       console.error(err);
//       toast.error('Lỗi khi kiểm tra username');
//     }
//   };

//   // === Thêm employee ===
//   const handleAddEmployee = async () => {
//     if (!selectedCustomer || bookings.length === 0 || !selectedAddressID) {
//       toast.error('Vui lòng kiểm tra đầy đủ thông tin');
//       return;
//     }
//     setAddingEmployee(true);
//     try {
//       const storeIDFromBooking = bookings[0].storeID;
//       const payload = {
//         employeID: 0,
//         firstName: selectedCustomer.firstName,
//         lastName: selectedCustomer.lastName,
//         picture: selectedCustomer.picture || '',
//         email: selectedCustomer.email,
//         numberphone: selectedCustomer.numberphone,
//         dateOfBirth: selectedCustomer.dateOfBirth,
//         wordDay: new Date().toISOString(),
//         userID: selectedCustomer.userID,
//         storeID: storeIDFromBooking,
//         addressID: selectedAddressID,
//       };
//       const res = await employeeServices.createEmployee(payload);
//       setEmployees(prev => [...prev, res]);
//       toast.success('Thêm nhân viên thành công!');
//       setUsername('');
//       setSelectedCustomer(null);
//       setAddresses([]);
//       setSelectedAddressID(0);
//     } catch (err) {
//       console.error(err);
//       toast.error('Thêm nhân viên thất bại!');
//     } finally {
//       setAddingEmployee(false);
//     }
//   };

//   // === Thêm sản phẩm ===
//   const handleAddProduct = async () => {
//     if (!proName || !proImage || !price || !quantity || !proDescription) {
//       toast.error('Vui lòng điền đầy đủ thông tin sản phẩm!');
//       return;
//     }
//     if (producerID === 0 || warehouseID === 0 || cateID === 0) {
//       toast.error('Vui lòng chọn đầy đủ nhà sản xuất, kho và loại sản phẩm!');
//       return;
//     }
//     setAddingProduct(true);
//     try {
//       await productServices.createProduct(
//         proName.trim(),
//         proImage.trim(),
//         Number(price),
//         Number(quantity),
//         proDescription.trim(),
//         Number(producerID),
//         Number(warehouseID),
//         Number(cateID)
//       );
//       toast.success('Thêm sản phẩm thành công!');
//       setProName('');
//       setProImage('');
//       setPrice(0);
//       setQuantity(0);
//       setProDescription('');
//       setProducerID(0);
//       setWarehouseID(0);
//       setCateID(0);
//     } catch (err) {
//       console.error(err);
//       toast.error('Thêm sản phẩm thất bại!');
//     } finally {
//       setAddingProduct(false);
//     }
//   };

//   if (loading) return <div style={{ padding: 20 }}>Đang tải...</div>;
//   if (userRole !== '3') return <div style={{ padding: 20 }}>❌ Bạn không có quyền truy cập trang này</div>;

//   return (
//     <div className={styles['admin-container']}>
//       <h2 className={styles['page-title']}>📋 Lịch booking cửa hàng của bạn</h2>

//       {/* Thêm nhân viên */}
//       <div className={styles['section-box']}>
//         <h3 className={styles['section-title']}>➕ Thêm nhân viên bằng username</h3>
//         <div className={styles['form-inline']}>
//           <input type="text" placeholder="Username nhân viên" value={username} onChange={e => setUsername(e.target.value)} />
//           <button onClick={handleCheckUsername}>Kiểm tra</button>
//         </div>
//         {selectedCustomer && (
//           <div className={styles['customer-card']}>
//             <p><strong>Họ tên:</strong> {selectedCustomer.firstName} {selectedCustomer.lastName}</p>
//             <p><strong>Email:</strong> {selectedCustomer.email}</p>
//             <p><strong>SĐT:</strong> {selectedCustomer.numberphone}</p>
//             <p><strong>Ngày sinh:</strong> {selectedCustomer.dateOfBirth}</p>
//             <label>Chọn địa chỉ:</label>
//             <select value={selectedAddressID} onChange={e => setSelectedAddressID(Number(e.target.value))}>
//               <option value={0}>Chọn address</option>
//               {addresses.map(a => (
//                 <option key={a.addressID} value={a.addressID}>{a.currentAddress}, {a.district}, {a.cityID}</option>
//               ))}
//             </select>
//             <button onClick={handleAddEmployee} disabled={addingEmployee}>
//               {addingEmployee ? 'Đang thêm...' : 'Thêm nhân viên'}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Thêm sản phẩm */}
//       <div className={styles['section-box']}>
//         <h3 className={styles['section-title']}>➕ Thêm sản phẩm mới</h3>
//         <div className={styles['product-form']}>
//           <input type="text" placeholder="Tên sản phẩm" value={proName} onChange={e => setProName(e.target.value)} />
//           <input type="text" placeholder="Link ảnh" value={proImage} onChange={e => setProImage(e.target.value)} />
//           <input type="number" placeholder="Giá" value={price} onChange={e => setPrice(e.target.value)} />
//           <input type="number" placeholder="Số lượng" value={quantity} onChange={e => setQuantity(e.target.value)} />
//           <textarea placeholder="Mô tả (tối đa 100 chữ)" maxLength={100} value={proDescription} onChange={e => setProDescription(e.target.value)} />
//           <select value={producerID} onChange={e => setProducerID(Number(e.target.value))}>
//             <option value={0}>Chọn nhà sản xuất</option>
//             {producers.map(p => <option key={p.producerID} value={p.producerID}>{p.producerName}</option>)}
//           </select>
//           <select value={warehouseID} onChange={e => setWarehouseID(Number(e.target.value))}>
//             <option value={0}>Chọn kho</option>
//             {warehouses.map(w => <option key={w.warehouseID} value={w.warehouseID}>{w.warehouseName}</option>)}
//           </select>
//           <select value={cateID} onChange={e => setCateID(Number(e.target.value))}>
//             <option value={0}>Chọn loại sản phẩm</option>
//             {categories.map(c => <option key={c.cateID} value={c.cateID}>{c.cateName}</option>)}
//           </select>
//           <button onClick={handleAddProduct} disabled={addingProduct}>
//             {addingProduct ? 'Đang thêm...' : 'Thêm sản phẩm'}
//           </button>
//         </div>
//       </div>

//       {/* Bảng Booking */}
//       <h3 className={styles['section-title']}>📋 Danh sách Booking</h3>
//       {bookings.length === 0 ? (
//         <p>Không có booking nào.</p>
//       ) : (
//         <CustomTable
//           headers={['ID Booking', 'Ngày', 'Giờ', 'Ghi chú', 'Khách hàng', 'Dịch vụ', 'Nhân viên']}
//           data={bookings.map(b => ({
//             ID: b.bookingID,
//             Ngay: b.startDate,
//             Gio: b.startTime,
//             GhiChu: b.note || '-',
//             KhachHang: getCustomerName(b.customerID),
//             DichVu: getServiceName(b.serID),
//             NhanVien: getEmployeeName(b.employeID),
//           }))}
//           loading={loading}
//         />
//       )}

//       {/* Bảng Order */}
//       <h3 className={styles['section-title']}>📦 Danh sách Order (sản phẩm trong kho của bạn)</h3>
//       {filteredOrders.length === 0 ? (
//         <p>Không có order nào.</p>
//       ) : (
//         <CustomTable
//           headers={['ID Order', 'Ngày tạo', 'Khách hàng', 'Tổng tiền', 'Trạng thái']}
//           data={filteredOrders.map(o => ({
//             ID: o.ID,
//             NgayTao: o.Ngay,
//             KhachHang: o.KhachHang,
//             TongTien: o.TongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
//             TrangThai: o.TrangThai,
//           }))}
//           loading={loadingOrders}
//         />
        
//       )}
//       <BookingNotificationButton storeIDs={storeIDs} userRole={userRole} />

//     </div>
//   );
// }

// export default AdminBookingPage;
    import React, { useCallback, useEffect, useState } from 'react'; 
    import { toast } from 'react-toastify'; 
    import { Modal } from 'react-bootstrap'; 
    import CustomTable from '~/components/common/CustomTable/CustomTable'; 
    import { jwtDecode } from 'jwt-decode'; 
    import BookingWarning from '~/components/common/BookingWarning';
    // Import Services
    import * as storeRequestServices from '~/services/storeRequestServices'; 
    import * as bookingServices from '~/services/bookServices'; 
    import * as customerServices from '~/services/customerService'; 
    import * as employeeServices from '~/services/employeeServices'; 
    import * as serviceServices from '~/services/serviceServices'; 
    import * as userServices from '~/services/userServices'; 
    import * as addressServices from '~/services/addressServices'; 
    import * as productServices from '~/services/productServices'; 
    import * as producerServices from '~/services/producerServices'; 
    import * as categoryServices from '~/services/categoryProductServices'; 
    import * as warehouseServices from '~/services/warehouseServices'; 
    import * as productOrderServices from '~/services/productOrderServices'; 
    import * as orderServices from '~/services/orderServices'; 
    import * as storeServices from '~/services/storeServices'; // Bổ sung Store Service
    import styles from './AdminBookingPage.module.scss'; 
    import { sendAutoEmail } from '~/utils/emailService';
    const BOOKING_COUNT_KEY = 'booking_count_at_login';

    function AdminBookingPage() {
        const token = localStorage.getItem('token');
        const [loadingAuth, setLoadingAuth] = useState(true);
        // === Booking + user ===
        const [bookings, setBookings] = useState([]);
        const [loading, setLoading] = useState(true);
        const [userRole, setUserRole] = useState(null);
        const [userID, setUserID] = useState(null);
        const [storeIDs, setStoreIDs] = useState([]);
        const [customers, setCustomers] = useState([]);
        const [employees, setEmployees] = useState([]);
        const [services, setServices] = useState([]);
        const [allStores, setAllStores] = useState([]); // THÊM STATE: Lưu danh sách Stores
        
        // === Order + Product ===
        const [filteredOrders, setFilteredOrders] = useState([]);
        const [loadingOrders, setLoadingOrders] = useState(true);
        const [products, setProducts] = useState([]);
        const [warehouses, setWarehouses] = useState([]);
        
        // === Thêm nhân viên ===
        const [username, setUsername] = useState('');
        const [selectedCustomer, setSelectedCustomer] = useState(null);
        const [addresses, setAddresses] = useState([]);
        const [selectedAddressID, setSelectedAddressID] = useState(0);
        const [selectedStoreID, setSelectedStoreID] = useState(0); 
        const [addingEmployee, setAddingEmployee] = useState(false);
        
        // === Thêm sản phẩm ===
        const [proName, setProName] = useState('');
        const [proImage, setProImage] = useState('');
        const [price, setPrice] = useState(0);
        const [quantity, setQuantity] = useState(0);
        const [proDescription, setProDescription] = useState('');
        const [producerID, setProducerID] = useState(0);
        const [warehouseID, setWarehouseID] = useState(0);
        const [cateID, setCateID] = useState(0);
        const [producers, setProducers] = useState([]);
        const [categories, setCategories] = useState([]);
        const [addingProduct, setAddingProduct] = useState(false);
        const [previousBookings, setPreviousBookings] = useState([]);

        // === Modal quản lý nhân viên ===
        const [showEmployeeModal, setShowEmployeeModal] = useState(false);
        const [editingEmployee, setEditingEmployee] = useState(null); 
        // ... (Trong phần khai báo state)
    // === Order Status Management ===
    const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newOrderStatus, setNewOrderStatus] = useState('');
    // ...
        // === Modal Xử lý Booking ===
        const [showBookingDetailModal, setShowBookingDetailModal] = useState(false);
        const [selectedBooking, setSelectedBooking] = useState(null);
        const [newStatus, setNewStatus] = useState('');
        const [showPersonalPage, setPersonalPage] = useState(false);
        // === Modal quản lý sản phẩm ===
        const [showProductModal, setShowProductModal] = useState(false);
        const [editingProduct, setEditingProduct] = useState(null);
        // === Lấy role + userID từ token ===
        
        useEffect(() => {
            if (!token) {
                setLoading(false);
                setPersonalPage(false);
                return;
            }
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
                setUserID(decoded.userID);
                setPersonalPage(true);
                setLoadingAuth(false);
            } catch (err) {
                console.error('Token không hợp lệ:', err);
                setPersonalPage(false);
            }
        }, [token]);
        
        // === Lấy storeID của admin ===
        const fetchStoreIDs = useCallback(async () => {
            if (!userID) return;
            try {
                const storeRequests = await storeRequestServices.getAllStoreRequests();
                const myStoreIDs = storeRequests
                    .filter(sr => Number(sr.userID) === Number(userID))
                    .map(sr => sr.storeID);
                setStoreIDs(myStoreIDs);
                // Đặt storeID mặc định nếu có ít nhất một cửa hàng
                if (myStoreIDs.length > 0) {
                    setSelectedStoreID(myStoreIDs[0]); 
                }
            } catch (err) {
                console.error(err);
                toast.error('Không thể lấy thông tin cửa hàng!');
            }
        }, [userID]);
        
        // === Lấy dữ liệu hỗ trợ (Bao gồm cả Stores) ===
        const fetchSupportData = useCallback(async () => {
            try {
                const [allCustomers, allEmployees, allServices, allProducers, allCategories, allStoresData] = await Promise.all([
                    customerServices.getCustomer(),
                //  employeeServices.getEmployee(),
                    serviceServices.getService(),
                    producerServices.getProducer(),
                    categoryServices.getCategory(),
                    storeServices.getStore(), // THÊM: Tải danh sách cửa hàng
                ]);
                setCustomers(allCustomers || []);
                //setEmployees(allEmployees || []);
                setServices(allServices || []);
                setProducers(allProducers || []);
                setCategories(allCategories || []);
                setAllStores(allStoresData || []); // LƯU DANH SÁCH STORES
            } catch (err) {
                console.error(err);
                toast.error('Không thể tải dữ liệu hỗ trợ!');
            }
        }, []);
        
        // === Lấy warehouse theo storeID ===
        const fetchWarehouses = useCallback(async () => {
            if (storeIDs.length === 0) return;
            try {
                const allWarehouses = await warehouseServices.getWarehouse();
                const filtered = allWarehouses.filter(w => storeIDs.includes(Number(w.storeID)));
                setWarehouses(filtered);
            } catch (err) {
                console.error(err);
                toast.error('Không thể tải danh sách kho!');
            }
        }, [storeIDs]);
        
        // === Lấy product theo warehouseID ===
        const fetchProducts = useCallback(async () => {
            if (warehouses.length === 0) return;
            try {
                const allProducts = await productServices.getProduct();
                const warehouseIDs = warehouses.map(w => w.warehouseID);
                const filtered = allProducts.filter(p => warehouseIDs.includes(Number(p.warehouseID)));
                setProducts(filtered);
            } catch (err) {
                console.error(err);
                toast.error("Không thể tải sản phẩm của kho!");
            }
        }, [warehouses]);
        
        // === Lấy bookings ===
      /* ===============================
  HÀM TẢI BOOKING (ĐÃ TỐI ƯU HÓA LOGIC PHÁT HIỆN THAY ĐỔI)
=============================== */
const fetchBookings = useCallback(async (isAuto = false) => {
    if (storeIDs.length === 0) return;

    try {
        const allBookings = await bookingServices.getBook();
        const myBookings = allBookings.filter(b =>
            storeIDs.includes(Number(b.storeID))
        );

        const currentCount = myBookings.length;
        const storedCount = Number(localStorage.getItem(BOOKING_COUNT_KEY));

        // ✅ LẦN ĐẦU → LƯU, KHÔNG BÁO
        if (!storedCount && storedCount !== 0) {
            localStorage.setItem(BOOKING_COUNT_KEY, currentCount);
            setBookings(myBookings);
            return;
        }

        // ✅ AUTO CHECK → CHỈ BÁO KHI TĂNG
        if (isAuto && currentCount > storedCount) {
            const diff = currentCount - storedCount;
            toast.info(`🔔 Có ${diff} lịch đặt mới`, { autoClose: 5000 });
        }

        localStorage.setItem(BOOKING_COUNT_KEY, currentCount);
        setBookings(myBookings);
    } catch (error) {
        toast.error('Không thể tải danh sách booking');
    }
}, [storeIDs]);

    useEffect(() => {
        if (storeIDs.length === 0) return;

        // Lần đầu load
        fetchBookings(false);

        // ✅ AUTO REFRESH
        const interval = setInterval(() => {
            fetchBookings(true);
            }, 30000); // 30s

            return () => clearInterval(interval);
        }, [storeIDs, fetchBookings]);
        const handleDeleteProduct = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) return;
        try {
            await productServices.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.proID !== id));
            toast.success('Xoá sản phẩm thành công!');
        } catch (err) {
            console.error(err);
            toast.error('Xoá sản phẩm thất bại!');
        }
    };
        const handleEditProduct = async (product) => {
        setEditingProduct(product);
        setProName(product.proName);
        setProImage(product.proImage);
        setPrice(product.price);
        setQuantity(product.quantity);
        setProDescription(product.proDescription);
        setProducerID(product.producerID);
        setWarehouseID(product.warehouseID);
        setCateID(product.cateID);
        setShowProductModal(true);
    };

    const handleUpdateProduct = async () => {
        if (!editingProduct) return;
        try {
            await productServices.updateProduct(
                editingProduct.proID,
                proName.trim(),
                proImage.trim(),
                Number(price),
                Number(quantity),
                proDescription.trim(),
                Number(producerID),
                Number(warehouseID),
                Number(cateID)
            );
            toast.success('Cập nhật sản phẩm thành công!');
            setEditingProduct(null);
            setShowProductModal(false);
            fetchProducts();
        } catch (err) {
            console.error(err);
            toast.error('Cập nhật thất bại!');
        }
    };

        // === Lấy Orders và ProductOrders ===
        const fetchOrders = useCallback(async () => {
            if (products.length === 0) return;
            setLoadingOrders(true);
            try {
                const [allProductOrders, allOrders] = await Promise.all([
                    productOrderServices.getProductOrder(),
                    orderServices.getOrder(),
                ]);
                const productIDs = products.map(p => p.proID);
                const filteredProductOrders = allProductOrders.filter(po => productIDs.includes(po.proID));
                const orderMap = {};
                filteredProductOrders.forEach(po => {
                    const product = products.find(p => p.proID === po.proID);
                    const amount = product ? product.price * po.proOrderQuantity : 0;
                    
                    if (!orderMap[po.orderID]) {
                        orderMap[po.orderID] = { total: 0, items: [] };
                    }
                    orderMap[po.orderID].total += amount;
                    orderMap[po.orderID].items.push(po);
                });
            const orderData = allOrders
                .filter(o => orderMap[o.orderID])
                .map(o => ({
                    ID: o.orderID,
                    Ngay: o.orderDate ? new Date(o.orderDate).toLocaleString() : '-', 
                    KhachHang: customers.find(c => c.customerID === o.customerID) 
                        ? `${customers.find(c => c.customerID === o.customerID).firstName} ${customers.find(c => c.customerID === o.customerID).lastName}` 
                        : `#${o.customerID}`,
                    TongTien: o.totalInvoice || orderMap[o.orderID].total,
                    TrangThai: o.orderStatus || '-',
                }));
                setFilteredOrders(orderData);
            } catch (err) {
                console.error(err);
                toast.error('Không thể tải order!');
            } finally {
                setLoadingOrders(false);
            }
        }, [products, customers]);
        
        // --- useEffect tổng hợp ---
        useEffect(() => {
            if (userID) {
                fetchStoreIDs();
                fetchSupportData();
            }
        }, [userID, fetchStoreIDs, fetchSupportData]);
        
        useEffect(() => {
            if (storeIDs.length > 0) {
                fetchBookings();
                fetchWarehouses();
            }
        }, [storeIDs, fetchBookings, fetchWarehouses]);
        
        useEffect(() => {
            if (warehouses.length > 0) fetchProducts();
        }, [warehouses, fetchProducts]);
        
        useEffect(() => {
            if (products.length > 0 && customers.length > 0) fetchOrders();
        }, [products, customers, fetchOrders]);
        
        // === Map ID → tên UTILITIES ===
        const getCustomerName = id => {
            const c = customers.find(c => c.customerID === id);
            return c ? `${c.firstName || ''} ${c.lastName || ''}`.trim() : `#${id}`;
        };
        const getEmployeeName = id => {
            const e = employees.find(e => e.employeID === id);
            return e ? `${e.firstName || ''} ${e.lastName || ''}`.trim() : `#${id}`;
        };
        const getServiceName = id => {
            const s = services.find(s => s.serID === id);
            return s ? s.serName || s.serviceName : `#${id}`;
        };
        
        // HÀM MỚI: Lấy tên cửa hàng
        const getStoreName = id => {
            const store = allStores.find(s => Number(s.storeID) === Number(id));
            return store ? store.storeName : `ID: ${id}`;
        };
        // =============================
        
        // === Xử lý Cập nhật trạng thái Booking (Ví dụ) ===
        const handleUpdateBookingStatus = async () => {
            if (!selectedBooking || !newStatus) {
                toast.error('Vui lòng chọn trạng thái mới!');
                return;
            }
            try {
                await bookingServices.updateBook(selectedBooking.bookID, newStatus);
                
                toast.success(`Cập nhật trạng thái Booking #${selectedBooking.bookID} thành công!`);
                
                fetchBookings(); // Tải lại danh sách bookings
                
                setShowBookingDetailModal(false);
            } catch (err) {
                console.error(err);
                toast.error('Cập nhật trạng thái thất bại!');
            }
        };
        
        // === Quản lý nhân viên Modal ===
        const fetchStoreEmployees = useCallback(async () => {
            if (storeIDs.length === 0) return;
            try {
                const allEmployees = await employeeServices.getEmployee();
                const filtered = allEmployees.filter(e => storeIDs.includes(Number(e.storeID)));
                setEmployees(filtered);
            } catch (err) {
                console.error(err);
                toast.error('Không thể tải danh sách nhân viên!');
            }
        }, [storeIDs]);
        
        const handleDeleteEmployee = async (id) => {
            if (!window.confirm('Bạn có chắc muốn xoá nhân viên này?')) return;
            try {
                await employeeServices.deleteEmployee(id);
                setEmployees(prev => prev.filter(e => e.employeID !== id));
                toast.success('Xoá nhân viên thành công!');
            } catch (err) {
                console.error(err);
                toast.error('Xoá nhân viên thất bại!');
            }
        };
        // ✅ THÊM useEffect NGAY DƯỚI ĐÂY
    useEffect(() => {
        if (storeIDs.length > 0) {
            fetchStoreEmployees();
        }
    }, [storeIDs, fetchStoreEmployees]);
        // === Kiểm tra username để lấy customer + address ===
        const handleCheckUsername = async () => {
            if (!username) {
                toast.error('Vui lòng nhập username');
                return;
            }
            try {
                const allUsers = await userServices.getUser();
                const user = allUsers.find(u => u.userName.toLowerCase() === username.toLowerCase());
                if (!user) {
                    toast.error('Không tìm thấy user');
                    return;
                }
                const allCustomers = await customerServices.getCustomer();
                const cust = allCustomers.find(c => c.userID === user.userID);
                if (!cust) {
                    toast.error('User này chưa có thông tin customer');
                    return;
                }
                setSelectedCustomer(cust);
                
                const allAddresses = await addressServices.getAddress();
                const userAddresses = allAddresses.filter(a => a.userID === user.userID);
                setAddresses(userAddresses);
                if (userAddresses.length === 1) setSelectedAddressID(userAddresses[0].addressID);
                toast.success('Tìm thấy user và thông tin customer');
            } catch (err) {
                console.error(err);
                toast.error('Lỗi khi kiểm tra username');
            }
        };
        
        // === Thêm employee ===
        const handleAddEmployee = async () => {
            if (!selectedCustomer || selectedStoreID === 0 || !selectedAddressID) {
                toast.error('Vui lòng kiểm tra đầy đủ thông tin (Khách hàng, Cửa hàng và Địa chỉ)');
                return;
            }
            setAddingEmployee(true);
            try {
                const payload = {
                    employeID: 0,
                    firstName: selectedCustomer.firstName,
                    lastName: selectedCustomer.lastName,
                    picture: selectedCustomer.picture || '',
                    email: selectedCustomer.email,
                    numberphone: selectedCustomer.numberphone,
                    dateOfBirth: selectedCustomer.dateOfBirth,
                    wordDay: new Date().toISOString(),
                    userID: selectedCustomer.userID,
                    storeID: Number(selectedStoreID), 
                    addressID: selectedAddressID,
                };
                const res = await employeeServices.createEmployee(payload);
                setEmployees(prev => [...prev, res]);
                toast.success('Thêm nhân viên thành công!');
                
                // Reset form
                setUsername('');
                setSelectedCustomer(null);
                setAddresses([]);
                setSelectedAddressID(0);
            } catch (err) {
                console.error(err);
                toast.error('Thêm nhân viên thất bại!');
            } finally {
                setAddingEmployee(false);
            }
        };
        
        // === Thêm sản phẩm ===
        const handleAddProduct = async () => {
            if (!proName || !proImage || !price || !quantity || !proDescription) {
                toast.error('Vui lòng điền đầy đủ thông tin sản phẩm!');
                return;
            }
            if (producerID === 0 || warehouseID === 0 || cateID === 0) {
                toast.error('Vui lòng chọn đầy đủ nhà sản xuất, kho và loại sản phẩm!');
                return;
            }
            setAddingProduct(true);
            try {
                await productServices.createProduct(
                    proName.trim(), 
                    proImage.trim(), 
                    Number(price), 
                    Number(quantity), 
                    proDescription.trim(), 
                    Number(producerID), 
                    Number(warehouseID), 
                    Number(cateID)
                );
                toast.success('Thêm sản phẩm thành công!');
                
                // Reset form
                setProName('');
                setProImage('');
                setPrice(0);
                setQuantity(0);
                setProDescription('');
                setProducerID(0);
                setWarehouseID(0);
                setCateID(0);
                fetchProducts(); // Tải lại danh sách sản phẩm
            } catch (err) {
                console.error(err);
                toast.error('Thêm sản phẩm thất bại!');
            } finally {
                setAddingProduct(false);
            }
        };
        // === Xử lý Cập nhật trạng thái Order ===
    
        // ===== AUTH GUARD =====
        if (loadingAuth) {
            return <div style={{ padding: 20 }}>Đang kiểm tra đăng nhập...</div>;
        }
        if (!token || !userID) {
            return <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />;
        }
        if (userRole !== '3') {
            return (
                <div style={{ padding: 30, textAlign: 'center', color: 'red', fontSize: 18 }}>
                    ❌ Bạn không có quyền truy cập trang này
                </div>
            );
        }
        // === Xử lý Cập nhật trạng thái Order ===
    const handleUpdateOrderStatus = async () => {
        if (!selectedOrder || !newOrderStatus) {
            toast.error('Vui lòng chọn trạng thái mới!');
            return;
        }
        try {
            // Giả định bạn có hàm updateOrderStatus trong orderServices
            // Cần triển khai hàm này trong API services của bạn
            // payload cần có Order ID và trạng thái mới
            await orderServices.updateOrderStatus(selectedOrder.ID, newOrderStatus); 
            
            toast.success(`Cập nhật trạng thái Order #${selectedOrder.ID} thành công!`);
            
            // Tải lại danh sách orders
            fetchOrders(); 
            
            setShowOrderStatusModal(false);
        } catch (err) {
            console.error(err);
            toast.error('Cập nhật trạng thái Order thất bại!');
        }
    };
    const handleDeleteBooking = async (bookingID) => {
        const booking = bookings.find(b => b.bookingID === bookingID);
        if (!booking) return;

        if (!window.confirm('Bạn chắc chắn muốn xoá booking này?')) return;

        try {
            await bookingServices.deleteBook(bookingID);

            // ✅ Lấy thông tin khách hàng
            const customer = customers.find(c => c.customerID === booking.customerID);
            const storeName = allStores.find(s => s.storeID === booking.storeID)?.storeName;

            // ✅ GỬI EMAIL SAU KHI XOÁ
            if (customer) {
                await sendAutoEmail({
                    email: customer.email,
                    customer_name: `${customer.firstName} ${customer.lastName}`,
                    date: booking.bookingDate,
                    time: booking.bookingTime,
                    store: storeName || 'Cửa hàng'
                });
            }

            toast.success('🗑️ Booking đã bị xoá & Email đã gửi');
            fetchBookings();

        } catch (error) {
            console.error('❌ Lỗi xoá booking:', error);
            toast.error('Không thể xoá booking');
        }
    };

        // ===============================================
        // III. PHẦN RENDER (ĐÃ CHỈNH SỬA)
        // ===============================================
        return (
            
    
    <div className={styles['admin-container']}>
        <h2 className={styles['page-title']}>📋 Quản lý Cửa hàng và Nghiệp vụ</h2>

        {/* === KHỐI FORM THÊM NHÂN VIÊN & SẢN PHẨM === */}
        <div className={styles['dashboard-forms']}>
        {/* Form Thêm Nhân Viên */}
        <div className={styles['form-box']}>
            <h3>➕ Thêm Nhân viên mới</h3>
            <div className={styles['form-inline']}>
            <input
                type="text"
                placeholder="Username nhân viên"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <button onClick={handleCheckUsername} className={styles['btn-primary']}>Kiểm tra User</button>
            </div>

            {selectedCustomer && (
            <div className={styles['customer-card']}>
                <p><strong>User:</strong> {selectedCustomer.firstName} {selectedCustomer.lastName} ({selectedCustomer.email})</p>

                {storeIDs.length > 0 && (
                <div className={styles['field-group']}>
                    <label>Gán vào Cửa hàng:</label>
                    <select value={selectedStoreID} onChange={e => setSelectedStoreID(Number(e.target.value))}>
                    <option value={0}>Chọn Store</option>
                    {storeIDs.map(id => (
                        <option key={id} value={id}>{getStoreName(id)}</option>
                    ))}
                    </select>
                </div>
                )}

                <div className={styles['field-group']}>
                <label>Chọn địa chỉ:</label>
                <select value={selectedAddressID} onChange={e => setSelectedAddressID(Number(e.target.value))}>
                    <option value={0}>Chọn address</option>
                    {addresses.map(a => (
                    <option key={a.addressID} value={a.addressID}>
                        {a.currentAddress}, {a.district}, {a.cityID}
                    </option>
                    ))}
                </select>
                </div>

                <button
                onClick={handleAddEmployee}
                disabled={addingEmployee || selectedStoreID === 0 || selectedAddressID === 0}
                className={styles['btn-secondary']}
                >
                {addingEmployee ? 'Đang thêm...' : 'Thêm Nhân viên'}
                </button>
            </div>
            )}
        </div>

        {/* Form Thêm Sản Phẩm */}
        <div className={styles['form-box']}>
            <h3>📦 Thêm Sản phẩm mới</h3>
            <div className={styles['product-form']}>
            <input type="text" placeholder="Tên sản phẩm" value={proName} onChange={e => setProName(e.target.value)} />
            <input type="text" placeholder="Hình ảnh URL" value={proImage} onChange={e => setProImage(e.target.value)} />
            <input type="number" placeholder="Giá" value={price} onChange={e => setPrice(e.target.value)} />
            <input type="number" placeholder="Số lượng" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <textarea placeholder="Mô tả" value={proDescription} onChange={e => setProDescription(e.target.value)} />

            <select value={producerID} onChange={e => setProducerID(Number(e.target.value))}>
                <option value={0}>Chọn nhà sản xuất</option>
                {producers.map(p => <option key={p.producerID} value={p.producerID}>{p.producerName}</option>)}
            </select>
            <select value={warehouseID} onChange={e => setWarehouseID(Number(e.target.value))}>
                <option value={0}>Chọn kho</option>
                {warehouses.map(w => <option key={w.warehouseID} value={w.warehouseID}>{w.warehouseName}</option>)}
            </select>
            <select value={cateID} onChange={e => setCateID(Number(e.target.value))}>
                <option value={0}>Chọn loại sản phẩm</option>
                {categories.map(c => <option key={c.cateID} value={c.cateID}>{c.cateName}</option>)}
            </select>

            <button onClick={handleAddProduct} disabled={addingProduct} className={styles['btn-primary']}>
                {addingProduct ? 'Đang thêm...' : 'Thêm sản phẩm'}
            </button>
            </div>
        </div>
        </div>

        <hr className={styles['divider']} />

        {/* === DANH SÁCH NHÂN VIÊN === */}
        <div className={styles['table-section']}>
        <h3>👥 Danh sách Nhân viên</h3>
        {employees.length === 0 ? <p>Chưa có nhân viên nào.</p> : (
            <table className={styles['table']}>
            <thead>
                <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Ngày sinh</th>
                <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(emp => (
                <tr key={emp.employeID}>
                    <td>{emp.employeID}</td>
                    <td>{emp.firstName} {emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.numberphone}</td>
                    <td>{emp.dateOfBirth}</td>
                    <td>
                    <button onClick={() => setEditingEmployee(emp)}>Sửa</button>
                    <button onClick={() => handleDeleteEmployee(emp.employeID)}>Xoá</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>

        {/* === DANH SÁCH SẢN PHẨM === */}
        <div className={styles['table-section']}>
        <h3>📦 Danh sách Sản phẩm</h3>
        {products.length === 0 ? <p>Chưa có sản phẩm nào.</p> : (
            <table className={styles['table']}>
            <thead>
                <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Nhà sản xuất</th>
                <th>Kho</th>
                <th>Loại</th>
                <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                <tr key={p.proID}>
                    <td>{p.proID}</td>
                    <td>{p.proName}</td>
                    <td><img src={p.proImage} alt={p.proName} style={{ width: 50, height: 50 }} /></td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{producers.find(pr => pr.producerID === p.producerID)?.producerName || '-'}</td>
                    <td>{warehouses.find(w => w.warehouseID === p.warehouseID)?.warehouseName || '-'}</td>
                    <td>{categories.find(c => c.cateID === p.cateID)?.cateName || '-'}</td>
                    <td>
                    <button onClick={() => handleEditProduct(p)}>Sửa</button>
                    <button onClick={() => handleDeleteProduct(p.proID)}>Xoá</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>

        {/* === DANH SÁCH BOOKING & ORDER === */}
        <div className={styles['dashboard-tables']}>
        <div className={styles['table-box']}>
            <h3>📅 Danh sách Booking</h3>
            <CustomTable
            headers={['ID', 'Ngày đặt', 'Khách hàng', 'Nhân viên', 'Dịch vụ', 'Trạng thái', 'Hành động']}
            data={bookings.map(b => ({
                ID: b.bookingID,
                Ngay: `${b.startDate} ${b.startTime}`,
                KhachHang: getCustomerName(b.customerID),
                NhanVien: getEmployeeName(b.employeID),
                DichVu: getServiceName(b.serID),
                TrangThai: b.status || '-',
                HanhDong: (
                <button
                    onClick={handleDeleteBooking }
                    className={styles['btn-action']}
                >
                    xoá
                </button>
                )
            }))}
            />
        </div>

        // Table Orders
    <div className={styles['section-box']}>
        <h3 className={styles['section-title-clean']}>🛒 Danh sách Order</h3>
        <CustomTable 
            className={styles['data-table-minimal']}
            headers={['ID', 'Ngày', 'Khách hàng', 'Tổng tiền', 'Trạng thái', 'Hành động']}
            data={filteredOrders.map(o => ({
                ...o, 
                HanhDong: (
                    <button
                        onClick={() => {
                            setSelectedOrder(o);
                            setNewOrderStatus(o.TrangThai || '');
                            setShowOrderStatusModal(true); // Kích hoạt modal mới
                        }}
                        className={styles['btn-action']}
                    >
                        Xử lý
                    </button>
                )
            }))}
        />
    </div>
    {/* Modal Xử lý Trạng thái Order */}
    <table className={styles['table-in-modal']}>
    <Modal show={showOrderStatusModal} onHide={() => setShowOrderStatusModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Xử lý Trạng thái Order #{selectedOrder?.ID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {selectedOrder && (
                <div>
                    <p>Khách hàng: <strong>{selectedOrder.KhachHang}</strong></p>
                    <p>Tổng tiền: <strong>{selectedOrder.TongTien}</strong></p>
                    <p>Trạng thái hiện tại: <strong>{selectedOrder.TrangThai || 'Chờ xác nhận'}</strong></p>
                    
                    <hr/>
                    
                    <label>Cập nhật Trạng thái:</label>
    <select 
        value={newOrderStatus} 
        onChange={e => setNewStatus(e.target.value)}
        className={styles['select-clean']} // <-- Thêm lớp styling vào đây
    >
        <option value="">-- Chọn trạng thái --</option>
        <option value="Đã xác nhận">Đã xác nhận</option>
        <option value="Đang đóng gói">Đang đóng gói</option>
        <option value="Đang giao hàng">Đang giao hàng</option>
        <option value="Hoàn thành">Hoàn thành</option>
        <option value="Đã hủy">Đã hủy</option>
    </select>
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
            <button 
                onClick={handleUpdateOrderStatus} 
                disabled={!newOrderStatus || newOrderStatus === selectedOrder?.TrangThai}
                className={styles['btn-primary']}
            >
                Lưu trạng thái
            </button>
            <button onClick={() => setShowOrderStatusModal(false)} className={styles['btn-secondary']}>Đóng</button>
        </Modal.Footer>
    </Modal>
    </table>
        </div>
    </div>
    );

            
        

    }
    export default AdminBookingPage;