import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminMechanicPreview.css";

export default function AdminMechanicPreview() {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    fetchPendingMechanics();
  }, []);

  const fetchPendingMechanics = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "https://fixmyride-backend-7jfl.onrender.com/api/mechanics/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMechanics(response.data.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="dashboard-section-header">
        <h2>Mechanic Applications</h2>
        <p>
          Newly submitted mechanic applications awaiting verification.
        </p>
      </div>

      <div className="mechanic-preview-section">
        <div className="mechanic-preview-header">
          <h3>Latest Applications</h3>

          <button
            className="view-all-btn"
            onClick={() => (window.location.href = "/admin-mechanics")}
          >
            View All
          </button>
        </div>

        <div className="mechanic-preview-grid">
          {mechanics.length === 0 ? (
            <p className="no-applications">
              No pending applications found.
            </p>
          ) : (
            mechanics.map((mechanic) => (
              <div
                className="mechanic-application-card"
                key={mechanic.username}
              >
                <div className="application-top">
                  <div className="mechanic-avatar">
                    {mechanic.username?.charAt(0)?.toUpperCase()}
                  </div>

                  <span className="pending-badge">
                    Pending
                  </span>
                </div>

                <h4>{mechanic.username}</h4>

                <p className="mechanic-email">
                  <label>Email:  </label>
                  {mechanic.email}
                </p>

                <div className="application-footer">
                  <label>Phone:  </label>
                  <span>{mechanic.phone_number}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
