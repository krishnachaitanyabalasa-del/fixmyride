import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import "./styles/AdminMechanics.css";

import AdminHeader from "./components/AdminHeader";
import VerifiedMechanics from "./components/VerifiedMechanics";
import { useNavigate } from "react-router-dom";

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState([]);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showMechanicModal, setShowMechanicModal] = useState(false);

  const [verifiedMechanics, setVerifiedMechanics] = useState([]);
  const [filteredVerifiedMechanics, setFilteredVerifiedMechanics] = useState([]);
  const navigate  = useNavigate();

  useEffect(() => {

    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-admin");
      return;
    }

    fetchPendingMechanics();
    fetchVerifiedMechanics();

  }, [navigate]);

  useEffect(() => {
    const filteredPending = mechanics.filter(
      (mechanic) =>
        mechanic.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        mechanic.skills
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        mechanic.phone_number?.includes(searchTerm)
    );

    const filteredVerified = verifiedMechanics.filter(
      (mechanic) =>
        mechanic.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        mechanic.skills
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        mechanic.phone_number?.includes(searchTerm)
    );

    setFilteredMechanics(filteredPending);
    setFilteredVerifiedMechanics(filteredVerified);
  }, [searchTerm, mechanics, verifiedMechanics]);


  const fetchVerifiedMechanics = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "https://fixmyride-backend-7jfl.onrender.com/api/mechanics/active",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVerifiedMechanics(response.data);
      setFilteredVerifiedMechanics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingMechanics = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "https://fixmyride-backend-7jfl.onrender.com/api/admin/pending-mechanics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMechanics(response.data);
      setFilteredMechanics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveMechanic = async (username) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.put(
        `https://fixmyride-backend-7jfl.onrender.com/api/admin/approve/${username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPendingMechanics();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectMechanic = async (username) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.put(
        `https://fixmyride-backend-7jfl.onrender.com/api/admin/reject/${username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPendingMechanics();
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowMechanicModal(true);
  };

  return (
    <>
      <AdminHeader/>
      <div className="mechanics-page">
        
        <div className="mechanics-header-section">
          <h1>Mechanic Approval Requests</h1>

          <p>
            Review and verify mechanic applications
            before onboarding them onto the platform.
          </p>
        </div>

        <div className="mechanics-search-card">
          <div className="mechanics-search-wrapper">
            <FaSearch className="mechanics-search-icon" />

            <input
              type="text"
              placeholder="Search mechanics by username or skills or Mobile Number..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>

        <div className="mechanics-table-card">
          <div className="mechanics-table-header">
            <h3>Pending Applications</h3>
          </div>

          <div className="mechanics-table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Username</th>
                  <th>Phone Number</th>
                  <th>Skills</th>
                  <th>Experience</th>
                  <th>Service Radius</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredMechanics.length > 0 ? (
                  filteredMechanics.map((mechanic) => (
                    <tr key={mechanic.username}>
                      <td>
                        <div className="verified-mechanic-avatar">
                          {mechanic.username
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>
                      </td>
                      <td>{mechanic.username}</td>

                      <td>
                        {mechanic.phone_number}
                      </td>

                      <td>{mechanic.skills}</td>

                      <td>
                        {mechanic.experience_years} Years
                      </td>

                      <td>
                        {mechanic.service_radius_km} KM
                      </td>

                      <td>
                        <div className="mechanic-action-buttons">
                          <button
                            className="mechanic-view-btn"
                            onClick={() =>
                              handleView(mechanic)
                            }
                          >
                            <FaEye />
                            View
                          </button>

                          <button
                            className="mechanic-approve-btn"
                            onClick={() =>
                              approveMechanic(
                                mechanic.username
                              )
                            }
                          >
                            <FaCheck />
                            Approve
                          </button>

                          <button
                            className="mechanic-reject-btn"
                            onClick={() =>
                              rejectMechanic(
                                mechanic.username
                              )
                            }
                          >
                            <FaTimes />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="no-mechanics"
                    >
                      No pending applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <VerifiedMechanics
          verifiedMechanics={filteredVerifiedMechanics}
          handleView={handleView}
        />
        {showMechanicModal && selectedMechanic && (
          <div
            className="mechanic-modal-overlay"
            onClick={() => setShowMechanicModal(false)}
          >
            <div
              className="mechanic-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mechanic-modal-header">
                <h2>Mechanic Details</h2>

                <button
                  className="mechanic-modal-close"
                  onClick={() => setShowMechanicModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="mechanic-profile-section">
                <div className="mechanic-avatar-large">
                  {selectedMechanic.username
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <h3>{selectedMechanic.username}</h3>

                  <p>{selectedMechanic.email}</p>
                </div>
              </div>

              <div className="mechanic-details-grid">

                <div className="mechanic-detail-box">
                  <label>Phone Number</label>
                  <span>
                    {selectedMechanic.phone_number}
                  </span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Skills</label>
                  <span>{selectedMechanic.skills}</span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Experience</label>
                  <span>
                    {selectedMechanic.experience_years} Years
                  </span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Service Radius</label>
                  <span>
                    {selectedMechanic.service_radius_km} KM
                  </span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Address</label>
                  <span>
                    {selectedMechanic.address}
                  </span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Status</label>
                  <span>
                    {selectedMechanic.status}
                  </span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Rating</label>
                  <span>
                    {selectedMechanic.rating}
                  </span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Availability</label>
                  <span>
                    {selectedMechanic.availabilityStatus
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </div>

                <div className="mechanic-detail-box">
                  <label>Location</label>

                  <button
                    className="mechanic-location-btn"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${selectedMechanic.base_location_lat},${selectedMechanic.base_location_long}`,
                        "_blank"
                      )
                    }
                  >
                    View On Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>

    
  );
}
