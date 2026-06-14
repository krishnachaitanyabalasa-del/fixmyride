import React, { useEffect, useState } from "react";
import axios from "axios";

import MechanicDashboardHeader from "./components/MechanicHeader";
import Footer from "../components/Footer";


import "./styles/MyJobs.css";
import MechRequestModal from "./components/MechRequestModal";
import ChangeRequestStatusModal from "./components/ChangeRequestStatusModal";

export default function MyJobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [selectedRequestId, setSelectedRequestId] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const username =
    sessionStorage.getItem("username");

  const [showStatusModal, setShowStatusModal] =
    useState(false);

  const [selectedJob, setSelectedJob] =
    useState(null);

  useEffect(() => {

    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-mechanic");
      return;
    }

    fetchJobs();
  }, []);


  const openStatusModal = (job) => {
    setSelectedJob(job);
    setShowStatusModal(true);
  };

  const unassignJob = async (request) => {
    try {

      const token =
        sessionStorage.getItem("token");

      const updatedRequest = {
        ...request,
        assigned_mechanic_id: null,
        status: "Pending"
      };

      await axios.put(
        `https://fixmyride-backend-7jfl.onrender.com/api/requests/${request.request_id}`,
        updatedRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setShowModal(false);

      fetchJobs();

    } catch (error) {

      console.error(error);

    }
  };

  const fetchJobs = async () => {
    try {

      const token =
        sessionStorage.getItem("token");

      const response = await axios.get(
        `https://fixmyride-backend-7jfl.onrender.com/api/requests/mechanic/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleViewDetails = (
    requestId
  ) => {

    setSelectedRequestId(requestId);
    setShowModal(true);

  };

  const markCompleted = async (job) => {

    try {

      const token =
        sessionStorage.getItem("token");

      const updatedJob = {
        ...job,
        status: "Completed",
      };

      await axios.put(
        `https://fixmyride-backend-7jfl.onrender.com/api/requests/${job.request_id}`,
        updatedJob,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      );

      fetchJobs();

    } catch (error) {

      console.error(error);

    }
  };

  const viewLocation = (job) => {

    window.open(
      `https://www.google.com/maps?q=${job.latitude},${job.longitude}`,
      "_blank"
    );

  };

  const filteredJobs = jobs.filter(
    (job) => {

      const matchesSearch =
        job.vehicle_number
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        String(job.request_id)
          .includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        job.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  const activeJobs =
    filteredJobs.filter(
      (job) =>
        job.status === "Assigned" ||
        job.status === "In Progress"
    );

  const historyJobs =
    filteredJobs.filter(
      (job) =>
        job.status === "Completed" ||
        job.status === "Cancelled"
    );

  const totalJobs = jobs.length;

  const activeCount =
    jobs.filter(
      (job) =>
        job.status === "Assigned" ||
        job.status === "In Progress"
    ).length;

  const completedCount =
    jobs.filter(
      (job) =>
        job.status === "Completed"
    ).length;

  if (loading) {
    return (
      <h2 className="myjobs-loading">
        Loading Jobs...
      </h2>
    );
  }


  return (
    <>
      <MechanicDashboardHeader />

      <div className="myjobs-container">

        <div className="myjobs-hero">
          <h1>My Jobs</h1>

          <p>
            Manage all assigned jobs
          </p>
        </div>

        <div className="myjobs-stats-grid">

          <div className="myjobs-stat-card">
            <h2>{totalJobs}</h2>
            <p>Total Jobs</p>
          </div>

          <div className="myjobs-stat-card active">
            <h2>{activeCount}</h2>
            <p>Active Jobs</p>
          </div>

          <div className="myjobs-stat-card completed">
            <h2>{completedCount}</h2>
            <p>Completed Jobs</p>
          </div>

        </div>

        <div className="myjobs-filters">

          <input
            type="text"
            placeholder="Search Vehicle Number or Job ID"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="ALL">
              All Status
            </option>

            <option value="Assigned">
              Assigned
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

        </div>

        <h2 className="myjobs-section-title">
          Active Jobs (
          {activeJobs.length})
        </h2>

        {activeJobs.map((job) => (

          <div
            className="myjobs-card"
            key={job.request_id}
          >

            <div>

              <h3>
                Job #
                {job.request_id}
              </h3>

              <p>
                <strong>
                  Vehicle:
                </strong>{" "}
                {
                  job.vehicle_number
                }
              </p>

              <p>
                <strong>
                  Type:
                </strong>{" "}
                {
                  job.vehicle_type
                }
              </p>

              <p>
                <strong>
                  Service:
                </strong>{" "}
                {
                  job.service_category
                }
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {job.location}
              </p>

            </div>

            <div>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {job.status}
              </p>

              <p>
                <strong>
                  Amount:
                </strong>{" "}
                ₹{job.amount}
              </p>

            </div>

            <div className="myjobs-actions">

              <button
                className="myjobs-details-btn"
                onClick={() =>
                  handleViewDetails(
                    job.request_id
                  )
                }
              >
                View Details
              </button>

              <button
                className="myjobs-location-btn"
                onClick={() =>
                  viewLocation(job)
                }
              >
                View Location
              </button>

              <button
                className="myjobs-complete-btn"
                onClick={() =>
                  openStatusModal(job)
                }
              >
                Change Request Status
              </button>

            </div>

          </div>

        ))}

        <h2 className="myjobs-section-title">
          Job History (
          {historyJobs.length})
        </h2>

        {historyJobs.map((job) => (

          <div
            className="myjobs-card"
            key={job.request_id}
          >

            <div>

              <h3>
                Job #
                {job.request_id}
              </h3>

              <p>
                <strong>
                  Vehicle:
                </strong>{" "}
                {
                  job.vehicle_number
                }
              </p>

              <p>
                <strong>
                  Service:
                </strong>{" "}
                {
                  job.service_category
                }
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {job.location}
              </p>

            </div>

            <div>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {job.status}
              </p>

              <p>
                <strong>
                  Amount:
                </strong>{" "}
                ₹{job.amount}
              </p>

            </div>

            <div className="myjobs-actions">

              <button
                className="myjobs-details-btn"
                onClick={() =>
                  handleViewDetails(
                    job.request_id
                  )
                }
              >
                View Details
              </button>

            </div>

          </div>

        ))}

        {showModal && (

          <MechRequestModal
            requestId={selectedRequestId}
            onClose={() => setShowModal(false)}
            unassignJob={unassignJob}
          />

        )}


        {
          showStatusModal && (
            <ChangeRequestStatusModal
              job={selectedJob}
              onClose={() =>
                setShowStatusModal(false)
              }
              onSuccess={() => {
                fetchJobs();
                setShowStatusModal(false);
              }}
            />
          )
        }

      </div>

      <Footer />
    </>
  );
}
