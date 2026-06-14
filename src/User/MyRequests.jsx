import React, { useEffect, useState } from "react";
import UserHeader from "./components/UserHeader";
import Footer from "../components/Footer";
import axios from "axios";
import RequestDetailsModal from "./components/RequestDetailsModal";
import "./styles/MyRequests.css";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (requestId) => {
    setSelectedRequestId(requestId);
    setShowModal(true);
  };

  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `https://fixmyride-backend-7jfl.onrender.com/api/requests/user/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const cancelRequest = async (id) => {
    try {
      await axios.delete(`https://fixmyride-backend-7jfl.onrender.com/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) =>
        prev.filter((request) => request.request_id !== id)
      );
      showMessage("Request cancelled successfully", "success");
    } catch (error) {
      showMessage("Failed to cancel request", "error");
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.vehicle_number?.toLowerCase().includes(search.toLowerCase()) ||
      request.request_id.toString().includes(search);
    const matchesStatus =
      statusFilter === "ALL" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeRequests = filteredRequests.filter((r) =>
    ["Pending", "Assigned", "In Progress"].includes(r.status)
  );

  const historyRequests = filteredRequests.filter((r) =>
    ["Completed", "Cancelled"].includes(r.status)
  );

  const totalRequests = requests.length;
  const activeCount = requests.filter((r) =>
    ["Pending", "Assigned", "In Progress"].includes(r.status)
  ).length;
  const completedCount = requests.filter(
    (r) => r.status === "Completed"
  ).length;

  if (loading) {
    return <h2 className="mr-loading-text">Loading Requests...</h2>;
  }

  return (
    <>
      <UserHeader />
      <div className="mr-page-wrapper">

        <div className="mr-hero-banner">
          <h1>My Requests</h1>
          <p>Track all your service requests in one place</p>
        </div>

        {message && (
          <div className={`mr-alert-box mr-alert-box--${messageType}`}>
            {message}
          </div>
        )}

        <div className="mr-stats-grid">
          <div className="mr-stat-card">
            <h2>{totalRequests}</h2>
            <p>Total Requests</p>
          </div>
          <div className="mr-stat-card mr-stat-card--active">
            <h2>{activeCount}</h2>
            <p>Active Requests</p>
          </div>
          <div className="mr-stat-card mr-stat-card--completed">
            <h2>{completedCount}</h2>
            <p>Completed Requests</p>
          </div>
        </div>

        <div className="mr-filter-bar">
          <input
            type="text"
            className="mr-filter-search"
            placeholder="Search Vehicle Number or Request ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="mr-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <h2 className="mr-section-heading">
          Active Requests ({activeRequests.length})
        </h2>

        {activeRequests.map((request) => (
          <div className="mr-request-card" key={request.request_id}>
            <div className="mr-request-card__info">
              <h3 className="mr-request-card__title">
                Request #{request.request_id}
              </h3>
              <p><strong>Vehicle:</strong> {request.vehicle_number}</p>
              <p><strong>Type:</strong> {request.vehicle_type}</p>
              <p><strong>Service:</strong> {request.service_category}</p>
              <p><strong>Location:</strong> {request.location}</p>
            </div>

            <div className="mr-request-card__meta">
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Payment:</strong> {request.payment_status}</p>
              <p><strong>Expected Amount:</strong> ₹{request.amount}</p>
            </div>

            <div className="mr-request-card__actions">
              <button
                className="mr-btn mr-btn--details"
                onClick={() => handleViewDetails(request.request_id)}
              >
                View Details
              </button>
              {request.status === "Pending" && (
                <button
                  className="mr-btn mr-btn--cancel"
                  onClick={() => cancelRequest(request.request_id)}
                >
                  Cancel Request
                </button>
              )}
            </div>
          </div>
        ))}

        <h2 className="mr-section-heading">
          Request History ({historyRequests.length})
        </h2>

        {historyRequests.map((request) => (
          <div className="mr-request-card mr-request-card--history" key={request.request_id}>
            <div className="mr-request-card__info">
              <h3 className="mr-request-card__title">
                Request #{request.request_id}
              </h3>
              <p><strong>Vehicle:</strong> {request.vehicle_number}</p>
              <p><strong>Service:</strong> {request.service_category}</p>
              <p><strong>Location:</strong> {request.location}</p>
            </div>

            <div className="mr-request-card__meta">
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Payment:</strong> {request.payment_status}</p>
              <p><strong>Amount:</strong> ₹{request.amount}</p>
            </div>

            <div className="mr-request-card__actions">
              <button
                className="mr-btn mr-btn--details"
                onClick={() => handleViewDetails(request.request_id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {showModal && (
          <RequestDetailsModal
            requestId={selectedRequestId}
            onClose={() => setShowModal(false)}
            cancelRequest={cancelRequest}
          />
        )}

      </div>
      <Footer />
    </>
  );
}
