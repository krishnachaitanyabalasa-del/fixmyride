import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import LogoImg from "../../assets/logo.png";
import "../styles/MechanicHeader.css";

export default function MechanicDashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const username =
    sessionStorage.getItem("username") || "Mechanic";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login-mechanic");
  };

  return (
    <header className="mechanic-dashboard-header">

      {/* LEFT SECTION */}
      <div className="mechanic-left-section">

        <button
          className="mechanic-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <RxHamburgerMenu />
        </button>

        <div
          className="mechanic-dashboard-logo"
          onClick={() => navigate("/mechanic-home")}
        >
          <img
            src={LogoImg}
            alt="FixMyRide"
          />

          <div className="mechanic-dashboard-brand">
            <span className="mechanic-brand-fix">
              Fix
            </span>

            <span className="mechanic-brand-my">
              My
            </span>

            <span className="mechanic-brand-ride">
              Ride
            </span>
          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="mechanic-dashboard-right">

        {/* NAVIGATION */}
        <div
          className={`mechanic-dashboard-center ${
            menuOpen ? "mobile-open" : ""
          }`}
        >

          <button
            className={`mechanic-nav-btn ${
              location.pathname === "/mechanic-home"
                ? "mechanic-active"
                : ""
            }`}
            onClick={() => {
              navigate("/mechanic-home");
              setMenuOpen(false);
            }}
          >
            Dashboard
          </button>

          <button
            className={`mechanic-nav-btn ${
              location.pathname === "/available-requests"
                ? "mechanic-active"
                : ""
            }`}
            onClick={() => {
              navigate("/available-requests");
              setMenuOpen(false);
            }}
          >
            Available Requests
          </button>

          <button
            className={`mechanic-nav-btn ${
              location.pathname === "/my-jobs"
                ? "mechanic-active"
                : ""
            }`}
            onClick={() => {
              navigate("/my-jobs");
              setMenuOpen(false);
            }}
          >
            My Jobs
          </button>

          <button
            className={`mechanic-nav-btn ${
              location.pathname === "/mechanic-profile"
                ? "mechanic-active"
                : ""
            }`}
            onClick={() => {
              navigate("/mechanic-profile");
              setMenuOpen(false);
            }}
          >
            Profile
          </button>

        </div>

        {/* NOTIFICATION */}
        <button className="mechanic-notification-btn">
          <FaBell />
          <span className="mechanic-notification-badge">
            3
          </span>
        </button>

        {/* USER INFO */}
        <div
          className="mechanic-info-box"
          onClick={() =>
            navigate("/mechanic-profile")
          }
        >
          <FaUserCircle
            className="mechanic-avatar-icon"
          />

          <div className="mechanic-info-content">
            <span className="mechanic-name-text">
              {username}
            </span>

            <span className="mechanic-role-text">
              Mechanic
            </span>
          </div>

        </div>

        {/* LOGOUT */}
        <button
          className="mechanic-logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>

      </div>

    </header>
  );
}
