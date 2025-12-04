import classNames from 'classnames/bind';
import styles from './BookingWarning.module.scss';
import Button from '~/components/common/Button';
import config from '~/config';

const cx = classNames.bind(styles);
function BookingWarning({ title }) {
    return (
        <div className={cx('wrapper-form')}>
            <div className={cx('content')}>
                <div>
                    <h2>{title}</h2>
                </div>
                <div className={cx('btn-login')}>
                    <Button lightBlue to={config.routes.login}>
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BookingWarning;
