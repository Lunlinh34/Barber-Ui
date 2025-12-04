    // import { useState } from 'react';
    // import classNames from 'classnames/bind';
    // import styles from './DeliveryInfo.module.scss';
    // import FormControl from '~/components/feature/FormControl';

    // const cx = classNames.bind(styles);

    // function DeliveryInfo({ ...props }) {
    //     const { state, address3 } = props;
    //     const [firstName, setFirstName] = useState(state?.firstName);
    //     const [lastName, setLastName] = useState(state?.lastName);
    //     const [email, setEmail] = useState(state?.email);
    //     const [phone, setPhone] = useState(state?.numberphone);

    //     const [selectedAddress, setSelectedAddress] = useState();

    //     const handleStoreChange = (e) => {
    //         const selectedAddressId = e.target.value;
    //         const selectedStore = address3?.find((item) => item?.addressID == selectedAddressId);
    //         setSelectedAddress(selectedStore);
    //     };

    //     return (
    //         <div className={cx('wrapper')}>
    //             <div className={cx('heading-info')}>
    //                 <h2>Thông tin nhân hàng</h2>
    //             </div>

    //             <div className={cx('form-info')}>
    //                 <div className={cx('formGroup')}>
    //                     <label htmlFor="address">Địa chỉ</label>
    //                     <select
    //                         id="address"
    //                         value={selectedAddress?.addressID}
    //                         onChange={handleStoreChange}
    //                         className={cx('inputField')}
    //                     >
    //                         <option value="">-- Chọn địa chỉ--</option>
    //                         {address3?.map((item) => (
    //                             <option key={item?.addressID} value={item?.addressID}>
    //                                 {item?.currentAddress}
    //                             </option>
    //                         ))}
    //                     </select>
    //                 </div>

    //                 <FormControl
    //                     value={email}
    //                     labelTitle="Email"
    //                     placeholder="Email"
    //                     name="email"
    //                     type="text"
    //                     labelComeback
    //                     setEmail={setEmail}
    //                 />
    //                 <div className={cx('form-name')}>
    //                     <FormControl
    //                         value={firstName}
    //                         labelTitle="Họ"
    //                         placeholder="Họ & Tên đệm"
    //                         name="firstName"
    //                         type="text"
    //                         labelComeback
    //                         setFirstName={setFirstName}
    //                     />
    //                     <FormControl
    //                         value={lastName}
    //                         labelTitle="Tên"
    //                         placeholder="Tên"
    //                         name="lastName"
    //                         type="text"
    //                         labelComeback
    //                         setLastName={setLastName}
    //                         orderSize="orderSize"
    //                     />
    //                 </div>
    //                 <FormControl
    //                     value={phone}
    //                     labelTitle="Số điện thoai"
    //                     placeholder="Số điện thoại"
    //                     name="phone"
    //                     type="text"
    //                     labelComeback
    //                     setPhone={setPhone}
    //                 />
    //             </div>
    //         </div>
    //     );
    // }

    // export default DeliveryInfo;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import styles from './DeliveryInfo.module.scss';
import FormControl from '~/components/feature/FormControl';
import * as cityServices from '~/services/cityService';

const cx = classNames.bind(styles);

function    DeliveryInfo({
    state,
    addressList = [],
    selectedAddressID,
    setSelectedAddressID,
}) {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cities, setCities] = useState([]);
    const [filteredAddressList, setFilteredAddressList] = useState([]);
    const [email, setEmail] = useState(state?.email || '');
    const [firstName, setFirstName] = useState(state?.firstName || '');
    const [lastName, setLastName] = useState(state?.lastName || '');
    const [phone, setPhone] = useState(state?.numberphone || '');
    const [userID, setUserID] = useState(null);

    const navigate = useNavigate();

    // 🔹 Lấy userID từ token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserID(decoded?.userID);
            } catch (err) {
                console.error('❌ Token không hợp lệ:', err);
            }
        }
    }, []);

    // 🔹 Lấy danh sách thành phố
    useEffect(() => {
        const fetchCities = async () => {
            const res = await cityServices.getCities();
            setCities(res || []);
        };
        fetchCities();
    }, []);

    // 🔹 Lọc danh sách địa chỉ theo userID
    useEffect(() => {
        if (userID && Array.isArray(addressList)) {
            const filtered = addressList.filter(
                (a) => Number(a.userID) === Number(userID)
            );
            setFilteredAddressList(filtered);
        }
    }, [addressList, userID]);

    // 🔹 Map cityID -> cityName
    const mapCityName = (cityID) => {
        const city = cities.find((c) => Number(c.cityID) === Number(cityID));
        return city ? city.cityName : 'Không xác định';
    };

    // 🔹 Xử lý chọn địa chỉ
    const handleAddressSelect = (e) => {
        const addressID = Number(e.target.value);
        const addressObj = filteredAddressList.find(
            (item) => Number(item.addressID) === addressID
        );
        setSelectedAddress(addressObj);
        setSelectedAddressID(addressID);
    };

    // 🔹 Chuyển hướng sang trang PersonalPage để thêm địa chỉ
    const handleAddNewAddress = () => {
        navigate('/personalpage');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading-info')}>
                <h2>Thông tin nhận hàng</h2>
            </div>

            <div className={cx('form-info')}>
                <label htmlFor="address">Địa chỉ</label>

                {filteredAddressList.length > 0 ? (
                    <>
                        <select
                            id="address"
                            value={selectedAddressID || ''}
                            onChange={handleAddressSelect}
                        >
                            <option value="">-- Chọn địa chỉ --</option>
                            {filteredAddressList.map((item) => (
                                <option key={item.addressID} value={item.addressID}>
                                    {`${item.currentAddress || ''}, ${item.subDistrict || ''}, ${
                                        item.district || ''
                                    }, ${mapCityName(item.cityID)}`}
                                </option>
                            ))}
                        </select>

                        <button
                            className={cx('add-btn')}
                            onClick={handleAddNewAddress}
                            style={{ marginTop: '10px' }}
                        >
                            ➕ Thêm địa chỉ khác
                        </button>
                    </>
                ) : (
                    <div className={cx('no-address')}>
                        <p>Bạn chưa có địa chỉ nào!</p>
                        <button
                            className={cx('add-btn' )}
                            onClick={handleAddNewAddress}
                        >
                            ➕ Thêm địa chỉ mới
                        </button>   
                    </div>
                )}
            </div>

            <FormControl value={email} labelTitle="Email" setEmail={setEmail} />
            <div className={cx('form-name')}>
                <FormControl value={firstName} labelTitle="Họ" setFirstName={setFirstName} />
                <FormControl value={lastName} labelTitle="Tên" setLastName={setLastName} />
            </div>
            <FormControl value={phone} labelTitle="Số điện thoại" setPhone={setPhone} />
        </div>
    );
}

export default DeliveryInfo;
