// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// import styles from './ProductDetail.module.scss';

// import * as productServices from '~/services/productServices';

// import ProductDetailItem from './ProductDetailItem';

// const cx = classNames.bind(styles);

// function ProductDetail() {
//     const { id } = useParams();
//     const [productItems, setProductItem] = useState({});

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await productServices.getProductById(id);
//             if (result) {
//                 setProductItem(result);
//             }
//         };

//         fetchApi();
//     }, [id]);

//     return (
//         <div className={cx('wrapper')}>
//             <div className="container">
//                 <ProductDetailItem data={productItems} />
//             </div>
//         </div>
//     );
// }

// export default ProductDetail;
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetail.module.scss';

import * as productServices from '~/services/productServices';
import ProductDetailItem from './ProductDetailItem';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { id } = useParams();
    const [productItem, setProductItem] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await productServices.getProductById(id);
                if (result) {
                    setProductItem(result);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className="container">
                {productItem ? (
                    <ProductDetailItem data={productItem} />
                ) : (
                    <p>Đang tải sản phẩm...</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
