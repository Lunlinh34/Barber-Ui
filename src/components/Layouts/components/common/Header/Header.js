import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
    IconShoppingCart,
    IconMailForward,
    IconCalendarMonth,
    IconBuildingStore,
    IconUserMinus,
    IconSettings,
    IconArrowBarRight,
    IconCalendarStats,
} from '@tabler/icons-react';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { cartSelector } from '~/redux/selectors';

import config from '~/config';
import images from '~/assets/images';
import Image from '~/components/common/Image';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Search from '~/components/Layouts/components/feature/Search';
import Button from '~/components/common/Button';
import { toast } from 'react-toastify';

import Menu from '../Popper/Menu';

import * as customerService from '~/services/customerService';

const cx = classNames.bind(styles);

function Header() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userID, setUserID] = useState(null);
    const [customerItem, setCustomerItem] = useState(null);
    const { list } = useSelector(cartSelector);
    const [logout, setLogout] = useState(true);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                setCurrentUser(true);
                setLogin(true);
                setLogout(false);
                const decoded = jwtDecode(token);
                setUserID(decoded?.userID);
            } catch (error) {
                setCurrentUser(false);
                setLogin(false);
                setLogout(true);
                console.error('Bạn chưa đặng nhập:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await customerService.getCustomer();
                const customer = response.find((item) => item?.userID === userID);
                if (customer) {
                    setCustomerItem(customer);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [userID]);

    const state = { state: customerItem };

    const userMenu = [
        {
            icon: <IconUserMinus size={15} color="#333" stroke={2} />,
            title: 'Trang cá nhân',
            to: '/personalPage',
            state: state,
        },
        {
            icon: <IconCalendarStats size={15} color="#333" stroke={2} />,
            title: 'Lịch sử đặt lịch',
            to: '/bookingHistory',
        },
        {
            icon: <IconSettings size={15} color="#333" stroke={2} />,
            title: 'Cài đặt',
            to: '/SellerServicePage',
        },
         {
            icon: <IconSettings size={15} color="#333" stroke={2} />,
            title: 'Lịch Sử Đặt hàng',
            to: '/OrderSuccessPage',
        },
         {
            icon: <IconSettings size={15} color="#333" stroke={2} />,
            title: 'Đăng Ký Cửa Hàng',
            to: '/RegisterStorePage',
        },
        {
            icon: <IconArrowBarRight size={15} color="#333" stroke={2} />,
            login,
            logout,
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home}>
                        <Image className={cx('images')} src={images.site_logo} alt="BarberShop" />
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    <ul className={cx('menu')}>
                        <li className={cx('menu-item')}>
                            <Button to={config.routes.product} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>SẢN PHẨM</span>
                                <IconBuildingStore color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                            </Button>
                        </li>

                        <li className={cx('menu-item')}>
                            <Button to={config.routes.book} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>ĐẶT LỊCH</span>
                                <IconCalendarMonth color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                            </Button>
                        </li>
                        <li className={cx('menu-item')}>
                            <Button to={config.routes.contact} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>LIÊN HỆ</span>
                                <IconMailForward color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                            </Button>
                        </li>
                        <li className={cx('menu-item')}>
                            <Button to={config.routes.cart} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>GIỎ HÀNG</span>
                                <IconShoppingCart color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                                <span className={cx('total-productItem')}>{currentUser ? list?.length : 0}</span>
                            </Button>
                        </li>
                          {/* <li className={cx('menu-item')}>
                            <Button to={config.routes.HairAnalyzer} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>TƯ Vấn Kiểu TÓc Bằng AI</span>
                                <IconShoppingCart color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                                <span className={cx('total-productItem')}>{currentUser ? list?.length : 0}</span>
                            </Button>
                        </li> */}

                        <li className={cx('menu-item')}>
                            <Menu items={userMenu}>
                                <Image
                                    className={cx('user-avatar')}
                                    src={currentUser ? customerItem?.picture : 'error'}
                                    alt={currentUser ? customerItem?.lastName : 'Chưa đăng nhập'}
                                />
                            </Menu>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
