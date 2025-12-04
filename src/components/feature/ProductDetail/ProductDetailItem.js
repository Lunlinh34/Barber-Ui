        // import classNames from 'classnames/bind';
        // import { useRef } from 'react';
        // import { useDispatch } from 'react-redux';
        // import { IconCurrencyDollar } from '@tabler/icons-react';
        // import { NumericFormat } from 'react-number-format';
        // import { toast } from 'react-toastify';

        // import { addToCart } from '~/redux/slice/cartSlice';
        // import styles from './ProductDetail.module.scss';
        // import Button from '~/components/common/Button';

        // const cx = classNames.bind(styles);

        // function ProductDetailItem({ ...props }) {
        //     const { data } = props;

        //     const dispatch = useDispatch();

        //     const inputRef = useRef(null);

        //     const handleAddToCart = () => {
        //         dispatch(
        //             addToCart({
        //                 ...data,
        //                 quantity: 1,
        //             }),
        //         );
        //         toast.success(`${data.proName} đã được thêm vào giỏ hàng!`);
        //     };

        //     const increaseQuantity = () => {
        //         const currentQuantity = parseInt(inputRef.current.value);

        //         if (currentQuantity < parseInt(inputRef.current.max)) {
        //             inputRef.current.value = currentQuantity + 1;
        //         }
        //     };

        //     const decreaseQuantity = () => {
        //         const currentQuantity = parseInt(inputRef.current.value);

        //         if (currentQuantity > parseInt(inputRef.current.min)) {
        //             inputRef.current.value = currentQuantity - 1;
        //         }
        //     };
        //     return (
        //         <div className="row">
        //             <div className="col-8">
        //                 <div className={cx('purchaseBadge')}>
        //                     <div className={cx('imgPreview')}>
        //                         <div
        //                             className={cx('bg')}
        //                             style={{
        //                                 backgroundImage: `url("${data.proImage}")`,
        //                             }}
        //                         ></div>
        //                     </div>
        //                     <div className={cx('content')}>
        //                         <h1 className={cx('description-heading')}>{data.proName}</h1>

        //                         <span className={cx('description}')}>
        //                             <p className={cx('description-label')}>{data.proDescription}</p>
        //                         </span>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-4">
        //                 <ul>
        //                     <li className={cx('info-item')}>
        //                         <IconCurrencyDollar className={cx('icon')} size={40} stroke={3} />
        //                         <h2 className={cx('info-item-price')}>
        //                             <NumericFormat className={cx('numberFormat')} value={data.price} thousandSeparator="./" />
        //                         </h2>
        //                     </li>

        //                     <li>
        //                         <div className={cx('from-quantity')}>
        //                             <label className={cx('label-quantity')} htmlFor="quantity">
        //                                 Quantity:
        //                             </label>
        //                             <input
        //                                 ref={inputRef}
        //                                 type="number"
        //                                 id="quantity"
        //                                 name="quantity"
        //                                 min="1"
        //                                 max="100"
        //                                 step="1"
        //                                 defaultValue="1"
        //                                 className={cx('input-quantity')}
        //                             />

        //                             <div className={cx('btn-quantity')}>
        //                                 <button type="button" onClick={increaseQuantity}>
        //                                     <p className={cx('icon-quantity')}>+</p>
        //                                 </button>
        //                                 <button type="button" onClick={decreaseQuantity}>
        //                                     <p className={cx('icon-quantity')}>-</p>
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     </li>

        //                     <li>
        //                         <Button outline className={cx('btn-add')} onClick={handleAddToCart} variant="success">
        //                             ADD TO CART
        //                         </Button>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     );
        // }

        // export default ProductDetailItem;
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';

import { addToCart } from '~/redux/slice/cartSlice';
import styles from './ProductDetail.module.scss';
import Button from '~/components/common/Button';
import ProductItem from '~/components/feature/Products/ProductItem';
import * as productServices from '~/services/productServices';

const cx = classNames.bind(styles);

function ProductDetailItem({ data }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const totalPrice = data.price * quantity;

    const handleAddToCart = () => {
        dispatch(addToCart({ ...data, quantity }));
        toast.success(`${data.proName} đã được thêm vào giỏ hàng!`);
    };

    const increaseQuantity = () => {
        if (quantity < 100) setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // --- Lấy sản phẩm cùng category từ toàn bộ danh sách ---
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                if (!data?.cateID) return;

                const allProducts = await productServices.getProduct(); // trả về mảng sản phẩm trực tiếp

                const filtered = allProducts.filter(
                    (item) => item.cateID === data.cateID && item.proID !== data.proID
                );

                setRelatedProducts(filtered);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [data]);

    return (
        <div className="row">
            {/* Bên trái: hình ảnh + mô tả */}
            <div className="col-8">
                <div className={cx('purchaseBadge')}>
                    <div className={cx('imgPreview')}>
                        <div
                            className={cx('bg')}
                            style={{ backgroundImage: `url("${data.proImage}")` }}
                        />
                    </div>
                    <div className={cx('content')}>
                        <h1 className={cx('description-heading')}>{data.proName}</h1>
                        <p className={cx('description-label')}>{data.proDescription}</p>
                    </div>
                    <div className={cx('content')}>
                        

                        {/* Chính sách bảo hành và đổi trả */}
                        <div className={cx('product-policies')} style={{marginTop : 15}}>
                            <h4 style={{fontSize : 24 , fontWeight : 'bold'}}>Chính sách bảo hành & đổi trả:</h4>
                            <ul>
                                <li>✅ <strong>Bảo hành chính hãng:</strong> 12 tháng đối với lỗi kỹ thuật từ nhà sản xuất.</li>
                                <li>🔄 <strong>Đổi trả trong 7 ngày:</strong> nếu sản phẩm bị lỗi kỹ thuật hoặc không đúng mô tả.</li>
                                <li>🛠 <strong>Hỗ trợ kỹ thuật:</strong> tư vấn và sửa chữa trọn đời sản phẩm.</li>
                                <li>📦 <strong>Điều kiện đổi trả:</strong> sản phẩm còn nguyên tem, chưa qua sử dụng, kèm hóa đơn mua hàng.</li>
                                <li>⚠️ <strong>Lưu ý:</strong> không áp dụng đổi trả với hư hỏng do va đập, tự ý sửa chữa hoặc lỗi do người dùng.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            {/* Bên phải: thông tin + add to cart + sản phẩm liên quan */}
            <div className="col-4">
                <div className={cx('product-info-box')}>
                    <p><strong>Tên Sản Phẩm: </strong> {data.proName}</p>
                    <p>
                        <strong>Giá Tiền: </strong>
                        <NumericFormat
                            value={totalPrice}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" VND"
                        />
                    </p>

                    <div className={cx('from-quantity')}>
                        <strong>Số Lượng: </strong>
                        <div className={cx('quantity-control')}>
                            <button type="button" onClick={decreaseQuantity} className={cx('btn-dec')}>-</button>
                            <input
                                type="number"
                                value={quantity}
                                min="1"
                                max="100"
                                onChange={(e) =>
                                    setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))
                                }
                                className={cx('input-quantity')}
                            />
                            <button type="button" onClick={increaseQuantity} className={cx('btn-inc')}>+</button>
                        </div>
                    </div>

                    <Button outline className={cx('btn-add')} onClick={handleAddToCart} variant="success">
                        Thêm Vào Giỏ Hàng
                    </Button>

                    {/* Sản phẩm liên quan */}
                    {relatedProducts.length > 0 && (
                        <div className={cx('related-products')}>
                            <h3>Sản phẩm cùng loại</h3>
                            <div className={cx('related-list')}>
                                {relatedProducts.map(item => (
                                    <ProductItem key={item.proID} data={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetailItem;
