// import React from "react";
// import "./sideSidebarProfile.scss"; // file CSS cùng thư mục

// const SideSidebarProfile = ({ userName = "Người dùng", membership = "Bronze Priority" }) => {
//   return (
//     <div className="side-sidebar-profile">
//       {/* 🔹 Phần đầu: avatar + tên + cấp thành viên */}
//       <div className="profile-header">
//         <div className="avatar">
//           {userName?.charAt(0)?.toUpperCase() || "U"}
//         </div>
//         <div className="profile-info">
//           <h4 className="name">{userName}</h4>
//           <div className="membership">{membership}</div>
//         </div>
//       </div>

//       {/* 🔹 Danh sách menu */}
//       <ul className="profile-menu">
//         <li>Hồ sơ cá nhân</li>
//         <li>Thẻ của tôi</li>
//         <li>Lịch Sử Đặt Lịch</li>
//         <li>Lịch Sử Đặt Hàng</li>
//         <li>Của Hàng Của Tôi</li>
      
//       </ul>
//     </div>
//   );
// };

// export default SideSidebarProfile;
// import React from "react";
// import "./sideSidebarProfile.scss";

// const SideSidebarProfile = ({
//   userName = "Người dùng",
//   membership = "Bronze Priority",
// }) => {
//   return (
//     <div className="side-sidebar-profile">
//       {/* 🔹 Header: avatar + tên + cấp */}
//       <div className="profile-header">
//         <div className="avatar">
//           {userName?.charAt(0)?.toUpperCase() || "U"}
//         </div>
//         <div className="profile-info">
//           <h4 className="name">{userName}</h4>
//           <div className="membership">{membership}</div>
//         </div>
//       </div>

//       {/* 🔹 Menu điều hướng */}
//       <ul className="profile-menu">
//         <li className="active">Hồ sơ cá nhân</li>
//         <li>Thẻ của tôi</li>
//         <li>Lịch sử đặt lịch</li>
//         <li>Lịch sử đặt hàng</li>
//         <li>Cửa hàng của tôi</li>
//       </ul>

//       {/* 🔹 Đăng xuất */}
//       <div className="logout">Đăng xuất</div>
//     </div>
//   );
// };

// export default SideSidebarProfile;
import React, { useContext } from "react";
import "./sideSidebarProfile.scss";
import routes from '../../../config/routes';
import { AuthContext } from '~/contexts/AuthContext'; // ✅ import AuthContext

const SideSidebarProfile = ({
  membership = "Bronze Priority",
  menuItems = [
    { path: routes.personalPage, label: "Trang cá nhân" },
    { path: routes.bookingHistory, label: "Lịch sử đặt lịch" },
    { path: routes.OrderSuccessPage, label: "Lịch sử đặt hàng" },
    { path: routes.SellerServicePage, label: "Quản Lý Cửa Hàng" },
    { path: routes.RegisterStorePage, label: "Đăng ký cửa hàng" },
  ],
  currentPath = "",
  onMenuClick = () => {},
  onLogout = (logout) => {},
}) => {
  const { user } = useContext(AuthContext); // ✅ Lấy user từ context
  
  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Người dùng';
      const { logout } = useContext(AuthContext);

  return (
    <div className="side-sidebar-profile">
      <div className="profile-header">
        <div className="avatar">{userName?.charAt(0)?.toUpperCase() || "U"}</div>
        <div className="profile-info">
          <h4 className="name">{userName}</h4>
          <div className="membership">{membership}</div>
        </div>
      </div>

      <ul className="profile-menu">
        {menuItems.map(item => (
          <li
            key={item.path}
            className={currentPath === item.path ? "active" : ""}
            onClick={() => onMenuClick(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="logout" onClick={onLogout}>
        Đăng xuất
      </div>
    </div>
  );
};

export default SideSidebarProfile;
