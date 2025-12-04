import config from '~/config';

//Layout

import { AddSidebarLayout } from '~/components/Layouts';
import { OrderLayout } from '~/components/Layouts';
import { AddSidebarProfileLayout } from '~/components/Layouts';

//Page

import Login from '~/Pages/Login';
import Register from '~/Pages/Register';

import Home from '~/Pages/Home';
import ProductDetail from '~/components/feature/ProductDetail';
import Product from '~/Pages/Product';
import Book from '~/Pages/Book';
import BookingHistory from '~/Pages/BookingHistory';
import Contact from '~/Pages/Contact';
import Cart from '~/Pages/Cart';
import PersonalPage from '~/Pages/PersonalPage';
import Order from '~/Pages/Order';
import HairAnalyzer from '../Pages/HairAnalyzer';
import OrderSuccessPage from '~/Pages/OrderSuccessPage';
import RegisterStorePage from '~/Pages/RegisterStorePage'; // tạo file mới
import ServiceDetail from '~/components/feature/ServiceDetail'; // tạo file mới
import SellerServicePage from '~/Pages/SellerServicePage'; // tạo file mới
import BookingPage from '~/Pages/BookingPage';
//no Login open
const publicRoutes = [
    //Logins
    { path: config.routes.login, component: Login, layout: null },
    //Register
    { path: config.routes.register, component: Register, layout: null },

    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product, layout: AddSidebarLayout,  sidebarType:'category'  },
    { path: config.routes.product_details, component: ProductDetail },
    { path: config.routes.book, component: Book /*, layout: AddSidebarLayout, sidebarType: 'service' */ },
    { path: config.routes.bookingHistory, component: BookingHistory , layout:AddSidebarProfileLayout},
    { path: config.routes.contact, component: Contact },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.personalPage, component: PersonalPage , layout : AddSidebarProfileLayout},
    { path: config.routes.order, component: Order, layout: OrderLayout },
    { path: config.routes.HairAnalyzer, component: HairAnalyzer },
    { path: config.routes.OrderSuccessPage, component: OrderSuccessPage, layout : AddSidebarProfileLayout },
        { path: config.routes.serviceDetail, component: ServiceDetail },
                { path: config.routes.RegisterStorePage, component: RegisterStorePage , layout : AddSidebarProfileLayout},
                { path: config.routes.SellerServicePage, component: SellerServicePage , layout : AddSidebarProfileLayout},
                { path: config.routes.BookingPage, component: BookingPage  },

];


//Login open
const privateRoutes = [];

export { publicRoutes, privateRoutes };
