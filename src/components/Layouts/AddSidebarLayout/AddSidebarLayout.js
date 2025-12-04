// // import classNames from 'classnames/bind';

// // import Header from '../components/common/Header';
// // import Footer from '../components/common/Footer';
// // import Sidebar from '../components/feature/Sidebar';
// // import styles from './AddSidebarLayout.module.scss';

// // const cx = classNames.bind(styles);

// // function AddSidebarLayout({ children }) {
// //     return (
// //         <div className={cx('wrapper')}>
// //             <Header />
// //             <div className={cx('container')}>
// //                 <Sidebar />
// //                 <div className={cx('content')}>{children}</div>
// //             </div>
// //             <Footer />
// //         </div>
// //     );
// // }

// // export default AddSidebarLayout;
// import classNames from 'classnames/bind';

// import Header from '../components/common/Header';
// import Footer from '../components/common/Footer';
// import Sidebar from '../components/feature/Sidebar';
// import styles from './AddSidebarLayout.module.scss';

// const cx = classNames.bind(styles);

// // function AddSidebarLayout({ children, sidebarType }) {
// //     return (
// //         <div className={cx('wrapper')}>
// //             <Header />
// //             <div className={cx('container')}>
// //                 <Sidebar type={sidebarType} /> {/* Truyền prop type cho Sidebar */}
// //                 <div className={cx('content')}>
                    
// //                     {children}
// //                     </div>
// //             </div>  
// //             <Footer />
// //         </div>
// //     );
// // }

// export default AddSidebarLayout;
// import classNames from 'classnames/bind';
// import Header from '../components/common/Header';
// import Footer from '../components/common/Footer';
// import Sidebar from '../components/feature/Sidebar';
// import styles from './AddSidebarLayout.module.scss';

// const cx = classNames.bind(styles);

// function AddSidebarLayout({ children, sidebarType, onSelectProducts }) {
//     return (
//         <div className={cx('wrapper')}>
//             <Header />
//             <div className={cx('container')}>
//                 {/* Truyền callback xuống Sidebar */}
//                 <Sidebar type={sidebarType} onSelectProducts={onSelectProducts} />
//                 <div className={cx('content')}>
//                     {children}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default AddSidebarLayout;
import classNames from 'classnames/bind';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/feature/Sidebar';
import styles from './AddSidebarLayout.module.scss';

const cx = classNames.bind(styles);

function AddSidebarLayout({ children, sidebarType, onSelectCategory }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar type={sidebarType} onSelectCategory={onSelectCategory} />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default AddSidebarLayout;
