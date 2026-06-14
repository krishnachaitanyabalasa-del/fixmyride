import UserHeader from "./components/UserHeader";
import RequestServiceHero from "./components/RequestServiceHero";
import RequestServiceForm from "./components/RequestServiceForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RequestService() {
    const navigate = useNavigate();
    useEffect(() => {

        const token =sessionStorage.getItem("token");

        if (!token) {

        navigate("/login-user");

        }

    }, [navigate]);
    return (
        <div>
          <UserHeader /> 
          <RequestServiceHero />
          <RequestServiceForm />
        </div>
    );
}
