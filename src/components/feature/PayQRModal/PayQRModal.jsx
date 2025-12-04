import classNames from "classnames/bind";
import styles from "./PayQRModal.module.scss";

const cx = classNames.bind(styles);

function PayQRModal({ show, onClose, orderInfo }) {
    if (!show) return null;

    return (
        <div className={cx("overlay")}>
            <div className={cx("modal")}>
                <h2 className={cx("title")}>Thanh toán bằng QR</h2>

                <img
                    src={orderInfo.qrImage}
                    alt="QR Code"
                    className={cx("qr-image")}
                />

                <div className={cx("info-box")}>
                    <p><strong>Mã đơn:</strong> {orderInfo.orderCode}</p>
                    <p><strong>Số tiền:</strong> {orderInfo.amount.toLocaleString()}đ</p>
                    <p><strong>Nội dung:</strong> {orderInfo.content}</p>
                </div>

                <button className={cx("close-btn")} onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default PayQRModal;
