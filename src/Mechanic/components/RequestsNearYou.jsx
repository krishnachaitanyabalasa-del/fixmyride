import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RequestsNearYou.css";
import { useNavigate } from "react-router-dom";

export default function RequestsNearYou() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  

    if (loading) {
      return (
        <div className="loading-text">
          Loading Requests...
        </div>
      );
    }

  return (
    <section className="requests-section">
      <div className="requests-box">

        <div className="requests-header">
          <h2>NEW REQUESTS NEAR YOU</h2>

          <button className="view-all-btn"
            onClick={() =>{
              navigate("/available-requests")
            }}
          >
            View All →
          </button>
        </div>

        <div className="requests-grid">
          {requests.length === 0 && (
            <div className="request-card">
              NO REQUESTS RECEIVED.
            </div>
          )}
          {requests.length > 0 && requests.slice(0,3).map((request) => (
            <div
              className="request-card"
              key={request.request_id}
            >
              <div className="request-icon">

                {request.service_category ===
                "Battery Issue" ? (
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="12"
                      rx="2"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 12H15"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 9V15"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                ) : request.service_category ===
                  "Fuel Delivery" ? (
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 4H15V20H6V4Z"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 8H18L20 10V18"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2"
                      fill="black"
                    />
                  </svg>
                )}
              </div>

              <div className="request-content">
                <h3>
                  {request.service_category}
                </h3>

                <p>

                  <span className="icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 16L6.5 10.5C6.8 9.4 7.8 8.6 9 8.6H15C16.2 8.6 17.2 9.4 17.5 10.5L19 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="3"
                        y="12"
                        width="18"
                        height="5"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="7"
                        cy="17"
                        r="1.5"
                        fill="currentColor"
                      />
                      <circle
                        cx="17"
                        cy="17"
                        r="1.5"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                 {request.vehicle_number}
                </p>

                <p>
                  <span className="icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C12 22 19 15.5 19 10C19 6.13 15.87 3 12 3C8.13 3 5 6.13 5 10C5 15.5 12 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </span> 
                  {request.location}
                </p>

                <p className="problem">
                  {request.problem_description}
                </p>

                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
