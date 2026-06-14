import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminRequestModal.css";

const AdminRequestModal = ({
  requestId,
  onClose,
}) => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequest();
  }, [requestId]);

  const fetchRequest = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        `https://fixmyride-backend-7jfl.onrender.com/api/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      <div className="adminRequestModal-overlay">
        <div className="adminRequestModal-box">
          Loading...
        </div>
      </div>
    );
  }

  if (!request) return null;

  return (
    <div className="adminRequestModal-overlay">
      <div className="adminRequestModal-box">
        <button
          className="adminRequestModal-closeBtn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Request Details</h2>

        <div className="adminRequestModal-detailsGrid">
          <div className="adminRequestModal-detailCard">
            <h3>Vehicle Information</h3>

            <p>
              <strong>Vehicle Number:</strong>{" "}
              {request.vehicle_number}
            </p>

            <p>
              <strong>Vehicle Type:</strong>{" "}
              {request.vehicle_type}
            </p>
          </div>

          <div className="adminRequestModal-detailCard">
            <h3>Service Information</h3>

            <p>
              <strong>Category:</strong>{" "}
              {request.service_category}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {request.problem_description}
            </p>
          </div>

          <div className="adminRequestModal-detailCard">
            <h3>Location</h3>

            <p>
              <strong>Location:</strong>{" "}
              {request.location}
            </p>

            <p>
              <strong>Latitude:</strong>{" "}
              {request.current_location_lat}
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {request.current_location_long}
            </p>
          </div>

          <div className="adminRequestModal-detailCard">
            <h3>Status</h3>

            <p>
              <strong>Status:</strong>{" "}
              {request.status}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {request.payment_status}
            </p>

            <p>
              <strong>Amount:</strong> ₹
              {request.amount}
            </p>
          </div>

          <div className="adminRequestModal-detailCard">
            <h3>Mechanic Details</h3>

            <p>
              <strong>Mechanic Id:</strong>{" "}
              {request.assigned_mechanic_id ||
                "Not Assigned"}
            </p>
          </div>

          <div className="adminRequestModal-detailCard adminRequestModal-timelineCard">
            <h3>Request Progress</h3>

            <div className="adminRequestModal-timeline">
              <div className="adminRequestModal-timelineItem">
                <div className="adminRequestModal-timelineDot adminRequestModal-completed"></div>

                <div>
                  <div className="adminRequestModal-timelineTitle">
                    Request Submitted
                  </div>
                </div>
              </div>

              <div className="adminRequestModal-timelineItem">
                <div
                  className={`adminRequestModal-timelineDot ${
                    request.status === "Assigned" ||
                    request.status === "In Progress" ||
                    request.status === "Completed"
                      ? "adminRequestModal-completed"
                      : "adminRequestModal-pending"
                  }`}
                ></div>

                <div className="adminRequestModal-timelineTitle">
                  Mechanic Assigned
                </div>
              </div>

              <div className="adminRequestModal-timelineItem">
                <div
                  className={`adminRequestModal-timelineDot ${
                    request.status === "In Progress" ||
                    request.status === "Completed"
                      ? "adminRequestModal-completed"
                      : "adminRequestModal-pending"
                  }`}
                ></div>

                <div className="adminRequestModal-timelineTitle">
                  Mechanic On The Way
                </div>
              </div>

              <div className="adminRequestModal-timelineItem">
                <div
                  className={`adminRequestModal-timelineDot ${
                    request.status === "Completed"
                      ? "adminRequestModal-completed"
                      : request.status === "In Progress"
                      ? "adminRequestModal-active"
                      : "adminRequestModal-pending"
                  }`}
                ></div>

                <div className="adminRequestModal-timelineTitle">
                  Service Started
                </div>
              </div>

              <div className="adminRequestModal-timelineItem">
                <div
                  className={`adminRequestModal-timelineDot ${
                    request.status === "Completed"
                      ? "adminRequestModal-completed"
                      : "adminRequestModal-pending"
                  }`}
                ></div>

                <div className="adminRequestModal-timelineTitle">
                  Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="adminRequestModal-actions">
          <button
            className="adminRequestModal-closeModalBtn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRequestModal;
