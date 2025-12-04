// import Select from '~/components/common/Select';
// import styles from './NavigationContext.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

// function NavigationContext() {
//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('from-control')}>
//                 <label htmlFor="products" className={cx('heading-from')}>
//                     Sắp xếp theo:
//                 </label>
//                 <Select name={'products'} id={'products'} className={cx('select-option')}>
//                     <option value="featured">Đặc sắc</option>
//                     <option value="best-selling">Bán chạy nhất</option>
//                     <option value="title-ascending">Theo thứ tự bảng chữ cái, A-Z</option>
//                     <option value="title-descending">Theo thứ tự bảng chữ cái, Z-A</option>
//                     <option value="price-ascending">Giá từ thấp đến cao</option>
//                     <option value="price-descending">Giá từ cao xuống thấp</option>
//                 </Select>
//             </div>
//         </div>
//     );
// }

// export default NavigationContext;
// ~/components/Layouts/components/feature/NavigationContent/NavigationContext.js
import Select from '~/components/common/Select';
import styles from './NavigationContext.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NavigationContext({ sortOption, onSortChange }) {
    const handleSelectChange = (e) => {
        console.log("🔹 Sort option changed:", e.target.value);
        onSortChange?.(e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-control')}>
                <label htmlFor="products" className={cx('heading-form')}>
                    Sắp xếp theo:
                </label>
                <Select
                    id="products"
                    name="products"
                    value={sortOption}
                    onChange={handleSelectChange}
                    className={cx('select-option')}
                >
                    <option value="featured">Đặc sắc</option>
                    <option value="best-selling">Bán chạy nhất</option>
                    <option value="title-ascending">Tên A → Z</option>
                    <option value="title-descending">Tên Z → A</option>
                    <option value="price-ascending">Giá tăng dần</option>
                    <option value="price-descending">Giá giảm dần</option>
                </Select>
            </div>
        </div>
    );
}

export default NavigationContext;
