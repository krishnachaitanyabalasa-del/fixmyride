import React from "react";
import "../styles/RequestServiceHero.css";
import HeroImg from "../../assets/UserHeroImage.png";

const RequestServiceHero = () => {
  return (
    <section className="request-hero">
      <div className="request-hero-content">

        {/* Left Content */}
        <div className="request-hero-left">
          <h1>
            Request Vehicle
            <br />
            <span>Assistance</span>
          </h1>

          <p>
            Tell us about your vehicle issue and we'll
            connect you with a nearby mechanic.
          </p>

          <div className="hero-features">

            <div className="feature">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L19 5V11C19 16 15.5 20.5 12 22C8.5 20.5 5 16 5 11V5L12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Verified Mechanics
            </div>

            <span>•</span>

            <div className="feature">
              Fast Response
            </div>

            <span>•</span>

            <div className="feature">
              24/7 Support
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="request-hero-right">

          <img
            src={HeroImg}
            alt="Request Service"
            className="request-hero-image"
          />

        </div>

      </div>
    </section>
  );
};

export default RequestServiceHero;
