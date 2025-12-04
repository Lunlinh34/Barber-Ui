// import { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import ProductItem from './ProductItem';
// import * as productServices from '~/services/productServices';
// import styles from './Products.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);
// function Products() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await productServices.getProduct();
//             if (result) {
//                 setProducts(result);
//             }
//         };

//         fetchApi();
//     }, []);

//     return (
//         <div className={cx('wrapper')}>
//             <Container>
//                 <Row md={3}>
//                     {products.map((product) => (
//                         <Col xs={6} key={product.proID}>
//                             <ProductItem data={product} />
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default Products;
// import { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import ProductItem from './ProductItem';
// import NavigationContext from '~/components/Layouts/components/feature/NavigationContent/NavigationContext';
// import * as productServices from '~/services/productServices';
// import * as productOrderServices from '~/services/productOrderServices';
// import styles from './Products.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

// function Products({ selectedProducts = null }) {
//     const [products, setProducts] = useState([]);
//     const [sortOption, setSortOption] = useState('featured');

//     // Nếu có selectedProducts từ Sidebar thì dùng luôn
//     useEffect(() => {
//         if (selectedProducts) {
//             setProducts(selectedProducts);
//         } else {
//             fetchProducts(sortOption);
//         }
//     }, [sortOption, selectedProducts]);

//     const fetchProducts = async (sortType) => {
//         try {
//             const allProducts = await productServices.getProduct();
//             if (!allProducts) return;

//             let sorted = [...allProducts];

//             switch (sortType) {
//                 case 'title-ascending':
//                     sorted.sort((a, b) => a.proName.localeCompare(b.proName));
//                     break;
//                 case 'title-descending':
//                     sorted.sort((a, b) => b.proName.localeCompare(a.proName));
//                     break;
//                 case 'price-ascending':
//                     sorted.sort((a, b) => a.price - b.price);
//                     break;
//                 case 'price-descending':
//                     sorted.sort((a, b) => b.price - a.price);
//                     break;
//                 case 'best-selling':
//                 case 'featured': {
//                     const allOrders = await productOrderServices.getProductOrder();
//                     const countMap = {};
//                     allOrders.forEach((order) => {
//                         order.products?.forEach((p) => {
//                             countMap[p.proID] = (countMap[p.proID] || 0) + 1;
//                         });
//                     });
//                     sorted.sort((a, b) => (countMap[b.proID] || 0) - (countMap[a.proID] || 0));
//                     break;
//                 }
//                 default:
//                     break;
//             }

//             setProducts(sorted);
//         } catch (error) {
//             console.error('Lỗi khi fetch products:', error);
//         }
//     };

//     return (
//         <div className={cx('wrapper')}>
//             <NavigationContext sortOption={sortOption} onSortChange={setSortOption} />
//             <Container>
//                 <Row md={3}>
//                     {products.map((product) => (
//                         <Col xs={6} key={product.proID}>
//                             <ProductItem data={product} />
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default Products;
    import { useEffect, useState } from 'react';
    import { useSearchParams } from 'react-router-dom';
    import Container from 'react-bootstrap/Container';
    import Row from 'react-bootstrap/Row';
    import Col from 'react-bootstrap/Col';
    import ProductItem from './ProductItem';
    import NavigationContext from '~/components/Layouts/components/feature/NavigationContent/NavigationContext';
    import * as productServices from '~/services/productServices';
    import * as productOrderServices from '~/services/productOrderServices';
    import styles from './Products.module.scss';
    import classNames from 'classnames/bind';

    const cx = classNames.bind(styles);

    function Products() {
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('featured');
    const [searchParams] = useSearchParams();

    // Lấy cateID từ URL (nếu có)
    const cateID = searchParams.get('cateID');

    useEffect(() => {
        fetchProducts(sortOption, cateID);
    }, [sortOption, cateID]);

    const fetchProducts = async (sortType, cateID) => {
        try {
        const allProducts = await productServices.getProduct();
        if (!allProducts) return;

        // ✅ Lọc sản phẩm theo cateID nếu có
        let filtered = cateID
            ? allProducts.filter((p) => String(p.cateID) === String(cateID))
            : allProducts;

        let sorted = [...filtered];

        // ✅ Xử lý các loại sắp xếp
        switch (sortType) {
            case 'title-ascending':
            sorted.sort((a, b) => a.proName.localeCompare(b.proName));
            break;

            case 'title-descending':
            sorted.sort((a, b) => b.proName.localeCompare(a.proName));
            break;

            case 'price-ascending':
            sorted.sort((a, b) => a.price - b.price);
            break;

            case 'price-descending':
            sorted.sort((a, b) => b.price - a.price);
            break;

            case 'best-selling':
            case 'featured': {
            const allOrders = await productOrderServices.getProductOrder();
            const countMap = {};

            // Đếm số lần xuất hiện của từng sản phẩm trong đơn hàng
            allOrders.forEach((order) => {
                order.products?.forEach((p) => {
                countMap[p.proID] = (countMap[p.proID] || 0) + 1;
                });
            });

            // ✅ Sắp xếp theo lượt bán, vẫn giữ cateID nếu có
            sorted.sort(
                (a, b) => (countMap[b.proID] || 0) - (countMap[a.proID] || 0)
            );

            break;
            }

            default:
            break;
        }

        setProducts(sorted);
        } catch (error) {
        console.error('Lỗi khi fetch products:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
        {/* Thanh điều hướng sắp xếp */}
        <NavigationContext sortOption={sortOption} onSortChange={setSortOption} />

        <Container>
            <Row md={3}>
            {products.length > 0 ? (
                products.map((product) => (
                <Col xs={6} key={product.proID}>
                    <ProductItem data={product} />
                </Col>
                ))
            ) : (
                <p className={cx('no-result')}>
                Không có sản phẩm nào trong danh mục này.
                </p>
            )}
            </Row>
        </Container>
        </div>
    );
    }

    export default Products;
