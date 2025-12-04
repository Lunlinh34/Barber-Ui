// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import { IconChevronLeft } from '@tabler/icons-react';
// import styles from './InfoProductOrder.module.scss';
// import { Link } from 'react-router-dom';
// import Image from '~/components/common/Image';
// import Button from '~/components/common/Button';
// import { convertPrice } from '~/utils/convert';
// import config from '~/config';

// import * as orderServices from '~/services/orderServices';
// import * as productOrderServices from '~/services/productOrderServices';
// import { toast } from 'react-toastify';

// const cx = classNames.bind(styles);

// function InfoProductOrder({ ...props }) {
//     const [carts, setCarts] = useState();

//     const { state, checked } = props;

//     useEffect(() => {
//         const carts = localStorage.getItem('persist:root');
//         if (carts) {
//             const partCarts = JSON.parse(carts);
//             const partListCart = partCarts?.carts;
//             const ParseListCart3 = JSON.parse(partListCart);

//             setCarts(ParseListCart3);
//         }
//     }, []);
//     const handleAddOrder = async () => {
//         try {
//             const order = await orderServices.createOrder(undefined, carts?.total, state?.customerID, checked);
//             console.log('order', order);
//             for (let index = 0; index < carts?.list.length; index++) {
//                 const data = {
//                     proOrderQuantity: carts?.list[index].quantity,
//                     orderID: order?.orderID,
//                     proID: carts?.list[index].proID,
//                 };
//                 await productOrderServices.createProductOrder(data);
//             }

//             toast.success('Đặt hàng thành công!');
//             localStorage.removeItem('persist:root');
//             setTimeout(function () {
//                 window.location.replace('/cart');
//             }, 2000);
//         } catch (error) {
//             toast.error('Đặt hàng thất bại');
//         }
//     };

//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('heading-info')}>
//                 <h2>Đơn hàng ({carts?.count} sản phẩm)</h2>
//             </div>
//             <div className={cx('form-product')}>
//                 {carts?.list.map((product) => (
//                     <div className={cx('content-info')} key={product?.proID}>
//                         <div>
//                             <Image src={product?.proImage} alt={product?.proName} className={cx('image-product')} />
//                             <p className={cx('quantity-product')}>{product?.quantity}</p>
//                         </div>
//                         <div>
//                             <p className={cx('title')}>{product?.proName}</p>
//                         </div>

//                         <span className={cx('info-line-height')}>{convertPrice(product?.price)}</span>
//                     </div>
//                 ))}

//                 <div className={cx('form-content')}>
//                     <div className={cx('form-provisional')}>
//                         <label className={cx('title-temple')}>Tạm tính</label>

//                         <span className={cx('info-price')}>{convertPrice(carts?.total)}</span>
//                     </div>
//                     <div className={cx('form-provisional')}>
//                         <label className={cx('title-temple')}>Phí vận chuyển</label>

//                         <span className={cx('info-price')}>Miễn phí</span>
//                     </div>
//                 </div>

//                 <div className={cx('form-total')}>
//                     <div className={cx('total-price')}>
//                         <label className={cx('title-total')}>Tổng Cộng</label>

//                         <span className={cx('total')}>{convertPrice(carts?.total)}</span>
//                     </div>
//                     <div className={cx('total-price-vip')}>
//                         <Link className={cx('back-order')} to={config.routes.cart}>
//                             <IconChevronLeft />
//                             Trở về giỏ hàng
//                         </Link>

//                         <Button lightBlue small onClick={handleAddOrder}>
//                             Đặt Hàng
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default InfoProductOrder;
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import styles from './InfoProductOrder.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/common/Image';
import Button from '~/components/common/Button';
import { convertPrice } from '~/utils/convert';
import config from '~/config';
import * as orderServices from '~/services/orderServices';
import * as productOrderServices from '~/services/productOrderServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearCart } from '~/redux/slice/cartSlice';


const cx = classNames.bind(styles);

function InfoProductOrder({ state, checked, selectedAddressID, onTotalChange }) {
    const [carts, setCarts] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const persisted = localStorage.getItem('persist:root');
        if (persisted) {
            const parsedRoot = JSON.parse(persisted);
            const parsedCarts = JSON.parse(parsedRoot?.carts || '{}');
            setCarts(parsedCarts);
               // Gửi total lên Order
        onTotalChange?.(parsedCarts?.total || 0);
        }
    }, []);

   const handleAddOrder = async () => {
    if (!carts?.list?.length) {
        toast.warning('Bạn chưa chọn sản phẩm nào!');
        return;
    }

    if (!selectedAddressID) {
        toast.warning('Vui lòng chọn địa chỉ giao hàng!');
        return;
    }

    try {
        // map payID
        const payIDValue = checked === 'online' ? 2 : 1;

        // Hàm format Date thành "YYYY-MM-DDTHH:mm:ss" theo múi giờ Việt Nam (UTC+7)
        function formatVNDate(date) {
            const d = new Date(date);
            // tính giờ Việt Nam
            const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            const vnTime = new Date(utc + 7 * 60 * 60 * 1000);
            return vnTime.toISOString().slice(0, 19); // YYYY-MM-DDTHH:mm:ss
        }

        const now = new Date();
        const orderDateVN = formatVNDate(now);

        // Ngày giao cách 3 ngày
        const delivery = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        const deliveryDateVN = formatVNDate(delivery);

        // Gọi API tạo đơn hàng
        const order = await orderServices.createOrder(
            undefined,           // orderModel, mặc định trong service
            carts.total,
            state.customerID,
            payIDValue,
            selectedAddressID,
            orderDateVN,         // giờ VN
            deliveryDateVN
        );

        console.log('order', order);

        // Thêm chi tiết sản phẩm
        for (let item of carts.list) {
            await productOrderServices.createProductOrder({
                proOrderQuantity: item.quantity,
                orderID: order.orderID,
                proID: item.proID,
            });
        }

        // Thanh toán online
        // if (payIDValue === 2) {
        //     toast.info('Đang chuyển đến cổng thanh toán...');
        //     setTimeout(() => {
        //         window.location.href = 'http://localhost:8888/order/create_payment_url';
        //     }, 1500);
        //     return;
        // }

        // Thanh toán COD/offline
        toast.success('Đặt hàng thành công!');
    dispatch(clearCart());

        // Xóa giỏ hàng
        const persistRoot = localStorage.getItem('persist:root');
        if (persistRoot) {
            const parsed = JSON.parse(persistRoot);
            parsed.carts = JSON.stringify({ list: [], count: 0, total: 0 });
            localStorage.setItem('persist:root', JSON.stringify(parsed));
        }

        //setTimeout(() => window.location.replace('/OrderSuccessPage'), 2000);

    } catch (error) {
        console.error(error);
        toast.error('Đặt hàng thất bại');
    }
};


    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading-info')}>
                <h2>Đơn hàng ({carts?.count || 0} sản phẩm)</h2>
            </div>

            <div className={cx('form-product')}>
                {!carts?.list?.length ? (
                    <div className={cx('empty-cart')}>
                        <p>Bạn chưa chọn sản phẩm nào.</p>
                        <Link to={config.routes.product} className={cx('link-shop')}>
                            Mua ngay
                        </Link>
                    </div>
                ) : (
                    <>
                        {carts.list.map((product) => (
                            <div className={cx('content-info')} key={product?.proID}>
                                <div>
                                    <Image
                                        src={product?.proImage}
                                        alt={product?.proName}
                                        className={cx('image-product')}
                                    />
                                    <p className={cx('quantity-product')}>{product?.quantity}</p>
                                </div>
                                <div>
                                    <p className={cx('title')}>{product?.proName}</p>
                                </div>
                                <span className={cx('info-line-height')}>
                                    {convertPrice(product?.price)}
                                </span>
                            </div>
                        ))}

                        <div className={cx('form-content')}>
                            <div className={cx('form-provisional')}>
                                <label className={cx('title-temple')}>Tạm tính</label>
                                <span className={cx('info-price')}>{convertPrice(carts?.total)}</span>
                            </div>
                            <div className={cx('form-provisional')}>
                                <label className={cx('title-temple')}>Phí vận chuyển</label>
                                <span className={cx('info-price')}>Miễn phí</span>
                            </div>
                        </div>

                        <div className={cx('form-total')}>
                            <div className={cx('total-price')}>
                                <label className={cx('title-total')}>Tổng Cộng</label>
                                <span className={cx('total')}>{convertPrice(carts?.total)}</span>
                            </div>
                            <div className={cx('total-price-vip')}>
                                <Link className={cx('back-order')} to={config.routes.cart}>
                                    <IconChevronLeft />
                                    Trở về giỏ hàng
                                </Link>
                                <Button lightBlue small onClick={handleAddOrder}>
                                    Đặt Hàng
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default InfoProductOrder;
