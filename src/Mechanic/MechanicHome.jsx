import MechanicHeader from "./components/MechanicHeader";
import MechanicHero from "./components/Mechanic_Hero";
import RequestsNearYou from "./components/RequestsNearYou";
import HowItWorks from "./components/HowItWorks";
import WhyJoinFixMyRide from "./components/WhyJoinFixMyRide";
import Footer from "../components/Footer";


export default function MechanicHome() {
  return (
    <>
      <MechanicHeader />
      <MechanicHero />  
      <RequestsNearYou />
      <HowItWorks />
      <WhyJoinFixMyRide />
      <Footer />
    </>
  );
}
