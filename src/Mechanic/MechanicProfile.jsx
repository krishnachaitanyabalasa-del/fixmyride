import React, { useEffect, useState } from "react";
import axios from "axios";

import MechanicHeader from "./components/MechanicHeader";
import Footer from "../components/Footer";
import "./styles/MechanicProfile.css";

import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaTools,
} from "react-icons/fa";

export default function MechanicProfile() {
  const navigate = useNavigate();

  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login-mechanic");
    }
  }, [navigate]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-mechanic");
      return;
    }

    fetchMechanic();
  }, []);

  const fetchMechanic = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        `https://fixmyride-backend-7jfl.onrender.com/api/mechanics/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMechanic(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2 className="mechProfileX-loading">
        Loading Profile...
      </h2>
    );
  }

  if (!mechanic) {
    return (
      <h2 className="mechProfileX-loading">
        Profile Not Found
      </h2>
    );
  }

  return (
    <>
      <MechanicHeader />

      <div className="mechProfileX-container">
        {/* HERO */}

        <div className="mechProfileX-hero">
          <h1>Mechanic Profile</h1>

          <p>
            Manage your professional account
            information
          </p>
        </div>

        {/* PROFILE CARD */}

        <div className="mechProfileX-card">
          <div className="mechProfileX-left">
            <FaUserCircle className="mechProfileX-avatar" />

            <h2>{mechanic.username}</h2>

            <span className="mechProfileX-roleBadge">
              {mechanic.role}
            </span>

            <span
              className={`mechProfileX-statusBadge ${
                mechanic.availabilityStatus
                  ? "mechProfileX-online"
                  : "mechProfileX-offline"
              }`}
            >
              {mechanic.availabilityStatus
                ? "Available"
                : "Unavailable"}
            </span>
          </div>

          <div className="mechProfileX-right">
            <div className="mechProfileX-infoItem">
              <FaEnvelope />

              <div>
                <label>Email</label>

                <span>{mechanic.email}</span>
              </div>
            </div>

            <div className="mechProfileX-infoItem">
              <FaPhone />

              <div>
                <label>Phone Number</label>

                <span>
                  {mechanic.phone_number}
                </span>
              </div>
            </div>

            <div className="mechProfileX-infoItem">
              <FaTools />

              <div>
                <label>Skills</label>

                <span>
                  {mechanic.skills}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}

        <div className="mechProfileX-grid">
          {/* PROFESSIONAL INFO */}

          <div className="mechProfileX-section">
            <h3>
              Professional Information
            </h3>

            <p>
              <FaTools />{" "}
              <strong>Skills:</strong>{" "}
              {mechanic.skills}
            </p>

            <p>
              <strong>
                Experience:
              </strong>{" "}
              {
                mechanic.experience_years
              }{" "}
              Years
            </p>

            <p>
              <FaStar />{" "}
              <strong>Rating:</strong>{" "}
              {mechanic.rating}
            </p>

            <p>
              <strong>
                Service Radius:
              </strong>{" "}
              {
                mechanic.service_radius_km
              }{" "}
              km
            </p>
          </div>

          {/* ACCOUNT INFO */}

          <div className="mechProfileX-section">
            <h3>
              Account Information
            </h3>

            <p>
              <FaUserTag />{" "}
              <strong>
                Username:
              </strong>{" "}
              {mechanic.username}
            </p>

            <p>
              <FaUserTag />{" "}
              <strong>Role:</strong>{" "}
              {mechanic.role}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {mechanic.status}
            </p>

            <p>
              <FaCalendarAlt />{" "}
              <strong>
                Created:
              </strong>{" "}
              {mechanic.created_at
                ? new Date(
                    mechanic.created_at
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>

          {/* LOCATION */}

          <div className="mechProfileX-section">
            <h3>Base Location</h3>

            <p>
              <FaMapMarkerAlt />{" "}
              <strong>
                Latitude:
              </strong>{" "}
              {
                mechanic.base_location_lat
              }
            </p>

            <p>
              <FaMapMarkerAlt />{" "}
              <strong>
                Longitude:
              </strong>{" "}
              {
                mechanic.base_location_long
              }
            </p>

            <a
              href={`https://maps.google.com/?q=${mechanic.base_location_lat},${mechanic.base_location_long}`}
              target="_blank"
              rel="noreferrer"
              className="mechProfileX-mapBtn"
            >
              View Base Location
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
