        // import NavigationContent from '~/components/Layouts/components/feature/NavigationContent';
        // import styles from './Product.module.scss';
        // import classNames from 'classnames/bind';
        // import Products from '~/components/feature/Products';

        // const cx = classNames.bind(styles);
        // function Product() {
        //     return (
        //         <div className={cx('wrapper')}>
        //             <div className={cx('container-body')}>
        //                 <Products />
        //             </div>
        //         </div>
        //     );
        // }

        // export default Product;
import { useState } from 'react';
import AddSidebarLayout from '~/components/Layouts/AddSidebarLayout';
import Products from '~/components/feature/Products';

function Product() {
    const [selectedCateID, setSelectedCateID] = useState(null);

    return (
     
            <Products cateID={selectedCateID} />
      
    );
}

export default Product;
