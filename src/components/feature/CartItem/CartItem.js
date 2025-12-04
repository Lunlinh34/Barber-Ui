import classNames from 'classnames/bind';
import { IconCodeMinus, IconX, IconCodePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { updateQuantity, removeItem } from '~/redux/slice/cartSlice';
import styles from './CartItem.module.scss';
import Image from '~/components/common/Image';
import { useDispatch } from 'react-redux';
import Button from '~/components/common/Button';
import { convertPrice } from '~/utils/convert';

const cx = classNames.bind(styles);

function CartItem({ data }) {
    const [quantity, setQuantity] = useState(data?.quantity);
    const [totalPrice, setTotalPrice] = useState(data?.price * data?.quantity);

    const dispatch = useDispatch();

    const handleRemoveItemCart = (data) => {
        dispatch(
            removeItem({
                proID: data?.proID,
            }),
        );
    };

    const handleIncreaseQuantity = () => {
        setQuantity((pre) => pre + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((pre) => pre - 1);
        }
    };
    useEffect(() => {
        setTotalPrice(data?.price * quantity);
    }, [quantity, data?.price]);

    useEffect(() => {
        setTotalPrice(data?.price * quantity);
        dispatch(
            updateQuantity({
                proID: data?.proID,
                quantity,
            }),
        );
    }, [quantity, data?.price, data?.proID, dispatch]);

    return (
        <div className={cx('cart-details')}>
            <div className={cx('cart-list')}>
                <div className={cx('image-cart')}>
                    <Image className={cx('image')} src={data?.proImage} alt="aa" />
                </div>
                <div className={cx('cart-info')}>
                    <h3 className={cx('cart-name')}>{data?.proName}</h3>
                    <h4 className={cx('quantity')}>
                        Số lượng:
                        <span> {quantity}</span>
                    </h4>
                    <h4 className={cx('cart-price')}>
                        Giá:
                        <span> {convertPrice(totalPrice)}</span>
                    </h4>
                </div>
                <div className={cx('action-cart')}>
                    <div className={cx('remove-cart')}>
                        <Button onClick={() => handleRemoveItemCart(data)}>
                            <IconX />
                        </Button>
                    </div>

                    <div className={cx('cart-control')}>
                        <Button className={cx('inc-cart')} onClick={handleDecreaseQuantity}>
                            <IconCodeMinus />
                        </Button>

                        <Button className={cx('des-cart')} onClick={handleIncreaseQuantity}>
                            <IconCodePlus />
                        </Button>
                    </div>
                </div>

                <div className="cart-item-price"></div>
            </div>
        </div>
    );
}

export default CartItem;
