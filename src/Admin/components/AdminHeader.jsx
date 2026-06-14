import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaTools,
  FaClipboardList,
  FaCreditCard,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import "../styles/AdminHeader.css";
import logo from "../../assets/logo.png";

export default function AdminHeader() {
  const username =
    sessionStorage.getItem("username") || "Admin";

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login-admin");
  };

  return (
    <header className="admin-header">

      {/* Left Section */}

      <div className="admin-left-section">

        <button
          className="admin-menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <RxHamburgerMenu />
        </button>

        <div className="admin-header-logo"
          onClick={() =>
            navigate("/admin-home")
          }
        >
          <img
            src={logo}
            alt="FixMyRide"
            className="admin-logo-img"
          />

          <div className="admin-logo-text">
            <span className="admin-brand-fix">
              Fix
            </span>

            <span className="admin-brand-my">
              My
            </span>

            <span className="admin-brand-ride">
              Ride
            </span>
          </div>
        </div>

      </div>

    

      


      {/* Right Section */}

      <div className="admin-header-right">

        <div className="admin-navbar">

          <button
            className={`admin-nav-btn ${
              location.pathname === "/admin-home"
                ? "admin-active"
                : ""
            }`}
            onClick={() =>
              navigate("/admin-home")
            }
          >
            <FaHome />
            <span>Dashboard</span>
          </button>

          <button
            className={`admin-nav-btn ${
              location.pathname === "/admin-users"
                ? "admin-active"
                : ""
            }`}
            onClick={() =>
              navigate("/admin-users")
            }
          >
            <FaUsers />
            <span>Users</span>
          </button>

          <button
            className={`admin-nav-btn ${
              location.pathname === "/admin-mechanics"
                ? "admin-active"
                : ""
            }`}
            onClick={() =>
              navigate("/admin-mechanics")
            }
          >
            <FaTools />
            <span>Mechanics</span>
          </button>

          <button
            className={`admin-nav-btn ${
              location.pathname === "/admin-requests"
                ? "admin-active"
                : ""
            }`}
            onClick={() =>
              navigate("/admin-requests")
            }
          >
            <FaClipboardList />
            <span>Requests</span>
          </button>

          <button
            className={`admin-nav-btn ${
              location.pathname === "/admin-payments"
                ? "admin-active"
                : ""
            }`}
            onClick={() =>
              navigate("/admin-payments")
            }
          >
            <FaCreditCard />
            <span>Payments</span>
          </button>

          <button
            className={`admin-nav-btn ${
              location.pathname === "/admin-profile"
                ? "admin-active"
                : ""
            }`}
            onClick={() =>
              navigate("/admin-profile")
            }
          >
            <FaUserCircle />
            <span>Profile</span>
          </button>


        </div>

        {/* Notification */}

        <div className="admin-notification">
          <FaBell />
          <span className="notification-badge">
            5
          </span>
        </div>

        {/* Avatar */}

        <div className="admin-avatar"
          onClick={() =>
            navigate("/admin-profile")
          }
        >
          
          {username
            .charAt(0)
            .toUpperCase()}
        </div>

        {/* Logout */}

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>

      </div>

    </header>
  );
}
