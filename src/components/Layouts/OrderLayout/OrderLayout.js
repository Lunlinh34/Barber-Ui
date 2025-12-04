import classNames from 'classnames/bind';
import styles from './OrderLayout.module.scss';
import HeaderOrder from '../components/feature/HeaderOrder';
// import FooterOrder from '../components/feature/FooterOrder';

const cx = classNames.bind(styles);

function OrderLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderOrder />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <FooterOrder /> */}
        </div>
    );
}

export default OrderLayout;
