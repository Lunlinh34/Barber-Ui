// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';
// import styles from '../OrderSuccessPage/OrderSuccessPage.module.scss';
// import * as orderServices from '~/services/orderServices';
// import * as productOrderServices from '~/services/productOrderServices';
// import * as productServices from '~/services/productServices';
// import * as customerService from '~/services/customerService';
// import { convertPrice } from '~/utils/convert';
// import Image from '~/components/common/Image';
// import BookingWarning from '~/components/common/BookingWarning';

// const cx = classNames.bind(styles);

// function CustomerOrdersPage() {
//     const [orders, setOrders] = useState([]);
//     const [orderDetails, setOrderDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(true);
//     const [customer, setCustomer] = useState(null);

//     const navigate = useNavigate();

//     // 🧩 B1. Kiểm tra token và xác thực người dùng
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setIsAuthenticated(false);
//             toast.warning('⚠️ Bạn cần đăng nhập để xem danh sách đơn hàng.');
//             return;
//         }

//         try {
//             const decoded = jwtDecode(token);
//             const now = Date.now() / 1000;

//             if (decoded.exp && decoded.exp < now) {
//                 toast.error('🔒 Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.');
//                 localStorage.removeItem('token');
//                 setIsAuthenticated(false);
//                 return;
//             }

//             setUser(decoded);
//         } catch (error) {
//             console.error('Lỗi khi decode token:', error);
//             toast.error('❌ Token không hợp lệ, vui lòng đăng nhập lại.');
//             localStorage.removeItem('token');
//             setIsAuthenticated(false);
//         }
//     }, []);

//     // 🧩 B2. Kiểm tra userID có tồn tại trong bảng Customer không
//     useEffect(() => {
//         if (!user?.userID) return;

//         const fetchCustomer = async () => {
//             try {
//                 const customers = await customerService.getCustomer();
//                 const matchedCustomer = customers.find(
//                     (c) => Number(c.userID) === Number(user.userID)
//                 );

//                 if (!matchedCustomer) {
//                     toast.warning('⚠️ Tài khoản của bạn chưa có thông tin khách hàng. Vui lòng cập nhật hồ sơ!');
//                     setCustomer(null);
//                     setLoading(false);
//                     return;
//                 }

//                 setCustomer(matchedCustomer);
//             } catch (err) {
//                 console.error('Lỗi khi tải danh sách khách hàng:', err);
//                 toast.error('Không thể kiểm tra thông tin khách hàng!');
//                 setLoading(false);
//             }
//         };

//         fetchCustomer();
//     }, [user]);

//     // 🧩 B3. Nếu có Customer thì mới tải đơn hàng
//     useEffect(() => {
//         if (!customer?.customerID) return;

//         const fetchOrders = async () => {
//             try {
//                 const allOrders = await orderServices.getOrder();

//                 // ✅ Chỉ lấy đơn hàng của khách hàng hiện tại
//                 const userOrders = allOrders.filter(
//                     (order) => order.customerID === customer.customerID
//                 );
//                 setOrders(userOrders);

//                 const detailsMap = {};

//                 for (const order of userOrders) {
//                     const productOrders = await productOrderServices.getProductOrder();
//                     const productOrdersByOrder = productOrders.filter(
//                         (po) => po.orderID === order.orderID
//                     );

//                     const detailedProducts = await Promise.all(
//                         productOrdersByOrder.map(async (po) => {
//                             const product = await productServices.getProductById(po.proID);
//                             return {
//                                 proOrderID: po.proOrderID,
//                                 proOrderQuantity: po.proOrderQuantity,
//                                 orderID: po.orderID,
//                                 proID: po.proID,
//                                 productName: product.proName,
//                                 productPrice: product.proPrice,
//                                 productImage: product.proImage,
//                             };
//                         })
//                     );

//                     detailsMap[order.orderID] = detailedProducts;
//                 }

//                 setOrderDetails(detailsMap);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Lỗi khi tải dữ liệu đơn hàng:', error);
//                 toast.error('🚫 Không thể tải danh sách đơn hàng.');
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [customer]);

//     // 🚫 Nếu chưa đăng nhập → hiện cảnh báo đăng nhập
//     if (!isAuthenticated) {
//         return <BookingWarning title="Vui lòng đăng nhập để xem danh sách đơn hàng!" />;
//     }

//     // 🚫 Nếu chưa có customer → hiện cảnh báo tạo thông tin khách hàng
//     if (isAuthenticated && !loading && !customer) {
//         return <BookingWarning title="Vui lòng cập nhật thông tin khách hàng trước khi xem đơn hàng!" />;
//     }

//     if (loading) {
//         return <p className={cx('loading')}>Đang tải dữ liệu...</p>;
//     }

//     // ✅ Nếu hợp lệ → hiển thị danh sách đơn hàng
//     return (
//         <div className={cx('wrapper')}>
//             <h2 className={cx('title')}>
//                 📦 Danh sách đơn hàng của bạn (Mã KH: {customer?.customerID})
//             </h2>

//             {orders.length === 0 ? (
//                 <p>Không có đơn hàng nào.</p>
//             ) : (
//                 <table className={cx('table')}>
//                     <thead>
//                         <tr>
//                             <th>Mã đặt hàng</th>
//                             <th>Ngày đặt</th>
//                             <th>Trạng thái</th>
//                             <th>Mã khách hàng</th>
//                             <th>Mã thanh toán</th>
//                             <th>Tổng tiền</th>
//                             <th>Chi tiết sản phẩm</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((order) => (
//                             <tr key={order.orderID}>
//                                 <td>#{order.orderID}</td>
//                                 <td>{order.orderDate || 'N/A'}</td>
//                                 <td>{order.orderStatus}</td>
//                                 <td>{order.customerID}</td>
//                                 <td>{order.payID}</td>
//                                 <td>{convertPrice(order.totalInvoice)}</td>
//                                 <td>
//                                     {orderDetails[order.orderID] ? (
//                                         <ul className={cx('product-list')}>
//                                             {orderDetails[order.orderID].map((item) => (
//                                                 <li key={item.proOrderID} className={cx('product-item')}>
//                                                     <div className={cx('product-info')}>
//                                                         <Image
//                                                             src={item.productImage}
//                                                             alt={item.productName}
//                                                             className={cx('image')}
//                                                         />
//                                                         <div>
//                                                             <p><strong>Tên sản phẩm:</strong> {item.productName}</p>
//                                                             <p><strong>Số lượng:</strong> {item.proOrderQuantity}</p>
//                                                             <p><strong>Giá:</strong> {convertPrice(item.productPrice)}</p>
//                                                             <p><strong>Mã sản phẩm:</strong> {item.proID}</p>
//                                                             <p><strong>Mã xác nhận đặt:</strong> {item.proOrderID}</p>
//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     ) : (
//                                         <p>Không có sản phẩm nào trong đơn hàng này.</p>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default CustomerOrdersPage;
import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderSuccessPage.module.scss';
import * as orderServices from '~/services/orderServices';
import * as productOrderServices from '~/services/productOrderServices';
import * as productServices from '~/services/productServices';
import { AuthContext } from '~/contexts/AuthContext';
import { convertPrice } from '~/utils/convert';
import Image from '~/components/common/Image';
import BookingWarning from '~/components/common/BookingWarning';

const cx = classNames.bind(styles);

function CustomerOrdersPage() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.customerID) {
            setOrders([]);
            setOrderDetails({});
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            setLoading(true);
            try {
                // Lấy tất cả đơn hàng
                const allOrders = await orderServices.getOrder();
                const userOrders = allOrders.filter(order => order.customerID === user.customerID);
                setOrders(userOrders);

                const detailsMap = {};
                for (const order of userOrders) {
                    // Lấy danh sách productOrder cho mỗi order
                    const productOrders = await productOrderServices.getProductOrder();
                    const productOrdersByOrder = productOrders.filter(po => po.orderID === order.orderID);

                    const detailedProducts = await Promise.all(
                        productOrdersByOrder.map(async po => {
                            const product = await productServices.getProductById(po.proID);
                            return {
                                ...po,
                                productName: product?.proName || 'Không có tên',
                                productPrice: product?.price || 0, // <-- fix: dùng 'price' thay vì 'proPrice'
                                productImage: product?.proImage || '',
                            };
                        })
                    );

                    detailsMap[order.orderID] = detailedProducts;
                }

                setOrderDetails(detailsMap);
            } catch (error) {
                console.error('Lỗi khi load đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    // === Render loading ===
    if (authLoading || loading) {
        return <p className={cx('loading')}>Đang tải dữ liệu...</p>;
    }

    // === Nếu chưa đăng nhập ===
    if (!user) {
        return <BookingWarning title="Vui lòng đăng nhập để xem đơn hàng!" />;
    }


    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>
                📦 Danh sách đơn hàng của bạn (Mã KH: {user.customerID})
            </h2>

            {orders.length === 0 ? (
                <p className={cx('no-orders')}>Chưa có đơn hàng nào.</p>
            ) : (
                <div className={cx('orders-container')}>
                    {orders.map(order => (
                        <div key={order.orderID} className={cx('order-card')}>
                            <div className={cx('order-header')}>
                                <span>Mã đặt hàng: #{order.orderID}</span>
                                <span>Ngày đặt: {new Date(order.orderDate).toLocaleString('vi-VN')}</span>
                                <span>Trạng thái: {order.orderStatus}</span>
                                <span>Tổng tiền: {convertPrice(order.totalInvoice)}</span>
                            </div>

                            <div className={cx('products')}>
                                {orderDetails[order.orderID]?.length > 0 ? (
                                    orderDetails[order.orderID].map(item => (
                                        <div key={item.proOrderID} className={cx('product-item')}>
                                            <Image
                                                src={item.productImage}
                                                alt={item.productName}
                                                className={cx('image')}
                                            />
                                            <div className={cx('product-info')}>
                                                <p><strong>{item.productName}</strong></p>
                                                <p>Số lượng: {item.proOrderQuantity}</p>
                                                <p>Giá: {convertPrice(item.productPrice)}</p>
                                                <p>Mã sản phẩm: {item.proID}</p>
                                                <p>Mã xác nhận: {item.proOrderID}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className={cx('no-products')}>Không có sản phẩm trong đơn hàng này.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomerOrdersPage;
