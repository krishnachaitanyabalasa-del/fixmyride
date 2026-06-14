
import AdminHeader from "./components/AdminHeader";
import Footer from "../components/Footer.jsx";
import AdminHero from "./components/AdminHero.jsx";
import AdminStats from "./components/Adminstats.jsx";
import QuickActions from "./components/QuickActions.jsx";
import AdminMechanicPreview from "./components/AdminMechanicPreview.jsx";

import "./styles/AdminHome.css";
export default function AdminHome(){
  return(
    <>
      <AdminHeader/>
       <div className="admin-home-container">
        <AdminHero/>
        <AdminStats/>
        <QuickActions/>
        <AdminMechanicPreview/>
      </div>
      <Footer/>
    </>
  );
}
