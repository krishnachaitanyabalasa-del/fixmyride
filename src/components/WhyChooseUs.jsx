import React from "react";
import "./WhyChooseUs.css";

const cols = [
  {
    id: "users",
    color: "blue",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    heading: "For Users",
    features: [
      "Emergency Assistance",
      "Real-time Tracking",
      "Secure Payments",
      "Service History",
    ],
    visual: (
      <div className="wcu__phone-mockup">
        <svg viewBox="0 0 80 140" width="80" height="140">
          <rect x="4" y="4" width="72" height="132" rx="10" fill="#1E3A8A" stroke="#2563EB" strokeWidth="1.5"/>
          <rect x="10" y="14" width="60" height="90" rx="4" fill="#EFF6FF"/>
          <circle cx="40" cy="48" r="14" fill="#2563EB" opacity="0.15"/>
          <circle cx="40" cy="48" r="8" fill="#2563EB"/>
          <rect x="14" y="70" width="52" height="6" rx="3" fill="#BFDBFE"/>
          <rect x="14" y="80" width="36" height="4" rx="2" fill="#DBEAFE"/>
          <rect x="14" y="88" width="44" height="4" rx="2" fill="#DBEAFE"/>
          <rect x="16" y="112" width="48" height="14" rx="7" fill="#2563EB"/>
          <text x="40" y="122" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" fontWeight="600">Track Mechanic</text>
        </svg>
        <svg viewBox="0 0 110 80" width="110" height="80" style={{marginTop: -20, marginLeft: 30}}>
          <rect x="4" y="4" width="102" height="72" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <rect x="10" y="10" width="40" height="60" rx="4" fill="#F3F4F6"/>
          <circle cx="55" cy="34" r="12" fill="#FFF7ED"/>
          <circle cx="55" cy="34" r="7" fill="#F97316"/>
          <rect x="56" y="14" width="44" height="6" rx="3" fill="#BFDBFE"/>
          <rect x="56" y="24" width="30" height="4" rx="2" fill="#DBEAFE"/>
        </svg>
      </div>
    ),
  },
  {
    id: "mechanics",
    color: "orange",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    heading: "For Mechanics",
    features: [
      "Job Notifications",
      "Earnings Dashboard",
      "Service Management",
      "Grow Your Business",
    ],
    visual: (
      <div className="wcu__mechanic-visual">
        <div className="wcu__avatar">
          <svg viewBox="0 0 60 80" width="60" height="80">
            <circle cx="30" cy="22" r="18" fill="#FED7AA"/>
            <rect x="8" y="40" width="44" height="40" rx="10" fill="#F97316"/>
            <circle cx="30" cy="22" r="10" fill="#FDBA74"/>
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: "admins",
    color: "dark",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    heading: "For Admins",
    features: [
      "User Management",
      "Mechanic Verification",
      "Service Monitoring",
      "Reports & Analytics",
    ],
    visual: (
      <div className="wcu__chart-visual">
        <svg viewBox="0 0 120 80" width="120" height="80">
          <rect width="120" height="80" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <rect x="8" y="8" width="104" height="12" rx="3" fill="#F9FAFB"/>
          <rect x="8" y="28" width="20" height="40" rx="3" fill="#BFDBFE"/>
          <rect x="34" y="40" width="20" height="28" rx="3" fill="#2563EB"/>
          <rect x="60" y="32" width="20" height="36" rx="3" fill="#93C5FD"/>
          <rect x="86" y="20" width="20" height="48" rx="3" fill="#F97316"/>
        </svg>
      </div>
    ),
  },
];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export default function WhyChooseUs() {
  return (
    <section className="wcu">
      <div className="wcu__inner">
        <div className="wcu__header">
          <h2 className="wcu__title">Why Choose FixMyRide?</h2>
        </div>
        <div className="wcu__grid">
          {cols.map((col) => (
            <div key={col.id} className={`wcu__col wcu__col--${col.color}`}>
              <div className="wcu__col-head">
                <div className={`wcu__col-icon wcu__col-icon--${col.color}`}>{col.icon}</div>
                <h3 className={`wcu__col-title wcu__col-title--${col.color}`}>{col.heading}</h3>
              </div>
              <ul className="wcu__features">
                {col.features.map((f) => (
                  <li key={f} className={`wcu__feat wcu__feat--${col.color}`}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="wcu__visual">{col.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

