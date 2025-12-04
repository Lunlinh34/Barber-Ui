import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { convertPrice } from '~/utils/convert';
import styles from './CartItem.module.scss';
import Button from '~/components/common/Button';
import config from '~/config';

import * as customerService from '~/services/customerService';
const cx = classNames.bind(styles);

function CartResult({ ...props }) {
    const navigate = useNavigate();
    const { data, userID } = props;
    const [customerItem, setCustomerItem] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await customerService.getCustomer();
            if (result) {
                const customer = result.find((item) => item?.userID === userID);
                setCustomerItem(customer);
            }
        };

        fetchApi();
    }, [userID]);

    const handleOrder = () => {
        if (
            customerItem?.email &&
            customerItem?.email !== null &&
            customerItem?.email !== undefined &&
            customerItem?.numberphone &&
            customerItem?.numberphone !== null &&
            customerItem?.numberphone !== undefined
        ) {
            // window.location.replace(config.routes.order);
        } else {
            toast.error('Vui lòng cập nhật email hoặc SDT');
        }
    };
    const state = { state: customerItem };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-total')}>
                <h2 className={cx('heading-result')}>Cart Summary</h2>
                <div className={cx('content-total')}>
                    <h4>Quantity :</h4>
                    <h3>{data?.count}</h3>
                </div>
                <div className={cx('content-total')}>
                    <h4>Total Price :</h4>
                    <h3>{convertPrice(data?.total)}</h3>
                </div>
            </div>
            <div className={cx('order-form')}>
                <Button
                    lightBlue
                    className={cx('btn-order')}
                    to={config.routes.order}
                    state={state}
                    onClick={handleOrder}
                >
                    Thanh Toán
                </Button>
            </div>
        </div>
    );
}

export default CartResult;
