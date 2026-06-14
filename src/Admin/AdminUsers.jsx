import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaSearch, FaEye } from "react-icons/fa";
import "./styles/AdminUsers.css";

import AdminHeader from "./components/AdminHeader";
import { useNavigate } from "react-router-dom";
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const navigate = useNavigate();

  const handleView = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-admin");
      return;
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber?.includes(searchTerm)
    );

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "https://fixmyride-backend-7jfl.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  

  return (
    <>
      <AdminHeader/>
      <div className="users-page">
        <div className="users-header-section">
          <div>
            <h1>Users Management</h1>
            <p>
              Manage and monitor all registered users across
              the FixMyRide platform.
            </p>
          </div>
        </div>

        <div className="users-stats-card">
          <div className="users-stat-icon">
            <FaUsers />
          </div>

          <div>
            <h4>Total Users</h4>
            <h2>{users.length}</h2>
          </div>
        </div>

        <div className="users-search-card">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search by username, name, email or phone..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>

        <div className="users-table-card">
          <div className="table-header">
            <h3>Registered Users</h3>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.username}>
                      <td>
                        <div className="user-avatar">
                          {user.full_name
                            ? user.full_name
                                .charAt(0)
                                .toUpperCase()
                            : user.username
                                .charAt(0)
                                .toUpperCase()}
                        </div>
                      </td>

                      <td>{user.username}</td>

                      <td>{user.full_name}</td>

                      <td>{user.email}</td>

                      <td>{user.phoneNumber}</td>

                      <td>
                        {user.created_at
                          ? new Date(
                              user.created_at
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <button
                          className="view-btn"
                          onClick={() => handleView(user)}
                        >
                          <FaEye />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="no-users"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>



      {showUserModal && selectedUser && (
        <div
          className="admin-user-modal-overlay"
          onClick={() => setShowUserModal(false)}
        >
          <div
            className="admin-user-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-user-modal-header">
              <h2>User Details</h2>

              <button
                className="admin-user-modal-close"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>

            <div className="admin-user-modal-content">
              <div className="admin-user-profile-top">
                <div className="admin-user-avatar-large">
                  {selectedUser.full_name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <h3>{selectedUser.full_name}</h3>
                  <p>@{selectedUser.username}</p>
                </div>
              </div>

              <div className="admin-user-details-grid">

                <div className="admin-user-detail-card">
                  <label>Email</label>
                  <span>{selectedUser.email}</span>
                </div>

                <div className="admin-user-detail-card">
                  <label>Phone Number</label>
                  <span>{selectedUser.phoneNumber}</span>
                </div>

                <div className="admin-user-detail-card">
                  <label>Address</label>
                  <span>{selectedUser.address}</span>
                </div>

                <div className="admin-user-detail-card">
                  <label>Role</label>
                  <span>{selectedUser.role}</span>
                </div>

                <div className="admin-user-detail-card">
                  <label>User Location</label>

                  <button
                    className="admin-user-location-btn"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${selectedUser.location_lat},${selectedUser.location_long}`,
                        "_blank"
                      )
                    }
                  >
                    View on Google Maps
                  </button>
                </div>

                <div className="admin-user-detail-card">
                  <label>Created Date</label>
                  <span>
                    {selectedUser.created_at
                      ? new Date(
                          selectedUser.created_at
                        ).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
