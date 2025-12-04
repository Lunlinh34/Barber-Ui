// import classNames from 'classnames/bind';
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import styles from './Order.module.scss';
// import DeliveryInfo from '~/components/feature/DeliveryInfo';
// import Pay from '~/components/feature/Pay';
// import InfoProductOrder from '~/components/feature/InfoProductOrder';

// import * as paymentServices from '~/services/paymentServices';
// import * as customerAddressServices from '~/services/customerAddressServices';
// import * as addressServices from '~/services/addressServices';

// const cx = classNames.bind(styles);
// function Order() {
//     const [currentUser, setCurrentUser] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [customerItem, setCustomerItem] = useState({});
//     const [customerAddress, setCustomerAddress] = useState([]);
//     const [address, setAddress] = useState([]);
//     const [addressNew1, setAddressNew1] = useState([]);
//     const [addressNew2, setAddressNew2] = useState([]);
//     const address3 = [...addressNew1, ...addressNew2];

//     const location = useLocation();
//     const { state } = location?.state;

//     useEffect(() => {
//         const fetchApi = async () => {
//             const address = await addressServices.getAddress();
//             if (address) {
//                 setAddress(address);
//             }
//         };
//         fetchApi();
//     }, []);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await customerAddressServices.getCustomerAddress();

//             if (result) {
//                 const customerAddressList = result.filter((item) => item?.customerID === state?.customerID);
//                 setCustomerAddress(customerAddressList);
//             }
//         };

//         fetchApi();
//     }, []);

//     // useEffect(() => {
//     //     if (customerAddress.length !== 0) {
//     //         for (let index = 0; index < customerAddress.length; index++) {
//     //             const addressCustomer1 = address?.filter((item) => item?.addressID == customerAddress[0].addressID);
//     //             const addressCustomer2 = address?.filter((item) => item?.addressID == customerAddress[1].addressID);
//     //             setAddressNew1(addressCustomer1);
//     //             setAddressNew2(addressCustomer2);
//     //         }
//     //     }
//     // }, [customerAddress]);
//     useEffect(() => {
//         // Kiểm tra kỹ dữ liệu
//         if (Array.isArray(customerAddress) && Array.isArray(address) && customerAddress.length > 0) {
//             // Kiểm tra phần tử đầu tiên
//             const first = customerAddress[0];
//             const second = customerAddress[1];

//             if (first) {
//                 const addressCustomer1 = address.filter((item) => item?.addressID === first.addressID);
//                 setAddressNew1(addressCustomer1);
//             }

//             if (second) {
//                 const addressCustomer2 = address.filter((item) => item?.addressID === second.addressID);
//                 setAddressNew2(addressCustomer2);
//             }
//         }
//     }, [customerAddress, address]);
//     const [pays, setPays] = useState([]);
//     const [checked, setChecked] = useState(2);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const response = await paymentServices.getPayment();
//             if (response) {
//                 setPays(response);
//             }
//         };

//         fetchApi();
//     }, []);

//     return (
//         <div className={cx('wrapper')}>
//             <DeliveryInfo
//     state={state}
//     addressList={address3 || []} // luôn đảm bảo là mảng
//     customerAddressList={customerAddress || []} // đảm bảo không undefined
//     customerHasAddress={customerAddress.length > 0}
// />
//             <Pay pays={pays} checked={checked} setChecked={setChecked} />
//             <InfoProductOrder state={state} checked={checked} />
//         </div>
//     );
// }

// export default Order;
// import classNames from 'classnames/bind';
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import styles from './Order.module.scss';
// import DeliveryInfo from '~/components/feature/DeliveryInfo';
// import Pay from '~/components/feature/Pay';
// import InfoProductOrder from '~/components/feature/InfoProductOrder';

// import * as paymentServices from '~/services/paymentServices';
// import * as customerAddressServices from '~/services/customerAddressServices';
// import * as addressServices from '~/services/addressServices';
// import PayQRModal from '~/components/feature/QRModal/QRModal';
// import { useState } from 'react';
// const cx = classNames.bind(styles);

// function Order() {
//     const [customerAddress, setCustomerAddress] = useState([]);
//     const [addressList, setAddressList] = useState([]);
//     const [pays, setPays] = useState([]);
//     const [checked, setChecked] = useState(2);
//     const [selectedAddressID, setSelectedAddressID] = useState(null);

//     const location = useLocation();
//     const { state } = location?.state || {};
// const [showQR, setShowQR] = useState(false);

// const orderInfo = {
//     orderCode: state?.orderID || "DH123456",
//     amount: state?.totalInvoice || 0,
//     content: `Thanh toan don ${state?.orderID}`,
//     qrImage: "https://img.vietqr.io/image/970422-123456789-compact2.png?amount=50000&addInfo=Thanh%20toan" // demo QR
// };
//     useEffect(() => {
//         const fetchAddress = async () => {
//             const result = await addressServices.getAddress();
//             setAddressList(result || []);
//         };
//         fetchAddress();
//     }, []);

//     useEffect(() => {
//         const fetchCustomerAddress = async () => {
//             const result = await customerAddressServices.getCustomerAddress();
//             const filtered = (result || []).filter(
//                 (item) => item.customerID === state?.customerID
//             );
//             setCustomerAddress(filtered);
//             if (filtered.length > 0) setSelectedAddressID(filtered[0].addressID);
//         };
//         fetchCustomerAddress();
//     }, [state?.customerID]);

//     useEffect(() => {
//         const fetchPayment = async () => {
//             const response = await paymentServices.getPayment();
//             setPays(response || []);
//         };
//         fetchPayment();
//     }, []);

//     return (
//         <div className={cx('wrapper')}>
//             <DeliveryInfo
//                 state={state}
//                 addressList={addressList}
//                 customerAddressList={customerAddress}
//                 customerHasAddress={customerAddress.length > 0}
//                 selectedAddressID={selectedAddressID}
//                 setSelectedAddressID={setSelectedAddressID}
//             />
//             <Pay pays={pays} checked={checked} setChecked={setChecked} />
//             <InfoProductOrder
//                 state={state}
//                 checked={checked}
//                 selectedAddressID={selectedAddressID}
//             />
//         </div>
//     );
// }

// export default Order;
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Order.module.scss';

import DeliveryInfo from '~/components/feature/DeliveryInfo';
import Pay from '~/components/feature/Pay';
import InfoProductOrder from '~/components/feature/InfoProductOrder';

import * as paymentServices from '~/services/paymentServices';
import * as customerAddressServices from '~/services/customerAddressServices';
import * as addressServices from '~/services/addressServices';
import { useMemo } from 'react';

import PayQRModal from '~/components/feature/PayQRModal/PayQRModal';

const cx = classNames.bind(styles);

function Order() {
    const [customerAddress, setCustomerAddress] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const [pays, setPays] = useState([]);
    const [checked, setChecked] = useState(2);
    const [selectedAddressID, setSelectedAddressID] = useState(null);
const [totalAmount, setTotalAmount] = useState(0);

    const [showQR, setShowQR] = useState(false);

    const location = useLocation();
    const { state } = location?.state || {};

    // ----------------- QR Dynamic ------------------
 const orderInfo = useMemo(() => ({
    orderCode: state?.orderID || "DH123456",
    amount: totalAmount,
    content: `Thanh toán đơn ${state?.orderID || "DH123456"}`,
    qrImage: `https://img.vietqr.io/image/970422-666776868-compact2.png?amount=${totalAmount}&addInfo=${encodeURIComponent(state?.customerName || "Khach Hang")}`
}), [totalAmount, state?.orderID, state?.customerName]);
    // ------------------------------------------------

    // Fetch Address
    useEffect(() => {
        const fetchAddress = async () => {
            const result = await addressServices.getAddress();
            setAddressList(result || []);
        };
        fetchAddress();
    }, []);

    // Fetch Customer Address
    useEffect(() => {
        const fetchCustomerAddress = async () => {
            const result = await customerAddressServices.getCustomerAddress();
            const filtered = (result || []).filter(
                (item) => item.customerID === state?.customerID
            );
            setCustomerAddress(filtered);

            if (filtered.length > 0) {
                setSelectedAddressID(filtered[0].addressID);
            }
        };
        fetchCustomerAddress();
    }, [state?.customerID]);

    // Fetch Payment
    useEffect(() => {
        const fetchPayment = async () => {
            const response = await paymentServices.getPayment();
            setPays(response || []);
        };
        fetchPayment();
    }, []);

    // Render
    return (
        <div className={cx('wrapper')}>
            <DeliveryInfo
                state={state}
                addressList={addressList}
                customerAddressList={customerAddress}
                customerHasAddress={customerAddress.length > 0}
                selectedAddressID={selectedAddressID}
                setSelectedAddressID={setSelectedAddressID}
            />

            <Pay
                pays={pays}
                checked={checked}
                setChecked={setChecked}
                onSelectOnline={() => setShowQR(true)}
            />

            <InfoProductOrder
                state={state}
                checked={checked}
                selectedAddressID={selectedAddressID}
    onTotalChange={(value) => setTotalAmount(value)}

            />

            {/* Hiển thị modal QR */}
            <PayQRModal
                show={showQR}
                onClose={() => setShowQR(false)}
                orderInfo={orderInfo}
            />
        </div>
    );
}

export default Order;
