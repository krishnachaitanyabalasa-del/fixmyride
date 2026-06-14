import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MechRequestModal.css";

const MechRequestModal = ({
  requestId,
  onClose,
  unassignJob,
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
      <div className="myJobsModal-overlay">
        <div className="myJobsModal-box">
          Loading...
        </div>
      </div>
    );
  }

  if (!request) return null;

  return (
    <div className="myJobsModal-overlay">
      <div className="myJobsModal-box">
        <button
          className="myJobsModal-closeBtn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Job Details</h2>

        <div className="myJobsModal-detailsGrid">
          <div className="myJobsModal-detailCard">
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

          <div className="myJobsModal-detailCard">
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

          <div className="myJobsModal-detailCard">
            <h3>Location</h3>

            <p>
              <strong>Location:</strong>{" "}
              {request.location}
            </p>

            <button
              className="myJobsModal-locationBtn"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${request.current_location_lat},${request.current_location_long}`,
                  "_blank"
                )
              }
            >
              Open Location
            </button>
          </div>

          <div className="myJobsModal-detailCard">
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

          <div className="myJobsModal-detailCard">
            <h3>Mechanic Details</h3>

            <p>
              <strong>Mechanic Id:</strong>{" "}
              {request.assigned_mechanic_id ||
                "Not Assigned"}
            </p>
          </div>

          <div className="myJobsModal-detailCard myJobsModal-timelineCard">
            <h3>Job Progress</h3>

            <div className="myJobsModal-timeline">
              <div className="myJobsModal-timelineItem">
                <div className="myJobsModal-timelineDot myJobsModal-completed"></div>

                <div>
                  <div className="myJobsModal-timelineTitle">
                    Request Submitted
                  </div>
                </div>
              </div>

              <div className="myJobsModal-timelineItem">
                <div
                  className={`myJobsModal-timelineDot ${
                    request.status === "Assigned" ||
                    request.status === "In Progress" ||
                    request.status === "Completed"
                      ? "myJobsModal-completed"
                      : "myJobsModal-pending"
                  }`}
                ></div>

                <div className="myJobsModal-timelineTitle">
                  Mechanic Assigned
                </div>
              </div>

              <div className="myJobsModal-timelineItem">
                <div
                  className={`myJobsModal-timelineDot ${
                    request.status === "In Progress" ||
                    request.status === "Completed"
                      ? "myJobsModal-completed"
                      : "myJobsModal-pending"
                  }`}
                ></div>

                <div className="myJobsModal-timelineTitle">
                  Mechanic On The Way
                </div>
              </div>

              <div className="myJobsModal-timelineItem">
                <div
                  className={`myJobsModal-timelineDot ${
                    request.status === "Completed"
                      ? "myJobsModal-completed"
                      : request.status === "In Progress"
                      ? "myJobsModal-active"
                      : "myJobsModal-pending"
                  }`}
                ></div>

                <div className="myJobsModal-timelineTitle">
                  Service Started
                </div>
              </div>

              <div className="myJobsModal-timelineItem">
                <div
                  className={`myJobsModal-timelineDot ${
                    request.status === "Completed"
                      ? "myJobsModal-completed"
                      : "myJobsModal-pending"
                  }`}
                ></div>

                <div className="myJobsModal-timelineTitle">
                  Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="myJobsModal-actions">
          {request.assigned_mechanic_id &&
            request.status !== "Completed" &&
            request.status !== "Cancelled" && (
              <button
                className="myJobsModal-cancelBtn"
                onClick={() => unassignJob(request)}
              >
                Unassign Job
              </button>
            )}

          <button
            className="myJobsModal-closeModalBtn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MechRequestModal;
