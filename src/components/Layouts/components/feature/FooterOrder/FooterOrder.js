import classNames from 'classnames/bind';
import styles from './FooterOrder.module.scss';

const cx = classNames.bind(styles);
function FooterOrder() {
    return (
        <div className={cx('wrapper')}>
            <p>
                <span>
                    Xuất hóa đơn VAT:
                    <a>Yêu cầu ngay</a>
                </span>
                <br />
                Tra cứu hành trình đơn hàng, hỗ trợ kỹ thuật, phản ảnh chất lượng dịch vụ,...vui lòng truy cập:
                <a href="/">
                    Tra cứu hành trình đơn hàng, hỗ trợ kỹ thuật, phản ảnh chất lượng dịch vụ,...vui lòng truy cập:
                </a>
                <br />
                Dịch vụ giao hàng Siêu Tốc 2H hoạt động:
                <br />
                - TP. HCM sẽ phục vụ từ 9h đến 19h45.
                <br />- Hà Nội sẽ phục vụ từ 9h đến 18h.
            </p>
        </div>
    );
}

export default FooterOrder;
