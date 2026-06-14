import React, { useState,useEffect } from "react";
import axios from "axios";
import MechanicHeroImg from "../../assets/MechanicHeroImage.png";

import "../styles/MechanicHero.css";

export default function MechanicHero() {


  const username =
    sessionStorage.getItem("username") || "Mechanic";

  const token =
    sessionStorage.getItem("token");

  const [isOnline, setIsOnline] =
    useState(false);

  const [loading, setLoading] =
    useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetchMechanicStatus();
  }, []);

  const fetchMechanicStatus = async () => {
    try {
      const response = await axios.get(
        `https://fixmyride-backend-7jfl.onrender.com/api/mechanics/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mechanic = response.data;

      setIsOnline(mechanic.availabilityStatus);
    } catch (error) {
      console.error("Failed to fetch mechanic status", error);
    }
  };

  const handleAvailabilityToggle = async () => {
    const newStatus = !isOnline;



    try {
      setLoading(true);

      console.log("Username:", username);
      console.log("Token:", token);

      // First fetch mechanic details
      const mechanicResponse = await axios.get(
        `https://fixmyride-backend-7jfl.onrender.com/api/mechanics/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mechanic = mechanicResponse.data;

      console.log("Mechanic:", mechanic);

      // Update availability status
      await axios.put(
        `https://fixmyride-backend-7jfl.onrender.com/api/mechanic/${username}`,
        {
          ...mechanic,
          availabilityStatus: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsOnline(newStatus);

      setMessage(
        newStatus
          ? "You are now Online"
          : "You are now Offline"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);

      console.log(error.response?.data);

      setMessage("Failed to update status");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (

    <section className="mechanic-hero">

      {/* LEFT */}

      <div className="hero-left">
        <span className="hero-badge">
          WELCOME BACK, {username.toUpperCase()} 👋
        </span>

        <h1>
          Ready to assist
          <br />
          drivers today?
        </h1>

        <p>
          Accept nearby service requests and help
          stranded customers get back on the road.
        </p>

        {message && (
          <div className="status-message">
            {message}
          </div>
        )}

        <button
          className="online-btn"
          disabled={loading}
          onClick={handleAvailabilityToggle}
        >
          {loading
            ? "Updating..."
            : isOnline
            ? "Go Offline"
            : "Go Online"}
        </button>

        <div className="hero-status">

          <span
            className={`status-dot ${
              isOnline
                ? "online"
                : "offline"
            }`}
          />

          <span>
            {isOnline
              ? "You are currently online"
              : "You are currently offline"}
          </span>

        </div>

      </div>

      {/* RIGHT */}

      <div className="hero-right">
        <img
          src={MechanicHeroImg}
          alt="Mechanic Hero"
        />
      </div>
    </section>

  );
}
