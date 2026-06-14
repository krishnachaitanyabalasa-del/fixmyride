import React from "react";
import "../styles/WhyChooseUs.css";

const features = [
  {
    title: "Verified Mechanics",
    description:
      "Only approved and verified mechanics can accept and complete service requests.",
    icon: (
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
      >
        <circle cx="35" cy="35" r="35" fill="#E8F0FF" />
        <path
          d="M35 18L48 23V33C48 42 42 49 35 52C28 49 22 42 22 33V23L35 18Z"
          fill="#2563EB"
        />
        <path
          d="M30 35L34 39L41 30"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Fast Response",
    description:
      "Get quick assistance from nearby mechanics during emergencies and breakdowns.",
    icon: (
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
      >
        <circle cx="35" cy="35" r="35" fill="#FFF4E8" />
        <path
          d="M38 14L22 39H33L30 56L48 29H36L38 14Z"
          fill="#F97316"
        />
      </svg>
    ),
  },
  {
    title: "Real-Time Tracking",
    description:
      "Track request status and mechanic updates from acceptance to completion.",
    icon: (
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
      >
        <circle cx="35" cy="35" r="35" fill="#E8F7EF" />
        <path
          d="M35 17C27 17 21 23 21 31C21 42 35 53 35 53C35 53 49 42 49 31C49 23 43 17 35 17Z"
          fill="#10B981"
        />
        <circle
          cx="35"
          cy="31"
          r="6"
          fill="white"
        />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <div className="why-header">
        <span>WHY CHOOSE FIXMYRIDE</span>
        <h2>Reliable Roadside Assistance When You Need It Most</h2>
        <p>
          We connect drivers with trusted mechanics for
          quick and hassle-free vehicle support.
        </p>
      </div>

      <div className="why-grid">
        {features.map((feature, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
