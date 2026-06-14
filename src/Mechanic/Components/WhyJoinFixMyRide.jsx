import {
  FaShieldAlt,
  FaClock,
  FaWallet,
  FaCalendarAlt,
} from "react-icons/fa";

import "../styles/WhyJoinFixMyRide.css";

export default function WhyJoinFixMyRide() {
  const benefits = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Platform",
      description: "100% verified requests for your safety",
    },
    {
      icon: <FaClock />,
      title: "More Jobs Daily",
      description: "Get more jobs in your service area",
    },
    {
      icon: <FaWallet />,
      title: "Secure Payments",
      description: "Transparent and fast payouts",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Work on Your Time",
      description: "Be your own boss and work flexibly",
    },
  ];

  return (
    <section className="why-join-section">
      <h2 className="why-title">WHY JOIN FIXMYRIDE?</h2>

      <div className="why-container">
        {benefits.map((item, index) => (
          <div className="why-item" key={index}>
            <div className="why-icon">
              {item.icon}
            </div>

            <div className="why-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
