import React,{useState,useEffect} from "react";
import AdminRequestModal from "../Admin/components/AdminRequestModal";
import AdminHeader from "./components/AdminHeader";
import axios from "axios";

import "./styles/AdminRequests.css"
import { useNavigate } from "react-router-dom";

export default function AdminRequests(){
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const [showRequestModal, setShowRequestModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-admin");
      return;
    }

    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "https://fixmyride-backend-7jfl.onrender.com/api/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  

      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const filtered = requests.filter(
      (request) => {
        const matchesSearch =
          String(request.request_id)
            .includes(searchTerm) ||
          request.username
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.vehicle_type
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL" ||
          request.status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

    setFilteredRequests(filtered);
  }, [
    searchTerm,
    statusFilter,
    requests,
  ]);

  const totalRequests =
    requests.length;

  const pendingCount =
    requests.filter(
      (r) => r.status === "Pending"
    ).length;

  const assignedCount =
    requests.filter(
      (r) => r.status === "Assigned"
    ).length;

  const inProgressCount =
    requests.filter(
      (r) => r.status === "In Progress"
    ).length;

  const completedCount =
    requests.filter(
      (r) => r.status === "Completed"
    ).length;

  const cancelledCount =
    requests.filter(
      (r) => r.status === "Cancelled"
    ).length;

  return(
    <>
      <AdminHeader/>
      <div className="admin-requests-page">
        
        <div className="admin-header-section">
          <h1>Service Request Management</h1>

          <p>
            Track, assign, and monitor all vehicle service requests
            submitted by users across the platform.
          </p>
        </div>
        <div className="admin-requests-stats">

          <div className="admin-request-stat-card">
            <h2>{totalRequests}</h2>
            <p>Total</p>
          </div>

          <div className="admin-request-stat-card pending">
            <h2>{pendingCount}</h2>
            <p>Pending</p>
          </div>

          <div className="admin-request-stat-card assigned">
            <h2>{assignedCount}</h2>
            <p>Assigned</p>
          </div>

          <div className="admin-request-stat-card progress">
            <h2>{inProgressCount}</h2>
            <p>In Progress</p>
          </div>

          <div className="admin-request-stat-card completed">
            <h2>{completedCount}</h2>
            <p>Completed</p>
          </div>

          <div className="admin-request-stat-card cancelled">
            <h2>{cancelledCount}</h2>
            <p>Cancelled</p>
          </div>

        </div>

        <div className="admin-request-filters">

          <input
            type="text"
            placeholder="Search Request ID, User, Vehicle Type"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="ALL">
              All Status
            </option>

            <option value="Pending">
              Pending
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

        <div className="admin-requests-table-card">

          <div className="admin-requests-table-header">
            <h3>
              Service Requests (
              {filteredRequests.length})
            </h3>
          </div>

          <div className="admin-requests-table-responsive">

            <table>

              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Requested User</th>
                  <th>Assigned Mechanic</th>
                  <th>Vehicle Type</th>
                  <th>Status</th>
                  <th>Requested Time</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredRequests.map(
                  (request) => (
                    <tr
                      key={request.request_id}
                    >
                      <td>
                        #
                        {request.request_id}
                      </td>

                      <td>
                        {request.username}
                      </td>

                      <td>
                        {request.assigned_mechanic_id ||
                          "Not Assigned"}
                      </td>

                      <td>
                        {request.vehicle_type}
                      </td>

                      <td>
                        {request.status}
                      </td>

                      <td>
                        {new Date(
                          request.requested_time
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          className="admin-request-view-btn"
                          onClick={() => {
                            setSelectedRequestId(
                              request.request_id
                            );
                            setShowRequestModal(
                              true
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {
          showRequestModal && (
            <AdminRequestModal
              requestId={selectedRequestId}
              onClose={() =>
                setShowRequestModal(false)
              }
            />
          )
        }
      </div>
    </>
  );
}
