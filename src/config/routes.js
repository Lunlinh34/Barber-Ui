const local = 'http://localhost:4000/';

const routes = {
    //Not Found
    error404: '*',
    local,

    //Login
    login: '/login',
     serviceDetail: '/service/:id', // thêm route chi tiết dịch vụ

    //Register
    register: '/register',

    //Client
    home: '/',
    product: '/product',
    product_details: '/product/:id',
    book: '/book',
    bookingHistory: '/bookingHistory',
    contact: '/contact',
    cart: '/cart',
    personalPage: '/personalPage',
    order: '/order',
    HairAnalyzer : '/HairAnalyzer',
    OrderSuccessPage : '/OrderSuccessPage',
    RegisterStorePage : '/RegisterStorePage',

        SellerServicePage : '/SellerServicePage',
    BookingPage :'/BookingPage'
};

export default routes;
