import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import LogoImg from "../../assets/logo.png";
import "../styles/UserHeader.css";

export default function UserDashboardHeader() {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const username =
    sessionStorage.getItem("username") || "User";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login-user");
  };

  return (
    <header className="user-dashboard-header">

      {/* LEFT SECTION */}

      <div className="user-left-section">

        <button
          className="user-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <RxHamburgerMenu />
        </button>

        <div
          className="user-dashboard-logo"
          onClick={() => navigate("/user-home")}
        >
          <img
            src={LogoImg}
            alt="FixMyRide"
          />

          <div className="user-dashboard-brand">

            <span className="user-brand-fix">
              Fix
            </span>

            <span className="user-brand-my">
              My
            </span>

            <span className="user-brand-ride">
              Ride
            </span>

          </div>

        </div>

      </div>

      {/* DESKTOP / MOBILE NAV */}

      

      {/* RIGHT SECTION */}

      <div className="user-dashboard-right">

        <div
        className={`user-dashboard-center ${
          menuOpen ? "mobile-open" : ""
        }`}
      >

        <button
          className={`user-nav-btn ${
            location.pathname === "/user-home"
              ? "user-active"
              : ""
          }`}
          onClick={() => {
            navigate("/user-home");
            setMenuOpen(false);
          }}
        >
          Dashboard
        </button>

        <button
          className={`user-nav-btn ${
            location.pathname === "/my-requests"
              ? "user-active"
              : ""
          }`}
          onClick={() => {
            navigate("/my-requests");
            setMenuOpen(false);
          }}
        >
          My Requests
        </button>

        <button
          className={`user-nav-btn ${
            location.pathname === "/user-profile"
              ? "user-active"
              : ""
          }`}
          onClick={() => {
            navigate("/user-profile");
            setMenuOpen(false);
          }}
        >
          Profile
        </button>

      </div>

        <button className="user-notification-btn">
          <FaBell />
          <span className="user-notification-badge">
            3
          </span>
        </button>

        <div
          className="user-info-box"
          onClick={() =>
            navigate("/user-profile")
          }
        >

          <FaUserCircle
            className="user-avatar-icon"
          />

          <div className="user-info-content">

            <span className="user-name-text">
              {username}
            </span>

            <span className="user-role-text">
              Customer
            </span>

          </div>

        </div>

        <button
          className="user-logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>

      </div>

    </header>
  );
}
