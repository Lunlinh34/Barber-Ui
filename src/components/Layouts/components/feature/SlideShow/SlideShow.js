import classNames from 'classnames/bind';
import Slider from 'react-slick';

import styles from './SlideShow.module.scss';
import Image from '~/components/common/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function SlideShow() {
    var settings = {
        dots: true,

        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear',
    };
    return (
        <Slider {...settings}>
            <div className={cx('slide-item-1')}>
                <Image className={cx('image-banNer')} src={images.barNer1} alt="slideshow" />
            </div>
            <div className={cx('slide-item-2')}>
                <Image className={cx('image-banNer')} src={images.barNer2} alt="slideshow" />
            </div>
            <div className={cx('slide-item-3')}>
                <Image className={cx('image-banNer')} src={images.barNer3} alt="slideshow" />
            </div>
        </Slider>
    );
}

export default SlideShow;
