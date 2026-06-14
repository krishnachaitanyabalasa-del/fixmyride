import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminHeader from "./components/AdminHeader";
import Footer from "../components/Footer";
import "./styles/AdminProfile.css";

import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
} from "react-icons/fa";

export default function AdminProfile() {

  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = sessionStorage.getItem("username");

  useEffect(() => {

    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-admin");
      return;
    }


    fetchAdmin();

  }, []);

  const fetchAdmin = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        `https://fixmyride-backend-7jfl.onrender.com/api/admin/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAdmin(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <h2 className="admin-profile-loading">
        Loading Profile...
      </h2>
    );
  }

  if (!admin) {
    return (
      <h2 className="admin-profile-loading">
        Unable to load profile
      </h2>
    );
  }

  return (
    <>
      <AdminHeader />

      <div className="admin-profile-container">

        <div className="admin-profile-banner">
          <h1>Admin Profile</h1>
          <p>
            View and manage your account information
          </p>
        </div>

        <div className="admin-profile-card">

          <div className="admin-profile-left">

            <FaUserCircle
              className="admin-profile-avatar"
            />

            <h2>{admin.username}</h2>

            <p>@{admin.username}</p>

            <span className="admin-role-badge">
              {admin.role}
            </span>

          </div>

          <div className="admin-profile-right">

            <div className="admin-info-row">

              <FaEnvelope />

              <div>
                <label>Email</label>
                <span>{admin.email}</span>
              </div>

            </div>

          </div>

        </div>

        <div className="admin-profile-grid">

          <div className="admin-profile-section">

            <h3>Personal Information</h3>

            <p>
              <strong>Username:</strong>
              {" "}
              {admin.username}
            </p>

            <p>
              <strong>Email:</strong>
              {" "}
              {admin.email}
            </p>

          </div>

          <div className="admin-profile-section">

            <h3>Account Information</h3>

            <p>
              <FaUserTag />
              {" "}
              <strong>Role:</strong>
              {" "}
              {admin.role}
            </p>

            <p>
              <FaCalendarAlt />
              {" "}
              <strong>Created:</strong>
              {" "}
              {
                admin.created_at
                  ? new Date(
                      admin.created_at
                    ).toLocaleDateString()
                  : "-"
              }
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              Active
            </p>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}
