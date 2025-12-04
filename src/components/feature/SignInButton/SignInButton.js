import classNames from 'classnames/bind';

import styles from './SignInButton.module.scss';
import Image from '~/components/common/Image';

const cx = classNames.bind(styles);

function SignInButton() {
    return (
        <div className={cx('wrapper')}>
         
            <span className={cx('title')}>Sử dụng tài khoản </span>
        </div>
    );
}

export default SignInButton;
