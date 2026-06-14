import React from "react";
import {
  FaClipboardCheck,
  FaMapMarkedAlt,
  FaTools,
  FaWallet,
} from "react-icons/fa";

import "../styles/HowItWorks.css";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaClipboardCheck />,
      title: "Accept Request",
      description: "Receive nearby service requests from stranded drivers.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Reach Customer",
      description: "Navigate quickly to the customer location.",
    },
    {
      icon: <FaTools />,
      title: "Repair Vehicle",
      description: "Provide fast and reliable roadside assistance.",
    },
    {
      icon: <FaWallet />,
      title: "Generate Payment",
      description: "Complete the service and get paid securely.",
    },
  ];

  return (
    <section className="how-section">
      <h2 className="section-title">HOW IT WORKS</h2>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{index + 1}</div>

            <div className="step-icon">
              {step.icon}
            </div>

            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
