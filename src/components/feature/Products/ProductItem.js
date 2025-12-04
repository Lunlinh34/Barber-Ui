// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';

// import styles from './Products.module.scss';
// import Button from '~/components/common/Button';
// import { convertPrice } from '~/utils/convert';

// const cx = classNames.bind(styles);

// function ProductItem({ data }) {
//     return (
//         <div className={cx('product-item')}>
//             <Button
//                 className={cx('avatar')}
//                 to={`/product/${data?.proID}`}
//                 style={{
//                     backgroundImage: `url("${data?.proImage}")`,
//                     backgroundRepeat: 'no-repeat',
//                     backgroundPosition: '50%',
//                     backgroundSize: 'cover',
//                     display: 'block',
//                     objectFit: 'cover',
//                     overFlow: 'hidden',
//                     width: '100%',
//                     height: '220px',
//                     color: 'blue',
//                 }}
//             >
//                 <Button primary className={cx('btn-product')} to={`/product/${data?.proID}`}>
//                     Xem Sản Phẩm
//                 </Button>
//             </Button>
//             <h3 className={cx('product-name')}>
//                 <Button className={cx('link-name')} href="hadfas">
//                     {data?.proName}
//                 </Button>
//             </h3>
//             <div className={cx('students-count')}>
//                 <span className={cx('quantity')}>{convertPrice(data?.price)}</span>
//             </div>
//         </div>
//     );
// }

// ProductItem.propTypes = {
//     data: PropTypes.object,
// };

// export default ProductItem;
   import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './Products.module.scss';
import Button from '~/components/common/Button';
import { convertPrice } from '~/utils/convert';
import { addToCart } from '~/redux/slice/cartSlice'; // import action redux

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                ...data,
                quantity: 1, // mặc định thêm 1 sản phẩm
            })
        );
        toast.success(`${data.proName} đã được thêm vào giỏ hàng!`);
    };

    return (
        <div className={cx('card')}>
            {/* Ảnh sản phẩm */}
            <div
                className={cx('card-image')}
                style={{ backgroundImage: `url("${data?.proImage}")` }}
            >
                <div className={cx('overlay')}>
                    <Button
                        primary
                        className={cx('btn-view')}
                        to={`/product/${data?.proID}`}
                    >
                        Xem Chi Tiết
                    </Button>
                    <Button
                        className={cx('btn-cart')}
                        onClick={handleAddToCart} // 🔹 thêm vào giỏ hàng
                    >
                        Thêm Vào Giỏ
                    </Button>
                </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className={cx('card-content')}>
                <h3 className={cx('product-name')}>
                    <Button className={cx('link-name')} to={`/product/${data?.proID}`}>
                        {data?.proName}
                    </Button>
                </h3>

                <p className={cx('description')}>
                    {data?.proDescription || 'Sản phẩm chất lượng cao, thiết kế tinh tế.'}
                </p>

                <div className={cx('price-row')}>
                    <span className={cx('price')}>{convertPrice(data?.price)}</span>
                    {data?.discount != null && (
                        <span className={cx('discount')}>-{data.discount}%</span>
                    )}
                </div>
            </div>
        </div>
    );
}

ProductItem.propTypes = {
    data: PropTypes.shape({
        proID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        proImage: PropTypes.string,
        proName: PropTypes.string.isRequired,
        proDescription: PropTypes.string,
        price: PropTypes.number,
        discount: PropTypes.number,
    }),
};

export default ProductItem;
