import React, { useEffect, useState } from "react";
import axios from "axios";

import UserHeader from "./components/UserHeader";
import Footer from "../components/Footer";
import "./styles/UserProfile.css";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTag,
  FaCalendarAlt,
} from "react-icons/fa";



export default function Profile() {
  const navigate = useNavigate();
  
  

  useEffect(() => {

        const token =sessionStorage.getItem("token");

        if (!token) {

        navigate("/login-user");

        }

    }, [navigate]);

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const username =
    sessionStorage.getItem("username");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {

    try {

      const token =
        sessionStorage.getItem("token");

      const response =
        await axios.get(
          `https://fixmyride-backend-7jfl.onrender.com/api/users/${username}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUser(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <h2 className="loading">
        Loading Profile...
      </h2>
    );
  }
  if (!user) {
    return <h2>Unable to load profile</h2>;
  }

  


  return (
    <>
      <UserHeader />

      <div className="profile-container">

        {/* PAGE HEADER */}

        <div className="profile-hero">

          <h1>My Profile</h1>

          <p>
            Manage your account
            information
          </p>

        </div>

        {/* PROFILE CARD */}

        <div className="profile-card">

          <div className="profile-left">

            <FaUserCircle
              className="profile-avatar"
            />

            <h2>
              {user.full_name}
            </h2>

            <p>
              @{user.username}
            </p>

            <span className="role-badge">
              {user.role}
            </span>

          </div>

          <div className="profile-right">

            <div className="info-item">

              <FaEnvelope />

              <div>
                <label>Email</label>

                <span>
                  {user.email}
                </span>
              </div>

            </div>

            <div className="info-item">

              <FaPhone />

              <div>
                <label>
                  Phone Number
                </label>

                <span>
                  {user.phoneNumber}
                </span>
              </div>

            </div>

            <div className="info-item">

              <FaMapMarkerAlt />

              <div>
                <label>
                  Address
                </label>

                <span>
                  {user.address}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* DETAILS GRID */}

        <div className="profile-grid">

          {/* PERSONAL INFO */}

          <div className="profile-section">

            <h3>
              Personal Information
            </h3>

            <p>
              <strong>
                Full Name:
              </strong>
              {" "}
              {user.full_name}
            </p>

            <p>
              <strong>
                Username:
              </strong>
              {" "}
              {user.username}
            </p>

            <p>
              <strong>
                Email:
              </strong>
              {" "}
              {user.email}
            </p>

            <p>
              <strong>
                Phone:
              </strong>
              {" "}
              {user.phoneNumber}
            </p>

          </div>

          {/* ACCOUNT INFO */}

          <div className="profile-section">

            <h3>
              Account Information
            </h3>

            <p>
              <FaUserTag />
              {" "}
              <strong>
                Role:
              </strong>
              {" "}
              {user.role}
            </p>

            <p>
              <FaCalendarAlt />
              {" "}
              <strong>
                Created:
              </strong>
              {" "}
              {
                user.created_at
                  ? new Date(
                      user.created_at
                    ).toLocaleDateString()
                  : "-"
              }
            </p>

            <p>
              <strong>
                Status:
              </strong>
              {" "}
              Active
            </p>

          </div>

          {/* LOCATION */}

          <div className="profile-section">

            <h3>
              Location Information
            </h3>

            <p>
              <strong>
                Latitude:
              </strong>
              {" "}
              {user.location_lat}
            </p>

            <p>
              <strong>
                Longitude:
              </strong>
              {" "}
              {user.location_long}
            </p>

            <a
              href={`https://maps.google.com/?q=${user.location_lat},${user.location_long}`}
              target="_blank"
              rel="noreferrer"
              className="map-btn"
            >
              View On Map
            </a>

          </div>

        </div>
      </div>        
       

      <Footer />
    </>
  );
}
