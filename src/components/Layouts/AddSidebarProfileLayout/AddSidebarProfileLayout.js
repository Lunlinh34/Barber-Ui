import { useLocation, useNavigate  } from "react-router-dom";
import classNames from "classnames/bind";
import React, { useContext } from "react";

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SideSidebarProfile from '../../common/SidebarProfile/sideSidebarProfile';
import styles from './SideSidebarLayout.module.scss';
import { AuthContext } from "~/contexts/AuthContext";

const cx = classNames.bind(styles);

function AddSidebarProfileLayout({
  children,
  userName,
  membership,
  menuItems, // nếu không truyền, SideSidebarProfile sẽ dùng menu mặc định
  onLogout = () => {},
}) {
  const location = useLocation(); // lấy đường dẫn hiện tại
  const navigate = useNavigate(); // hook navigate
  const { logout } = useContext(AuthContext);

  // khi click menu, navigate tới path tương ứng
  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <SideSidebarProfile
          userName={userName}
          membership={membership}
          menuItems={menuItems}
          currentPath={location.pathname} // highlight menu hiện tại
          onMenuClick={handleMenuClick}  // truyền hàm navigate
          onLogout={logout}
        />
        <div className={cx('content')}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddSidebarProfileLayout;
