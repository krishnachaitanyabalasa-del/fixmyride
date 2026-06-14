import React from "react";
import "../styles/AdminHero.css";
import { FaArrowRight, FaChartLine } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function AdminHero() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "Admin";

  return (
    <section className="admin-hero">
      <div className="admin-hero-content">
        <h1>
          Welcome back, {username.toUpperCase()} <span>👋</span>
        </h1>

        <p>
          Manage users, mechanics, service requests,
          payments and platform operations from one place.
        </p>

        <div className="admin-hero-actions">
          <button className="admin-primary-btn"
            onClick={() =>{
              navigate("/admin-requests")
            }}
          >
            View Requests
            <FaArrowRight />
          </button>

          <button className="admin-secondary-btn"
            onClick={() =>{
              navigate("/admin-payments")
            }}          
          >
            View Payments
            <FaChartLine />
          </button>
        </div>
      </div>

      <div className="admin-hero-illustration">
        <div className="analytics-card main-card">
          <div className="chart-header">
            <div className="purple-line"></div>
            <div className="blue-line"></div>
          </div>

          <div className="graph">
            <svg viewBox="0 0 200 80">
              <path
                d="M10 60 Q40 20 70 40 T130 30 T190 10"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        <div className="floating-card floating-top">
          <div className="small-purple-line"></div>
          <div className="small-blue-line"></div>
        </div>

        <div className="floating-card floating-middle">
          <svg viewBox="0 0 120 50">
            <path
              d="M5 35 Q30 5 60 25 T115 10"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
            />
          </svg>
        </div>

        <div className="pie-card">
          <div className="pie-chart"></div>
        </div>
      </div>
    </section>
  );
}
