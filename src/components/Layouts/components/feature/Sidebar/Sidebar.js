// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';

// import * as categoryProductServices from '~/services/categoryProductServices';
// import Menu, { MenuItem } from './Menu';
// import styles from './Sidebar.module.scss';

// const cx = classNames.bind(styles);

// function Sidebar() {
//     const [categoryResult, setCategoryResult] = useState([]);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await categoryProductServices.getCategory();

//             if (result === undefined) {
//                 setCategoryResult([]);
//             } else {
//                 setCategoryResult(result);
//             }
//         };
//         fetchApi();
//     }, []);

//     return (
//         <aside className={cx('wrapper')}>
//             <Menu label="Mua sắm theo danh mục">
//                 {categoryResult.map((result) => (
//                     <MenuItem key={result.cateID} title={result.cateName} to={`/product/${result.cateID}`} />
//                 ))}
//             </Menu>
//         </aside>
//     );
// }

// export default Sidebar;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import Menu, { MenuItem } from './Menu';
// import styles from './Sidebar.module.scss';

// import * as categoryProductServices from '~/services/categoryProductServices';
// import * as serviceCategoryServices from '~/services/serviceCategoryServices'; // getServiceCategory

// const cx = classNames.bind(styles);

// function Sidebar({ type = 'category' }) {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             let result = [];

//             if (type === 'category') {
//                 result = await categoryProductServices.getCategory();
//             } else if (type === 'service') {
//                 result = await serviceCategoryServices.getServiceCategory();
//             }

//             setData(result ?? []);
//         };

//         fetchData();
//     }, [type]);

//     return (
//         <aside className={cx('wrapper')}>
//             <Menu label={type === 'category' ? 'Danh mục sản phẩm' : 'Danh mục dịch vụ'}>
//                 {data.map((item) => (
//                     <MenuItem
//                         key={item.cateID || item.serCateID}
//                         title={item.cateName || item.serCateName}
//                         to={type === 'category' ? `/product/${item.cateID}` : `/service/${item.serCateID}`}
//                     />
//                 ))}
//             </Menu>
//         </aside>
//     );
// }

// export default Sidebar;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import Menu, { MenuItem } from './Menu';
// import styles from './Sidebar.module.scss';

// import * as categoryProductServices from '~/services/categoryProductServices';
// import * as serviceCategoryServices from '~/services/serviceCategoryServices';

// const cx = classNames.bind(styles);

// function Sidebar({ type = 'category' }) {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             let result = [];

//             if (type === 'category') {
//                 result = await categoryProductServices.getCategory();
//             } else if (type === 'service') {
//                 result = await serviceCategoryServices.getServiceCategory();
//             }

//             setData(result ?? []);
//         };

//         fetchData();
//     }, [type]);

//     return (
//         <aside className={cx('wrapper')}>
//             <Menu label={type === 'category' ? 'Danh mục sản phẩm' : 'Danh mục dịch vụ'}>
//                 {data.map((item) => (
//                     <MenuItem
//                         key={type === 'category' ? item.cateID : item.serCateID}
//                         title={type === 'category' ? item.cateName : item.serCateName}
//                         to={type === 'category'
//                             ? `/product/${item.cateID}`
//                             : `/book?serCateID=${item.serCateID}`
//                         }
//                     />
//                 ))}
//             </Menu>
//         </aside>
//     );
// }

// export default Sidebar;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import Menu, { MenuItem } from './Menu';
// import styles from './Sidebar.module.scss';

// import * as categoryProductServices from '~/services/categoryProductServices';
// import * as serviceCategoryServices from '~/services/serviceCategoryServices';
// import * as productServices from '~/services/productServices';

// const cx = classNames.bind(styles);

// function Sidebar({ type = 'category', onSelectProducts }) {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             let result = [];

//             if (type === 'category') {
//                 result = await categoryProductServices.getCategory();
//             } else if (type === 'service') {
//                 result = await serviceCategoryServices.getServiceCategory();
//             }

//             setData(result ?? []);
//         };

//         fetchData();
//     }, [type]);

//     const handleCategoryClick = async (cateID) => {
//         if (onSelectProducts) {
//             const allProducts = await productServices.getProduct();
//             const filteredProducts = allProducts?.filter(
//                 (product) => product.cateID === cateID
//             );
//             onSelectProducts(filteredProducts ?? []);
//         }
//     };

//     return (
//         <aside className={cx('wrapper')}>
//             <Menu label={type === 'category' ? 'Danh mục sản phẩm' : 'Danh mục dịch vụ'}>
//                 {data.map((item) =>
//                     type === 'category' ? (
//                         <MenuItem
//                             key={item.cateID}
//                             title={item.cateName}
//                             onClick={() => handleCategoryClick(item.cateID)}
//                         />
//                     ) : (
//                         <MenuItem
//                             key={item.serCateID}
//                             title={item.serCateName}
//                             to={`/book?serCateID=${item.serCateID}`}
//                         />
//                     )
//                 )}
//             </Menu>
//         </aside>
//     );
// }

// export default Sidebar;
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';
// import Menu, { MenuItem } from './Menu';
// import styles from './Sidebar.module.scss';

// import * as categoryProductServices from '~/services/categoryProductServices';
// import * as serviceCategoryServices from '~/services/serviceCategoryServices';
// import * as productServices from '~/services/productServices';

// const cx = classNames.bind(styles);

// function Sidebar({ type = 'category', onSelectProducts }) {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             let result = [];
//             if (type === 'category') {
//                 result = await categoryProductServices.getCategory();
//             } else if (type === 'service') {
//                 result = await serviceCategoryServices.getServiceCategory();
//             }
//             setData(result ?? []);
//         };
//         fetchData();
//     }, [type]);

//     const handleCategoryClick = async (cateID) => {
//         if (onSelectProducts) {
//             const allProducts = await productServices.getProduct();
//             const filteredProducts = allProducts?.filter(
//                 (product) => product.cateID === cateID
//             );
//             console.log('Filtered products:', filteredProducts);
//             onSelectProducts(filteredProducts ?? []);
//         }
//     };

//     return (
//         <aside className={cx('wrapper')}>
//             <Menu label={type === 'category' ? 'Danh mục sản phẩm' : 'Danh mục dịch vụ'}>
//                 {data.map((item) =>
//                     type === 'category' ? (
//                         <MenuItem
//                             key={item.cateID}
//                             title={item.cateName}
//                             onClick={() => handleCategoryClick(item.cateID)}
//                         />
//                     ) : (
//                         <MenuItem
//                             key={item.serCateID}
//                             title={item.serCateName}
//                             to={`/book?serCateID=${item.serCateID}`}
//                         />
//                     )
//                 )}
//             </Menu>
//         </aside>
//     );
// }

// export default Sidebar;
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';

import * as categoryProductServices from '~/services/categoryProductServices';
import * as serviceCategoryServices from '~/services/serviceCategoryServices';

const cx = classNames.bind(styles);

function Sidebar({ type = 'category', onSelectCategory }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let result = [];
            if (type === 'category') {
                result = await categoryProductServices.getCategory();
            } else if (type === 'service') {
                result = await serviceCategoryServices.getServiceCategory();
            }
            setData(result ?? []);
        };
        fetchData();
    }, [type]);

    const handleCategoryClick = (cateID) => {
        if (onSelectCategory) {
            onSelectCategory(cateID); // ✅ chỉ truyền cateID, không truyền sản phẩm
        }
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu label={type === 'category' ? 'Danh mục sản phẩm' : 'Danh mục dịch vụ'}>
                {data.map((item) =>
                    type === 'category' ? (
                        <MenuItem
                            key={item.cateID}
                            title={item.cateName}
                            to={`/product?cateID=${item.cateID}`} // 🔥 thêm query param
                            />
                    ) : (
                        <MenuItem
                            key={item.serCateID}
                            title={item.serCateName}
                            to={`/book?serCateID=${item.serCateID}`}
                        />
                    )
                )}
            </Menu>
        </aside>
    );
}

export default Sidebar;
