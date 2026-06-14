import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__tagline">Trusted Vehicle Assistance Platform</p>
        <h1 className="hero__title">
          Fast, Reliable<br />
          <span className="hero__title--accent">Vehicle Assistance</span><br />
          Anytime, Anywhere
        </h1>
        <p className="hero__desc">
          FixMyRide connects you with trusted, verified mechanics for quick
          and reliable roadside assistance — whenever you need it.
        </p>
        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => navigate("/login-user")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            Request Service
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={() => navigate("/login-mechanic")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            Join as Mechanic
          </button>
        </div>
      </div>
      <div className="hero__image-wrap">
        <img
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=900&auto=format&fit=crop&q=80"
          alt="Mechanic assisting driver"
          className="hero__image"
        />
      </div>
    </section>
  );
}

