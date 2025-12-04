import React, { useState } from "react";
import "./Sidebar.css"; // import CSS

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside className="vertical-sidebar">
      <input
        type="checkbox"
        id="checkbox-input"
        className="checkbox-input"
        checked={isOpen}
        onChange={toggleSidebar}
      />
      <nav>
        <header>
          <div className="sidebar__toggle-container">
            <label
              htmlFor="checkbox-input"
              id="label-for-checkbox-input"
              className="nav__toggle"
              tabIndex={0}
            >
              <span className="toggle--icons" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={`toggle-svg-icon toggle--open ${
                    !isOpen ? "hidden" : ""
                  }`}
                >
                  <path d="M3 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zM2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M2 18a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"></path>
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={`toggle-svg-icon toggle--close ${
                    isOpen ? "hidden" : ""
                  }`}
                >
                  <path d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z"></path>
                </svg>
              </span>
            </label>
          </div>
          <figure>
            <img
              className="codepen-logo"
              src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-black.png"
              alt="Codepen Logo"
            />
            <figcaption>
              <p className="user-id">Codepen</p>
              <p className="user-role">Coder</p>
            </figcaption>
          </figure>
        </header>

        <section className="sidebar__wrapper">
          {/* Primary Links */}
          <ul className="sidebar__list list--primary">
            <li className="sidebar__item item--heading">
              <h2 className="sidebar__item--heading">general</h2>
            </li>
            <SidebarLink iconPath="M4.98 4a.5.5..." text="Inbox" />
            <SidebarLink iconPath="M2.866 14.85..." text="Favourite" />
            <SidebarLink iconPath="M15.854.146..." text="Sent" />
            <SidebarLink iconPath="M2 2a2 2..." text="Draft" />
            <SidebarLink iconPath="M0 2a1 1..." text="Archive" />
            <SidebarLink iconPath="M5.5 5.5..." text="Trash" />
          </ul>

          {/* Secondary Links */}
          <ul className="sidebar__list list--secondary">
            <li className="sidebar__item item--heading">
              <h2 className="sidebar__item--heading">general</h2>
            </li>
            <SidebarLink iconPath="M11 6a3 3..." text="Profile" />
            <SidebarLink iconPath="M8 4.754a3.246..." text="Settings" />
            <SidebarLink iconPath="M10 12.5a.5..." text="Logout" />
          </ul>
        </section>
      </nav>
    </aside>
  );
};

// Component con cho 1 link
const SidebarLink = ({ iconPath, text }) => {
  return (
    <li className="sidebar__item">
      <a href="#" className="sidebar__link" data-tooltip={text}>
        <span className="icon">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d={iconPath} />
          </svg>
        </span>
        <span className="text">{text}</span>
      </a>
    </li>
  );
};

export default Sidebar;
