import UserHeader from "./components/UserHeader";
import UserHero from "./components/UserHero";
import UserServices from "./components/UserServices";
import HowItWorks from "./components/HowItWorks";
import Footer from "../components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import EmergencyBanner from "./components/EmergencyBanner";
import "./styles/UserHomePage.css";


export default function UserHomePage() {
    return (
      <>
        <UserHeader />
        <UserHero />
        <UserServices />
        <HowItWorks />
        <WhyChooseUs />
        <EmergencyBanner />
        <Footer />
      </> 
    );
}
