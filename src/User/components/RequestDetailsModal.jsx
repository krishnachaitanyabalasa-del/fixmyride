import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RequestDetailsModal.css";

const RequestDetailsModal = ({
  requestId,
  onClose,
  cancelRequest
}) => {

  const [request, setRequest] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRequest();
  }, [requestId]);

  const fetchRequest = async () => {

    try {

      const token =
        sessionStorage.getItem("token");

      const response =
        await axios.get(
          `https://fixmyride-backend-7jfl.onrender.com/api/requests/${requestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      setRequest(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          Loading...
        </div>
      </div>
    );
  }

  if (!request) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Request Details</h2>

        <div className="details-grid">

          <div className="detail-card">
            <h3>Vehicle Information</h3>

            <p>
              <strong>Vehicle Number:</strong>
              {" "}
              {request.vehicle_number}
            </p>

            <p>
              <strong>Vehicle Type:</strong>
              {" "}
              {request.vehicle_type}
            </p>
          </div>

          <div className="detail-card">
            <h3>Service Information</h3>

            <p>
              <strong>Category:</strong>
              {" "}
              {request.service_category}
            </p>

            <p>
              <strong>Description:</strong>
              {" "}
              {request.problem_description}
            </p>
          </div>

          <div className="detail-card">
            <h3>Location</h3>

            <p>
              <strong>Location:</strong>
              {" "}
              {request.location}
            </p>

            <p>
              <strong>Latitude:</strong>
              {" "}
              {request.current_location_lat}
            </p>

            <p>
              <strong>Longitude:</strong>
              {" "}
              {request.current_location_long}
            </p>
          </div>

          <div className="detail-card">
            <h3>Status</h3>

            <p>
              <strong>Status:</strong>
              {" "}
              {request.status}
            </p>

            <p>
              <strong>Payment:</strong>
              {" "}
              {request.payment_status}
            </p>

            <p>
              <strong>Amount:</strong>
              ₹{request.amount}
            </p>
          </div>

          <div className="detail-card">
            <h3>Mechanic Details</h3>

            <p>
              <strong>Mechanic Id:</strong>
              {" "}
              {request.assigned_mechanic_id ||
                "Not Assigned"}
            </p>
          </div>

        

          <div className="detail-card timeline-card">
            <h3>Request Progress</h3>

            <div className="timeline">

              <div className="timeline-item">
                <div className="timeline-dot completed"></div>
                <div>
                  <div className="timeline-title">
                    Request Submitted
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div
                  className={`timeline-dot ${
                    request.status === "Assigned" ||
                    request.status === "In Progress" ||
                    request.status === "Completed"
                      ? "completed"
                      : "pending"
                  }`}
                ></div>

                <div className="timeline-title">
                  Mechanic Assigned
                </div>
              </div>

              <div className="timeline-item">
                <div
                  className={`timeline-dot ${
                    request.status === "In Progress" ||
                    request.status === "Completed"
                      ? "completed"
                      : "pending"
                  }`}
                ></div>

                <div className="timeline-title">
                  Mechanic On The Way
                </div>
              </div>

              <div className="timeline-item">
                <div
                  className={`timeline-dot ${
                    request.status === "Completed"
                      ? "completed"
                      : request.status === "In Progress"
                      ? "active"
                      : "pending"
                  }`}
                ></div>

                <div className="timeline-title">
                  Service Started
                </div>
              </div>

              <div className="timeline-item">
                <div
                  className={`timeline-dot ${
                    request.status === "Completed"
                      ? "completed"
                      : "pending"
                  }`}
                ></div>

                <div className="timeline-title">
                  Completed
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="modal-actions">

          {
            request.status === "Pending" &&
            (
              <button
                className="cancel-btn"
                onClick={() => cancelRequest(request.request_id)}
              >
                Cancel Request
              </button>
            )
          }

          <button
            className="close-modal-btn"
            onClick={onClose}
          >
            Close
          </button>

        </div>
      </div>



    </div>
  );
};

export default RequestDetailsModal;
