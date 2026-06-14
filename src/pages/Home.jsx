import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RoleCards from "../components/RoleCards";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import StatsBar from "../components/StatsBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <RoleCards />
      <HowItWorks />
      <WhyChooseUs />
      <StatsBar />
      <Footer />
    </>
  );
}

