import React, { useEffect, useState } from "react";
import MechanicDashboardHeader from "./components/MechanicHeader";
import Footer from "../components/Footer"
import axios from "axios";
import "./styles/RequestsPage.css";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-mechanic");
      return;
    }

    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "https://fixmyride-backend-7jfl.onrender.com/api/pending-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleAcceptRequest = async (request) => {
    try {
      const token = sessionStorage.getItem("token");
      const mechanicUsername =
        sessionStorage.getItem("username");

      const updatedRequest = {
        ...request,
        assigned_mechanic_id: mechanicUsername,
        status: "Assigned",
      };

      await axios.put(
        `https://fixmyride-backend-7jfl.onrender.com/api/requests/${request.request_id}`,
        updatedRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      fetchRequests();

    } catch (error) {
      console.error(error);
    }
  };
  const filteredRequests = requests.filter(
    (request) =>
      request.vehicle_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      String(request.request_id)
        .includes(search)
  );

  const viewLocation = (request) => {
    window.open(
      `https://www.google.com/maps?q=${request.current_location_lat},${request.current_location_long}`,
      "_blank"
    );
  };

  if (loading) {
    return <h2>Loading Requests...</h2>;
  }

  return (
    <>
    <MechanicDashboardHeader/>
      <div className="mechanic-requests-page">

        <div className="mechanic-requests-banner">
          <h1>Pending Requests</h1>
          <p>
            View and manage all nearby customer requests
          </p>
        </div>

        <div className="mechanic-pending-card">
          <h2>{requests.length}</h2>
          <p>Total Pending Requests</p>
        </div>

        <div className="mechanic-search-box">
          <input
            type="text"
            placeholder="Search Vehicle Number or Request ID"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <h2 className="mechanic-section-title">
          Pending Requests ({filteredRequests.length})
        </h2>

        {filteredRequests.map((request) => (
          <div
            className="mechanic-request-card"
            key={request.request_id}
          >
            <div className="mechanic-request-left">

              <h3>
                Request #{request.request_id}
              </h3>

              <p>
                <strong>Vehicle:</strong>{" "}
                {request.vehicle_number}
              </p>

              <p>
                <strong>Service:</strong>{" "}
                {request.service_category}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {request.vehicle_type}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {request.location}
              </p>

            </div>

            <div className="mechanic-request-middle">

              <p>
                <strong>Status:</strong>{" "}
                {request.status}
              </p>

              <p>
                <strong>Expected Amount:</strong> ₹
                {request.amount}
              </p>

            </div>

            <div className="mechanic-request-actions">

              <button
                className="mechanic-accept-btn"
                onClick={() =>
                  handleAcceptRequest(request)
                }
              >
                Accept Request
              </button>

              <button
                className="mechanic-location-btn"
                onClick={() =>
                  viewLocation(request)
                }
              >
                View Location
              </button>

            </div>

          </div>
        ))}
      </div>
    <Footer/>
    </>
  );
}

