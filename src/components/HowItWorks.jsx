import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    num: 1,
    color: "blue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Report Issue",
    desc: "Tell us about your vehicle problem",
  },
  {
    num: 2,
    color: "orange",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Nearby Mechanic Found",
    desc: "We find the best mechanic near you",
  },
  {
    num: 3,
    color: "blue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <polyline points="16 11 17 13 21 11"/>
      </svg>
    ),
    title: "Mechanic Accepts",
    desc: "The mechanic accepts your request",
  },
  {
    num: 4,
    color: "orange",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Service Completed",
    desc: "The mechanic fixes your vehicle",
  },
  {
    num: 5,
    color: "blue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: "Payment & Review",
    desc: "Make payment and give your review",
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="about">
      <div className="hiw__inner">
        <div className="hiw__header">
          <h2 className="hiw__title">How It Works</h2>
        </div>
        <div className="hiw__steps">
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div className="hiw__step">
                <div className={`hiw__circle hiw__circle--${step.color}`}>
                  {step.icon}
                  <span className={`hiw__num hiw__num--${step.color}`}>{step.num}</span>
                </div>
                <h4 className="hiw__step-title">{step.title}</h4>
                <p className="hiw__step-desc">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hiw__connector">
                  <svg width="40" height="12" viewBox="0 0 40 12">
                    <line x1="0" y1="6" x2="40" y2="6" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="5,4"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

