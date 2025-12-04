import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import CartResult from '~/components/feature/CartItem/CartResult';
import styles from './Cart.module.scss';
import CartItem from '~/components/feature/CartItem';
import { cartSelector } from '~/redux/selectors';
import BookingWarning from '~/components/common/BookingWarning';

const cx = classNames.bind(styles);

function Cart() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userID, setUserID] = useState(null);
    const carts = useSelector(cartSelector);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                setCurrentUser(true);
                const decoded = jwtDecode(token);
                setUserID(decoded?.userID);
            } catch (error) {
                setCurrentUser(false);
                console.error('Bạn chưa đặng nhập:', error);
            }
        }
    }, []);

    return (
        <>
            {currentUser ? (
                <div className={cx('wrapper')}>
                    <section className={cx('cart-items')}>
                        {carts?.list && carts?.list?.length > 0 ? (
                            carts?.list?.map((cart) => <CartItem key={cart.proID} data={cart} />)
                        ) : (
                            <h1 className="no-items">No Items are add in Cart</h1>
                        )}
                    </section>
                    <CartResult data={carts} userID={userID} />
                </div>
            ) : (
                <BookingWarning title="Vui lòng đăng nhâp trước khi xem giỏ hàng" />
            )}
        </>
    );
}

export default Cart;
