import React from 'react';
import classNames from 'classnames/bind';
import styles from './ServiceItem.module.scss';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function ServiceItem({ data, onBook }) {
    return (
        <div className={cx('service-item')}>
            <div className={cx('img-preview')}>
                <img
                    src={data.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt={data.serName}
                />
            </div>
            <div className={cx('service-info')}>
                <h4 className={cx('service-name')}>{data.serName}</h4>
                <p className={cx('service-price')}>
                    {data.serPrice ? `${data.serPrice.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
                </p>
                <Button className={cx('book-btn')} onClick={onBook}>
                    Đặt Lịch
                </Button>
            </div>
        </div>
    );
}

export default ServiceItem;
