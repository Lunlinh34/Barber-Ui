import classNames from 'classnames/bind';
import styles from './PaymentModal.module.scss';
import Button from '~/components/common/Button';
import Image from '~/components/common/Image';

const cx = classNames.bind(styles);

function PaymentModal({ show, onClose, qrImageUrl }) {
    if (!show) return null;

    return (
        <div className={cx('overlay')}>
            <div className={cx('modal')}>
                <h3 className={cx('title')}>Quét mã QR để thanh toán</h3>
                <p className={cx('desc')}>
                    Vui lòng mở ứng dụng ngân hàng hoặc VNPAY để quét mã bên dưới
                </p>

                <div className={cx('qr-box')}>
                    <Image
                        src={qrImageUrl}
                        alt="QR Code thanh toán"
                        className={cx('qr-image')}
                    />
                </div>

                <Button lightBlue small onClick={onClose} className={cx('close-btn')}>
                    Đóng
                </Button>
            </div>
        </div>
    );
}

export default PaymentModal;
