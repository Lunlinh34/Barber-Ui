// import { Fragment } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { publicRoutes } from '~/routes';
// import HairAnalyzer from './components/feature/HairAnalyzer/HairAnalyzer';

// import { DefaultLayout } from '~/components/Layouts';
// import ShopBarberChatbot from './components/feature/ShopBarberChatbot/ShopBarberChatbot'; // Import Component
// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     {publicRoutes.map((route, index) => {
//                         const Page = route.component;

//                         let Layout = DefaultLayout;

//                         if (route.layout) {
//                             Layout = route.layout;
//                         } else if (route.layout === null) {
//                             Layout = Fragment;
//                         }
//                            // Truyền prop sidebarType nếu có
//       const layoutProps = {};
//       if (route.sidebarType) {
//           layoutProps.sidebarType = route.sidebarType;
//       }

//                         return (
//                             <Route
//                                 key={index}
//                                 path={route.path}
//                                 element={
//                                     <Layout {...layoutProps}>
//                                         <Page />
//                                     </Layout>
//                                 }
//                             />
//                         );
//                     })}
//                 </Routes>
//                         <HairAnalyzer />

//                 {/* 2. CHATBOT: Luôn hiển thị ở mọi trang 
//                     (Nhờ thuộc tính floating=true trong ShopBarberChatbot.jsx) 
//                 */}
//                 <ShopBarberChatbot />
//             </div>
//         </Router>
//     );
// }

// export default App;
//     import { Fragment } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { publicRoutes } from '~/routes';
// import HairAnalyzer from './components/feature/HairAnalyzer/HairAnalyzer';
// import { DefaultLayout } from '~/components/Layouts';
// import ShopBarberChatbot from './components/feature/ShopBarberChatbot/ShopBarberChatbot';

// import { AuthProvider } from '~/contexts/AuthContext';
// import ProtectedRoute from '~/components/common/ProtectedRoute/ProtectedRoute';

// function App() {
//     return (
//         <Router>
//             <AuthProvider>
//                 <div className="App">
//                     <Routes>
//                         {publicRoutes.map((route, index) => {
//                             const Page = route.component;

//                             let Layout = DefaultLayout;
//                             if (route.layout) {
//                                 Layout = route.layout;
//                             } else if (route.layout === null) {
//                                 Layout = Fragment;
//                             }

//                             const layoutProps = {};
//                             if (route.sidebarType) {
//                                 layoutProps.sidebarType = route.sidebarType;
//                             }

//                             // Nếu route cần bảo vệ → bọc ProtectedRoute
//                             const element = route.protected ? (
//                                 <ProtectedRoute>
//                                     <Layout {...layoutProps}>
//                                         <Page />
//                                     </Layout>
//                                 </ProtectedRoute>
//                             ) : (
//                                 <Layout {...layoutProps}>
//                                     <Page />
//                                 </Layout>
//                             );

//                             return <Route key={index} path={route.path} element={element} />;
//                         })}
//                     </Routes>

//                     <HairAnalyzer />

//                     {/* CHATBOT: luôn hiển thị ở mọi trang */}
//                     <ShopBarberChatbot />
//                 </div>
//             </AuthProvider>
//         </Router>
//     );
// }

// export default App;
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import HairAnalyzer from './components/feature/HairAnalyzer/HairAnalyzer';
import { DefaultLayout } from '~/components/Layouts';
import ShopBarberChatbot from './components/feature/ShopBarberChatbot/ShopBarberChatbot';

import { AuthProvider } from '~/contexts/AuthContext';
import ProtectedRoute from '~/components/common/ProtectedRoute/ProtectedRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            // --- FIX CHỌN LAYOUT ---
                            let Layout = DefaultLayout;

                            if (route.layout === null) {
                                Layout = Fragment;
                            } else if (route.layout) {
                                Layout = route.layout;
                            }

                            const layoutProps = {};
                            if (route.sidebarType) {
                                layoutProps.sidebarType = route.sidebarType;
                            }

                            const element = route.protected ? (
                                <ProtectedRoute>
                                    <Layout {...layoutProps}>
                                        <Page />
                                    </Layout>
                                </ProtectedRoute>
                            ) : (
                                <Layout {...layoutProps}>
                                    <Page />
                                </Layout>
                            );

                            return (
                                <Route key={index} path={route.path} element={element} />
                            );
                        })}
                    </Routes>

                    {/* Hair Analyzer luôn hiển thị */}
                    <HairAnalyzer />

                    {/* ShopBarber Chatbot luôn hiển thị */}
                    <ShopBarberChatbot />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
