// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { getServiceCategoryById } from '~/services/serviceCategoryServices';
// import { getService } from '~/services/serviceServices';
// import styles from './ServiceDetail.module.scss'; // tạo file SCSS riêng cho style
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

// function ServiceDetail() {
//     const { id } = useParams(); // id của loại dịch vụ
//     const navigate = useNavigate();
//     const [category, setCategory] = useState(null);
//     const [services, setServices] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const categoryData = await getServiceCategoryById(id);
//                 setCategory(categoryData);

//                 const allServices = await getService();
//                 const filteredServices = allServices.filter(s => s.serCateID === parseInt(id));
//                 setServices(filteredServices);
//             } catch (error) {
//                 console.log('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [id]);

//     if (!category) return <p>Loading...</p>;

//     const handleBookNow = (service) => {
//         // chuyến hướng sang trang book, có thể truyền ID dịch vụ
//         navigate('/book', { state: { service, category } });
//     };

//     return (
//         <div className={cx('service-detail-wrapper')}>
//             <div className={cx('category-header')}>
//                 <h1>{category.serCateName}</h1>
//                 <img
//                     src={category.imageUrl || 'https://via.placeholder.com/400'}
//                     alt={category.serCateName}
//                 />
//                 <p>{category.description}</p>
//             </div>

//             <h2>Dịch vụ thuộc loại này</h2>
//             {services.length > 0 ? (
//                 <div className={cx('services-grid')}>
//                     {services.map((s) => (
//                         <div key={s.serID} className={cx('service-card')}>
//                             <img
//                                 src={s.imageUrl || 'https://via.placeholder.com/250'}
//                                 alt={s.serName}
//                                 className={cx('service-image')}
//                             />
//                             <div className={cx('service-info')}>
//                                 <h3>{s.serName}</h3>
//                                 <p className={cx('service-desc')}>
//                                     {s.noiDungBH?.slice(0, 80)}...
//                                 </p>
//                                 <p className={cx('service-price')}>
//                                     {s.serPrice ? `${s.serPrice}₫` : 'Liên hệ'}
//                                 </p>
//                                 <button
//                                     className={cx('book-btn')}
//                                     onClick={() => handleBookNow(s)}
//                                 >
//                                     Đặt Lịch Ngay
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>Hiện tại không có dịch vụ nào thuộc loại này.</p>
//             )}
//         </div>
//     );
// }

// export default ServiceDetail;
// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import classNames from 'classnames/bind';
// import styles from './ServiceDetail.module.scss';

// import Button from '~/components/common/Button';
// import * as serviceCategoryServices from '~/services/serviceCategoryServices';
// import * as serviceServices from '~/services/serviceServices';
// import ServiceItem from './ServiceItem';

// const cx = classNames.bind(styles);

// function ServiceDetail() {
//     const { id } = useParams(); // ID category
//     const navigate = useNavigate();
//     const [category, setCategory] = useState(null);
//     const [services, setServices] = useState([]); // tất cả dịch vụ của category

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const categoryData = await serviceCategoryServices.getServiceCategoryById(id);
//                 setCategory(categoryData);

//                 const allServices = await serviceServices.getService();
//                 const filtered = allServices.filter(s => s.serCateID === parseInt(id));
//                 setServices(filtered);
//             } catch (error) {
//                 console.log('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, [id]);

//     const handleBookNow = (service) => {
//         navigate('/book', { state: { service, category } });
//     };

//     if (!category) return <p>Loading...</p>;

//     return (
//         <div className={cx('wrapper')}>
//             <div className="row no-gutters">
//                 {/* Bên trái: ảnh category full height + background */}
//                 <div className="col-8">
//                     <div className={cx('left-panel')}>
//                         <div className={cx('imgPreview')}>
//                             <img
//                                 src={category.imageUrl || 'https://via.placeholder.com/600x800'}
//                                 alt={category.serCateName}
//                             />
//                         </div>
//                         <div className={cx('content')}>
//                             <h1 className={cx('description-heading')}>{category.serCateName}</h1>
//                             <p className={cx('description-label')}>{category.description}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bên phải: danh sách dịch vụ */}
//                 <div className="col-4">
//                     <div className={cx('right-panel')}>
//                         <h3>Dịch vụ thuộc loại này</h3>
//                         <div className={cx('related-list')}>
//                             {services.length > 0 ? (
//                                 services.map((service) => (
//                                     <ServiceItem
//                                         key={service.serID}
//                                         data={service}
//                                         onBook={() => handleBookNow(service)}
//                                     />
//                                 ))
//                             ) : (
//                                 <p>Hiện tại không có dịch vụ nào.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ServiceDetail;
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ServiceDetail.module.scss';

import Button from '~/components/common/Button';
import * as serviceCategoryServices from '~/services/serviceCategoryServices';
import * as serviceServices from '~/services/serviceServices';
import ServiceItem from './ServiceItem';
import ReviewSection from '../ReviewSection/ReviewSection';

const cx = classNames.bind(styles);

function ServiceDetail() {
    const { id } = useParams(); // ID category
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [services, setServices] = useState([]); // tất cả dịch vụ của category

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await serviceCategoryServices.getServiceCategoryById(id);
                setCategory(categoryData);

                const allServices = await serviceServices.getService();
                const filtered = allServices.filter(s => s.serCateID === parseInt(id));
                setServices(filtered);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleBookNow = (service) => {
        navigate('/book', { state: { service, category } });
    };

    if (!category) return <p>Loading...</p>;

    return (
        <div className={cx('wrapper')}>
            <div className="row no-gutters">
                {/* Bên trái: ảnh category full height + background */}
                <div className="col-8">
                    <div className={cx('left-panel')}>
                        <div className={cx('imgPreview')}>
                            <img
                                src={category.imageUrl || 'https://via.placeholder.com/600x800'}
                                alt={category.serCateName}
                            />
                        </div>
                        <div className={cx('content')}>
                            <h1 className={cx('description-heading')}>{category.serCateName}</h1>
                            <p className={cx('description-label')}>{category.description}</p>
                        </div>
                    </div>
                    <ReviewSection
                    reviewsSummary={{
                        overallScore: 9.3,
                        totalReviews: 2794,
                        categories: [
                            { name: 'Nhân viên phục vụ', score: 9.8 },
                            { name: 'Tiện nghi', score: 9.2 },
                            { name: 'Sạch sẽ', score: 9.5 },
                            { name: 'Thoải mái', score: 9.5 },
                            { name: 'Đáng giá tiền', score: 9.5 },
                            { name: 'Địa điểm', score: 9.5 },
                        ],
                        wifiScore: 8.9,
                    }}
                />
                </div>
                
                                {/* Bên phải: danh sách dịch vụ */}
                <div className="col-4">
  <div className={cx('right-panel')}>
<h3 className={styles['section-title']}>Dịch vụ thuộc loại này</h3>
    <div className={cx('related-list-wrapper')}>
      {services.length > 0 ? (
        <div className={cx('related-list')}>
          {services.map((service) => (
            <ServiceItem
              key={service.serID}
              data={service}
              onBook={() => handleBookNow(service)}
            />
          ))}
        </div>
      ) : (
        <p>Hiện tại không có dịch vụ nào.</p>
      )}
    </div>
  </div>
</div>
            </div>
        </div>
    );
}

export default ServiceDetail;
