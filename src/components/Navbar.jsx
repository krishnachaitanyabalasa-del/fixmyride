import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import LogoImg from "../assets/logo.png";
import "./Navbar.css";

export default function LandingHeader() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="landing-header">

      {/* LEFT SECTION */}

      <div className="landing-left-section">

        <button
          className="landing-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <RxHamburgerMenu />
        </button>

        <div
          className="landing-logo"
          onClick={() => navigate("/")}
        >
          <img
            src={LogoImg}
            alt="FixMyRide"
          />

          <div className="landing-brand">

            <span className="landing-brand-fix">
              Fix
            </span>

            <span className="landing-brand-my">
              My
            </span>

            <span className="landing-brand-ride">
              Ride
            </span>

          </div>

        </div>

      </div>

      {/* CENTER NAVIGATION */}

      <div
        className={`landing-center-nav ${
          menuOpen ? "mobile-open" : ""
        }`}
      >

        <button
          className="landing-nav-btn"
          onClick={() => {
            document
              .getElementById("home")
              ?.scrollIntoView({
                behavior: "smooth",
              });

            setMenuOpen(false);
          }}
        >
          Home
        </button>

        <button
          className="landing-nav-btn"
          onClick={() => {
            document
              .getElementById("services")
              ?.scrollIntoView({
                behavior: "smooth",
              });

            setMenuOpen(false);
          }}
        >
          Services
        </button>

        <button
          className="landing-nav-btn"
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({
                behavior: "smooth",
              });

            setMenuOpen(false);
          }}
        >
          About Us
        </button>

        <button
          className="landing-nav-btn"
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({
                behavior: "smooth",
              });

            setMenuOpen(false);
          }}
        >
          Contact Us
        </button>

      </div>

      {/* RIGHT SECTION */}

      <div className="landing-right-section">

        <button
          className="landing-login-btn"
          onClick={() =>
            navigate("/login-user")
          }
        >
          Login
        </button>

      </div>

    </header>
  );
}
