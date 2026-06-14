import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleCards.css";

const roles = [
  {
    id: "user",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    title: "USER",
    description: "Request services, track mechanics and get your vehicle fixed.",
    path: "/login-user",
    label: "Login as User",
    color: "blue",
  },
  {
    id: "mechanic",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "MECHANIC",
    description: "Accept job requests, help customers and grow your business.",
    path: "/login-mechanic",
    label: "Login as Mechanic",
    color: "orange",
  },
  {
    id: "admin",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "ADMIN",
    description: "Manage users, mechanics, services and platform activities.",
    path: "/login-admin",
    label: "Login as Admin",
    color: "dark",
  },
];

export default function RoleCards() {
  const navigate = useNavigate();

  return (
    <section className="roles" id="services">
      <div className="roles__inner">
        <div className="roles__header">
          <h2 className="roles__title">Choose Your Role</h2>
          <p className="roles__subtitle">Select your role to login to your account</p>
        </div>

        <div className="roles__grid">
          {roles.map((role) => (
            <div key={role.id} className={`role-card role-card--${role.color}`}>
              <div className="role-card__icon-wrap">
                {role.icon}
              </div>
              <h3 className="role-card__title">{role.title}</h3>
              <p className="role-card__desc">{role.description}</p>
              <button
                className="login-button"
                onClick={() => navigate(role.path)}
              >
                {role.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="login-buttons" style={{ display: "none" }}>
          <button className="login-button" onClick={() => navigate("/login-user")}>Login as User</button>
          <button className="login-button" onClick={() => navigate("/login-mechanic")}>Login as Mechanic</button>
          <button className="login-button" onClick={() => navigate("/login-admin")}>Login as Admin</button>

        </div>
      </div>
    </section>
  );
}

