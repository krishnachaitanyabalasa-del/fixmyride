import React from "react";
import {
  FaCarBattery,
  FaGasPump,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";
import { GiFlatTire } from "react-icons/gi";
import { MdOutlineSettings } from "react-icons/md";
import "../styles/UserServices.css";

const services = [
  {
    icon: <FaCarBattery />,
    title: "Battery Issue",
    desc: "Car not starting? We'll help jump start or replace your battery.",
    color: "#3B82F6",
  },
  {
    icon: <GiFlatTire />,
    title: "Flat Tyre",
    desc: "Got a flat tyre? We'll come and fix it for you.",
    color: "#8B5CF6",
  },
  {
    icon: <MdOutlineSettings />,
    title: "Engine Problem",
    desc: "Engine not working properly? Get expert assistance.",
    color: "#F59E0B",
  },
  {
    icon: <FaGasPump />,
    title: "Fuel Delivery",
    desc: "Ran out of fuel? We'll deliver fuel to your location.",
    color: "#22C55E",
  },
  {
    icon: <FaTools />,
    title: "General Service",
    desc: "Need general checkup or minor repairs? We've got you.",
    color: "#06B6D4",
  },
  {
    icon: <FaExclamationTriangle />,
    title: "Emergency Breakdown",
    desc: "Stuck on the road? Get immediate help for any breakdown.",
    color: "#EF4444",
  },
];

const ServiceCategories = () => {
  const handleServiceClick = (service) => {
    console.log(service);
    // navigate("/request-service");
  };

  return (
    <section className="services-section">
      <div className="services-header">
        <span>OUR SERVICES</span>
        <h2>How can we help you today?</h2>
        <p>
          Choose a service category that matches your vehicle issue.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => handleServiceClick(service.title)}
            style={{
              borderBottom: `5px solid ${service.color}`,
            }}
          >
            <div
              className="service-icon"
              style={{
                backgroundColor: `${service.color}15`,
                color: service.color,
              }}
            >
              {service.icon}
            </div>

            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCategories;
