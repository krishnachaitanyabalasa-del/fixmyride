import React from "react";
import "../styles/EmergencyBanner.css";
import { useNavigate } from "react-router-dom";
const EmergencyBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="emergency-section">
      <div className="emergency-container">

        <div className="emergency-content">

          <div className="emergency-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
            >
              <circle
                cx="40"
                cy="40"
                r="40"
                fill="rgba(255,255,255,0.2)"
              />

              <path
                d="M40 18L60 54H20L40 18Z"
                fill="white"
              />

              <rect
                x="37"
                y="30"
                width="6"
                height="14"
                rx="2"
                fill="#F97316"
              />

              <circle
                cx="40"
                cy="49"
                r="3"
                fill="#F97316"
              />
            </svg>
          </div>

          <div className="emergency-text">
            <h2>Stuck on the Road?</h2>

            <p>
              Get help from nearby mechanics immediately.
              Fast, reliable roadside assistance whenever
              you need it most.
            </p>
          </div>

          <button className="emergency-btn"
          
          onClick={(e) => {
            e.preventDefault();
            navigate("/request-service")}}>
            Request Emergency Service

            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
            >
              <path
                d="M2 12H36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M28 4L36 12L28 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
};

export default EmergencyBanner;
