import classNames from 'classnames/bind';
import styles from './HeaderOrder.module.scss';
import config from '~/config';
import Image from '~/components/common/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function HeaderOrder() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <a href={config.routes.home}>
                    <Image className={cx('log-image')} src={images.site_logo} alt="Barber Shop" />
                </a>
            </div>
        </div>
    );
}

export default HeaderOrder;
