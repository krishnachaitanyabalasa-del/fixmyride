import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginUser from "./pages/LoginUser";
import LoginMechanic from "./pages/LoginMechanic";
import LoginAdmin from "./pages/LoginAdmin";
import AdminRegister from "./Admin/RegisterAdmin";
import MechanicRegister from "./Mechanic/RegisterMechanic";
import UserRegister from "./User/RegisterUser";

import UserHomePage from "./User/UserHomePage";
import RequestService from "./User/RequestService";
import MyRequests from "./User/MyRequests";
import UserProfile from "./User/UserProfile";


import MechanicHomePage from "./Mechanic/MechanicHome";
import RequestsPage from "./Mechanic/RequestsPage";
import MyJobs from "./Mechanic/MyJobs";
import MechanicProfile from "./Mechanic/MechanicProfile";

import AdminHome from "./Admin/AdminHome"
import AdminUsers from "./Admin/AdminUsers"
import AdminMechanics from "./Admin/AdminMechanics"
import AdminRequests from "./Admin/AdminRequests";
import AdminPayments from "./Admin/AdminPayments";
import AdminProfile from "./Admin/AdminProfile";
import "./App.css";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login-mechanic" element={<LoginMechanic />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/register-admin" element={<AdminRegister />}/>
        <Route path="/register-mechanic" element={<MechanicRegister />}/>
        <Route path="/register-user" element={<UserRegister />}/>

        <Route path="/user-home" element={<UserHomePage />}/>
        <Route path="/request-service" element={<RequestService />}/>
        <Route path="/my-requests" element={<MyRequests />}/>
        <Route path="/user-profile" element={<UserProfile />}/>

        <Route path="/mechanic-home" element={<MechanicHomePage />}/>
        <Route path="/available-requests" element={<RequestsPage/>} />
        <Route path="/my-jobs" element={<MyJobs/>}/>
        <Route path="/mechanic-profile" element ={<MechanicProfile/>}/>


        <Route path="/admin-home" element={<AdminHome/>}/>
        <Route path="/admin-users" element={<AdminUsers/>}/>
        <Route path="/admin-mechanics" element={<AdminMechanics/>}/>
        <Route path="/admin-requests" element={<AdminRequests/>}/>
        <Route path="/admin-payments" element={<AdminPayments/>}/>
        <Route path="/admin-profile" element={<AdminProfile/>} />
      </Routes>
    </Router>
  );
}

