import React from "react";
import "./StatsBar.css";

const stats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    value: "1000+",
    label: "Registered Users",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <polyline points="16 11 17 13 21 11"/>
      </svg>
    ),
    value: "300+",
    label: "Verified Mechanics",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    value: "5000+",
    label: "Completed Repairs",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    value: "4.8",
    label: "Average Rating",
    isStar: true,
  },
];

export default function StatsBar() {
  return (
    <section className="stats">
      <div className="stats__inner">
        {stats.map((s, i) => (
          <div key={i} className="stats__item">
            <div className="stats__icon-wrap">
              {s.icon}
            </div>
            <div className="stats__info">
              <span className="stats__value">
                {s.value}{s.isStar && <span className="stats__star"> ★</span>}
              </span>
              <span className="stats__label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

