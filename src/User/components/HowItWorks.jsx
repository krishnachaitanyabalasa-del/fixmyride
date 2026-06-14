import React from "react";
import {
  FaClipboardList,
  FaUserCog,
  FaCarSide,
} from "react-icons/fa";
import "../styles/HowItWorks.css";

const steps = [
  {
    icon: <FaClipboardList />,
    number: "01",
    title: "Request Assistance",
    description:
      "Tell us your vehicle issue and submit a service request in seconds.",
  },
  {
    icon: <FaUserCog />,
    number: "02",
    title: "Mechanic Assigned",
    description:
      "A nearby verified mechanic accepts your request and starts assisting.",
  },
  {
    icon: <FaCarSide />,
    number: "03",
    title: "Get Back On Road",
    description:
      "Mechanic arrives at your location and resolves the issue quickly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
      <div className="how-header">
        <span>HOW IT WORKS</span>
        <h2>Get Help In 3 Simple Steps</h2>
        <p>
          FixMyRide connects you with nearby mechanics and
          gets you back on the road faster.
        </p>
      </div>

      <div className="timeline-container">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="timeline-card">
              <div className="step-number">
                {step.number}
              </div>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>

            {index !== steps.length - 1 && (
              <div className="timeline-arrow">
                <svg
                  width="34"
                  height="24"
                  viewBox="0 0 34 24"
                  fill="none"
                >
                  <path
                    d="M2 12H30M30 12L22 4M30 12L22 20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
