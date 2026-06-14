import React from "react";
import {
  FaWrench,
  FaCog,
  FaMapMarkerAlt,
  FaTools,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import userHomeImg from "../../assets/UserHeroImage.png";
import "../styles/UserHero.css";

export default function UserHero() {
  const navigate = useNavigate();
  const username =
    sessionStorage.getItem("username") || "User";
  return(
    <>
      <div className="hero-content">

        {/* Left Side */}
        <div className="hero-left">
          <span className="welcome-badge">
            WELCOME BACK, {username.toUpperCase()} 👋
          </span>

          <h1 className="hero-title">
            Need Vehicle <br />
            <span>Assistance?</span>
          </h1>

          <p className="hero-description">
            Get connected with trusted mechanics for breakdowns,
            flat tyres, battery issues and emergency roadside
            support near your location within minutes.
          </p>

          <button className="hero-btn"        
          onClick={(e) => {
              e.preventDefault();
              navigate("/request-service");
            }}>
            <FaTools />
            Request Service
          </button>

          <div className="hero-users">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="user"
            />
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="user"
            />
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="user"
            />
            <img
              src="https://i.pravatar.cc/40?img=4"
              alt="user"
            />
            <span>Trusted by 2,500+ users</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-right">

          {/* Floating Icons */}
          

          {/* Main Illustration */}
          <img
            src={userHomeImg}
            alt="Vehicle Assistance"
            className="hero-image"
          />
        </div>

      </div>
    </>
  );
}
