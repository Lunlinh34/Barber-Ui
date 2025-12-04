// import { useState, useEffect } from 'react';
// import classNames from 'classnames/bind';
// import Marquee from 'react-fast-marquee';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import * as productServices from '~/services/productServices';
// import ProductItem from '~/components/feature/Products/ProductItem';
// import styles from './Home.module.scss';
// import SlideShow from '~/components/Layouts/components/feature/SlideShow/SlideShow';

// const cx = classNames.bind(styles);

// function Home() {
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
//             <div className={cx('slideshow')}>
//                 <section className={cx('slideshow-wrapper')}>
//                     <SlideShow />
//                 </section>
//             </div>
//             <div className={cx('content')}></div>

//             <div className={cx('wrapper_item')}>
//                 <h1 style={{ fontWeight: 'bold' }}>Sản Phẩm</h1>
//                 <Container className={cx('container')}>
//                     <Row xs={1} className={cx('product-row')}>
//                         {products.map((product) => (
//                             <Col xs={12} md={6} lg={3} className={`col4 mb-4`} key={product.proID}>
//                                 <ProductItem data={product} />
//                             </Col>
//                         ))}
//                     </Row>
//                 </Container>
//             </div>

//                 <div className={cx('wrapper_item')}>
//                     <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Các kiểu tóc</h1>
//                     <Marquee pauseOnHover={true} gradient={false} speed={50}>
//                         {[
//                             "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn-9a0eec7d-de7b-4f17-be37-3bd334ee8786.jpg",
//                             "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn3.jpg",
//                             "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn7.jpg",
//                             "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn9.jpg",
//                             "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn13.jpg",
//                         ].map((src, index) => (
//                             <div key={index} className={cx('marquee-item')}>
//                                 <img src={src} alt={`style-${index}`} />
//                             </div>
//                         ))}
//                     </Marquee>
//                 </div>

//         </div>
//     );
// }

// export default Home;
// Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Marquee from 'react-fast-marquee';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as productServices from '~/services/productServices';
import * as serviceCategoryServices from '~/services/serviceCategoryServices';
import ProductItem from '~/components/feature/Products/ProductItem';
import styles from './Home.module.scss';
import SlideShow from '~/components/Layouts/components/feature/SlideShow/SlideShow';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await productServices.getProduct();
            if (result) setProducts(result);
        };
        const fetchServices = async () => {
            const result = await serviceCategoryServices.getServiceCategory();
            if (result) setServices(result);
        };

        fetchProducts();
        fetchServices();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* Slide Show */}
            <div className={cx('slideshow')}>
                <section className={cx('slideshow-wrapper')}>
                    <SlideShow />
                </section>
            </div>

            {/* Sản phẩm */}
            <div className={cx('wrapper_item')}>
                <h1 style={{ fontWeight: 'bold' }}>Sản Phẩm</h1>
                <Container className={cx('container')}>
                    <Row xs={1} md={2} lg={4} className={cx('product-row')}>
                        {products.map((product) => (
                            <Col key={product.proID} className="mb-4">
                                <ProductItem data={product} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            {/* Dịch vụ */}
<div className={cx('wrapper_item')}>
    <h1>Dịch Vụ</h1>
    <Container className={cx('container')}>
        <Row className={cx('service-row')}>
            {services.map((service) => (
                <Col key={service.serCateID} className="mb-4">
                <div className={cx('service-card')} onClick={() => navigate(`/service/${service.serCateID}`)}>
                    <div className={cx('service-image')}>
                    <img src={service.imageUrl || 'https://via.placeholder.com/150'} alt={service.serCateName} />
                    </div>
                    <h5 className={cx('service-name')}>{service.serCateName}</h5>
                    <p className={cx('service-desc')}>{service.description}</p>
                    <button
                    className={cx('btn-book')}
                    onClick={(e) => { e.stopPropagation(); navigate(`/booking/${service.serCateID}`); }}
                    >
                    Đặt lịch ngay
                    </button>
                </div>
                </Col>
            ))}
            </Row>
    </Container>
</div>

            {/* Kiểu tóc Marquee */}
            <div className={cx('wrapper_item')}>
                <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Các kiểu tóc</h1>
                <Marquee pauseOnHover gradient={false} speed={50}>
                    {[
                        "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn-9a0eec7d-de7b-4f17-be37-3bd334ee8786.jpg",
                        "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn3.jpg",
                        "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn7.jpg",
                        "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn9.jpg",
                        "https://m.yodycdn.com/blog/ten-cac-kieu-toc-nam-yodyvn13.jpg",
                    ].map((src, index) => (
                        <div key={index} className={cx('marquee-item')}>
                            <img src={src} alt={`style-${index}`} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}

export default Home;
